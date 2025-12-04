export default function Input({ label, error, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      <input
        {...props}
        className={`mt-1 block w-full rounded-xl border px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 ${error
            ? "border-red-500 focus:ring-red-300"
            : "border-slate-200 focus:ring-emerald-300"
          }`}
      />
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </label>
  );
}
