"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  MessageCircle,
  SendHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ClinicSettings } from "@/types";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const QUICK_REPLIES = [
  "What services do you offer?",
  "What are your hours?",
  "Do you accept insurance?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const mountTime = useRef(Date.now());
  const [clinic, setClinic] = useState<ClinicSettings | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && !hasOpened) setHasOpened(true);
  }, [open, hasOpened]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    fetch("/api/public/clinic-settings")
      .then((res) => res.json())
      .then((data) => {
        const settings = data?.data as ClinicSettings | null;
        setClinic(settings);
      })
      .catch(() => setClinic(null));
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (Date.now() - mountTime.current < 2000) return;
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const assistantId = crypto.randomUUID();
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: trimmed, timestamp: new Date() },
      { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
    ]);
    setInput("");
    setStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) throw new Error();
      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n").filter((l) => l.startsWith("data: "))) {
          try {
            const d = JSON.parse(line.slice(6)) as { type?: string; delta?: { text?: string } };
            if (d.type === "content_block_delta" && d.delta?.text) {
              acc += d.delta.text;
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, content: acc } : m))
              );
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch {
      const fallbackPhone = clinic?.phone ?? "(555) 000-0000";
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: `Sorry, I can't respond right now. Please call ${fallbackPhone}.`,
              }
            : m
        )
      );
    } finally {
      setStreaming(false);
    }
  }, [messages, streaming, clinic]);

  function handleSend() {
    sendMessage(input);
  }

  const lastAssistant = messages.filter((m) => m.role === "assistant").pop();
  const showStreamingDots = streaming && lastAssistant?.content === "";

  function scrollToBooking() {
    const el = document.querySelector("#booking, [data-booking-section='true']");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-14 w-14 bg-[var(--color-special-smiles-primary)] hover:bg-[var(--color-special-smiles-primary-dark)] text-white rounded-2xl shadow-lg flex items-center justify-center relative"
            onClick={() => setOpen((o) => !o)}
            aria-label="Open chat"
          >
            <MessageCircle size={22} />
            {!hasOpened && (
              <span
                className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse"
                aria-hidden
              />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.2 }}
            className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col"
            style={{ height: 480 }}
            role="dialog"
            aria-label="Chat"
          >
            <div className="bg-[var(--color-special-smiles-primary)] px-4 py-3 flex items-center gap-3 shrink-0">
              <div className="rounded bg-white/10 p-1.5">
                <MessageCircle size={16} className="text-white" />
              </div>
              <span className="text-white font-medium">Dental Assistant</span>
              <span className="text-xs text-green-300 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-green-300 animate-pulse" />
                Online
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto h-8 w-8 text-white/70 hover:text-[var(--color-special-smiles-primary)] "
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={16} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center text-center py-6">
                  <Sparkles size={32} className="text-[#a8cddd] mb-3" />
                  <p className="font-semibold text-slate-800">Hi there! 👋</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Ask about our services, hours, or insurance.
                  </p>
                  <div className="flex flex-col gap-2 mt-4 w-full">
                    {QUICK_REPLIES.map((text) => (
                      <button
                        key={text}
                        type="button"
                        onClick={() => sendMessage(text)}
                        className="text-left text-sm bg-slate-50 hover:bg-[#f0f6f8] hover:text-[var(--color-special-smiles-primary)] border border-slate-200 hover:border-[#cde0e7] rounded-xl px-4 py-2.5 transition-colors w-full"
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((m) => {
                    const isAssistant = m.role === "assistant";
                    const hasBookNow = isAssistant && m.content.includes("[BOOK_NOW_BUTTON]");
                    const callMatch = isAssistant ? m.content.match(/\[CALL_BUTTON:([+\d]+)\]/) : null;
                    const phoneNumber = callMatch?.[1];
                    const displayContent = isAssistant
                      ? m.content
                        .replace("[BOOK_NOW_BUTTON]", "")
                        .replace(/\[CALL_BUTTON:[+\d]+\]/, "")
                        .trim()
                      : m.content;
                    const isLastAssistant = isAssistant && lastAssistant && m.id === lastAssistant.id;

                    return (
                      <div key={m.id}>
                        {m.role === "user" ? (
                          <div className="flex justify-end">
                            <div className="max-w-[82%] bg-[var(--color-special-smiles-primary)] text-white text-sm rounded-2xl rounded-tr-sm px-4 py-2.5 leading-relaxed">
                              {displayContent}
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-start">
                            <div className="max-w-[82%] bg-slate-100 text-slate-800 text-sm rounded-2xl rounded-tl-sm px-4 py-2.5 leading-relaxed space-y-2">
                              <div className="flex items-center gap-1 min-h-[0.75rem]">
                                {displayContent || "\u00A0"}
                                {showStreamingDots && isLastAssistant && (
                                  <span className="flex gap-1 ml-1">
                                    {[0, 1, 2].map((i) => (
                                      <span
                                        key={i}
                                        className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"
                                        style={{ animationDelay: `${i * 0.15}s` }}
                                      />
                                    ))}
                                  </span>
                                )}
                              </div>
                              {hasBookNow && (
                                <Button
                                  type="button"
                                  size="sm"
                                  className="bg-[var(--color-special-smiles-primary)] hover:bg-[var(--color-special-smiles-primary-dark)] text-white rounded-full px-3 py-1 h-7 text-xs"
                                  onClick={scrollToBooking}
                                >
                                  Book now
                                </Button>
                              )}
                              {phoneNumber && (
                                <a
                                  href={`tel:${phoneNumber}`}
                                  className="inline-flex items-center gap-1 text-xs font-medium text-[#2563eb]"
                                >
                                  Call clinic {phoneNumber}
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                        <p className="text-xs text-slate-400 mt-1">
                          {formatDistanceToNow(m.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    );
                  })}
                </>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-slate-100 p-3 flex gap-2 shrink-0">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !streaming) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask a question..."
                disabled={streaming}
                maxLength={500}
                className="flex-1 text-sm bg-slate-50 border-slate-200 rounded-xl h-9"
                aria-label="Message"
              />
              <Button
                size="sm"
                className="h-9 w-9 p-0 bg-[var(--color-special-smiles-primary)] hover:bg-[var(--color-special-smiles-primary-dark)] rounded-xl"
                disabled={!input.trim() || streaming}
                onClick={handleSend}
                aria-label="Send"
              >
                <SendHorizontal size={14} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
