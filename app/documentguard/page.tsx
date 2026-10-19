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
} from "lucide-react";
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
      "Spelling correction in a non-sensitive document. No sensitive fields detected. Operation is permitted under current rules.",
  },
  {
    id: "invoice-amount",
    title: "Changing an amount on an invoice",
    description: 'Modifying "Total: £500.00" to "Total: £50.00" on an invoice.',
    status: "red",
    statusLabel: "Blocked",
    reason:
      "Modifying monetary amounts on financial documents is blocked. This operation could constitute financial fraud. The RELEAF system will not assist with altering transaction values on official financial records.",
    alternative:
      "If this is a genuine error, contact your accounting department or issuing party to issue a corrected document through official channels.",
    watermark: "BLOCKED — NOT PROCESSED",
  },
  {
    id: "certificate-name",
    title: "Changing a name on an academic certificate",
    description: "Modifying the graduate name field on a university certificate.",
    status: "red",
    statusLabel: "Blocked",
    reason:
      "Academic certificates and educational records are sensitive documents. Altering personal identity fields on official records is blocked. This operation is not permitted.",
    alternative:
      "Contact the issuing institution to request an official name correction.",
    watermark: "BLOCKED — NOT PROCESSED",
  },
  {
    id: "contract-date",
    title: "Updating a date in a draft contract",
    description:
      'Changing "effective from 1 January 2024" to "effective from 1 March 2024" in a draft document marked DRAFT.',
    status: "amber",
    statusLabel: "Review Required",
    reason:
      'Date fields in contracts require additional review. The document is marked DRAFT, which reduces risk, but date modifications in contractual documents should be reviewed by all parties. Proceed with caution.',
    watermark: "DRAFT — AI EDITED",
  },
  {
    id: "restore-damaged",
    title: "Reconstructing damaged text in a personal document",
    description:
      "Filling in a partially smudged word in a personal receipt.",
    status: "green",
    statusLabel: "Permitted",
    reason:
      "Low-risk text restoration in a personal document with no sensitive fields detected. AI reconstruction is marked as uncertain for review. Operation permitted.",
  },
];

const statusIcon = {
  green: CheckCircle2,
  amber: AlertTriangle,
  red: XCircle,
};

const statusColour = {
  green: "status-green",
  amber: "status-amber",
  red: "status-red",
};

