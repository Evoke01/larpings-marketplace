import React, { useState } from "react";
import { Link } from "react-router-dom";

// Icons
const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);
const Volume2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
);
const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
);
const EarthIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21.54 15H17a2 2 0 0 0-2 2v4.54"/><path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17"/><path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05"/><circle cx="12" cy="12" r="10"/></svg>
);
const MessageCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
);
const ArrowUpRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
);
const BadgeCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
);
const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
);
const ReplyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
);
const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);
const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);

const MOCK_MESSAGES = [
  { id: 1, user: 'Guardian', avatar: 'https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/clone-assets/2edee2079e597b9db6bdf9fd13951bb4fa82f022a78169ab80711aab031edb96.jpg', verified: true, isAdmin: true, text: 'Hi!', time: '18:11', dateSeparator: 'Yesterday' },
  { id: 2, user: 'weak', avatar: 'https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/clone-assets/33b9cf7a9253b0894aeb3681058626b1155c9643fdb2d6188bda5a4d9e0b94ba.jpg', verified: true, isAdmin: false, text: 'sup yall', time: '18:11' },
  { id: 3, user: 'Guardian', avatar: 'https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/clone-assets/2edee2079e597b9db6bdf9fd13951bb4fa82f022a78169ab80711aab031edb96.jpg', verified: true, isAdmin: true, text: 'yo weak!\nhow u doing man', time: '18:12' },
  { id: 4, user: 'weak', avatar: 'https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/clone-assets/33b9cf7a9253b0894aeb3681058626b1155c9643fdb2d6188bda5a4d9e0b94ba.jpg', verified: true, isAdmin: false, text: 'all good man\nwbu?', time: '18:12' },
  { id: 5, user: 'molai', text: 'hi everyone\nhow\'s it going?', time: '01:28', dateSeparator: 'Today' },
  { id: 6, user: 'Guardian', avatar: 'https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/clone-assets/2edee2079e597b9db6bdf9fd13951bb4fa82f022a78169ab80711aab031edb96.jpg', verified: true, isAdmin: true, text: 'Hello!', time: '01:29' },
  { id: 7, user: 'sspce', avatar: 'https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/clone-assets/6fe862d91810888277d5e34fb7d49ca98380b42549cef3e15aee97811e80161d.jpg', verified: true, isAdmin: false, text: 'question, can I still use my @wallet for this??', time: '01:35' },
  { id: 8, user: 'Guardian', avatar: 'https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/clone-assets/2edee2079e597b9db6bdf9fd13951bb4fa82f022a78169ab80711aab031edb96.jpg', verified: true, isAdmin: true, text: 'Payouts are only available through the Solana network.', time: '01:38', replyTo: { user: 'sspce', text: 'question, can I still use my @wallet for this??' } },
  { id: 9, user: 'nbx', avatar: 'https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/clone-assets/71da32383dda42a657a88804344191c4aa5def8d3eff2dc586fde6229984085a.jpg', verified: true, isAdmin: false, text: 'I won\'t lie, I loved the new design.', time: '01:57' },
  { id: 10, user: 'User', text: 'Hi\nI need to sell my user (1.9qm) But I don\'t have experience', time: '02:06' },
  { id: 11, user: 'sspce', avatar: 'https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/clone-assets/6fe862d91810888277d5e34fb7d49ca98380b42549cef3e15aee97811e80161d.jpg', verified: true, isAdmin: false, text: 'for someone who is new to everything they will help assist so don\'t be to scared because the team is always willing to help and assist', time: '02:07' },
  { id: 12, user: 'User', text: 'Thank you very much', time: '02:08' },
];

