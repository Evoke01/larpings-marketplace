// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LarpingsEscrow
 * @notice Trustless escrow for larpings.com marketplace orders.
 *         Buyer deposits native coin (ETH on Ethereum, BNB on BSC).
 *         Funds are locked until the buyer confirms delivery.
 *         On confirmation, 99% goes to the seller and 1% to the admin fee wallet.
 *         Admin can emergency-refund at any time before delivery confirmation.
 *
 * Deploy once per chain:
 *   - Ethereum mainnet  (chainId 1)
 *   - BSC mainnet       (chainId 56)
 */
contract LarpingsEscrow {
    // ── State ────────────────────────────────────────────────────────────────
    address public admin;
    uint256 public constant FEE_BPS = 100; // 1% = 100 basis points out of 10 000

    enum Status { None, Deposited, Released, Refunded }

    struct EscrowRecord {
        address payable buyer;
        address payable seller;
        uint256 amount;
        Status  status;
    }

    /// @dev orderId is keccak256 of the Supabase UUID string
    mapping(bytes32 => EscrowRecord) public escrows;

    // ── Events ────────────────────────────────────────────────────────────────
    event Deposited(bytes32 indexed orderId, address indexed buyer, address indexed seller, uint256 amount);
    event Released (bytes32 indexed orderId, uint256 sellerAmount, uint256 feeAmount);
    event Refunded (bytes32 indexed orderId, uint256 amount);
    event AdminChanged(address newAdmin);

    // ── Modifiers ─────────────────────────────────────────────────────────────
    modifier onlyAdmin() {
        require(msg.sender == admin, "LarpingsEscrow: not admin");
        _;
    }

    // ── Constructor ───────────────────────────────────────────────────────────
    constructor(address _admin) {
        require(_admin != address(0), "LarpingsEscrow: zero admin");
        admin = _admin;
    }

    // ── Buyer Actions ─────────────────────────────────────────────────────────

    /**
     * @notice Buyer calls this to lock funds for an order.
     * @param orderId  keccak256 of the Supabase order UUID
     * @param seller   Seller's wallet address (provided by the frontend from the DB)
     */
    function deposit(bytes32 orderId, address payable seller) external payable {
        require(msg.value > 0,                           "LarpingsEscrow: zero value");
        require(seller != address(0),                    "LarpingsEscrow: zero seller");
        require(seller != msg.sender,                    "LarpingsEscrow: self-trade");
        require(escrows[orderId].status == Status.None,  "LarpingsEscrow: order exists");

        escrows[orderId] = EscrowRecord({
            buyer:  payable(msg.sender),
            seller: seller,
            amount: msg.value,
            status: Status.Deposited
        });

        emit Deposited(orderId, msg.sender, seller, msg.value);
    }

    /**
     * @notice Buyer confirms they received the item. Releases funds.
     *         99% → seller, 1% → admin fee wallet.
     * @param orderId  keccak256 of the Supabase order UUID
     */
    function confirmDelivery(bytes32 orderId) external {
        EscrowRecord storage e = escrows[orderId];
        require(e.status == Status.Deposited, "LarpingsEscrow: not deposited");
        require(msg.sender == e.buyer,        "LarpingsEscrow: not buyer");

        e.status = Status.Released;

        uint256 fee          = (e.amount * FEE_BPS) / 10_000;
        uint256 sellerAmount = e.amount - fee;

        e.seller.transfer(sellerAmount);
        payable(admin).transfer(fee);

        emit Released(orderId, sellerAmount, fee);
    }

    // ── Seller Actions ────────────────────────────────────────────────────────

    /**
     * @notice Seller can voluntarily refund the buyer.
     *         Used when the seller rejects the order or cannot deliver.
     * @param orderId  keccak256 of the Supabase order UUID
     */
    function refundBuyer(bytes32 orderId) external {
        EscrowRecord storage e = escrows[orderId];
        require(e.status == Status.Deposited, "LarpingsEscrow: not deposited");
        require(msg.sender == e.seller,       "LarpingsEscrow: not seller");

        e.status = Status.Refunded;
        e.buyer.transfer(e.amount);

        emit Refunded(orderId, e.amount);
    }

    // ── Admin Actions ─────────────────────────────────────────────────────────

    /**
     * @notice Emergency full refund to buyer (admin only).
     *         Used when a seller fails to deliver or in dispute resolution.
     */
    function adminRefund(bytes32 orderId) external onlyAdmin {
        EscrowRecord storage e = escrows[orderId];
        require(e.status == Status.Deposited, "LarpingsEscrow: not deposited");

        e.status = Status.Refunded;
        e.buyer.transfer(e.amount);

        emit Refunded(orderId, e.amount);
    }

    /**
     * @notice Admin forces release of funds to seller (admin only).
     *         Used when a buyer receives the item but refuses to confirm.
     */
    function adminRelease(bytes32 orderId) external onlyAdmin {
        EscrowRecord storage e = escrows[orderId];
        require(e.status == Status.Deposited, "LarpingsEscrow: not deposited");

        e.status = Status.Released;

        uint256 fee          = (e.amount * FEE_BPS) / 10_000;
        uint256 sellerAmount = e.amount - fee;

        e.seller.transfer(sellerAmount);
        payable(admin).transfer(fee);

        emit Released(orderId, sellerAmount, fee);
    }

    /**
     * @notice Transfer admin role to a new address.
     */
    function setAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "LarpingsEscrow: zero address");
        admin = newAdmin;
        emit AdminChanged(newAdmin);
    }

    // ── View Helpers ──────────────────────────────────────────────────────────

    function getEscrow(bytes32 orderId) external view
        returns (address buyer, address seller, uint256 amount, Status status)
    {
        EscrowRecord storage e = escrows[orderId];
        return (e.buyer, e.seller, e.amount, e.status);
    }
}
