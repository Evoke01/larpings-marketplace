import React, { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

const LOUNGE_ID = "__larpings_lounge__";
const Icon = ({
  children,
  ...props
}: React.SVGProps<SVGSVGElement> & { children: React.ReactNode }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
);
const ChatIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="M20 11.5a8.4 8.4 0 0 1-9 8.5 9 9 0 0 1-4-.9L3 21l1.9-4A8.5 8.5 0 1 1 20 11.5Z" />
  </Icon>
);
const SendIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </Icon>
);
const ArrowIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <Icon {...p}>
    <path d="m12 19-7-7 7-7M19 12H5" />
  </Icon>
);
const DealIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></Icon>
);
const TrashIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></Icon>
);
const ShieldIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></Icon>
);
const BadgeCheck = (p: React.SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></Icon>
);
const ImagePlus = (p: React.SVGProps<SVGSVGElement>) => (
  <Icon {...p}><path d="M16 5h6"/><path d="M19 2v6"/><path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><circle cx="9" cy="9" r="2"/></Icon>
);


type Conversation = {
  partnerId: string;
  partnerName: string;
  lastMessage: string;
  lastTime: string | null;
  unread: number;
  isLounge?: boolean;
  isDeal?: boolean;
  orderId?: string;
  orderStatus?: string;
  buyerClosed?: boolean;
  sellerClosed?: boolean;
  sellerAccepted?: boolean;
  orderCreatedAt?: string;
  payChain?: string;
  isBuyer?: boolean;
  mmId?: string | null;
  mmFee?: number | null;
  isMm?: boolean;
};






