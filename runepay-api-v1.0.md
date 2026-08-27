# Rune Pay API

Version 1.0 · Base URL `https://rpay.gg/api/v1`

Generated Thu, Aug 27, 2026 5:03 PM UTC.

---

## Introduction

The Rune Pay API accepts cryptocurrency payments and sends payouts. It is a JSON API over HTTPS: every request and response is `application/json`, and there are no SDK-only features — anything the dashboard can do, the API can do.

Request and response shapes follow the OxaPay convention. If you already have a working OxaPay integration, changing the base URL and the API key is normally the whole migration.

**The essentials**

| | |
|---|---|
| Base URL | `https://rpay.gg/api/v1` |
| Protocol | HTTPS only. Plain HTTP is redirected and must never carry a key. |
| Encoding | UTF-8. Send `Content-Type: application/json` on every request with a body. |
| Versioning | The version is in the path (`/v1`). A breaking change ships as `/v2`; `/v1` keeps working. |
| Amounts | Always strings, never floats. See Amounts and precision. |
| Timestamps | Unix seconds (UTC integers), named `date`, `paid_at`, `expired_at`. |

## Authentication

There are two kinds of key, deliberately separated. A **merchant key** (`rp_sec_…`) can take money in. A **payout key** (`rp_out_…`) can send money out. A key that leaks from your checkout page therefore cannot drain your balance.

> **Keys are shown once**
>
> The raw key is displayed only at creation. Rune Pay stores nothing but its SHA-256 hash, so a database leak does not expose usable credentials — and we genuinely cannot recover it for you. If you lose it, revoke it and create another.

**Merchant key — payments**

| | |
|---|---|
| Prefix | `rp_sec_` |
| Preferred header | `merchant_api_key: rp_sec_…` |
| Also accepted | `Authorization: Bearer rp_sec_…` · `x-api-key: rp_sec_…` |
| Grants | Create and read invoices, white-label payments and static addresses. |

**Payout key — sending funds**

| | |
|---|---|
| Prefix | `rp_out_` |
| Preferred header | `payout_api_key: rp_out_…` |
| Also accepted | `Authorization: Bearer rp_out_…` |
| Grants | Read your balance, queue payouts, read payout history. |

**A request that works**

```bash
curl -X POST https://rpay.gg/api/v1/payment/invoice \
  -H 'merchant_api_key: rp_sec_YOUR_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"amount": 25.00, "currency": "USD"}'
```

Prefixes are checked before the database is touched: a token that does not start with the right prefix is rejected as malformed, which means sending a payout key to a payment endpoint fails immediately and tells you so.

## Response envelope

Every response — success or failure — has the same five top-level keys. You can branch on `error === null` without special-casing status codes.

**Success**

```json
{
    "data": {
        "track_id": "INV_9F2K4M1Q7X"
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 201,
    "version": "1.0"
}
```

**Failure**

```json
{
    "data": null,
    "message": "Payment not found.",
    "error": {
        "type": "request",
        "message": "Payment not found."
    },
    "status": 404,
    "version": "1.0"
}
```

**Envelope fields**

| | |
|---|---|
| `data` | The result. `null` on failure. |
| `message` | Human-readable summary. Safe to log; do not parse it. |
| `error` | `null` on success. Otherwise `{type, message, fields?}`. |
| `status` | Mirrors the HTTP status code. |
| `version` | API version that produced the response. |

## Amounts and precision

> **Never parse an amount as a float**
>
> Rune Pay returns every monetary value as a **decimal string** and computes internally with arbitrary precision. IEEE-754 doubles cannot represent 0.1 exactly, and 8-decimal BTC values exceed the safe integer range of a JavaScript number once denominated in satoshis. Use a decimal library — `BigDecimal`, `decimal.Decimal`, `bcmath`, `big.js`.

**How amounts behave**

| | |
|---|---|
| Type on the wire | JSON string, e.g. `"24.55000000"`. |
| Trailing zeros | Padded to the asset's precision, so string comparison is unreliable — compare numerically with a decimal type. |
| Rounding | Crypto amounts round *up* at the asset's precision when converting from fiat, so an exactly-paid invoice is never a satoshi short. |
| `amount` vs `pay_amount` | `amount` is what you charged (fiat). `pay_amount` is what the customer must send (crypto). |
| `received_amount` | What actually arrived. Compare this against `pay_amount`, not against `amount`. |

The exchange rate is locked when the payment is created and stored on it as `rate`. A customer who pays 20 minutes later still pays the quoted crypto amount — the volatility between quote and settlement is ours, not theirs.

## Rate limits

Requests are limited **per API key**, at 60 per minute on the default plan. The window is a rolling 60 seconds.

**429 Too Many Requests**

```json
{
    "data": null,
    "message": "Rate limit exceeded.",
    "error": {
        "type": "auth",
        "message": "Rate limit exceeded.",
        "retry_after": 34
    },
    "status": 429,
    "version": "1.0"
}
```

`error.retry_after` is the number of seconds until the window clears. Wait that long rather than retrying immediately — a tight retry loop keeps the window permanently full and locks you out for longer than backing off would.

