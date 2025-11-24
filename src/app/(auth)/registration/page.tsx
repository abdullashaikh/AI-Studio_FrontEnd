"use client"

import Link from "next/link";
import React from "react";

// RegistrationPage (UI-only) — Tailwind + React
// Usage: import { RegistrationPage } from './path-to-file';

export default function RegistrationPage() {
  const [method, setMethod] = React.useState("email"); // 'email' or 'phone'
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [otpSent, setOtpSent] = React.useState(false);
  const [otp, setOtp] = React.useState("");
  const [step, setStep] = React.useState("form"); // 'form' | 'otp' | 'done'
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [resendTimer, setResendTimer] = React.useState(0);

  React.useEffect(() => {
    let t;
    if (resendTimer > 0) {
      t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    }
    return () => clearTimeout(t);
  }, [resendTimer]);

  function validateContact() {
    if (method === "email") {
      return /\S+@\S+\.\S+/.test(contact);
    }
    // simple phone validation (adjust per your needs)
    return /^\+?\d{7,15}$/.test(contact.replace(/\s+/g, ""));
  }

  function handleSendOtp(e) {
    e?.preventDefault();
    setError("");

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter first and last name.");
      return;
    }

    if (!validateContact()) {
      setError(method === "email" ? "Enter a valid email." : "Enter a valid phone number (include country code).");
      return;
    }

    // Mock sending OTP (UI-only). Replace with real API call.
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
      setStep("otp");
      setResendTimer(30); // 30s cooldown to resend
    }, 900);
  }

  function handleVerifyOtp(e) {
    e?.preventDefault();
    setError("");
    if (!/^[0-9]{4,6}$/.test(otp)) {
      setError("Enter the OTP sent to you (4-6 digits).");
      return;
    }

    // Mock verify
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("done");
    }, 900);
  }

  function handleResend(e) {
    e?.preventDefault();
    if (resendTimer > 0) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOtp("");
      setOtpSent(true);
      setResendTimer(30);
    }, 700);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-sky-50 p-6">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white text-xl font-semibold shadow-md">
              R
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-800">Create your account</h2>
              <p className="text-sm text-slate-500">Just first name, last name and one contact — verify with OTP.</p>
            </div>
          </div>

          {step === "form" && (
            <>
              <form className="space-y-4" onSubmit={handleSendOtp}>
                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm font-medium text-slate-600">First name</span>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" required placeholder="John" className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-600">Last name</span>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" required placeholder="Doe" className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                  </label>
                </div>

                <div className="mt-1">
                  <span className="text-sm font-medium text-slate-600">Verify using</span>
                  <div className="mt-2 inline-flex rounded-lg bg-slate-50 border border-slate-100 p-1">
                    <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${method === 'email' ? 'bg-white shadow' : ''}`}>
                      <input type="radio" name="method" checked={method === 'email'} onChange={() => setMethod('email')} className="hidden" />
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-11z" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 6.5l-9 6-9-6" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm">Email</span>
                    </label>

                    <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer ${method === 'phone' ? 'bg-white shadow' : ''}`}>
                      <input type="radio" name="method" checked={method === 'phone'} onChange={() => setMethod('phone')} className="hidden" />
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M22 16.92V19a2 2 0 0 1-2 2c-10.5 0-19-8.5-19-19A2 2 0 0 1 4 0h2.09a1 1 0 0 1 1 .75l.7 3a1 1 0 0 1-.27.95L6.16 6.5a16 16 0 0 0 7.34 7.34l.8-1.36a1 1 0 0 1 .95-.27l3 .7a1 1 0 0 1 .75 1V16.92z" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="text-sm">Phone</span>
                    </label>
                  </div>
                </div>

                <label className="block">
                  <span className="text-sm font-medium text-slate-600 mt-2">{method === 'email' ? 'Email address' : 'Phone number'}</span>
                  <div className="mt-1 relative">
                    <input value={contact} onChange={(e) => setContact(e.target.value)} type="text" required placeholder={method === 'email' ? 'you@example.com' : '+91 98765 43210'} className="block w-full rounded-xl border border-slate-200 px-4 py-3 pr-32 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                    <div className="absolute top-1/2 right-2 -translate-y-1/2">
                      <button onClick={handleSendOtp} className="inline-flex items-center gap-2 bg-emerald-600 text-white px-3 py-2 rounded-xl font-medium shadow hover:bg-emerald-700 transition" type="button">{loading ? 'Sending...' : 'Get OTP'}</button>
                    </div>
                  </div>
                </label>

                {error && <div className="text-sm text-red-600">{error}</div>}

                <div className="mt-2 flex justify-between items-center">
                  <button type="submit" onClick={handleSendOtp} className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium shadow hover:bg-emerald-700 transition">Continue</button>
                  <a href="#" className="text-sm text-slate-500 hover:underline"></a>

                  <Link href="/login" className="text-emerald-600 font-medium hover:underline">
                    Already have an account?
                  </Link>
                </div>
              </form>
              <>
                {/* Divider */}
                <div className="flex items-center my-4">
                  <div className="flex-1 h-px bg-slate-200"></div>
                  <span className="px-3 text-xs text-slate-500">OR</span>
                  <div className="flex-1 h-px bg-slate-200"></div>
                </div>
                {/* Google Signup Button */}
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


              </>
            </>
          )}

          {step === "otp" && (
            <form className="space-y-4" onSubmit={handleVerifyOtp}>
              <div className="text-sm text-slate-600">Enter the OTP sent to <strong className="text-slate-800">{contact}</strong></div>

              <div className="flex gap-2 mt-3">
                <input maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))} placeholder="123456" className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <div className="flex items-center justify-between">
                <button type="submit" className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium shadow hover:bg-emerald-700 transition">{loading ? 'Verifying...' : 'Verify OTP'}</button>

                <div className="text-sm text-slate-500">
                  {resendTimer > 0 ? (
                    <span>Resend in {resendTimer}s</span>
                  ) : (
                    <button onClick={handleResend} className="text-emerald-600 hover:underline">Resend</button>
                  )}
                </div>
              </div>
            </form>
          )}

          {step === "done" && (
            <div className="space-y-4">
              <div className="text-lg font-semibold text-slate-800">You're all set 🎉</div>
              <p className="text-sm text-slate-500">Account created for <strong>{firstName} {lastName}</strong>. You can now continue to the dashboard.</p>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-medium shadow hover:bg-indigo-700 transition">Go to dashboard</button>
                <button onClick={() => { setStep('form'); setOtp(''); setOtpSent(false); }} className="inline-flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-xl font-medium">Create another</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Usage note ---------------- */
// This is a UI-only implementation. To integrate with real OTP and registration backends:
// 1. Replace setTimeout mocks in handleSendOtp / handleVerifyOtp / handleResend with API calls.
// 2. On send-otp endpoint provide contact and method; on verify-otp provide code and a session token.
// 3. Securely create user record server-side and return authentication token on success.
// 4. Add error handling for server responses and accessibility improvements as needed.
