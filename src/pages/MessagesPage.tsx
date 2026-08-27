import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
);
const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);
const MessageCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
);

export default function MessagesPage() {
  const [session, setSession] = useState<any>(null);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConv, setSelectedConv] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(async ({ data: { user }, error }) => {
      if (!active) return;
      const s = user ? { user } : null;
      setSession(s);
      if (error || !s) { setLoading(false); return; }

      // Fetch all messages for this user (sent and received)
      const { data, error: messageError } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${s.user.id},receiver_id.eq.${s.user.id}`)
        .order('created_at', { ascending: false });

      if (messageError) console.error('Message load error:', messageError);
      const partnerIds = [...new Set((data ?? []).map(msg => msg.sender_id === s.user.id ? msg.receiver_id : msg.sender_id))];
      const { data: profiles } = partnerIds.length
        ? await supabase.from('profiles').select('id, username, display_name').in('id', partnerIds)
        : { data: [] };
      const profileMap = new Map((profiles ?? []).map(profile => [profile.id, profile]));

      // Group into conversations by partner
      const convMap: Record<string, any> = {};
      (data ?? []).forEach(msg => {
        const partnerId = msg.sender_id === s.user.id ? msg.receiver_id : msg.sender_id;
        const partner = profileMap.get(partnerId);
        const partnerName = partner?.username || partner?.display_name;
        if (!convMap[partnerId]) {
          convMap[partnerId] = { partnerId, partnerName: partnerName || partnerId, lastMessage: msg.content, lastTime: msg.created_at, unread: 0 };
        }
        if (msg.receiver_id === s.user.id && !msg.read) convMap[partnerId].unread++;
      });
      setConversations(Object.values(convMap));
      let requestedPartnerId = searchParams.get('user');
      const requestedUsername = searchParams.get('username');
      if (!requestedPartnerId && requestedUsername) {
        const { data: requestedProfile } = await supabase
          .from('profiles')
          .select('id, username, display_name')
          .eq('username', requestedUsername)
          .maybeSingle();
        if (requestedProfile) {
          requestedPartnerId = requestedProfile.id;
          profileMap.set(requestedProfile.id, requestedProfile);
        }
      }
      if (requestedPartnerId && requestedPartnerId !== s.user.id) {
        const partner = profileMap.get(requestedPartnerId);
        const conversation = convMap[requestedPartnerId] ?? {
          partnerId: requestedPartnerId,
          partnerName: partner?.username || partner?.display_name || requestedPartnerId,
          lastMessage: '',
          lastTime: null,
          unread: 0,
        };
        setSelectedConv(conversation);
        const { data: thread } = await supabase
          .from('messages')
          .select('*')
          .or(`and(sender_id.eq.${s.user.id},receiver_id.eq.${requestedPartnerId}),and(sender_id.eq.${requestedPartnerId},receiver_id.eq.${s.user.id})`)
          .order('created_at', { ascending: true });
        setMessages(thread ?? []);
      }
      setLoading(false);
    });

    return () => { active = false; };
  }, [searchParams]);

  useEffect(() => {
    if (!session?.user?.id) return;
    const channel = supabase
      .channel(`messages-${session.user.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `receiver_id=eq.${session.user.id}` }, (payload) => {
        const incoming = payload.new as any;
        setMessages(prev => selectedConv?.partnerId === incoming.sender_id ? [...prev, incoming] : prev);
        setConversations(prev => prev.map(conv => conv.partnerId === incoming.sender_id
          ? { ...conv, lastMessage: incoming.content, lastTime: incoming.created_at, unread: conv.partnerId === selectedConv?.partnerId ? 0 : conv.unread + 1 }
          : conv));
      })
      .subscribe();
    return () => { void supabase.removeChannel(channel); };
  }, [session?.user?.id, selectedConv?.partnerId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function openConversation(conv: any) {
    setSelectedConv(conv);
    const { data } = await supabase
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${session.user.id},receiver_id.eq.${conv.partnerId}),and(sender_id.eq.${conv.partnerId},receiver_id.eq.${session.user.id})`)
      .order('created_at', { ascending: true });
    setMessages(data ?? []);
    // Mark as read
    await supabase.from('messages').update({ read: true }).eq('receiver_id', session.user.id).eq('sender_id', conv.partnerId);
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConv || sending) return;
    setSending(true);
    const { data: sent, error } = await supabase.from('messages').insert({
      sender_id: session.user.id,
      receiver_id: selectedConv.partnerId,
      content: newMessage.trim(),
    }).select('*').single();
    if (error) console.error('Message send error:', error);
    if (sent) setMessages(prev => [...prev, sent]);
    setNewMessage("");
    setSending(false);
  }

  if (loading) return (
    <div className="bg-zinc-950 text-[#f9f9fb] min-h-screen font-[Poppins,ui-sans-serif,system-ui,sans-serif] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#ff0000] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!session) return (
    <div className="bg-zinc-950 text-[#f9f9fb] min-h-screen font-[Poppins,ui-sans-serif,system-ui,sans-serif] flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="w-16 h-16 bg-[rgba(255,0,0,0.1)] rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#ff0000]">
          <MessageCircleIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-medium mb-2">Sign in to message</h2>
        <p className="text-[#93939f] text-sm mb-6">Chat with sellers and track your conversations.</p>
        <Link to="/signin?returnTo=/messages" className="bg-[#ff0000] text-white font-medium px-6 py-3 rounded-[10px] hover:bg-[#cc0000] transition-colors inline-block">
          Sign In
        </Link>
      </div>
    </div>
  );

  return (
    <div className="mx-auto flex h-[calc(100vh-84px)] max-w-6xl flex-col px-3 pb-3 sm:px-4 pt-24 font-[Poppins,ui-sans-serif,system-ui,sans-serif]">
      <div className="grid h-full min-h-0 overflow-hidden rounded-[14px] border border-[#222226] bg-[#09090b]/40 lg:grid-cols-[300px_1fr]">

        {/* Sidebar */}
        <div className={`min-h-0 border-r border-[#222226] ${selectedConv ? 'hidden lg:flex' : 'flex'} flex-col`}>
          <div className="border-b border-[#222226] px-4 py-4">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[#93939f]">Inbox</span>
            <h1 className="mt-1 text-xl font-medium text-white">Messages</h1>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.length === 0 ? (
              <div className="p-6 text-center text-[#93939f] text-sm">
                <MessageCircleIcon className="w-8 h-8 mx-auto mb-3 opacity-40" />
                No conversations yet.<br />Buy something to start a chat.
              </div>
            ) : conversations.map(conv => (
              <button
                key={conv.partnerId}
                onClick={() => openConversation(conv)}
                className={`w-full text-left px-4 py-3 border-b border-[#1a1a1d] hover:bg-[#111113] transition-colors ${selectedConv?.partnerId === conv.partnerId ? 'bg-[#111113]' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-white uppercase shrink-0">
                    {(conv.partnerName || '?').slice(0, 2)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">@{conv.partnerName}</p>
                      {conv.unread > 0 && (
                        <span className="bg-[#ff0000] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{conv.unread}</span>
                      )}
                    </div>
                    <p className="text-[#93939f] text-xs truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Panel */}
        {selectedConv ? (
          <div className="flex flex-col min-h-0">
            <div className="flex items-center gap-3 border-b border-[#222226] px-4 py-3">
              <button onClick={() => setSelectedConv(null)} className="lg:hidden text-[#93939f] hover:text-white">
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-white uppercase text-sm">
                {(selectedConv.partnerName || '?').slice(0, 2)}
              </div>
              <p className="font-medium">@{selectedConv.partnerName}</p>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map(msg => {
                const isMine = msg.sender_id === session.user.id;
                return (
                  <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] px-4 py-2.5 rounded-[14px] text-sm ${isMine ? 'bg-[#ff0000] text-white rounded-br-sm' : 'bg-[#111113] border border-[#222226] rounded-bl-sm'}`}>
                      {!isMine && <p className="font-semibold text-[11px] mb-1 text-[#93939f]">@{msg.sender?.username}</p>}
                      <p>{msg.content}</p>
                      <p className={`text-[10px] mt-1 ${isMine ? 'text-white/60' : 'text-[#555]'}`}>
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={sendMessage} className="flex items-center gap-2 border-t border-[#222226] px-4 py-3">
              <input
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                placeholder="Type a message…"
                className="flex-1 bg-[#111113] border border-[#222226] rounded-[10px] px-4 py-2.5 text-sm text-[#f9f9fb] placeholder-[#555] focus:outline-none focus:border-[#ff0000] transition-colors"
              />
              <button type="submit" disabled={!newMessage.trim() || sending} className="bg-[#ff0000] text-white w-10 h-10 rounded-[10px] flex items-center justify-center hover:bg-[#cc0000] disabled:opacity-50 transition-colors">
                <SendIcon className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="hidden lg:flex items-center justify-center text-[#93939f]">
            <div className="text-center">
              <MessageCircleIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Select a conversation</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
