import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-sky-50 p-6">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white text-xl font-semibold shadow-md">
            AS
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">Welcome back</h1>
            <p className="text-sm text-slate-500">Sign in to continue</p>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
