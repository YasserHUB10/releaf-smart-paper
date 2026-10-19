"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  Sparkles,
  Send,
  RotateCcw,
  FileText,
  AlertTriangle,
  Bot,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
  isDemo?: boolean;
}

const DEMO_RESPONSES: Record<string, string> = {
  default: `[DEMO MODE — No AI API key configured]\n\nI'm RELEAF's AI Document Assistant. In a live deployment, I'd analyse your uploaded document and provide:\n\n• Spelling and grammar corrections\n• Readability improvements\n• Summary of content\n• Suggestions for print preparation\n• Guidance on DocumentGuard warnings\n\nTo enable real AI responses, configure RELEAF_AI_KEY in your environment.`,
  help: `[DEMO] I can help with:\n• "Correct this text: [paste text here]"\n• "Summarise my document"\n• "What does DocumentGuard mean by AMBER status?"\n• "What paper should I use for reuse?"\n• "Translate this paragraph to French"`,
  spelling: `[DEMO] Here are some typical spelling corrections I would detect:\n\n❌ "schedueled" → ✅ "scheduled"\n❌ "Tuseday" → ✅ "Tuesday"\n❌ "recieve" → ✅ "receive"\n\nIn live mode, I'd scan your uploaded document and highlight every error with confidence scores.`,
  summarise: `[DEMO] Summary generation requires a real document to be uploaded and an active AI integration. In live mode, I'd produce:\n\n• A 2–3 sentence executive summary\n• Key topics identified\n• Entities detected (names, dates, amounts)\n\nAll outputs would be marked as AI-generated suggestions for your review.`,
};

function getDemo(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("help") || lower.includes("what can you")) return DEMO_RESPONSES.help;
  if (lower.includes("spell") || lower.includes("correct") || lower.includes("grammar")) return DEMO_RESPONSES.spelling;
  if (lower.includes("summar") || lower.includes("overview")) return DEMO_RESPONSES.summarise;
  return DEMO_RESPONSES.default;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello! I'm the RELEAF AI Document Assistant. Upload a document in the Workspace, then ask me to correct, summarise, or explain it. Running in demo mode — sample responses only.",
      isDemo: true,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    // Simulate response delay
    await new Promise((r) => setTimeout(r, 800));

    setMessages((m) => [
      ...m,
      { role: "assistant", text: getDemo(trimmed), isDemo: true },
    ]);
    setLoading(false);
  };

  const reset = () => {
    setMessages([
      {
        role: "assistant",
        text: "Hello! I'm the RELEAF AI Document Assistant. Running in demo mode.",
        isDemo: true,
      },
    ]);
    setInput("");
  };

  return (
    <>
      <Navigation />
      <main className="pt-20 pb-0 bg-cream min-h-screen flex flex-col">
        <div className="container-narrow flex-1 flex flex-col py-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h1 className="text-3xl font-bold text-forest flex items-center gap-3">
                <Sparkles className="w-7 h-7 text-primary" aria-hidden="true" />
                AI Document Assistant
              </h1>
              <p className="text-charcoal/60 mt-1 text-sm">
                Ask questions about your documents, get corrections, summaries, and restoration guidance.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="sim-badge">DEMO MODE</span>
              <button
                onClick={reset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sage text-sm text-charcoal hover:bg-sage/30 transition-colors"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>

          {/* Demo mode banner */}
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 mb-4">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              No AI API key is configured. Sample responses are shown for
              demonstration purposes only. Real document analysis requires{" "}
              <code className="bg-amber-100 px-1 rounded text-xs">
                RELEAF_AI_KEY
              </code>{" "}
              to be set in your environment.
            </p>
          </div>

          {/* Chat area */}
          <div
            className="flex-1 bg-white rounded-2xl border border-sage flex flex-col overflow-hidden"
            style={{ minHeight: "400px", maxHeight: "60vh" }}
          >
            <div
              className="flex-1 overflow-y-auto p-5 space-y-4"
              role="log"
              aria-label="Conversation"
              aria-live="polite"
            >
              <AnimatePresence initial={false}>
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-sage/30 text-charcoal rounded-tl-none"
                      }`}
                    >
                      {m.isDemo && m.role === "assistant" && (
                        <span className="sim-badge mb-2 block w-fit">DEMO</span>
                      )}
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>
                    {m.role === "user" && (
                      <div className="w-7 h-7 rounded-full bg-charcoal/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <FileText className="w-3.5 h-3.5 text-charcoal" aria-hidden="true" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <div className="flex gap-3 items-center text-charcoal/50 text-sm">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-white" aria-hidden="true" />
                  </div>
                  <div className="flex gap-1" aria-label="Assistant is thinking">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-charcoal/30 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-sage p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
                className="flex gap-2"
              >
                <label htmlFor="assistant-input" className="sr-only">
                  Message the AI assistant
                </label>
                <input
                  id="assistant-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your document…"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-sage bg-cream text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-forest transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                </button>
              </form>
              <p className="text-xs text-charcoal/30 mt-2 text-center">
                AI suggestions are for review only. Never silently modifies your document.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
