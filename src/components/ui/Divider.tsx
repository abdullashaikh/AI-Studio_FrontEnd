export default function Divider({ label }: { label?: string }) {
    return (
      <div className="my-6 flex items-center gap-3">
        <div className="flex-1 h-px bg-slate-200" />
        {label && <div className="text-xs text-slate-400 uppercase">{label}</div>}
        <div className="flex-1 h-px bg-slate-200" />
      </div>
    );
  }
  