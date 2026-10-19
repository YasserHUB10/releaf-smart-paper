"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lock,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

type SecurityStatus = "green" | "amber" | "red";

interface SecurityScenario {
  id: string;
  title: string;
  description: string;
  status: SecurityStatus;
  statusLabel: string;
  reason: string;
  alternative?: string;
  watermark?: string;
}

const SCENARIOS: SecurityScenario[] = [
  {
    id: "typo",
    title: "Correcting a typo in a business letter",
    description: 'Changing "recieve" to "receive" in an internal memo.',
    status: "green",
    statusLabel: "Permitted",
    reason:
      "Spelling correction in a standard internal document. No sensitive academic or monetary markers detected. Operation permitted under standard guidelines.",
  },
  {
    id: "invoice-amount",
    title: "Changing monetary amount on an invoice",
    description: 'Modifying "Total: £500.00" to "Total: £50.00" on an invoice document.',
    status: "red",
    statusLabel: "Blocked",
    reason:
      "Modifying financial transaction values on invoices, receipts, or contracts is strictly blocked. Altering monetary sums can facilitate fraud. RELEAF halts the physical restoration pipeline.",
    alternative:
      "Contact your accounts department to reissue a revised invoice through official bookkeeping software.",
    watermark: "BLOCKED — FRAUD SAFEGUARD",
  },
  {
    id: "certificate-name",
    title: "Altering name on academic certificate",
    description: "Modifying the student recipient name field on a university degree or transcript.",
    status: "red",
    statusLabel: "Blocked",
    reason:
      "Educational certificates, degree awards, and government credentials are high-risk categories. Any selective de-inking on identified certificate layouts is permanently prohibited.",
    alternative: "Official duplicate certificates must be ordered directly from the issuing university registry.",
    watermark: "LOCKED — CERTIFICATE INTEGRITY PROTECTED",
  },
  {
    id: "signature-block",
    title: "Removing a signature block from a contract",
    description: "Erasing the handwritten signature region on a non-disclosure agreement.",
    status: "amber",
    statusLabel: "Review Required",
    reason:
      "Altering legal signature regions requires documented authorization. RELEAF requires a supervisor confirmation step before approving print tray release.",
    alternative: "Execute an addendum or generate a clean contract revision for re-signing.",
  },
  {
    id: "meeting-agenda-date",
    title: "Updating date on weekly staff meeting agenda",
    description: 'Changing "Tuesday 10am" to "Thursday 2pm" on a printed internal agenda sheet.',
    status: "green",
    statusLabel: "Permitted",
    reason:
      "Non-sensitive scheduling updates on standard office copy paper. Ideal circular reuse scenario.",
  },
];

