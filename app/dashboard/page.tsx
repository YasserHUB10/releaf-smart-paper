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
  Layers,
  Flame,
  Check,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Environmental Impact Dashboard",
  description: "Monitor document restorations, paper reuse metrics, and system status across your RELEAF facilities.",
};

const STATS = [
  { label: "Sheets Reused in Session", value: "2 Sheets", sub: "Cycle 1 of 2 active", icon: Leaf },
  { label: "De-Inking Restorations", value: "12 Operations", sub: "Calculated in simulation", icon: CheckCircle2 },
  { label: "Rejected Unsuitable", value: "1 Sheet", sub: "Coated glossy blocked", icon: AlertTriangle },
  { label: "Estimated Wood Pulp Saved", value: "~18.4 g", sub: "Calculated benchmark", icon: BarChart3 },
];

const RECENT_DOCS = [
  {
    name: "Sustainability_Report_2026.pdf",
    time: "10 mins ago",
    status: "Restored & Exported",
    elements: 8,
    reused: true,
  },
  {
    name: "Quarterly_Memo_Draft.pdf",
    time: "45 mins ago",
    status: "De-ink Simulation Complete",
    elements: 14,
    reused: true,
  },
  {
    name: "Invoice_Contract_Review.png",
    time: "2 hours ago",
    status: "DocumentGuard Cleared",
    elements: 6,
    reused: false,
  },
];

export default function DashboardPage() {
  return (
    <>
      <Navigation />
      <main className="pt-28 pb-20 bg-[#F9F8F3] min-h-screen">
        <div className="container-narrow">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="pill-badge mb-2">Metrics Ledger</span>
              <h1 className="text-3xl sm:text-4xl font-black text-forest tracking-tight">
                Environmental & Operational Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-charcoal/60 mt-1">
                Real-time session ledger tracking paper reuse, de-inking passes, and printer connection status.
              </p>
            </div>

            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-white text-xs font-bold transition-all shadow-sm"
            >
              <Upload className="w-3.5 h-3.5 text-lime" />
              <span>New Document in Studio</span>
            </Link>
          </div>

          {/* Prototype disclosure pill */}
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <p>
              <strong>Demo Environment:</strong> Metrics reflect active session data and mathematical benchmarks. Commercial IoT hardware telemetry will stream live when connected to RELEAF physical chambers.
            </p>
          </div>

          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {STATS.map(({ label, value, sub, icon: Icon }) => (
              <div
                key={label}
                className="bg-white p-6 rounded-3xl border border-black/5 shadow-xs card-hover flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-forest text-lime flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-black text-forest mb-0.5">{value}</p>
                  <p className="text-xs font-semibold text-charcoal/80">{label}</p>
                  <p className="text-[10px] text-charcoal/50 mt-1 font-mono">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Middle: Recent Operations Table & Hardware Status */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            {/* Recent Table */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-black/5 shadow-xs">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-extrabold text-forest">Recent Session Operations</h2>
                <span className="text-[11px] font-mono text-charcoal/40">3 records logged</span>
              </div>

              <div className="space-y-3">
                {RECENT_DOCS.map((doc) => (
                  <div
                    key={doc.name}
                    className="p-4 rounded-2xl bg-[#F9F8F3] border border-black/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-black/5 flex items-center justify-center text-primary">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-forest">{doc.name}</p>
                        <p className="text-[10px] text-charcoal/50">
                          {doc.time} • {doc.elements} vector elements
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded">
                        {doc.status}
                      </span>
                      <Link
                        href="/workspace"
                        className="text-primary hover:text-forest font-bold text-xs"
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware Status Panel */}
            <div className="lg:col-span-4 bg-forest text-white rounded-3xl p-6 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Printer className="w-5 h-5 text-lime" />
                    <h3 className="font-bold text-sm">RELEAF Printer Status</h3>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
                </div>

                <div className="space-y-3 text-xs text-sage/80 pt-2 border-t border-white/10">
                  <div className="flex justify-between">
                    <span>Driver State:</span>
                    <span className="font-semibold text-white">Browser Virtual Link</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Chamber:</span>
                    <span className="font-semibold text-white">Photothermal Laser A4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Substrate Loaded:</span>
                    <span className="font-semibold text-lime">80 gsm Recycled Bond</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Paper Reuse Mode:</span>
                    <span className="font-semibold text-white">Selective Region Lift</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <Link
                  href="/paper-compatibility"
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/15"
                >
                  <span>Configure Paper Tray</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lime" />
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
