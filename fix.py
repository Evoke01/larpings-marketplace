import sys

def fix_messages():
    with open('src/pages/MessagesPage.tsx', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    start_idx = 721 # 0-indexed (line 722)
    
    # find where the header div closes and the chat area starts
    end_idx = start_idx
    while end_idx < len(lines):
        if 'className="min-h-0 flex-1 overflow-y-auto py-4 px-4"' in lines[end_idx]:
            break
        end_idx += 1
        
    # replacement for the buttons in the header
    header_buttons = '''                {selected.isDeal && selected.orderStatus !== 'closed' && (
                  <div className="flex items-center gap-2">
                    {selected.orderStatus === 'disputed' && (
                      <div className="text-xs text-red-500 font-medium px-3 py-1.5 rounded bg-red-500/10 border border-red-500/30">Disputed</div>
                    )}
                    
                    {(selected.isMm || (!selected.mmId && isAdmin)) ? (
                      <>
                        <button
                          onClick={async () => {
                            if (isClosing) return;
                            setIsClosing(true);
                            try {
                              const { error } = await supabase.rpc('resolve_p2p_dispute', { p_order_id: selected.orderId, p_resolution: 'refund_buyer' });
                              if (!error) setSelected(prev => prev ? ({ ...prev, orderStatus: 'cancelled' }) : prev);
                            } finally { setIsClosing(false); }
                          }}
                          disabled={isClosing}
                          className="btn-outline-dim !px-3 !py-2 !text-xs !bg-red-500/10 !text-red-400 !border-red-500/30 hover:!bg-red-500/20 disabled:!opacity-50"
                        >
                          Refund Buyer
                        </button>
                        <button
                          onClick={async () => {
                            if (isClosing) return;
                            setIsClosing(true);
                            try {
                              const { error } = await supabase.rpc('resolve_p2p_dispute', { p_order_id: selected.orderId, p_resolution: 'release_to_seller' });
                              if (!error) setSelected(prev => prev ? ({ ...prev, orderStatus: 'closed', buyerClosed: true, sellerClosed: true }) : prev);
                            } finally { setIsClosing(false); }
                          }}
                          disabled={isClosing}
                          className="btn-outline-dim !px-3 !py-2 !text-xs !bg-emerald-500/10 !text-emerald-400 !border-emerald-500/30 hover:!bg-emerald-500/20 disabled:!opacity-50"
                        >
                          Release to Seller
                        </button>
                      </>
                    ) : (
                      <>
                        {selected.orderStatus !== 'disputed' && (
                          <button
                            onClick={() => {
                              setConfirmModal({
                                isOpen: true,
                                title: "Open Dispute",
                                description: "Are you sure? This will lock the deal and call an admin to review the chat logs.",
                                onConfirm: async () => {
                                  await supabase.from('orders').update({ status: 'disputed' }).eq('id', selected.orderId);
                                  await supabase.from('order_messages').insert({ order_id: selected.orderId, sender_id: session.user.id, content: "🚨 A dispute has been opened. An admin will review this chat shortly." });
                                  setSelected(prev => prev ? ({ ...prev, orderStatus: 'disputed' }) : prev);
                                  setConfirmModal(null);
                                }
                              });
                            }}
                            className="btn-outline-dim !px-3 !py-2 !text-xs !bg-red-500/10 !text-red-400 !border-red-500/30 hover:!bg-red-500/20"
                          >
                            Dispute
                          </button>
                        )}
                        <button 
                          onClick={async () => {
                            if (isClosing) return;
                            setIsClosing(true);
                            try {
                              const { data, error } = await supabase.rpc('confirm_p2p_deal', { p_order_id: selected.orderId, p_is_buyer: selected.isBuyer });
                              if (error) {
                                console.error(error);
                                return;
                              }
                              if (data?.status === 'closed') {
                                setSelected(prev => prev ? ({ ...prev, orderStatus: 'closed', buyerClosed: true, sellerClosed: true }) : prev);
                              } else {
                                setSelected(prev => prev ? ({ ...prev, buyerClosed: data.buyer_closed, sellerClosed: data.seller_closed }) : prev);
                              }
                            } finally {
                              setIsClosing(false);
                            }
                          }}
                          disabled={isClosing || (selected.isBuyer ? selected.buyerClosed : selected.sellerClosed) || selected.orderStatus === 'disputed'}
                          className="btn-outline-dim !px-3 !py-2 !text-xs !bg-emerald-500/10 !text-emerald-400 !border-emerald-500/30 hover:!bg-emerald-500/20 disabled:!opacity-50"
                        >
                          {(selected.isBuyer ? selected.buyerClosed : selected.sellerClosed) ? '✓ Confirmed' : (isClosing ? 'Confirming...' : 'Close Deal')}
                        </button>
                        
                        {selected.isBuyer && !['closed', 'confirmed', 'cancelled', 'disputed'].includes(selected.orderStatus || '') && (
                          <button
                            onClick={() => {
                              setConfirmModal({
                                isOpen: true,
                                title: "Cancel Deal",
                                description: "Are you sure you want to cancel this deal?",
                                onConfirm: async () => {
                                  const { error } = await supabase.rpc('cancel_p2p_deal', { p_order_id: selected.orderId });
                                  if (error) {
                                    console.error(error);
                                    return;
                                  }
                                  setSelected(prev => prev ? ({ ...prev, orderStatus: 'cancelled' }) : prev);
                                  setConfirmModal(null);
                                }
                              });
                            }}
                            className="btn-outline-dim !px-3 !py-2 !text-xs hover:!bg-white/[0.08]"
                          >
                            Cancel Deal
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
                
                {!selected.isDeal && !selected.isLounge && (
                   <Link className="btn-outline-dim !px-3 !py-2 !text-xs hidden sm:inline-flex" to={/profile/}>View profile</Link>
                )}
              </div>
              
              <div className="min-h-0 flex-1 overflow-y-auto py-4 px-4">
                {selected.isDeal && !selected.mmId && selected.isBuyer && (
                  <div className="mb-4 bg-[#cc00ff]/10 border border-[#cc00ff]/30 p-4 rounded-xl">
                    <h3 className="text-sm font-semibold text-[#e57dff] mb-2 flex items-center gap-2">
                      <ShieldIcon className="w-4 h-4" /> Choose an Escrow Middleman
                    </h3>
                    <p className="text-xs text-[#93939f] mb-4">Select a trusted third-party to mediate this deal. They will verify delivery and release funds.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mms.map(mm => {
                        const isOnline = mm.mm_is_online;
                        return (
                          <button
                            key={mm.id}
                            disabled={!isOnline}
                            onClick={() => {
                              setConfirmModal({
                                isOpen: true,
                                title: "Assign Middleman",
                                description: Are you sure you want to assign  as Middleman for this deal?,
                                onConfirm: async () => {
                                  const { error } = await supabase.from('orders').update({ mm_id: mm.id, mm_fee: mm.mm_fee_flat }).eq('id', selected.orderId);
                                  if (error) return console.error(error);
                                  
                                  await supabase.from('order_messages').insert({
                                    order_id: selected.orderId, sender_id: session.user.id,
                                    content: ✅ Escrow Middleman @ has been assigned to mediate this deal.
                                  });
                                  setSelected({ ...selected, mmId: mm.id });
                                  setConfirmModal(null);
                                }
                              });
                            }}
                            className={lex flex-col items-start gap-1 p-3 rounded-lg border text-left transition-colors relative }
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-semibold text-[#f9f9fb]">@{mm.username || mm.display_name}</span>
                              <div className="flex items-center gap-1.5">
                                <span className={w-1.5 h-1.5 rounded-full }></span>
                                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">{isOnline ? 'Online' : 'Offline'}</span>
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">Fee: {mm.mm_fee_percent}% + </span>
                          </button>
                        );
                      })}
                      {mms.length === 0 && <span className="text-xs text-muted-foreground">No middlemen available.</span>}
                    </div>
                  </div>
                )}
                
                {selected.isDeal && selected.mmId && (
                   <div className="mb-4 flex items-center gap-2 bg-[#111113] px-3 py-2 border border-[#222226] rounded-lg">
                      <ShieldIcon className="w-4 h-4 text-[#e57dff]" />
                      <span className="text-xs text-[#93939f]">Mediated by MM</span>
                   </div>
                )}
'''
    
    new_lines = lines[:start_idx] + [header_buttons + '\n'] + lines[end_idx+1:]
    
    with open('src/pages/MessagesPage.tsx', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
        
    print("Done")

fix_messages()