export default function DocumentGuardPage() {
  const [selectedId, setSelectedId] = useState<string>("typo");
  const selected = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[0];

  const statusStyles = {
    green: "border-[#287A50] bg-[#EAF4EE] text-[#123B2A]",
    amber: "border-[#FDE68A] bg-[#FFFBEB] text-[#92400E]",
    red: "border-[#FECACA] bg-[#FEF2F2] text-[#991B1B]",
  };

  const statusIcons = {
    green: CheckCircle2,
    amber: AlertTriangle,
    red: XCircle,
  };

  const IconComponent = statusIcons[selected.status];

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F4F0E6] min-h-screen">
        <div className="container-narrow">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="cobalt-tag">INTEGRITY ARCHITECTURE</span>
            <h1 className="text-4xl sm:text-6xl font-black text-[#123B2A] tracking-tight">
              DocumentGuard Security Engine
            </h1>
            <p className="text-[#626B63] text-sm sm:text-base leading-relaxed">
              Paper reuse must not enable unauthorized document tampering. DocumentGuard applies a strict three-tier verification policy to protect certificates, legal agreements, and financial deeds.
            </p>
          </div>

          {/* Three Tier Decision Rules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                status: "green" as const,
                title: "GREEN — Permitted",
                desc: "Legitimate typographical, grammatical, or layout repairs in non-sensitive contexts. The operation proceeds to de-inking.",
                icon: CheckCircle2,
              },
              {
                status: "amber" as const,
                title: "AMBER — Review Required",
                desc: "Changes to dates, signatures, or contractual clauses in draft legal documents. Requires explicit confirmation and audit tagging.",
                icon: AlertTriangle,
              },
              {
                status: "red" as const,
                title: "RED — Blocked",
                desc: "Alterations to academic certificates, identity credentials, or invoice payment amounts. Strictly halted at hardware level.",
                icon: XCircle,
              },
            ].map(({ status, title, desc, icon: Icon }) => (
              <div
                key={title}
                className={`p-6 rounded-xs border-2 shadow-sm space-y-2 ${statusStyles[status]}`}
              >
                <Icon className="w-6 h-6 mb-2" />
                <h3 className="font-black text-base tracking-tight">{title}</h3>
                <p className="text-xs leading-relaxed opacity-90">{desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive Scenario Evaluator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Scenario Buttons (Left) */}
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-xs font-mono font-bold text-[#123B2A] uppercase tracking-wider mb-2">
                Select Test Scenario
              </h2>
              {SCENARIOS.map((s) => {
                const isCurrent = s.id === selectedId;
                const ItemIcon = statusIcons[s.status];
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedId(s.id)}
                    className={`w-full text-left p-4 rounded-xs border-2 transition-all flex items-start gap-3.5 ${
                      isCurrent
                        ? "bg-[#FFFDF7] border-[#123B2A] shadow-md ring-2 ring-[#D6FF52]"
                        : "bg-[#FFFDF7]/70 hover:bg-[#FFFDF7] border-[#123B2A]/15 text-[#626B63]"
                    }`}
                  >
                    <ItemIcon
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        s.status === "green"
                          ? "text-[#287A50]"
                          : s.status === "amber"
                          ? "text-[#92400E]"
                          : "text-[#991B1B]"
                      }`}
                    />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-[#123B2A]">{s.title}</p>
                      <p className="text-[11px] text-[#626B63] line-clamp-1">{s.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Decision Details Panel (Right) */}
            <div className="lg:col-span-7 bg-[#FFFDF7] rounded-xs p-8 border-2 border-[#123B2A] shadow-md space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#123B2A]/15">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#626B63]">
                    Decision Analysis
                  </span>
                  <h3 className="text-lg font-black text-[#123B2A]">{selected.title}</h3>
                </div>

                <div className={`px-3 py-1 rounded-xs text-xs font-mono font-bold uppercase ${statusStyles[selected.status]}`}>
                  {selected.statusLabel}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold text-[#123B2A] uppercase tracking-wider mb-1">
                  Proposed Action
                </h4>
                <p className="text-xs sm:text-sm text-[#626B63]">{selected.description}</p>
              </div>

              <div className={`p-4 rounded-xs border text-xs leading-relaxed space-y-2 ${statusStyles[selected.status]}`}>
                <div className="font-bold flex items-center gap-1.5">
                  <IconComponent className="w-4 h-4" />
                  <span>DocumentGuard Determination</span>
                </div>
                <p>{selected.reason}</p>
              </div>

              {selected.alternative && (
                <div className="p-4 rounded-xs bg-[#4F5BFF]/10 border border-[#4F5BFF]/30 text-[#123B2A] text-xs">
                  <span className="font-bold block mb-1 text-[#4F5BFF]">Legitimate Recommended Alternative:</span>
                  <p>{selected.alternative}</p>
                </div>
              )}

              {selected.watermark && (
                <div className="p-4 bg-[#F4F0E6] rounded-xs border border-[#123B2A]/15 text-xs text-center space-y-2">
                  <span className="text-[10px] text-[#626B63] uppercase font-mono block">
                    Security Watermark Applied to Physical Tray:
                  </span>
                  <span className="inline-block px-4 py-1.5 border-2 border-dashed border-[#991B1B] text-[#991B1B] font-black tracking-widest text-xs uppercase bg-[#FFFDF7]">
                    {selected.watermark}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Anti-fraud commitment banner */}
          <div className="p-8 rounded-xs bg-[#123B2A] text-[#FFFDF7] border-2 border-[#123B2A] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#D6FF52]" />
                <h3 className="font-black text-lg">Anti-Fraud & Ethics Commitment</h3>
              </div>
              <p className="text-xs text-[#DDE6D8]/85 leading-relaxed">
                RELEAF rejects any use of de-inking technology to forge qualifications, falsify transaction documents, or create deceptive credentials.
              </p>
            </div>

            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xs bg-[#D6FF52] text-[#123B2A] font-extrabold text-xs uppercase tracking-wider hover:bg-[#E5FF85] transition-all shrink-0 shadow-sm"
            >
              <span>Test Guard in Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
