import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import {
  FileText,
  Upload,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Leaf,
  Printer,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Environmental Impact Dashboard — RELEAF",
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
      <main className="pt-28 pb-20 bg-[#F4F0E6] min-h-screen">
        <div className="container-narrow">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="cobalt-tag mb-2">METRICS LEDGER</span>
              <h1 className="text-3xl sm:text-5xl font-black text-[#123B2A] tracking-tight">
                Environmental & Operational Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-[#626B63] mt-1 font-normal">
                Real-time session ledger tracking paper reuse, de-inking passes, and printer connection status.
              </p>
            </div>

            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xs bg-[#123B2A] hover:bg-[#1B4E38] text-[#FFFDF7] text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <Upload className="w-3.5 h-3.5 text-[#D6FF52]" />
              <span>New Document in Studio</span>
            </Link>
          </div>

          {/* Prototype disclosure banner */}
          <div className="mb-8 p-4 rounded-xs bg-[#FFFDF7] border-2 border-[#123B2A] text-[#17201B] text-xs flex items-center gap-3 shadow-xs">
            <AlertTriangle className="w-4 h-4 text-[#92400E] shrink-0" />
            <p>
              <strong>Demo Environment:</strong> Metrics reflect active session data and mathematical benchmarks. Commercial IoT hardware telemetry will stream live when connected to RELEAF physical chambers.
            </p>
          </div>

          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {STATS.map(({ label, value, sub, icon: Icon }) => (
              <div
                key={label}
                className="bg-[#FFFDF7] p-6 rounded-xs border-2 border-[#123B2A] shadow-md flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div className="w-10 h-10 rounded-xs bg-[#123B2A] text-[#D6FF52] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-black font-mono text-[#123B2A] mb-0.5">{value}</p>
                  <p className="text-xs font-bold text-[#17201B]">{label}</p>
                  <p className="text-[10px] text-[#626B63] mt-1 font-mono">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Middle: Recent Operations Table & Hardware Status */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
            {/* Recent Table */}
            <div className="lg:col-span-8 bg-[#FFFDF7] rounded-xs p-6 border-2 border-[#123B2A] shadow-md">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-black text-[#123B2A]">Recent Session Operations</h2>
                <span className="text-[11px] font-mono text-[#626B63]">3 records logged</span>
              </div>

              <div className="space-y-3 font-mono">
                {RECENT_DOCS.map((doc) => (
                  <div
                    key={doc.name}
                    className="p-4 rounded-xs bg-[#F4F0E6] border border-[#123B2A]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xs bg-[#FFFDF7] border border-[#123B2A]/20 flex items-center justify-center text-[#123B2A]">
                        <FileText className="w-4 h-4 text-[#287A50]" />
                      </div>
                      <div>
                        <p className="font-bold text-[#123B2A] font-sans">{doc.name}</p>
                        <p className="text-[10px] text-[#626B63]">
                          {doc.time} • {doc.elements} vector elements
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold bg-[#EAF4EE] text-[#287A50] px-2 py-0.5 rounded-xs border border-[#287A50]/20">
                        {doc.status}
                      </span>
                      <Link
                        href="/workspace"
                        className="text-[#123B2A] hover:text-[#287A50] font-bold text-xs"
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hardware Status Panel */}
            <div className="lg:col-span-4 bg-[#123B2A] text-[#FFFDF7] rounded-xs p-6 border-2 border-[#123B2A] shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Printer className="w-5 h-5 text-[#D6FF52]" />
                    <h3 className="font-black text-sm">RELEAF Hardware Link</h3>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D6FF52] animate-pulse" />
                </div>

                <div className="space-y-3 text-xs text-[#DDE6D8] pt-2 border-t border-white/10 font-mono">
                  <div className="flex justify-between">
                    <span>Driver State:</span>
                    <span className="font-bold text-[#FFFDF7]">Browser Virtual Link</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Chamber:</span>
                    <span className="font-bold text-[#FFFDF7]">Photothermal Laser A4</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Substrate Loaded:</span>
                    <span className="font-bold text-[#D6FF52]">80 gsm Recycled Bond</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Paper Reuse Mode:</span>
                    <span className="font-bold text-[#FFFDF7]">Selective Region Lift</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6">
                <Link
                  href="/paper-compatibility"
                  className="w-full py-3 rounded-xs bg-[#D6FF52] hover:bg-[#E5FF85] text-[#123B2A] text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Configure Paper Tray</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
