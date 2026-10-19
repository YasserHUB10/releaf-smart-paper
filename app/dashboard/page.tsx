import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  FileText,
  Upload,
  Sparkles,
  BarChart3,
  Shield,
  Printer,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Leaf,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "RELEAF dashboard — document overview, reuse statistics, and system status.",
};

// Demo statistics — clearly labelled
const STATS = [
  { label: "Sheets Reused", value: "0", note: "demo", icon: Leaf },
  { label: "Operations Complete", value: "0", note: "demo", icon: CheckCircle2 },
  { label: "Sheets Rejected", value: "0", note: "demo", icon: AlertTriangle },
  { label: "Estimated Sheets Avoided", value: "—", note: "requires hardware data", icon: BarChart3 },
];

export default function DashboardPage() {
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-16 bg-cream min-h-screen">
        <div className="container-narrow">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-forest">Dashboard</h1>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/workspace"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-forest transition-colors"
              >
                <Upload className="w-4 h-4" aria-hidden="true" />
                New Document
              </Link>
            </div>
          </div>

          {/* Demo data notice */}
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 mb-8">
            <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
            Dashboard statistics are showing demo data (all zeros). Real usage data will appear when connected to RELEAF hardware and completing actual restoration operations.
          </div>

          {/* Stats */}
          <section aria-labelledby="stats-heading" className="mb-10">
            <h2 id="stats-heading" className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider mb-4">
              Reuse Statistics — Demo Data
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map(({ label, value, note, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl border border-sage/40 p-5"
                >
                  <Icon className="w-5 h-5 text-primary mb-3" aria-hidden="true" />
                  <p className="text-3xl font-bold text-forest mb-0.5">{value}</p>
                  <p className="text-sm text-charcoal">{label}</p>
                  <p className="text-xs text-charcoal/40 mt-0.5 italic">{note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recent documents */}
          <section aria-labelledby="recent-heading" className="mb-10">
            <h2 id="recent-heading" className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider mb-4">
              Recent Documents
            </h2>
            <div className="bg-white rounded-2xl border border-sage/40 p-12 text-center">
              <FileText className="w-10 h-10 text-charcoal/20 mx-auto mb-3" aria-hidden="true" />
              <h3 className="font-semibold text-charcoal mb-1">No documents yet</h3>
              <p className="text-sm text-charcoal/50 mb-4">
                Upload a PDF or image to begin your first restoration.
              </p>
              <Link
                href="/workspace"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-forest transition-colors"
              >
                <Upload className="w-4 h-4" aria-hidden="true" />
                Upload Document
              </Link>
            </div>
          </section>

          {/* Quick links */}
          <section aria-labelledby="quick-links-heading">
            <h2 id="quick-links-heading" className="text-sm font-semibold text-charcoal/50 uppercase tracking-wider mb-4">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                {
                  href: "/workspace",
                  icon: Upload,
                  label: "Start Restoration",
                  desc: "Upload and process a document",
                },
                {
                  href: "/assistant",
                  icon: Sparkles,
                  label: "AI Assistant",
                  desc: "Get document editing suggestions",
                },
                {
                  href: "/paper-compatibility",
                  icon: Printer,
                  label: "Paper Settings",
                  desc: "Configure size, type, and quality",
                },
                {
                  href: "/documentguard",
                  icon: Shield,
                  label: "DocumentGuard",
                  desc: "Security and fraud prevention",
                },
                {
                  href: "/how-it-works",
                  icon: Clock,
                  label: "How It Works",
                  desc: "Learn the RELEAF workflow",
                },
                {
                  href: "/help",
                  icon: AlertTriangle,
                  label: "Help",
                  desc: "Troubleshooting and guides",
                },
              ].map(({ href, icon: Icon, label, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="bg-white rounded-2xl border border-sage/40 p-5 hover:border-primary/40 hover:shadow-sm transition-all group"
                >
                  <Icon
                    className="w-5 h-5 text-primary mb-3 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  />
                  <p className="font-semibold text-sm text-charcoal mb-0.5">
                    {label}
                  </p>
                  <p className="text-xs text-charcoal/50">{desc}</p>
                  <ArrowRight
                    className="w-4 h-4 text-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>

          {/* Printer status */}
          <section
            className="mt-8 bg-white rounded-2xl border border-sage/40 p-6 flex items-center gap-4"
            aria-labelledby="printer-status-heading"
          >
            <Printer className="w-8 h-8 text-charcoal/20" aria-hidden="true" />
            <div>
              <h2 id="printer-status-heading" className="font-semibold text-charcoal text-sm">
                Printer Connection
              </h2>
              <p className="text-xs text-charcoal/50">
                No RELEAF-compatible device detected. Physical restoration and
                de-inking features require compatible hardware.
              </p>
            </div>
            <div className="ml-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal/10 text-xs font-semibold text-charcoal/50">
                <span className="w-2 h-2 rounded-full bg-charcoal/30" aria-hidden="true" />
                Disconnected
              </span>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