export default function MessagesPage() {
  const [mobileChatOpen, setMobileChatOpen] = useState(true);

  return (
    <div className="mx-auto flex h-[calc(100vh-84px)] max-w-6xl flex-col px-3 pb-3 sm:px-4 pt-24 font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      <div className="grid h-full min-h-0 grid-cols-1 overflow-hidden rounded-[14px] border border-[#222226] bg-[#09090b]/40 lg:grid-cols-[340px_1fr]">
        
        {/* Sidebar (Conversations List) */}
        <div className={`min-h-0 border-r border-[#222226] ${mobileChatOpen ? 'hidden lg:block' : 'block'}`}>
          <div className="flex h-full min-h-0 flex-col">
            <div className="border-b border-[#222226] px-4 py-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <button aria-label="Back" className="mt-1 flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#222226] text-[#93939f] transition-colors hover:border-[#ff0000]/50 hover:text-white">
                    <ArrowLeftIcon className="h-4 w-4" />
                  </button>
                  <div>
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#93939f]">Inbox</span>
                    <h1 className="mt-1 text-xl font-medium text-white">Messages</h1>
                  </div>
                </div>
                <button className="mt-1 rounded-[8px] p-1.5 text-[#93939f] transition-colors hover:bg-[#1d1d20] hover:text-white" title="Mute chat sounds">
                  <Volume2Icon className="h-4 w-4" />
                </button>
              </div>
              <button className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-[10px] border border-[#ff0000]/40 bg-[#ff0000]/10 px-3 py-1.5 text-xs font-medium text-[#ff0000] transition-colors hover:bg-[#ff0000]/15">
                <BellIcon className="h-3.5 w-3.5" /> Enable browser notifications
              </button>
            </div>
            
            <div className="min-h-0 flex-1 overflow-y-auto">
              <ul>
                <li className="relative group/row">
                  <button className="flex w-full items-center gap-3 border-b border-[#222226]/50 bg-[#1d1d20]/70 px-4 py-3.5 text-left transition-colors hover:bg-[#1d1d20]" onClick={() => setMobileChatOpen(true)}>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff0000]/15 text-[#ff0000]">
                      <EarthIcon className="h-[45%] w-[45%]" />
                    </div>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="truncate text-sm font-medium text-white">larpings.com lounge</span>
                        <span className="shrink-0 rounded-[6px] bg-[#ff0000]/10 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#ff0000]">Public</span>
                        <span className="ml-auto shrink-0 text-[11px] text-[#93939f]">20:05</span>
                      </span>
                      <span className="mt-0.5 flex items-center gap-2">
                        <span className="truncate text-xs font-medium text-[#b7b7c2]">This is great</span>
                        <span className="ml-auto h-2 w-2 shrink-0 rounded-full bg-[#ff0000]"></span>
                      </span>
                    </span>
                  </button>
                </li>
              </ul>
              <div className="px-6 py-12 text-center">
                <MessageCircleIcon className="mx-auto mb-3 h-8 w-8 text-[#93939f]/30" />
                <p className="text-sm text-[#93939f]">No private chats yet</p>
                <p className="mt-1 text-xs text-[#93939f]/60">Contact a seller from any listing and the conversation shows up here — meanwhile, the lounge is open to everyone.</p>
                <Link to="/marketplace" className="mt-5 inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#ff0000] px-4 py-2.5 text-xs font-medium text-white shadow-[0_1px_rgba(255,255,255,0.18)_inset,0_10px_30px_-12px_rgba(255,0,0,0.55)] transition-all hover:-translate-y-px hover:bg-[#cc0000]">
                  Browse the marketplace <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className={`min-h-0 ${!mobileChatOpen ? 'hidden lg:block' : 'block'}`}>
          <div className="flex h-full min-h-0 flex-col">
            
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b border-[#222226] px-4 py-3 bg-[#09090b]/80 backdrop-blur-md">
              <button 
                className="rounded-[8px] p-1.5 text-[#93939f] transition-colors hover:bg-[#1d1d20] hover:text-white lg:hidden"
                onClick={() => setMobileChatOpen(false)}
              >
                <ArrowLeftIcon className="h-4 w-4" />
              </button>
              <div className="relative">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#ff0000]/15 text-[#ff0000]">
                  <EarthIcon className="h-[45%] w-[45%]" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 truncate text-sm font-medium text-white">larpings.com lounge</p>
                <p className="truncate text-[11px] text-[#93939f]">5 online · visible to everyone</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
              <div className="space-y-4">
                {MOCK_MESSAGES.map((msg, index) => (
                  <div key={msg.id}>
                    {msg.dateSeparator && (
                      <div className="my-6 flex items-center gap-3">
                        <span className="h-px flex-1 bg-[#222226]"></span>
                        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#93939f]">{msg.dateSeparator}</span>
                        <span className="h-px flex-1 bg-[#222226]"></span>
                      </div>
                    )}
                    
                    <div className="group relative flex items-end gap-2 justify-start mt-4">
                      {msg.avatar ? (
                        <div className="mb-0.5 h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[#222226]">
                          <img src={msg.avatar} alt={msg.user} className="h-full w-full object-cover" />
                        </div>
                      ) : (
                        <div className="mb-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff0000]/10 border border-[#ff0000]/20 text-[11px] font-medium text-[#ff0000]">
                          {msg.user.charAt(0).toUpperCase()}
                        </div>
                      )}
                      
                      <div className="flex min-w-0 max-w-[82%] flex-col sm:max-w-[75%] items-start">
                        <span className="mb-1.5 flex items-center gap-1.5 px-1">
                          <span className="text-[11px] font-medium text-[#93939f]">@{msg.user}</span>
                          {msg.verified && (
                            <BadgeCheckIcon className="h-3.5 w-3.5 text-[#ff0000]" style={{ fill: '#ff0000', stroke: '#111113' }} />
                          )}
                          {msg.isAdmin && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#ff0000]/30 bg-[#ff0000]/10 px-2 py-0.5 text-[9px] font-medium text-[#ff0000]">
                              <ShieldCheckIcon className="h-2.5 w-2.5" /> ADMIN
                            </span>
                          )}
                        </span>
                        
                        <div className="group/msg w-fit max-w-full rounded-[14px] rounded-bl-[4px] border border-[#222226] bg-[#111113] px-3.5 py-2.5 text-white transition-all hover:border-[#222226]/80">
                          {msg.replyTo && (
                            <div className="mb-2 block w-full rounded-[8px] border-l-2 border-[#ff0000]/60 bg-[#1d1d20]/70 px-2.5 py-1.5 text-left">
                              <span className="block text-[10px] font-medium text-[#ff0000]">@{msg.replyTo.user}</span>
                              <span className="block truncate text-xs text-[#93939f]">{msg.replyTo.text}</span>
                            </div>
                          )}
                          <p className="whitespace-pre-wrap break-words text-[13px] leading-relaxed opacity-90">{msg.text}</p>
                          <span className="mt-1.5 flex items-center justify-end gap-1 text-[9px] text-[#93939f]/70">
                            {msg.time}
                          </span>
                        </div>
                      </div>
                      
                      <button className="hidden shrink-0 self-center rounded-[8px] p-1.5 text-[#93939f]/50 opacity-0 transition-all hover:bg-[#1d1d20] hover:text-white group-hover:opacity-100 sm:block" title="Reply">
                        <ReplyIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-[#222226] bg-[#09090b]/80 p-3 sm:p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 rounded-[12px] border border-[#222226] bg-[#111113] p-1.5 transition-colors focus-within:border-[#ff0000]/50">
                <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] text-[#93939f] transition-colors hover:bg-[#1d1d20] hover:text-white">
                  <ImageIcon className="h-5 w-5" />
                </button>
                <input 
                  type="text" 
                  placeholder="Message the lounge..." 
                  className="flex-1 bg-transparent px-2 text-[13px] text-white placeholder:text-[#93939f]/50 focus:outline-none"
                />
                <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] bg-[#ff0000] text-white transition-all hover:bg-[#cc0000]">
                  <SendIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
