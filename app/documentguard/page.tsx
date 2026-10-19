"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileSearch,
  Lock,
  Droplets,
  Info,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

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
      "Educational certificates, transcripts, and diplomas are protected credentials. Modifying personal identification fields on official records is blocked.",
    alternative:
      "Submit an official name correction petition directly to the accredited issuing institution.",
    watermark: "BLOCKED — CREDENTIAL ALTERATION",
  },
  {
    id: "contract-date",
    title: "Modifying commencement date in draft agreement",
    description:
      'Changing "effective from 1 Jan 2026" to "effective from 1 Mar 2026" in a document tagged DRAFT.',
    status: "amber",
    statusLabel: "Review Required",
    reason:
      "Date alterations in contractual agreements require explicit multi-party verification. The document carries a draft tag, but changes to execution dates require manual supervisor approval.",
    watermark: "REVISED DRAFT — PENDING AUDIT",
  },
  {
    id: "restore-damaged",
    title: "Reconstructing smudged text on personal notes",
    description: "Filling in partially faded characters on personal handwritten notes or receipts.",
    status: "green",
    statusLabel: "Permitted",
    reason:
      "Low-risk text reconstruction in a personal non-contractual context. AI fills are clearly labelled with confidence scores.",
  },
];

const statusStyles = {
  green: "status-green",
  amber: "status-amber",
  red: "status-red",
};

const statusIcons = {
  green: CheckCircle2,
  amber: AlertTriangle,
  red: XCircle,
};

export default function DocumentGuardPage() {
  const [selectedId, setSelectedId] = useState<string>("typo");
  const selected = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[0];
  const IconComponent = statusIcons[selected.status];

  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F9F8F3] min-h-screen">
        <div className="container-narrow">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="pill-badge mb-3">Integrity & Governance</span>
            <h1 className="text-4xl sm:text-5xl font-black text-forest tracking-tight mb-4">
              DocumentGuard Security Engine
            </h1>
            <p className="text-charcoal/70 text-base leading-relaxed">
              Distinguishing legitimate typographical restoration from fraudulent credential and financial alteration.
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
                className={`p-6 rounded-3xl border shadow-xs ${statusStyles[status]}`}
              >
                <Icon className="w-6 h-6 mb-3" />
                <h3 className="font-bold text-base mb-1">{title}</h3>
                <p className="text-xs leading-relaxed opacity-90">{desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive Scenario Evaluator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Scenario Buttons (Left) */}
            <div className="lg:col-span-5 space-y-3">
              <h2 className="text-xs font-bold text-forest uppercase tracking-wider mb-2">
                Select Test Scenario
              </h2>
              {SCENARIOS.map((s) => {
                const isCurrent = s.id === selectedId;
                const ItemIcon = statusIcons[s.status];
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedId(s.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                      isCurrent
                        ? "bg-white border-forest shadow-md ring-1 ring-forest/20"
                        : "bg-white/60 hover:bg-white border-black/5 text-charcoal/70"
                    }`}
                  >
                    <ItemIcon
                      className={`w-5 h-5 shrink-0 mt-0.5 ${
                        s.status === "green"
                          ? "text-green-600"
                          : s.status === "amber"
                          ? "text-amber-600"
                          : "text-red-600"
                      }`}
                    />
                    <div>
                      <p className="font-bold text-xs sm:text-sm text-forest">{s.title}</p>
                      <p className="text-[11px] text-charcoal/50 line-clamp-1">{s.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Decision Details Panel (Right) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-black/5 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-black/5">
                <div>
                  <span className="text-[10px] font-mono uppercase text-charcoal/40">
                    Decision Analysis
                  </span>
                  <h3 className="text-lg font-black text-forest">{selected.title}</h3>
                </div>

                <div className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[selected.status]}`}>
                  {selected.statusLabel}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-forest uppercase tracking-wider mb-1">
                  Proposed Action
                </h4>
                <p className="text-xs sm:text-sm text-charcoal/70">{selected.description}</p>
              </div>

              <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-2 ${statusStyles[selected.status]}`}>
                <div className="font-bold flex items-center gap-1.5">
                  <IconComponent className="w-4 h-4" />
                  <span>DocumentGuard Determination</span>
                </div>
                <p>{selected.reason}</p>
              </div>

              {selected.alternative && (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 text-xs">
                  <span className="font-bold block mb-1">Legitimate Recommended Alternative:</span>
                  <p>{selected.alternative}</p>
                </div>
              )}

              {selected.watermark && (
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-center space-y-2">
                  <span className="text-[10px] text-charcoal/50 uppercase font-mono block">
                    Security Watermark Applied to Physical Tray:
                  </span>
                  <span className="inline-block px-4 py-1.5 border-2 border-dashed border-red-400 text-red-600 font-black tracking-widest text-xs uppercase rotate-[-3deg] bg-white">
                    {selected.watermark}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Anti-fraud commitment banner */}
          <div className="p-8 rounded-3xl bg-forest text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-lime" />
                <h3 className="font-bold text-lg">Anti-Fraud & Ethics Commitment</h3>
              </div>
              <p className="text-xs text-sage/80 leading-relaxed">
                RELEAF rejects any use of de-inking technology to forge qualifications, falsify transaction documents, or create deceptive credentials.
              </p>
            </div>

            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime text-forest font-bold text-xs hover:bg-white transition-all shrink-0"
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
