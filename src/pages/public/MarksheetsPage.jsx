const subjects = [
  ["English", "82", "100", "A"],
  ["Mathematics", "92", "100", "A+"],
  ["Physics", "88", "100", "A+"],
  ["Chemistry", "84", "100", "A"],
  ["Urdu", "80", "100", "A"]
];

export default function MarksheetsPage() {
  const total = subjects.reduce(
    (sum, subject) => sum + Number(subject[1]),
    0
  );

  const maximum = subjects.reduce(
    (sum, subject) => sum + Number(subject[2]),
    0
  );

  const percentage = ((total / maximum) * 100).toFixed(1);

  return (
    <div>
      <div className="mb-8">
        <div className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-400">
          Academic Records
        </div>

        <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">
          Marksheets
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Academic performance overview for the current examination session.
        </p>
      </div>

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <Metric label="Total Marks" value={`${total}/${maximum}`} />
        <Metric label="Percentage" value={`${percentage}%`} />
        <Metric label="Overall Grade" value="A+" />
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/70 shadow-floating backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="border-b border-slate-200/70 bg-slate-50/70 dark:border-slate-700/70 dark:bg-slate-800/50">
              <tr>
                {["Subject", "Obtained", "Total", "Grade"].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-4 text-xs font-black uppercase tracking-[0.12em] text-slate-400"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {subjects.map(([subject, obtained, totalMarks, grade]) => (
                <tr
                  key={subject}
                  className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                >
                  <td className="px-6 py-5 font-bold text-slate-800 dark:text-slate-100">
                    {subject}
                  </td>

                  <td className="px-6 py-5 text-slate-500 dark:text-slate-400">
                    {obtained}
                  </td>

                  <td className="px-6 py-5 text-slate-500 dark:text-slate-400">
                    {totalMarks}
                  </td>

                  <td className="px-6 py-5">
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-black text-emerald-600 dark:text-emerald-400">
                      {grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/70 p-5 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-900/70">
      <div className="text-sm font-semibold text-slate-400">
        {label}
      </div>

      <div className="mt-3 text-3xl font-black text-slate-900 dark:text-white">
        {value}
      </div>
    </div>
  );
}