export default function Button({ children, loading, ...props }) {
    return (
      <button
        {...props}
        className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white 
        px-4 py-2 w-full rounded-xl font-medium shadow hover:bg-emerald-700 transition"
      >
        {loading ? "Please wait..." : children}
      </button>
    );
  }
  