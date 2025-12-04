"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logout } = useAuth(); // if you have logout function

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* ---------------- LEFT SIDEBAR ---------------- */}
      <aside
        className={`bg-white shadow-md border-r border-slate-200 transition-all duration-300 
        ${sidebarOpen ? "w-64" : "w-20"} hidden md:flex flex-col`}
      >
        <div className="flex items-center gap-3 p-4">
          <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex justify-center items-center font-bold">
            AS
          </div>
          {sidebarOpen && (
            <h1 className="text-lg font-semibold text-slate-700">Dashboard</h1>
          )}
        </div>

        <nav className="mt-4 flex flex-col gap-1">
          <Link href="/home" className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md">
            Home
          </Link>
          <Link href="/projects" className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md">
            Projects
          </Link>
          <Link href="/settings" className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md">
            Settings
          </Link>
        </nav>
      </aside>

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <div className="flex-1 flex flex-col">

        {/* ---------------- TOP NAVBAR ---------------- */}
        <header className="h-16 bg-white shadow-sm border-b border-slate-200 flex items-center justify-between px-4">

          {/* Sidebar Toggle (Mobile) */}
          <button
            className="md:hidden p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>

          {/* Left: Logo + App Name */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex justify-center items-center font-bold">
              AS
            </div>
            <h2 className="text-lg font-semibold text-slate-700">My App</h2>
          </div>

          {/* Right: Profile Menu */}
          <div className="relative group">
            <button className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-lg transition">
              <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex justify-center items-center">
                A
              </div>
              <span className="hidden md:block text-slate-700">Profile</span>
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 bg-white shadow-lg border border-slate-200 rounded-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition p-2 w-40">
              <Link href="/profile" className="block px-3 py-2 hover:bg-slate-100 rounded">
                My Profile
              </Link>
              <button
                onClick={logout}
                className="block w-full text-left px-3 py-2 hover:bg-slate-100 rounded text-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* ---------------- MAIN CONTENT ---------------- */}
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  );
}