export default function DocumentGuardPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const current = SCENARIOS.find((s) => s.id === selected);

  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container-narrow">
          {/* Header */}
          <div className="flex items-start gap-4 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-forest flex items-center justify-center flex-shrink-0">
              <Shield className="w-7 h-7 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-forest">DocumentGuard</h1>
              <p className="text-charcoal/60 mt-1 max-w-xl">
                A built-in security layer that classifies documents, flags
                sensitive edits, and prevents fraudulent document alterations.
                Every restoration operation passes through a security review
                before proceeding.
              </p>
            </div>
          </div>

          {/* How it works */}
          <section className="bg-white rounded-2xl p-8 border border-sage/40 mb-8" aria-labelledby="how-guard-works">
            <h2 id="how-guard-works" className="text-xl font-bold text-forest mb-6">
              Security Decision Framework
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  status: "green" as const,
                  label: "GREEN — Permitted",
                  desc: "The operation is permitted under the current rules. No sensitive patterns detected. Proceed with the workflow.",
                  icon: CheckCircle2,
                },
                {
                  status: "amber" as const,
                  label: "AMBER — Review Required",
                  desc: "Sensitive content or field modifications detected. The operation requires additional review before it can proceed.",
                  icon: AlertTriangle,
                },
                {
                  status: "red" as const,
                  label: "RED — Blocked",
                  desc: "The operation violates a security rule or would facilitate deceptive document manipulation. Access denied.",
                  icon: XCircle,
                },
              ].map(({ status, label, desc, icon: Icon }) => (
                <div
                  key={status}
                  className={`rounded-xl p-5 border ${statusColour[status]}`}
                >
                  <Icon className="w-6 h-6 mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-sm mb-2">{label}</h3>
                  <p className="text-xs leading-relaxed opacity-80">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Scenario demonstrations */}
          <section aria-labelledby="scenarios-heading">
            <h2 id="scenarios-heading" className="text-xl font-bold text-forest mb-4">
              Example Security Decisions
            </h2>
            <p className="text-charcoal/60 text-sm mb-6">
              Select a scenario to see how DocumentGuard responds. These are
              rule-based demonstrations. Real deployments use server-side
              validation.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Scenario list */}
              <div className="space-y-3">
                {SCENARIOS.map((s) => {
                  const Icon = statusIcon[s.status];
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelected(s.id === selected ? null : s.id)}
                      aria-expanded={selected === s.id}
                      aria-pressed={selected === s.id}
                      className={`w-full text-left rounded-xl border p-4 transition-all hover:shadow-sm ${
                        selected === s.id
                          ? "border-primary bg-primary/5"
                          : "border-sage bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            s.status === "green"
                              ? "text-green-600"
                              : s.status === "amber"
                              ? "text-amber-600"
                              : "text-red-600"
                          }`}
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-semibold text-sm text-charcoal">
                            {s.title}
                          </p>
                          <p className="text-xs text-charcoal/50 mt-0.5">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Decision detail */}
              <div>
                {!current ? (
                  <div className="h-full flex items-center justify-center bg-white rounded-2xl border border-sage p-8 text-center">
                    <div>
                      <FileSearch
                        className="w-10 h-10 text-charcoal/20 mx-auto mb-3"
                        aria-hidden="true"
                      />
                      <p className="text-sm text-charcoal/40">
                        Select a scenario to view the DocumentGuard decision.
                      </p>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-sage p-6 space-y-5"
                  >
                    <div>
                      <h3 className="font-bold text-forest text-lg mb-1">
                        {current.title}
                      </h3>
                      <p className="text-sm text-charcoal/60">{current.description}</p>
                    </div>

                    {/* Status badge */}
                    <div className={`rounded-xl border p-4 ${statusColour[current.status]}`}>
                      <div className="flex items-center gap-2 mb-2">
                        {(() => {
                          const Icon = statusIcon[current.status];
                          return <Icon className="w-5 h-5" aria-hidden="true" />;
                        })()}
                        <span className="font-bold text-sm">
                          {current.statusLabel}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">{current.reason}</p>
                    </div>

                    {/* Alternative */}
                    {current.alternative && (
                      <div className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-sm text-blue-800">{current.alternative}</p>
                      </div>
                    )}

                    {/* Watermark preview */}
                    {current.watermark && (
                      <div>
                        <h4 className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Droplets className="w-3.5 h-3.5" aria-hidden="true" />
                          Watermark applied to output
                        </h4>
                        <div className="bg-charcoal/5 rounded-xl p-4 flex items-center justify-center">
                          <div className="rotate-[-12deg] opacity-40 border-4 border-red-500 text-red-600 font-black text-sm px-4 py-2 rounded select-none">
                            {current.watermark}
                          </div>
                        </div>
                        <p className="text-xs text-charcoal/40 mt-2">
                          Watermarks are visible in exported or printed outputs
                          where required.
                        </p>
                      </div>
                    )}

                    {/* Lock for blocked */}
                    {current.status === "red" && (
                      <div className="flex items-center gap-2 text-xs text-charcoal/50">
                        <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                        Workflow halted. This operation cannot continue through
                        the normal interface.
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </section>

          {/* Anti-fraud note */}
          <section
            className="mt-8 bg-forest text-white rounded-2xl p-8"
            aria-labelledby="antifraud-heading"
          >
            <h2 id="antifraud-heading" className="text-xl font-bold mb-3">
              Anti-Fraud Commitment
            </h2>
            <p className="text-sage/80 leading-relaxed text-sm">
              RELEAF distinguishes legitimate document correction from fraudulent
              alteration. The system does not assist with changing transaction
              amounts, falsifying dates on financial records, altering
              identification numbers, or modifying any field in a way designed
              to misrepresent the original document. Blocked operations show a
              concise reason and suggest a legitimate alternative path.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
