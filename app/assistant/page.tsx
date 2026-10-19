"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  Sparkles,
  Send,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  text: string;
  isDemo?: boolean;
}

const DEMO_RESPONSES: Record<string, string> = {
  default: `[DEMO MODE — Client-Side Prototype]\n\nI'm RELEAF's AI Document Assistant. In a production environment with RELEAF_AI_KEY configured, I will:\n\n• Detect and auto-correct typos and syntax errors directly in your canvas elements.\n• Provide executive summarization and readability enhancements.\n• Inspect DocumentGuard sensitivity flags (e.g. academic or financial markers).\n• Recommend optimal de-inking bounding boxes for minimum fibre wear.\n\nAll suggestions remain client-side until you choose to apply them to your document canvas.`,
  help: `[DEMO HELP] Here are sample queries you can explore:\n• "How do I selectively delete a paragraph in the Studio?"\n• "Why did DocumentGuard flag my document as AMBER?"\n• "Which paper substrates support multiple de-inking cycles?"\n• "Correct the typo in my corporate memorandum."`,
  spelling: `[DEMO RADAR] Typo scan complete for active document:\n\n❌ "schedueled" → ✅ "scheduled" (Confidence: 99%)\n❌ "Tuseday" → ✅ "Tuesday" (Confidence: 98%)\n\nIn the Studio workspace, you can apply these corrections to the canvas with a single click.`,
  summarise: `[DEMO SUMMARY] Document Summary:\n\n• Topic: Quarterly Sustainability and Smart Paper Workflow Adoption.\n• Key Recommendation: Transition office printing to 80 gsm recycled paper with 1–2 reuse cycles.\n• Status: Clean for selective restoration.`,
};

function getDemo(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("help") || lower.includes("what can you")) return DEMO_RESPONSES.help;
  if (lower.includes("spell") || lower.includes("correct") || lower.includes("grammar") || lower.includes("typo")) return DEMO_RESPONSES.spelling;
  if (lower.includes("summar") || lower.includes("overview")) return DEMO_RESPONSES.summarise;
  return DEMO_RESPONSES.default;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I am RELEAF's AI Document Assistant. Ask me to scan for typos, summarize documents, or guide paper de-inking compatibility. Running in client-side demo mode.",
      isDemo: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend) return;

    setMessages((m) => [...m, { role: "user", text: textToSend }]);
    if (!customPrompt) setInput("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 600));

    setMessages((m) => [
      ...m,
      { role: "assistant", text: getDemo(textToSend), isDemo: true },
    ]);
    setLoading(false);
  };

  const reset = () => {
    setMessages([
      {
        role: "assistant",
        text: "Hello! I am RELEAF's AI Document Assistant. Running in client-side demo mode.",
        isDemo: true,
      },
    ]);
    setInput("");
  };

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F4F0E6] min-h-screen flex flex-col">
        <div className="container-narrow flex-1 flex flex-col max-w-4xl w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="lime-tag mb-2">AI RESTORATION</span>
              <h1 className="text-3xl sm:text-5xl font-black text-[#123B2A] tracking-tight">
                AI Document Assistant
              </h1>
              <p className="text-xs sm:text-sm text-[#626B63] mt-1 font-normal">
                Contextual AI guidance for proofreading, document restoration, and paper compatibility.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="sim-badge">CLIENT DEMO</span>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#FFFDF7] border border-[#123B2A]/20 text-xs font-mono font-bold text-[#123B2A] hover:bg-[#DDE6D8] transition-colors shadow-2xs"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 text-xs">
            <span className="text-[11px] font-mono font-bold text-[#123B2A] uppercase shrink-0">Try Asking:</span>
            {[
              "Scan for spelling typos",
              "Summarize document",
              "Explain de-inking compatibility",
              "DocumentGuard rules",
            ].map((prompt) => (
              <button
                key={prompt}
                onClick={() => send(prompt)}
                className="px-3 py-1.5 rounded-xs bg-[#FFFDF7] hover:bg-[#123B2A] hover:text-[#D6FF52] border border-[#123B2A]/20 text-xs font-bold text-[#123B2A] shrink-0 transition-all shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Container */}
          <div className="flex-1 bg-[#FFFDF7] rounded-xs border-2 border-[#123B2A] shadow-md flex flex-col overflow-hidden min-h-[500px]">
            {/* Message Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.role === "assistant" && (
                      <div className="w-8 h-8 rounded-xs bg-[#123B2A] text-[#D6FF52] flex items-center justify-center shrink-0 shadow-2xs">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-xs p-4 text-xs sm:text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-[#123B2A] text-[#FFFDF7] shadow-sm"
                          : "bg-[#F4F0E6] text-[#17201B] border border-[#123B2A]/15"
                      }`}
                    >
                      {m.isDemo && m.role === "assistant" && (
                        <span className="sim-badge mb-2 block w-fit">SIMULATED RESPONSE</span>
                      )}
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>

                    {m.role === "user" && (
                      <div className="w-8 h-8 rounded-xs bg-[#287A50] text-[#FFFDF7] flex items-center justify-center shrink-0 shadow-2xs">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <div className="flex gap-3 items-center text-[#626B63] text-xs">
                  <div className="w-8 h-8 rounded-xs bg-[#123B2A] text-[#D6FF52] flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#123B2A] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#123B2A] animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-[#123B2A] animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Composer */}
            <div className="p-4 bg-[#F4F0E6] border-t-2 border-[#123B2A]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about proofreading, de-inking, or DocumentGuard..."
                  disabled={loading}
                  className="flex-1 bg-[#FFFDF7] border-2 border-[#123B2A] rounded-xs px-4 py-3 text-xs sm:text-sm text-[#17201B] placeholder-[#626B63]/60 focus:outline-none focus:ring-2 focus:ring-[#D6FF52] shadow-2xs font-sans"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-12 h-12 rounded-xs bg-[#123B2A] hover:bg-[#1B4E38] text-[#D6FF52] flex items-center justify-center transition-all disabled:opacity-40 disabled:hover:bg-[#123B2A] shadow-xs shrink-0"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[#626B63] px-1">
                <span>Client-Side Sandbox • No keys or credentials exposed</span>
                <Link href="/workspace" className="text-[#123B2A] font-bold hover:underline inline-flex items-center gap-1">
                  <span>Open in Document Studio</span>
                  <ArrowRight className="w-3 h-3 text-[#D6FF52] bg-[#123B2A] p-0.5 rounded-xs" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
