export default function GoogleButton() {
  return (
    <button
      type="button"
      onClick={() => console.log("Google signup clicked")}
      className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-xl py-3 font-medium shadow-sm hover:bg-slate-50 transition"
    >
      <img
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
        alt="Google"
        className="w-5 h-5"
      />
      Sign up with Google
    </button>

  );
}
