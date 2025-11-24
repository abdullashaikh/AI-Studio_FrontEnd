import Link from "next/link";
import React from "react";

// Simple, attractive login page using Tailwind CSS
// Default export a React component so you can drop this into a Next.js or CRA project.
// Tailwind must be configured in the project. No external libraries required.

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-sky-50 p-6">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white text-xl font-semibold shadow-md">
              AS
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-800">Welcome back</h1>
              <p className="text-sm text-slate-500">Sign in to continue to your dashboard</p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-slate-600">Email</span>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </label>

            <label className="block">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-600">Password</span>
                <Link href="/forgot-password" className="text-emerald-600 font-medium hover:underline">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                required
                placeholder="Enter your password"
                className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              />
            </label>

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded text-emerald-600 focus:ring-indigo-500" />
                <span className="text-slate-600">Remember me</span>
              </label>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium shadow hover:bg-emerald-700 transition"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Separator */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200" />
            <div className="text-xs text-slate-400 uppercase">or</div>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Google login button */}
          <div>
            <button
              type="button"
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:shadow-sm transition bg-white"
            >
              <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M44.5 20H24v8.5h11.9C34.9 31.9 30.2 36 24 36c-7.7 0-14-6.3-14-14s6.3-14 14-14c3.6 0 6.8 1.3 9.3 3.6l6.6-6.6C35.1 2.9 29.9 0 24 0 10.8 0 0 10.8 0 24s10.8 24 24 24c13.2 0 24-10.8 24-24 0-1.6-.1-3.1-.5-4.5z" fill="#FFC107" />
                <path d="M6.3 14.7l7.4 5.4C15.8 17.6 19.6 15 24 15c3.6 0 6.8 1.3 9.3 3.6l6.6-6.6C35.1 2.9 29.9 0 24 0 15.8 0 8.9 4.6 6.3 14.7z" fill="#FF3D00" />
                <path d="M24 48c6.1 0 11.6-2 15.9-5.4l-7.4-6.2C29.9 36.6 27 37.5 24 37.5c-6.2 0-11.6-4.1-13.5-9.6l-7.5 5.8C6.8 42.8 14.8 48 24 48z" fill="#4CAF50" />
                <path d="M44.5 20H24v8.5h11.9c-1.1 4.6-4.1 8.5-8 11l7.4 6.2C40.3 43.4 48 33.1 48 24 48 22.1 47.7 20.2 44.5 20z" fill="#1976D2" />
              </svg>
              Sign in with Google
            </button>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account? <Link href="/registration" className="text-emerald-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div className="pointer-events-none fixed -bottom-24 -right-24 opacity-40">
        <div className="w-72 h-72 rounded-3xl bg-gradient-to-br from-emerald-200 to-teal-200 blur-3xl" />
      </div>
    </div>
  );
}