export default function MessagesPage() {
  const [session, setSession] = useState<{ user: any } | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<any[]>([]),
    [loungeMessages, setLoungeMessages] = useState<any[]>([]),
    [authors, setAuthors] = useState<Record<string, string>>({});
  const [avatars, setAvatars] = useState<Record<string, string | null>>({});
  const [online, setOnline] = useState<{ id: string; username: string }[]>([]);
  const [draft, setDraft] = useState(""),
    [loading, setLoading] = useState(true),
    [sending, setSending] = useState(false);
  const [mms, setMms] = useState<any[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null),
    [params, setParams] = useSearchParams();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  } | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !session?.user || !selected) return;

    try {
      setUploadingImage(true);
      const ext = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${ext}`;
      const filePath = `${session.user.id}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('chat-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('chat-media')
        .getPublicUrl(filePath);

      const markdownImage = `![attachment](${data.publicUrl})`;

      if (selected.isLounge) {
        await supabase
          .from("larping_lounge_messages")
          .insert({ sender_id: session.user.id, content: markdownImage });
      } else if (selected.isDeal) {
        await supabase
          .from("order_messages")
          .insert({
            order_id: selected.orderId,
            sender_id: session.user.id,
            content: markdownImage
          });
      } else {
        await supabase
          .from("messages")
          .insert({
            sender_id: session.user.id,
            receiver_id: selected.partnerId,
            content: markdownImage,
          });
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    let alive = true;
    (async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!alive) return;
      if (error || !user) {
        setLoading(false);
        return;
      }
      setSession({ user });
      const [{ data: dms }, { data: lounge, error: loungeError }, { data: asBuyer }, { data: userListings }, { data: asMiddlemanData }, { data: mmListData }] =
        await Promise.all([
          supabase
            .from("messages")
            .select("*")
            .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
            .order("created_at", { ascending: false }),
          supabase
            .from("larping_lounge_messages")
            .select("*")
            .order("created_at", { ascending: true })
            .limit(200),
          supabase.from("orders").select("*, listings(handle)").eq("buyer_id", user.id),
          supabase.from("listings").select("id, handle").eq("seller_id", user.id),
          supabase.from("orders").select("*, listings(handle)").eq("mm_id", user.id),
          supabase.from("profiles").select("id, username, display_name, mm_fee_percent, mm_fee_flat").eq("is_middleman", true)
        ]);
      if (loungeError) console.error("Lounge load error:", loungeError);
      
      if (mmListData) setMms(mmListData);
      
      let asSeller: any[] = [];
      if (userListings?.length) {
        const { data } = await supabase.from("orders").select("*").in("listing_id", userListings.map(l => l.id));
        asSeller = data?.map(o => ({ ...o, listings: userListings.find(l => l.id === o.listing_id) })) || [];
      }
      const asMiddleman = asMiddlemanData || [];
      const orders = [...(asBuyer || []), ...asSeller, ...asMiddleman];
      const ids = [
        ...new Set([
          ...(dms ?? []).map((m: any) =>
            m.sender_id === user.id ? m.receiver_id : m.sender_id,
          ),
          ...(lounge ?? []).map((m: any) => m.sender_id),
          ...orders.map(o => o.buyer_id),
          ...orders.map(o => o.mm_id).filter(Boolean),
          ...asSeller.map(o => user.id)
        ]),
      ];
      const { data: profiles } = ids.length
        ? await supabase
            .from("profiles")
            .select("id,username,display_name,avatar_url")
            .in("id", ids)
        : { data: [] };
      const names: Record<string, string> = {};
      const avatarMap: Record<string, string | null> = {};
      (profiles ?? []).forEach((p: any) => {
        names[p.id] = p.username || p.display_name || p.id;
        avatarMap[p.id] = p.avatar_url || null;
      });
      setAuthors(names);
      setAvatars(avatarMap);
      setLoungeMessages(lounge ?? []);
      const map: Record<string, Conversation> = {};
      (dms ?? []).forEach((m: any) => {
        const id = m.sender_id === user.id ? m.receiver_id : m.sender_id;
        if (!map[id])
          map[id] = {
            partnerId: id,
            partnerName: names[id] || id,
            lastMessage: m.content,
            lastTime: m.created_at,
            unread: 0,
          };
        if (m.receiver_id === user.id && !m.read) map[id].unread++;
      });
      const latest = lounge?.length ? lounge[lounge.length - 1] : null;
      const loungeConv: Conversation = {
        partnerId: LOUNGE_ID,
        partnerName: "Larping Lounge",
        lastMessage: latest?.content || "Everyone is welcome here",
        lastTime: latest?.created_at || null,
        unread: 0,
        isLounge: true,
      };
      
      const dealConvs = orders.map(o => ({
        partnerId: o.id,
        partnerName: `Deal: @${o.listings?.handle || 'unknown'}`,
        lastMessage: o.status === 'closed' ? 'Deal closed.' : 'Coordinate your deal securely.',
        lastTime: o.created_at,
        unread: 0,
        isDeal: true,
        orderId: o.id,


        orderStatus: o.status,
        buyerClosed: o.buyer_closed,
        sellerClosed: o.seller_closed,
        sellerAccepted: o.seller_accepted,
        orderCreatedAt: o.created_at,
        isBuyer: o.buyer_id === user.id,
        payChain: o.pay_chain,
        mmId: o.mm_id,
        mmFee: o.mm_fee,
        isMm: o.mm_id === user.id
      }));

      const sortedDeals = [...dealConvs].sort((a, b) =>
        new Date(b.lastTime || 0).getTime() - new Date(a.lastTime || 0).getTime()
      );
      const sortedDMs = Object.values(map).sort((a, b) =>
        new Date(b.lastTime || 0).getTime() - new Date(a.lastTime || 0).getTime()
      );
      const allConvs = [loungeConv, ...sortedDeals, ...sortedDMs];
      setConversations(allConvs);
      let requested = params.get("user") || params.get("order");
      if (!requested && params.get("username")) {
        const targetUsername = params.get("username")?.toLowerCase();
        requested =
          Object.entries(names).find(
            ([, n]) => n?.toLowerCase() === targetUsername,
          )?.[0] || null;
          
        if (!requested) {
          const { data } = await supabase
            .from("profiles")
            .select("id, username, avatar_url")
            .ilike("username", targetUsername ?? "")
            .maybeSingle();
          if (data) {
            requested = data.id;
            names[data.id] = data.username;
            avatarMap[data.id] = data.avatar_url;
          }
        }
      }
      if (requested && requested !== user.id) {
        let conv = allConvs.find(c => c.partnerId === requested);
        
        // Fallback: if the order isn't in allConvs yet (race condition after checkout),
        // fetch it directly from the database
        if (!conv && params.get("order")) {
          const { data: freshOrder } = await supabase
            .from("orders")
            .select("*, listings(handle)")
            .eq("id", requested)
            .maybeSingle();
          if (freshOrder) {
            conv = {
              partnerId: freshOrder.id,
              partnerName: `Deal: @${freshOrder.listings?.handle || 'unknown'}`,
              lastMessage: 'Coordinate your deal securely.',
              lastTime: freshOrder.created_at,
              unread: 0,
              isDeal: true,
              orderId: freshOrder.id,
              orderStatus: freshOrder.status,
              buyerClosed: freshOrder.buyer_closed,
              sellerClosed: freshOrder.seller_closed,
              sellerAccepted: freshOrder.seller_accepted,
              orderCreatedAt: freshOrder.created_at,
              isBuyer: freshOrder.buyer_id === user.id,
              payChain: freshOrder.pay_chain,
              mmId: freshOrder.mm_id,
              mmFee: freshOrder.mm_fee,
              isMm: freshOrder.mm_id === user.id
            };
            // Add it to the conversation list
            setConversations(prev => {
              if (prev.find(c => c.partnerId === requested)) return prev;
              return [prev[0], conv!, ...prev.slice(1)]; // insert after Lounge
            });
          }
        }

        if (!conv) {
          conv = {
            partnerId: requested,
            partnerName: names[requested] || requested,
            lastMessage: "",
            lastTime: null,
            unread: 0,
          };
        }
        
        setSelected(conv);
        
        if (conv.isDeal) {
          const { data: thread } = await supabase
            .from("order_messages")
            .select("*")
            .eq("order_id", requested)
            .order("created_at", { ascending: true });
          setMessages(thread ?? []);
        } else {
          const { data: thread } = await supabase
            .from("messages")
            .select("*")
            .or(
              `and(sender_id.eq.${user.id},receiver_id.eq.${requested}),and(sender_id.eq.${requested},receiver_id.eq.${user.id})`,
            )
            .order("created_at", { ascending: true });
          setMessages(thread ?? []);
        }
      } else setSelected(loungeConv);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [params]);

  useEffect(() => {
    if (!session?.user?.id) return;
    const channel = supabase
      .channel("larping-lounge", {
        config: { presence: { key: session.user.id } },
      })
      .on("presence", { event: "sync" }, () => {
        const seen = new Set<string>(),
          people: { id: string; username: string }[] = [];
        Object.entries(channel.presenceState()).forEach(
          ([id, states]: [string, any]) => {
            const state = states?.[0] || {};
            if (!seen.has(id)) {
              seen.add(id);
              people.push({
                id,
                username: state.username || authors[id] || id.slice(0, 8),
              });
            }
          },
        );
        setOnline(people);
      })
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "larping_lounge_messages" },
        async ({ new: row }: any) => {
          setLoungeMessages((prev) =>
            prev.some((m) => m.id === row.id) ? prev : [...prev, row],
          );
          if (!authors[row.sender_id]) {
            const { data } = await supabase
              .from("profiles")
              .select("id,username,display_name,avatar_url")
              .eq("id", row.sender_id)
              .maybeSingle();
            if (data) {
              setAuthors((prev) => ({
                ...prev,
                [data.id]: data.username || data.display_name || data.id,
              }));
              setAvatars((prev) => ({
                ...prev,
                [data.id]: data.avatar_url || null,
              }));
            }
          }
          setConversations((prev) =>
            prev.map((c) =>
              c.isLounge
                ? { ...c, lastMessage: row.content, lastTime: row.created_at }
                : c,
            ),
          );
        },
      )
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED")
          await channel.track({
            username: authors[session.user.id] || session.user.id.slice(0, 8),
          });
      });
    const dms = supabase
      .channel("dms")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        ({ new: row }: any) => {
          if (
            row.sender_id === session.user.id ||
            row.receiver_id === session.user.id
          ) {
            setMessages((prev) =>
              prev.some((m) => m.id === row.id) ? prev : [...prev, row],
            );
            const other =
              row.sender_id === session.user.id
                ? row.receiver_id
                : row.sender_id;
            setConversations((prev) => {
              const cp = [...prev];
              const idx = cp.findIndex((c) => c.partnerId === other && !c.isDeal && !c.isLounge);
              if (idx > -1) {
                cp[idx] = {
                  ...cp[idx],
                  lastMessage: row.content,
                  lastTime: row.created_at,
                  unread:
                    row.receiver_id === session.user.id
                      ? cp[idx].unread + 1
                      : cp[idx].unread,
                };
              } else {
                cp.push({
                  partnerId: other,
                  partnerName: authors[other] || other,
                  lastMessage: row.content,
                  lastTime: row.created_at,
                  unread: row.receiver_id === session.user.id ? 1 : 0,
                });
              }
              return cp;
            });
          }
        },
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "order_messages" },
        ({ new: row }: any) => {
          // Only append if it belongs to the currently selected deal chat
          setMessages((prev) => {
            const currentDealId = prev.length > 0 && prev[0].order_id ? prev[0].order_id : null;
            if (currentDealId && currentDealId !== row.order_id) return prev;
            return prev.some((m) => m.id === row.id) ? prev : [...prev, row];
          });
          setConversations((prev) => {
            const cp = [...prev];
            const idx = cp.findIndex((c) => c.partnerId === row.order_id);
            if (idx > -1) {
               cp[idx] = {
                  ...cp[idx],
                  lastMessage: row.content,
                  lastTime: row.created_at,
               };
            }
            return cp;
          });
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(dms);
    };
  }, [session?.user?.id, authors]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loungeMessages, selected]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim() || sending || !session?.user || !selected) return;
    setSending(true);
    try {
      if (selected.isLounge) {
        await supabase
          .from("larping_lounge_messages")
          .insert({ sender_id: session.user.id, content: draft.trim() });
      } else if (selected.isDeal) {
        await supabase
          .from("order_messages")
          .insert({
            order_id: selected.orderId,
            sender_id: session.user.id,
            content: draft.trim()
          });
      } else {
        await supabase
          .from("messages")
          .insert({
            sender_id: session.user.id,
            receiver_id: selected.partnerId,
            content: draft.trim(),
          });
      }
      setDraft("");
    } catch (e) {
      console.error(e);
    }
    setSending(false);
  };

  const openConversation = async (c: Conversation) => {
    setSelected(c);
    if (!c.isLounge && !c.isDeal) {
      setParams({ user: c.partnerId });
      const { data: thread } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${session.user.id},receiver_id.eq.${c.partnerId}),and(sender_id.eq.${c.partnerId},receiver_id.eq.${session.user.id})`,
        )
        .order("created_at", { ascending: true });
      setMessages(thread ?? []);
      if (c.unread > 0) {
        await supabase
          .from("messages")
          .update({ read: true })
          .eq("sender_id", c.partnerId)
          .eq("receiver_id", session.user.id)
          .eq("read", false);
        setConversations((prev) =>
          prev.map((conv) =>
            conv.partnerId === c.partnerId ? { ...conv, unread: 0 } : conv,
          ),
        );
      }
    } else if (c.isDeal) {
      setParams({ order: c.orderId! });
      const { data: thread } = await supabase
        .from("order_messages")
        .select("*")
        .eq("order_id", c.orderId)
        .order("created_at", { ascending: true });
      setMessages(thread ?? []);
    } else {
      setParams({});
    }
    setDraft(""); // Clear draft when switching conversations
  };

  if (loading)
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#333] border-t-white" />
      </div>
    );
  if (!session)
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <ChatIcon className="mx-auto mb-6 h-16 w-16 opacity-50" />
          <h2 className="mb-2 text-2xl font-semibold">Sign in to message</h2>
          <p className="mb-8 text-[#93939f]">
            You need an account to send messages.
          </p>
          <Link
            to="/login?redirect=/messages"
            className="inline-block rounded-[10px] bg-accent px-6 py-3 font-medium text-white"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
    
  const visible = selected?.isLounge ? loungeMessages : messages;
  
  return (
    <div className="fixed inset-0 top-[84px] mx-auto w-full max-w-6xl px-3 pb-3 sm:px-4 pt-4 font-[Poppins,ui-sans-serif,system-ui,sans-serif] bg-background z-40 flex flex-col">
      <div className="mkt-enter grid flex-1 min-h-0 grid-cols-1 overflow-hidden rounded-[14px] border border-border bg-card/40 lg:grid-cols-[340px_1fr]">
        <div className={`min-h-0 border-border lg:border-r ${selected ? 'hidden lg:block' : 'block'}`}>
          <div className="flex h-full min-h-0 flex-col">
            <div className="border-b border-border px-4 py-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-2.5">
                  <div>
                    <span className="mono-label text-muted-foreground">Inbox</span>
                    <h1 className="mt-1 text-xl text-foreground">Messages</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <ul>
                {conversations.map((c, i) => (
                  <li key={c.partnerId} className="group/row relative">
                    <button
                      onClick={() => openConversation(c)}
                      className={`flex w-full items-center gap-3 border-b border-border/50 text-left transition-colors hover:bg-secondary/50 px-4 py-3.5 ${selected?.partnerId === c.partnerId ? 'bg-secondary/70' : ''}`}
                    >
                      <div className="relative h-11 w-11 shrink-0">
                        <div className={`flex h-full w-full items-center justify-center rounded-full font-bold uppercase ${c.isLounge ? "bg-red-500/15 text-red-500" : c.isDeal ? "bg-amber-500/15 text-amber-500" : "bg-zinc-800 text-white"}`}>
                          {c.isLounge ? (
                            <ChatIcon className="h-5 w-5" />
                          ) : c.isDeal ? (
                            <ShieldIcon className="h-5 w-5" />
                          ) : (
                            c.partnerName.slice(0, 2)
                          )}
                        </div>
                      </div>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5">
                          <span className="truncate text-sm font-medium text-foreground">
                            {c.isLounge || c.isDeal ? c.partnerName : `@${c.partnerName}`}
                          </span>
                          {c.isLounge ? (
                            <span className="mono-label ml-auto shrink-0 text-red-500">PINNED</span>
                          ) : c.unread > 0 ? (
                            <span className="ml-auto shrink-0 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                              {c.unread}
                            </span>
                          ) : null}
                        </span>
                        <span className="mt-0.5 flex items-center gap-2">
                          <span className="truncate text-xs text-muted-foreground">
                            {c.isLounge ? "Everyone is automatically included" : c.lastMessage}
                          </span>
                        </span>
                      </span>
                    </button>
                    {!c.isLounge && !c.isDeal && (
                      <button aria-label="Remove from your list" title="Remove from your list" className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-[8px] border border-border bg-card/90 text-muted-foreground opacity-70 backdrop-blur-sm transition-all hover:border-red-400/50 hover:text-red-400 sm:opacity-0 sm:group-hover/row:opacity-100">
                        <TrashIcon className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {selected ? (
          <div className="min-h-0">
            <div className="flex h-full min-h-0 flex-col">
              <div className="flex items-center justify-between gap-3 border-b border-border py-3 px-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <button onClick={() => setSelected(null)} className="rounded-[8px] p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden">
                    <ArrowIcon className="h-4 w-4" />
                  </button>
                  <div className="relative">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold uppercase ${selected.isLounge ? "bg-red-500/15 text-red-500" : selected.isDeal ? "bg-amber-500/15 text-amber-500" : "bg-zinc-800 text-white"}`}>
                      {selected.isLounge ? <ChatIcon className="h-5 w-5" /> : selected.isDeal ? <ShieldIcon className="h-5 w-5" /> : selected.partnerName.slice(0,2)}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-1.5 truncate text-sm font-medium text-foreground">
                      {selected.isLounge ? "Larping Lounge" : selected.isDeal ? selected.partnerName : `@${selected.partnerName}`}
                      {!selected.isLounge && !selected.isDeal && <BadgeCheck className="h-4 w-4 shrink-0 text-accent" />}
                    </p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {selected.isLounge
                        ? `${online.length} online · community chat`
                        : selected.isDeal
                          ? selected.orderStatus === 'closed'
                            ? 'Deal Closed'
                            : selected.orderStatus === 'disputed'
                              ? <span className="text-red-400">Dispute Under Review</span>
                              : (<span className="flex items-center gap-1.5 text-emerald-400">ESCROW ACTIVE</span>)
                          : "Private conversation"}
                    </p>
                  </div>
                </div>
                
                {selected.isDeal && selected.orderStatus !== 'closed' && (
                  <div className="flex items-center gap-2">
                    {selected.orderStatus === 'disputed' ? (
                       <div className="text-xs text-red-500 font-medium px-3 py-1.5 rounded bg-red-500/10 border border-red-500/30">Disputed</div>
                    ) : (
                      <>
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
                            disabled={isClosing || (selected.isBuyer ? selected.buyerClosed : selected.sellerClosed)}
                            className="btn-outline-dim !px-3 !py-2 !text-xs !bg-emerald-500/10 !text-emerald-400 !border-emerald-500/30 hover:!bg-emerald-500/20 disabled:!opacity-50"
                          >
                            {(selected.isBuyer ? selected.buyerClosed : selected.sellerClosed) ? '✓ Confirmed' : (isClosing ? 'Confirming...' : 'Close Deal')}
                          </button>
                      </>
                    )}
                  </div>
                )}

                {selected.isDeal && !selected.mmId && selected.isBuyer && (
                  <div className="mt-4 bg-[#cc00ff]/10 border border-[#cc00ff]/30 p-4 rounded-xl">
                    <h3 className="text-sm font-semibold text-[#e57dff] mb-2 flex items-center gap-2">
                      <ShieldIcon className="w-4 h-4" /> Choose an Escrow Middleman
                    </h3>
                    <p className="text-xs text-[#93939f] mb-4">Select a trusted third-party to mediate this deal. They will verify delivery and release funds.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mms.map(mm => (
                        <button
                          key={mm.id}
                          onClick={() => {
                            setConfirmModal({
                              isOpen: true,
                              title: "Assign Middleman",
                              description: `Are you sure you want to assign ${mm.username || mm.display_name} as Middleman for this deal?`,
                              onConfirm: async () => {
                                const { error } = await supabase.from('orders').update({ mm_id: mm.id, mm_fee: mm.mm_fee_flat }).eq('id', selected.orderId);
                                if (error) return console.error(error);
                                
                                await supabase.from('order_messages').insert({
                                  order_id: selected.orderId, sender_id: session.user.id,
                                  content: `✅ Escrow Middleman @${mm.username || mm.display_name} has been assigned to mediate this deal.`
                                });
                                setSelected({ ...selected, mmId: mm.id });
                                setConfirmModal(null);
                              }
                            });
                          }}
                          className="flex flex-col text-left bg-[#09090b] border border-[#222226] p-3 rounded-lg hover:border-[#cc00ff]/50 transition-colors"
                        >
                          <span className="font-bold text-sm text-white">@{mm.username || mm.display_name}</span>
                          <span className="text-xs text-[#93939f] mt-1">Fee: {mm.mm_fee_percent}% + ${mm.mm_fee_flat} flat</span>
                        </button>
                      ))}
                      {mms.length === 0 && <span className="text-xs text-muted-foreground">No middlemen available.</span>}
                    </div>
                  </div>
                )}
                
                {selected.isDeal && selected.mmId && (
                   <div className="mt-3 flex items-center gap-2 bg-[#111113] px-3 py-2 border border-[#222226] rounded-lg">
                      <ShieldIcon className="w-4 h-4 text-[#e57dff]" />
                      <span className="text-xs text-[#93939f]">Mediated by MM</span>
                   </div>
                )}

                {!selected.isDeal && !selected.isLounge && (
                   <Link className="btn-outline-dim !px-3 !py-2 !text-xs hidden sm:inline-flex" to={`/profile/${encodeURIComponent(selected.partnerId)}`}>View profile</Link>
                )}
              </div>
              
              <div className="min-h-0 flex-1 overflow-y-auto py-4 px-4">
                <div className="space-y-1.5">
                  {visible.length ? (
                    visible.map((m: any, idx: number) => {
                      const mine = m.sender_id === session.user.id;
                      const author = (selected.isLounge || selected.isDeal) ? (mine ? "you" : authors[m.sender_id] || m.sender_id.slice(0, 8)) : selected.partnerName;
                      const showDivider = idx === 0 || new Date(m.created_at).toDateString() !== new Date(visible[idx - 1].created_at).toDateString();
                      const isMmMessage = selected.isDeal && m.sender_id === selected.mmId;
                      
                      return (
                        <div key={m.id}>
                          {showDivider && (
                            <div className="my-4 flex items-center gap-3">
                              <span className="h-px flex-1 bg-border"></span>
                              <span className="mono-label text-muted-foreground">
                                {new Date(m.created_at).toLocaleDateString()}
                              </span>
                              <span className="h-px flex-1 bg-border"></span>
                            </div>
                          )}
                          {(m.content.startsWith('✅') || m.content.startsWith('🚨') || m.content.startsWith('⚠️')) ? (
                            <div className="my-3 flex justify-center">
                              <div className="bg-red-500/10 text-red-500 border border-red-500/30 px-5 py-3 rounded-lg text-sm max-w-[85%] text-center whitespace-pre-wrap leading-relaxed shadow-sm">
                                {m.content}
                              </div>
                            </div>
                          ) : (
                            <div className={`group relative flex items-end gap-2 ${mine ? 'justify-end' : 'justify-start'}`}>
                              {!mine && (
                                 <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-[#222226] flex items-center justify-center text-xs font-semibold text-[#93939f] border border-[#333338]">
                                   {avatars[m.sender_id] ? (
                                     <img src={avatars[m.sender_id]!} alt="" className="w-full h-full object-cover" />
                                   ) : (
                                     (authors[m.sender_id] || m.sender_id).slice(0, 2).toUpperCase()
                                   )}
                                 </div>
                              )}
                              <div className={`flex min-w-0 max-w-[82%] flex-col sm:max-w-[68%] ${mine ? 'items-end' : 'items-start'}`}>
                                {((selected.isLounge || selected.isDeal) && !mine) && (
                                  <p className={`mb-1 ml-1 text-xs font-medium ${isMmMessage ? 'text-[#e57dff]' : 'text-[#93939f]'}`}>
                                    {isMmMessage ? 'Middleman ' : ''}@{author}
                                  </p>
                                )}
                                
                                <div className={`w-fit max-w-full px-4 py-2.5 rounded-2xl ${
                                  mine 
                                    ? 'rounded-br-sm bg-[#ff0000] text-white shadow-sm' 
                                    : isMmMessage
                                      ? 'rounded-bl-sm border border-[#cc00ff]/30 bg-[#cc00ff]/10 text-white shadow-sm'
                                      : 'rounded-bl-sm border border-[#222226] bg-[#171719] text-foreground shadow-sm'
                                }`}>
                                  
                                  {m.content.startsWith('![attachment](') && m.content.endsWith(')') ? (
                                    <a href={m.content.slice(14, -1)} target="_blank" rel="noreferrer">
                                      <img src={m.content.slice(14, -1)} alt="Attachment" className="max-w-[200px] max-h-[200px] object-contain rounded-lg" />
                                    </a>
                                  ) : (
                                    <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{m.content}</p>
                                  )}

                                  <span className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${mine ? 'text-white/70' : 'text-muted-foreground/70'}`}>
                                    {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      No messages yet.
                    </div>
                  )}
                  <div ref={bottomRef} />
                </div>
              </div>
              
              <div className="border-t border-border py-3 px-3">
                <form onSubmit={sendMessage} className="flex items-end gap-2">
                  
                  <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                  <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent disabled:opacity-50" aria-label="Attach an image">
                    {uploadingImage ? <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" /> : <ImagePlus className="h-4 w-4" />}
                  </button>

                  <textarea
                    rows={1}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(e);
                      }
                    }}
                    placeholder={selected.isLounge ? "Say something to the lounge..." : "Write a message..."}
                    className="max-h-[132px] min-h-[40px] flex-1 resize-none rounded-[10px] border border-border bg-secondary/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim() || sending}
                    className="btn-accent !h-10 !w-10 shrink-0 !rounded-[10px] !p-0 disabled:opacity-50"
                  >
                    <SendIcon className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden items-center justify-center text-muted-foreground lg:flex">
            <div className="text-center">
              <ChatIcon className="mx-auto mb-3 h-12 w-12 opacity-30" />
              <p>Select a conversation</p>
            </div>
          </div>
        )}
      </div>

      {/* Custom Confirm Modal */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#111113] border border-[#222226] rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-semibold text-white mb-2">{confirmModal.title}</h3>
            <p className="text-[#93939f] text-sm mb-6 leading-relaxed">
              {confirmModal.description}
            </p>
            <div className="flex items-center gap-3 w-full">
              <button 
                onClick={() => setConfirmModal(null)}
                className="flex-1 bg-transparent hover:bg-white/5 border border-[#222226] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmModal.onConfirm}
                className="flex-1 bg-[#ff0000] hover:bg-[#cc0000] text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
