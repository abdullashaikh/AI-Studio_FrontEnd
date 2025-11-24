"use client";

import React from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleReset(e) {
    e.preventDefault();
    setError("");

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Enter a valid email.");
      return;
    }

    setLoading(true);

    // Mock API — replace with backend call
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Forgot Password</h2>
        <p className="text-sm text-slate-500 mb-6">
          Enter your email address and we’ll send you a reset link.
        </p>

        {!sent ? (
          <form onSubmit={handleReset} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-600">Email</span>
              <input
                type="email"
                className="mt-1 w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-300"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white rounded-xl py-3 font-medium shadow hover:bg-emerald-700 transition"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="text-green-600 font-medium">
              Reset link sent to <strong>{email}</strong>
            </div>
            <p className="text-sm text-slate-500">Check your inbox and follow the instructions.</p>
          </div>
        )}
      </div>
    </div>
  );
}