> **Do not poll for payment status**
>
> Polling `GET /payment/{track_id}` in a loop is the usual way people hit this limit. Use callbacks: they arrive within seconds of the block confirming and cost you no requests at all. Poll only as a reconciliation sweep, minutes apart.

## Idempotency and duplicates

Payments and payouts handle repeat requests differently, because the consequences of a duplicate are not the same.

**Behaviour by endpoint**

| | |
|---|---|
| `POST /payment/invoice` | Creates a new payment every call. Two calls with the same `order_id` produce two independent invoices — dedupe on your side if that matters. |
| `POST /payment/static-address` | Idempotent per `order_id`. The same reference always returns the same address; a new reference mints a new one. |
| `POST /payout` | Idempotent when you send `order_id`: it is used as the idempotency key, and a repeat returns the original payout instead of sending twice. |

> **Always send order_id on payouts**
>
> If a payout request times out you cannot tell whether it was queued. Without `order_id`, retrying may send the funds twice, and an on-chain transaction cannot be recalled. With it, retrying is safe.

## Testing without real coins

Send `"sandbox": true` when creating a payment. It runs the entire pipeline — invoice, checkout page, callbacks, status transitions — without watching a real chain, so you can build and test your integration end to end before moving any money.

> **Sandbox payments are not real**
>
> A sandbox payment credits nothing. Make sure your own code checks the flag before releasing goods, or a caller who sets `sandbox: true` against your production endpoint gets your product for free.

---

# Endpoints

## Reference data

Public endpoints. No API key required, no rate limit tied to a key. Cache these — they change rarely.

### List supported currencies

```http
GET /common/currencies
```

**Authentication:** None — public endpoint

Returns coins grouped by symbol, each with the networks it can be paid on. Build your checkout selector from this rather than hard-coding a list, because availability changes: a network under maintenance, or one whose provider is unreachable, reports `"status": "unavailable"` and must not be offered to a customer. A coin's top-level `status` is `true` when at least one of its networks is active.

**`data` is an object keyed by coin symbol, not an array**, and `networks` is keyed by network id. Iterate the values (`Object.values(data)`) rather than indexing by position. Each network also repeats its own `id` so a value-only iteration still knows what it is holding.

#### Example response

