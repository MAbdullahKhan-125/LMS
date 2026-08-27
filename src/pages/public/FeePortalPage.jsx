import { AlertCircle, CheckCircle2, ReceiptText } from "lucide-react";

export default function FeePortalPage() {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <div className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
          Financial Center
        </div>

        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
          Fee Portal
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          View challans, payment status, and upcoming fee deadlines.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-floating backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600">
              <ReceiptText size={23} />
            </div>

            <span className="rounded-full bg-gold-500/10 px-3 py-1 text-xs font-bold text-gold-600">
              Pending
            </span>
          </div>

          <h2 className="mt-6 text-xl font-black text-slate-900 dark:text-white">
            Monthly Tuition Fee
          </h2>

          <div className="mt-2 text-sm text-slate-400">
            Challan #EDU-2027-0142
          </div>

          <div className="mt-6 text-4xl font-black text-slate-900 dark:text-white">
            PKR 12,500
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <AlertCircle size={16} />
            Due in 12 days
          </div>

          <button className="mt-6 w-full rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-glow-emerald transition hover:bg-emerald-700">
            View Challan
          </button>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-floating backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600">
            <CheckCircle2 size={23} />
          </div>

          <h2 className="mt-6 text-xl font-black text-slate-900 dark:text-white">
            Payment Summary
          </h2>

          <div className="mt-5 space-y-4">
            <SummaryRow label="Paid this session" value="PKR 75,000" />
            <SummaryRow label="Pending challans" value="01" />
            <SummaryRow label="Payment status" value="Good Standing" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 dark:border-slate-800">
      <span className="text-sm text-slate-400">{label}</span>
      <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
        {value}
      </span>
    </div>
  );
}