```json
{
    "data": {
        "USDT": {
            "symbol": "USDT",
            "name": "Tether",
            "color": "#26a17b",
            "icon": "https://rpay.gg/assets/coins/usdt.svg",
            "status": true,
            "networks": {
                "TRC20": {
                    "id": "TRC20",
                    "network": "TRON (TRC20)",
                    "chain": "tron",
                    "contract": "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
                    "decimals": 6,
                    "confirmations": 20,
                    "min_deposit": "1",
                    "min_withdrawal": "10",
                    "withdrawal_fee": "1",
                    "needs_memo": false,
                    "status": "active"
                }
            }
        }
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

#### Response fields

| Field | Type | Description |
|---|---|---|
| `id` | string | Network identifier. This is the value you pass as `network` elsewhere. |
| `contract` | string|null | Token contract address. `null` for native coins. |
| `decimals` | integer | On-chain precision for this asset. |
| `confirmations` | integer | Blocks required before a payment is treated as final. |
| `min_deposit` | string | Below this, a payment cannot cover its own sweep cost and will not be credited. |
| `withdrawal_fee` | string | Flat fee deducted from a payout on this network. |
| `needs_memo` | boolean | Whether the chain requires a destination tag or memo. |
| `status` | string | `active` or `unavailable`. Only offer `active` networks. |

### List fiat currencies

```http
GET /common/fiat-currencies
```

**Authentication:** None — public endpoint

You price in fiat and the customer pays in crypto; this is the list of fiat currencies you may price in. Sending an unlisted currency is rejected at creation.

#### Example response

```json
{
    "data": {
        "USD": {
            "symbol": "USD",
            "name": "US Dollar",
            "sign": "$"
        },
        "EUR": {
            "symbol": "EUR",
            "name": "Euro",
            "sign": "€"
        }
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

### Current exchange rates

```http
GET /common/prices
```

**Authentication:** None — public endpoint

Useful for showing an approximate crypto amount before the customer commits. It is **indicative only**: the binding rate is the one locked onto the payment at creation and returned as `rate`. Never compute the amount to charge from this endpoint — use `pay_amount` from the payment itself.

#### Example response

```json
{
    "data": {
        "BTC": "64210.55",
        "USDT": "1.0002",
        "ETH": "3120.40"
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

### List networks

```http
GET /common/networks
```

**Authentication:** None — public endpoint

The same information as currencies, without the grouping. Currencies nests networks under their coin, which is what you want for a checkout selector and not what you want when the question is simply "what exactly do I put in the `network` field".

Keyed by network id. Only offer the ones reporting `"status": "active"`.

#### Example response

```json
{
    "data": {
        "TRC20": {
            "id": "TRC20",
            "currency": "USDT",
            "network": "TRON (TRC20)",
            "chain": "tron",
            "contract": "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
            "decimals": 6,
            "confirmations": 20,
            "min_deposit": "1",
            "min_withdrawal": "10",
            "withdrawal_fee": "1",
            "needs_memo": false,
            "status": "active"
        }
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

#### Response fields

| Field | Type | Description |
|---|---|---|
| `id` | string | What to send as `network` when creating a payment or payout. |
| `chain` | string | The settlement layer. Assets sharing a chain share an address. |
| `confirmations` | integer | Blocks required before a payment is final. |
| `status` | string | `active` or `unavailable`. |

### System status

```http
GET /common/status
```

**Authentication:** None — public endpoint

`operational` reflects whether the blockchain provider for that network is reachable and in sync. A network can be enabled but not operational — during a provider outage, for instance. Treat a non-operational network as unavailable for checkout even if it appears in the currencies list.

#### Example response

```json
{
    "data": {
        "networks": {
            "BTC": {
                "id": "BTC",
                "currency": "BTC",
                "network": "Bitcoin",
                "provider": "esplora",
                "operational": true
            },
            "TRC20": {
                "id": "TRC20",
                "currency": "USDT",
                "network": "TRON (TRC20)",
                "provider": "trongrid",
                "operational": true
            }
        },
        "time": 1754092800
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

## Payments

Taking money in. Requires a merchant key (`rp_sec_…`).

### Create a hosted invoice

```http
POST /payment/invoice
```

**Authentication:** Merchant key (`rp_sec_…`)

The quickest way to take a payment. Rune Pay hosts the checkout page — coin selection, address, QR code, countdown, confirmation tracking — so you only handle the redirect and the callback.

Every field is optional except `amount`; anything you omit falls back to the defaults configured on the API key, so you can move settings out of your code and into the dashboard. A field sent in the request overrides the key default for that one payment.

#### Parameters

| Name | Type | In | Required | Description |
|---|---|---|---|---|
| `amount` | number | body | **yes** | Amount to charge, in `currency`. Must be greater than 0. |
| `currency` | string | body | no | Fiat currency to price in. Defaults to `USD`. |
| `pay_currency` | string | body | no | Preselect the coin the customer pays in, e.g. `USDT`. Must be accepted by the key. |
| `network` | string | body | no | Preselect the network, e.g. `TRC20`. Takes precedence over `pay_currency`. |
| `order_id` | string | body | no | Your own reference. Returned on every callback and searchable in the dashboard. Max 100 chars. |
| `description` | string | body | no | Shown to the customer on the checkout page. Max 500 chars. |
| `email` | string | body | no | Customer email. Prefills the receipt field on checkout. |
| `callback_url` | string | body | no | Where to POST status changes. Overrides the key default. Must be a public HTTPS URL. |
| `return_url` | string | body | no | Where the customer lands after paying. |
| `lifetime` | integer | body | no | Minutes before the payment expires. 15–2880 (48 h). Default 60. |
| `under_paid_coverage` | number | body | no | Percent shortfall to still accept, 0–60. `2` accepts a payment 2% short — useful when the customer's wallet deducts its own fee. |
| `fee_paid_by_payer` | boolean | body | no | When true, the processing fee is added on top of the amount so you receive the full `amount`. |
| `to_currency` | string | body | no | Accepted for OxaPay compatibility and ignored: every payment is already converted to your settlement coin and delivered to your settlement address automatically. Configure both in the dashboard under Settlement. |
| `auto_withdrawal` | boolean | body | no | Accepted for OxaPay compatibility and ignored: settlement already forwards every confirmed payment to your own wallet — there is nothing extra to switch on. |
| `mixed_payment` | boolean | body | no | Allow the invoice to be settled by several transactions instead of one. |
| `sandbox` | boolean | body | no | Simulate the payment without watching a real chain. See Testing. |

#### Example request

```bash
curl -X POST https://rpay.gg/api/v1/payment/invoice \
  -H 'merchant_api_key: rp_sec_YOUR_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"amount":25,"currency":"USD","order_id":"ORDER-1043","description":"Rune verification — 1 year","callback_url":"https://example.com/hooks/runepay","return_url":"https://example.com/thanks","lifetime":60}'
```

#### Example response

```json
{
    "data": {
        "track_id": "INV_9F2K4M1Q7X",
        "payment_url": "https://rpay.gg/checkout/INV_9F2K4M1Q7X",
        "expired_at": 1754096400,
        "date": 1754092800
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 201,
    "version": "1.0"
}
```

#### Response fields

| Field | Type | Description |
|---|---|---|
| `track_id` | string | Rune Pay's identifier for this payment. Store it — every other call and callback uses it. |
| `payment_url` | string | Redirect the customer here. |
| `expired_at` | integer | Unix seconds. After this the payment stops accepting funds. |

#### Failure modes

| Status | Meaning |
|---|---|
| `400` | The amount is below the network minimum, or no exchange rate is available for the pair. |
| `401` | Missing, malformed or revoked API key. |
| `422` | A field failed validation. `error.fields` names which. |
| `503` | No blockchain network is currently available. Retry shortly; do not treat as fatal. |

### Create a white-label payment

```http
POST /payment/white-label
```

**Authentication:** Merchant key (`rp_sec_…`)

Use this when checkout must stay inside your own interface. You get the deposit address, the exact crypto amount and a QR code URL, and you render the page.

The trade-off is that everything the hosted page does — the countdown, the "waiting for confirmations" state, partial-payment handling, expiry — becomes yours to build. `pay_currency` is required here because there is no page for the customer to choose a coin on.

The response still carries `payment_url`. You do not need it — that is the page you are replacing — but it exists for every payment, and it is the link to send somebody on their phone, or the fallback while your own page is being built.

#### Parameters

| Name | Type | In | Required | Description |
|---|---|---|---|---|
| `amount` | number | body | **yes** | Amount to charge, in `currency`. |
| `pay_currency` | string | body | **yes** | The coin the customer will pay in, e.g. `USDT`. |
| `network` | string | body | no | Which network, when the coin exists on several. Without it, the first accepted network for that coin is used. |
| `currency` | string | body | no | Fiat currency to price in. Defaults to `USD`. |
| `order_id` | string | body | no | Your own reference. |
| `description` | string | body | no | Stored on the payment and echoed in callbacks. |
| `email` | string | body | no | Customer email. |
| `callback_url` | string | body | no | Where to POST status changes. |
| `lifetime` | integer | body | no | Minutes before expiry. 15–2880. |
| `under_paid_coverage` | number | body | no | Percent shortfall to still accept, 0–60. |

#### Example request

```bash
curl -X POST https://rpay.gg/api/v1/payment/white-label \
  -H 'merchant_api_key: rp_sec_YOUR_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"amount":25,"currency":"USD","pay_currency":"USDT","network":"TRC20","order_id":"ORDER-1044","callback_url":"https://example.com/hooks/runepay"}'
```

#### Example response

```json
{
    "data": {
        "track_id": "INV_7C3P8L2V5N",
        "amount": "25.00",
        "currency": "USD",
        "pay_amount": "24.995000",
        "pay_currency": "USDT",
        "network": "TRON",
        "network_id": "TRC20",
        "address": "TSkW4NMLLp5ZLbP2NC1Fv3n1RmghJ8UtwT",
        "memo": null,
        "rate": "1.0002",
        "qr_code": "https://rpay.gg/checkout/INV_7C3P8L2V5N/qr",
        "payment_url": "https://rpay.gg/invoice/INV_9F2K4M1Q7X",
        "callback_url": "https://example.com/hooks/runepay",
        "order_id": "ORDER-1044",
        "email": null,
        "fee_paid_by_payer": 0,
        "under_paid_coverage": "0",
        "expired_at": 1754096400,
        "date": 1754092800
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 201,
    "version": "1.0"
}
```

#### Response fields

| Field | Type | Description |
|---|---|---|
| `address` | string | Where the customer sends funds. Unique to this payment. |
| `pay_amount` | string | Exactly what must arrive, at the asset's precision. Display it verbatim. |
| `memo` | string|null | Destination tag, when the chain needs one. If present it is **mandatory** — a payment without it cannot be attributed. |
| `rate` | string | The locked fiat→crypto rate used for this payment. |
| `qr_code` | string | URL of a ready-made QR image encoding address and amount. |
| `network_id` | string | The network identifier; `network` is its display name. |

#### Failure modes

| Status | Meaning |
|---|---|
| `400` | The key does not accept that coin or network. The message names which was requested. |
| `422` | A field failed validation — commonly a missing `pay_currency`. |

### Retrieve a payment

```http
GET /payment/{track_id}
```

**Authentication:** Merchant key (`rp_sec_…`)

Returns the same object your callback receives, so you can write one handler for both. Use it to reconcile — after a missed callback, or when a customer asks where their payment is — rather than as a polling loop.

A payment belonging to another merchant returns `404`, not `403`: the API does not reveal that an identifier exists.

#### Parameters

| Name | Type | In | Required | Description |
|---|---|---|---|---|
| `track_id` | string | path | **yes** | The identifier returned at creation. |

#### Example response

```json
{
    "data": {
        "type": "invoice",
        "track_id": "INV_9F2K4M1Q7X",
        "status": "Paid",
        "amount": "25.00",
        "currency": "USD",
        "pay_amount": "24.995000",
        "pay_currency": "USDT",
        "network": "TRC20",
        "address": "TSkW4NMLLp5ZLbP2NC1Fv3n1RmghJ8UtwT",
        "received_amount": "24.995000",
        "rate": "1.0002",
        "order_id": "ORDER-1043",
        "email": "buyer@example.com",
        "description": "Rune verification — 1 year",
        "fee_paid_by_payer": 0,
        "under_paid_coverage": "0",
        "txs": [
            {
                "tx_hash": "9f2c…a41b",
                "amount": "24.995000",
                "currency": "USDT",
                "network": "TRC20",
                "confirmations": 20,
                "required_confirmations": 20,
                "status": "confirmed",
                "received_at": 1754093100
            }
        ],
        "date": 1754092800,
        "paid_at": 1754093100
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

#### Response fields

| Field | Type | Description |
|---|---|---|
| `status` | string | See Payment statuses. Release goods on `Paid`. |
| `received_amount` | string | Total actually received across all transactions. |
| `txs` | array | Every transaction seen for this payment, oldest first. Empty until one arrives. |
| `txs[].confirmations` | integer | Confirmations so far, against `required_confirmations`. |
| `paid_at` | integer|null | When the payment became fully paid. `null` until then. |

#### Failure modes

| Status | Meaning |
|---|---|
| `404` | No such payment on this account. |

### List payments

```http
GET /payment
```

**Authentication:** Merchant key (`rp_sec_…`)

Newest first. Combine filters freely — they AND together. Intended for reconciliation and reporting; for live status use callbacks.

#### Parameters

| Name | Type | In | Required | Description |
|---|---|---|---|---|
| `size` | integer | query | no | Results per page, 1–200. Default 25. Values outside the range are clamped, not rejected. |
| `page` | integer | query | no | Page number, starting at 1. |
| `order_id` | string | query | no | Exact match on your reference. |
| `type` | string | query | no | Filter by kind: `invoice`, `white_label` or `static_address`. |
| `currency` | string | query | no | Filter by the crypto paid in, e.g. `USDT`. |
| `from_date` | integer | query | no | Unix seconds. Only payments created at or after this. |
| `to_date` | integer | query | no | Unix seconds. Only payments created at or before this. |

#### Example response

```json
{
    "data": {
        "list": [
            "…payment objects, as returned by Retrieve a payment…"
        ],
        "meta": {
            "page": 1,
            "size": 25,
            "total": 143,
            "pages": 6
        }
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

#### Response fields

| Field | Type | Description |
|---|---|---|
| `meta.total` | integer | Total matching payments across all pages. |
| `meta.pages` | integer | Last page number. Stop when `page` reaches it. |

### Payment statistics

```http
GET /payment/statistics
```

**Authentication:** Merchant key (`rp_sec_…`)

Aggregates your payments so a dashboard does not have to page the whole history and add it up itself. Defaults to the last thirty days.

**Volume counts confirmed payments only.** Including money that has been promised but not confirmed is how a dashboard ends up flattering the merchant, and the figure would move backwards whenever something expired.

#### Parameters

| Name | Type | In | Required | Description |
|---|---|---|---|---|
| `from_date` | integer | query | no | Unix seconds. Defaults to thirty days ago. |
| `to_date` | integer | query | no | Unix seconds. Defaults to now. |

#### Example response

```json
{
    "data": {
        "from_date": 1751500800,
        "to_date": 1754092800,
        "total": 143,
        "counts": {
            "paid": 118,
            "waiting": 4,
            "confirming": 2,
            "underpaid": 1,
            "expired": 16,
            "cancelled": 2,
            "failed": 0
        },
        "volume": "38207.85",
        "conversion_rate": 86.76,
        "by_currency": {
            "USDT": {
                "count": 96,
                "volume": "29180.40"
            },
            "BTC": {
                "count": 22,
                "volume": "9027.45"
            }
        }
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

#### Response fields

| Field | Type | Description |
|---|---|---|
| `total` | integer | Payments created in the window, whatever their outcome. |
| `counts` | object | Payments by outcome. `confirming` covers both the paid and confirming states. |
| `volume` | string | Confirmed volume, in each payment's own fiat currency. Decimal string. |
| `conversion_rate` | number|null | Paid as a percentage of payments that REACHED a final state — invoices still open are excluded, or an account with customers mid-checkout would look broken. `null` when nothing finished. |
| `by_currency` | object | Confirmed count and volume per coin, keyed by symbol. |

### Cancel a payment

```http
POST /payment/{track_id}/cancel
```

**Authentication:** Merchant key (`rp_sec_…`)

Only a payment that has not yet received money can be cancelled. Once funds are on the way — even unconfirmed — the payment is in a final state and this returns `409`, because the coins are real and cannot be un-sent.

Cancelling is optional: a payment expires on its own at `expired_at`. Cancel explicitly when the customer abandons checkout, so your dashboard stays clean.

#### Parameters

| Name | Type | In | Required | Description |
|---|---|---|---|---|
| `track_id` | string | path | **yes** | The payment to cancel. |

#### Example response

```json
{
    "data": [
        "…the updated payment object, with status \"Cancelled\"…"
    ],
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

#### Failure modes

| Status | Meaning |
|---|---|
| `404` | No such payment on this account. |
| `409` | The payment is paid, expired or already cancelled. |

### Get balances

```http
GET /balance
```

**Authentication:** Merchant key (`rp_sec_…`)

The same figures as the payout balance, but reachable with a MERCHANT key.

That distinction is the point: a merchant who only takes payments can hold no payout key at all — the credential that could move money out — and still see what they have. Reading a balance is not spending it.

#### Example response

```json
{
    "data": {
        "USDT": {
            "available": "4210.55000000",
            "locked": "100.00000000"
        },
        "BTC": {
            "available": "0.04120000",
            "locked": "0.00000000"
        }
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

#### Response fields

| Field | Type | Description |
|---|---|---|
| `available` | string | Free to withdraw or spend. |
| `locked` | string | Reserved by a payout already queued. Still yours, already committed. |

#### Failure modes

| Status | Meaning |
|---|---|
| `409` | The custodial wallet is disabled, so Rune Pay holds nothing to report. |

### Create a static address

```http
POST /payment/static-address
```

**Authentication:** Merchant key (`rp_sec_…`)

Unlike an invoice, a static address has no amount and no expiry. Anything sent to it is credited (minus your key's payment fee) and reported by callback. This is how you build user-balance top-ups: mint one address per user, store it, and let them fund it repeatedly.

**The `order_id` is the identity.** Calling again with the same `order_id` and network returns the **same** address with a `200` — retries are free and safe. A different `order_id` mints a **new** address with a `201`. Omitting it entirely gives you one standing address per network. So for a platform with many users, pass each user's ID as `order_id` and every user gets an address of their own.

#### Parameters

| Name | Type | In | Required | Description |
|---|---|---|---|---|
| `network` | string | body | **yes** | Which network to derive on, e.g. `TRC20`. Must be enabled and accepted by the key. |
| `callback_url` | string | body | no | Where to POST each incoming payment. |
| `order_id` | string | body | no | Your reference, and the reuse key — typically your user's ID. Same reference, same address; new reference, new address. Omitted means one shared standing address per network. |
| `email` | string | body | no | Associated email. |
| `description` | string | body | no | Free-text label. |
| `to_currency` | string | body | no | Auto-convert arrivals to this currency, priced at NEAR Intents rather than a market feed. |

#### Example request

```bash
curl -X POST https://rpay.gg/api/v1/payment/static-address \
  -H 'merchant_api_key: rp_sec_YOUR_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"network":"TRC20","order_id":"user-8842","callback_url":"https://example.com/hooks/topup","description":"Balance top-up"}'
```

#### Example response

```json
{
    "data": {
        "track_id": "SA_K3M9P2X7Q4L8VZ",
        "network": "TRON",
        "network_id": "TRC20",
        "currency": "USDT",
        "address": "TQ5nT8vRvZ2xKpL9mWc4bHfJ7dYaE1sGu3",
        "memo": null,
        "callback_url": "https://example.com/hooks/topup",
        "order_id": "user-8842",
        "email": null,
        "description": "Balance top-up",
        "status": "active",
        "date": 1754092800
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 201,
    "version": "1.0"
}
```

#### Failure modes

| Status | Meaning |
|---|---|
| `400` | The network is not available on this API key. |
| `409` | The custodial wallet is disabled. Static addresses require Rune Pay to derive and watch the address itself. |
| `422` | The network is not in the enabled catalogue. |
| `429` | The account is at its static-address cap (10,000 by default). Revoke unused addresses or contact support to raise it. |
| `500` | Address derivation failed. The message carries the reason; nothing is stored. |

### List static addresses

```http
GET /payment/static-address
```

**Authentication:** Merchant key (`rp_sec_…`)

Includes revoked ones, so check `status`. There is no pagination here — the result is capped at 200; keep your own mapping of user to address rather than searching this list at runtime.

#### Example response

```json
{
    "data": {
        "list": [
            "…static address objects…"
        ]
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

### Revoke a static address

```http
POST /payment/static-address/{track_id}/revoke
```

**Authentication:** Merchant key (`rp_sec_…`)

Marks it `revoked` and stops watching it.

The address still exists on the blockchain and anyone who kept it can still send to it. Those funds will **not** be credited or reported. Stop showing a revoked address to customers before you revoke it, not after.

#### Parameters

| Name | Type | In | Required | Description |
|---|---|---|---|---|
| `track_id` | string | path | **yes** | The static address identifier. |

#### Example response

```json
{
    "data": {
        "track_id": "SA_K3M9P2X7Q4L8VZ",
        "status": "revoked"
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

#### Failure modes

| Status | Meaning |
|---|---|
| `404` | No such static address on this account. |

## Payouts

Sending money out. Requires a payout key (`rp_out_…`) and the custodial wallet.

### Get balances

```http
GET /payout/balance
```

**Authentication:** Payout key (`rp_out_…`)

`available` is what you can pay out right now. `locked` is reserved by payouts already queued or awaiting approval — it is still yours, but already committed. Check `available` before queueing a payout, not the sum.

#### Example response

```json
{
    "data": {
        "USDT": {
            "available": "4210.55000000",
            "locked": "100.00000000"
        },
        "BTC": {
            "available": "0.04120000",
            "locked": "0.00000000"
        }
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

### Create a payout

```http
POST /payout
```

**Authentication:** Payout key (`rp_out_…`)

The funds are locked immediately and the payout enters the same pipeline as a dashboard withdrawal — including approval, if your account requires it. This queues a payout; it does not bypass any control.

**The destination address is not recoverable if wrong.** Rune Pay validates the format for the network, but cannot know whether the address is the one you meant. Validate against your own records before calling.

#### Parameters

| Name | Type | In | Required | Description |
|---|---|---|---|---|
| `address` | string | body | **yes** | Destination address. 20–120 characters, validated for the network. |
| `currency` | string | body | **yes** | Currency to send, e.g. `USDT`. |
| `amount` | number | body | **yes** | Amount to send, before fees. Must exceed the network minimum. |
| `network` | string | body | no | Which network, when the coin exists on several. Strongly recommended — sending USDT to a TRON address over ERC20 loses the funds. |
| `order_id` | string | body | no | Idempotency key. Repeating a request with the same value returns the original payout instead of sending twice. |
| `callback_url` | string | body | no | Where to POST payout status changes. |
| `description` | string | body | no | Internal note, echoed in callbacks. |

#### Example request

```bash
curl -X POST https://rpay.gg/api/v1/payout \
  -H 'payout_api_key: rp_out_YOUR_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"address":"TSkW4NMLLp5ZLbP2NC1Fv3n1RmghJ8UtwT","currency":"USDT","network":"TRC20","amount":100,"order_id":"PAYOUT-556","callback_url":"https://example.com/hooks/payout"}'
```

#### Example response

```json
{
    "data": {
        "track_id": "WD_4X8N2K9P5M",
        "status": "Processing",
        "internal_status": "awaiting_approval",
        "amount": "100.00000000",
        "currency": "USDT",
        "network": "TRON",
        "address": "TSkW4NMLLp5ZLbP2NC1Fv3n1RmghJ8UtwT",
        "tx_hash": null,
        "fee": "1.00000000",
        "net_amount": "99.00000000",
        "error": null,
        "date": 1754092800
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 201,
    "version": "1.0"
}
```

#### Response fields

| Field | Type | Description |
|---|---|---|
| `status` | string | Coarse public status. See Payout statuses. |
| `internal_status` | string | Finer-grained stage, e.g. `awaiting_approval`, `approved`, `sent`. Useful for support; do not build logic on it. |
| `fee` | string | Network fee deducted. |
| `net_amount` | string | What actually arrives at the destination: `amount` minus `fee`. |
| `tx_hash` | string|null | On-chain hash. `null` until broadcast. |

#### Failure modes

| Status | Meaning |
|---|---|
| `400` | Insufficient available balance, amount below the minimum, invalid address for the network, or no available network for that currency. |
| `409` | The custodial wallet is disabled. In gateway mode funds settle straight to your own wallet, so there is no balance to pay out from. |
| `422` | A field failed validation. |

### Retrieve a payout

```http
GET /payout/{track_id}
```

**Authentication:** Payout key (`rp_out_…`)

Watch `tx_hash` to appear once broadcast, and `status` to reach `Confirmed`. On failure, `error` carries the reason — a rejection note from an approver, or the broadcast error.

#### Parameters

| Name | Type | In | Required | Description |
|---|---|---|---|---|
| `track_id` | string | path | **yes** | The payout identifier. |

#### Example response

```json
{
    "data": [
        "…the payout object, as returned at creation…"
    ],
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

#### Failure modes

| Status | Meaning |
|---|---|
| `404` | No such payout on this account. |

### List payouts

```http
GET /payout
```

**Authentication:** Payout key (`rp_out_…`)

Newest first. Same pagination shape as the payment list.

#### Parameters

| Name | Type | In | Required | Description |
|---|---|---|---|---|
| `size` | integer | query | no | Results per page, 1–200. Default 25. |
| `page` | integer | query | no | Page number, starting at 1. |
| `currency` | string | query | no | Filter by currency. |
| `status` | string | query | no | Filter by internal status, e.g. `sent`, `confirmed`, `rejected`. |

#### Example response

```json
{
    "data": {
        "list": [
            "…payout objects…"
        ],
        "meta": {
            "page": 1,
            "size": 25,
            "total": 38,
            "pages": 2
        }
    },
    "message": "Operation completed successfully",
    "error": null,
    "status": 200,
    "version": "1.0"
}
```

---

# Callbacks

When a payment or payout changes state, Rune Pay POSTs the full object to your `callback_url`. This is the intended way to learn about payments — it is immediate, and it costs you no rate limit.

| | |
|---|---|
| Method | `POST` |
| Content-Type | `application/json` |
| User-Agent | `RunePay-Callback/1.0` |
| `HMAC` header | Hex `HMAC-SHA512` of the raw request body. |
| Body | The same object `GET /payment/{track_id}` returns, plus `type`. |
| Expected reply | Any `2xx`. Anything else is a failure and will be retried. |
| Redirects | Not followed. Point `callback_url` at the final URL. |
| Timeout | 15 seconds. |

## The signing secret

The signing secret is the **SHA-256 hex digest of your API key** — not the key itself. Rune Pay stores only that digest, so it can sign with a value it holds while the raw key stays exclusively yours. Compute it once and store it in your environment: `echo -n "rp_sec_YOUR_KEY" | sha256sum`.

## Verifying correctly

Verify against the **raw request body**, before any JSON parsing. Re-encoding the parsed object produces different bytes — different key order, different spacing — and the signature will never match. Compare with a constant-time function: `==` on strings leaks timing information that can be used to forge a signature byte by byte.

## Retries

A failed delivery is retried five times with growing delays: **1 minute, 5 minutes, 15 minutes, 1 hour, 6 hours**. After the sixth total attempt the callback is marked exhausted and no further attempt is made — reconcile with `GET /payment` if you suspect you missed one.

## Handle duplicates

Callbacks may arrive more than once for the same state — a retry after your server accepted but timed out, for example. Make your handler idempotent: key on `track_id` and ignore a status you have already processed. Delivering an order twice is worse than delivering it late.

## URL restrictions

Callback URLs must be public. Requests to `localhost`, loopback and private ranges (`10.x`, `172.16–31.x`, `192.168.x`, `169.254.x`) are refused outright, so an attacker who sets a callback URL cannot make our servers probe an internal network.

## Verification examples

### PHP

```php
<?php
// The secret is the SHA-256 of your API key, not the key itself.
$secret = hash('sha256', getenv('RUNEPAY_API_KEY'));

$raw       = file_get_contents('php://input');   // raw bytes, never $_POST
$signature = $_SERVER['HTTP_HMAC'] ?? '';

if (! hash_equals(hash_hmac('sha512', $raw, $secret), $signature)) {
    http_response_code(401);
    exit;
}

$event = json_decode($raw, true);

// Only 'Paid' means the money is final and confirmed.
if ($event['status'] === 'Paid') {
    fulfilOrder($event['order_id'], $event['track_id']);
}

http_response_code(200);   // any 2xx stops the retries
```

### Node.js

```javascript
import crypto from 'node:crypto';
import express from 'express';

const app = express();
const secret = crypto.createHash('sha256')
  .update(process.env.RUNEPAY_API_KEY)
  .digest('hex');

// express.raw, not express.json: the signature covers the exact bytes.
app.post('/hooks/runepay', express.raw({ type: 'application/json' }), (req, res) => {
  const expected = crypto.createHmac('sha512', secret).update(req.body).digest('hex');
  const received = req.get('HMAC') ?? '';

  // timingSafeEqual throws on a length mismatch, so check that first.
  const ok = expected.length === received.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received));

  if (!ok) return res.sendStatus(401);

  const event = JSON.parse(req.body);
  if (event.status === 'Paid') fulfilOrder(event.order_id, event.track_id);

  res.sendStatus(200);
});
```

### Python

```python
import hashlib, hmac, os
from flask import Flask, request, abort

app = Flask(__name__)
SECRET = hashlib.sha256(os.environ["RUNEPAY_API_KEY"].encode()).hexdigest()

@app.post("/hooks/runepay")
def runepay():
    raw = request.get_data()                      # bytes, not request.json
    expected = hmac.new(SECRET.encode(), raw, hashlib.sha512).hexdigest()

    if not hmac.compare_digest(expected, request.headers.get("HMAC", "")):
        abort(401)

    event = request.get_json()
    if event["status"] == "Paid":
        fulfil_order(event["order_id"], event["track_id"])

    return "", 200
```

---

# Statuses

## Payment statuses

| Status | Meaning |
|---|---|
| `Waiting` | Created, nothing received yet. The customer has until `expired_at`. |
| `Underpaid` | Funds arrived but less than `pay_amount`, beyond what `under_paid_coverage` forgives. Do not release goods; refund or ask for the difference. |
| `Confirming` | The full amount arrived and is waiting for confirmations. **Not yet final** — a chain reorganisation can still reverse it. |
| `Paid` | Confirmed and final. **This is the only status on which to release goods.** |
| `Expired` | The window closed with no payment. Anything arriving now is late and will not be credited automatically. |
| `Cancelled` | Cancelled before any funds arrived. |
| `Failed` | Something went wrong. Check the dashboard or contact support. |

## Payout statuses

| Status | Meaning |
|---|---|
| `Processing` | Queued, funds locked. May be awaiting approval. |
| `Confirming` | Broadcast to the network. `tx_hash` is now populated. |
| `Confirmed` | Confirmed on-chain and final. |
| `Failed` | Rejected by an approver or failed to broadcast. `error` says why; the locked funds are released. |

---

# Errors

Errors use standard HTTP status codes. `error.type` is `auth` for credential and rate-limit problems, `request` for anything else under 500, and `server` at 500 and above.

| Code | Name | Meaning |
|---|---|---|
| `200` | OK | The request succeeded. |
| `201` | Created | A payment, static address or payout was created. |
| `400` | Bad Request | The request was understood but cannot be fulfilled — amount below the minimum, unsupported network for this key, insufficient balance. The message says which. Retrying unchanged will not help. |
| `401` | Unauthorized | Missing, malformed, revoked or unknown API key. Check the prefix matches the endpoint family. |
| `403` | Forbidden | The key is valid but the project or merchant account is inactive. |
| `404` | Not Found | No such resource *on this account*. Also returned for resources belonging to another merchant, deliberately. |
| `409` | Conflict | The resource is in a state that forbids the action — cancelling a paid payment, or using a payout endpoint in gateway mode. |
| `422` | Unprocessable Entity | Validation failed. `error.fields` maps each field to its problems. |
| `429` | Too Many Requests | Rate limit exceeded. Wait `error.retry_after` seconds. |
| `500` | Server Error | Something failed on our side. Safe to retry with backoff; nothing was created. |
| `503` | Service Unavailable | No blockchain network is currently available. Transient — retry shortly. |

**Validation errors (422)** name the offending fields:

```json
{
    "data": null,
    "message": "The amount field is required.",
    "error": {
        "type": "request",
        "message": "The amount field is required.",
        "fields": {
            "amount": [
                "The amount field is required."
            ]
        }
    },
    "status": 422,
    "version": "1.0"
}
```
