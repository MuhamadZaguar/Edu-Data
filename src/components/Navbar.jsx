import React from "react";
import { LogOut, List, LayoutDashboard } from "lucide-react";

const NavButton = ({ active, onClick, children, title }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    title={title}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
      active ? "bg-white text-indigo-700" : "bg-indigo-500/70 hover:bg-indigo-500 text-white"
    }`}
  >
    {children}
  </button>
);

const Navbar = ({ onLogout, appLogo, currentView, onShowDashboard, onShowInfo }) => (
  <nav className="bg-indigo-600 shadow sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
      {/* Left: logo + title */}
      <div className="flex items-center gap-4">
        <img src={appLogo} alt="EduData Logo" className="w-12 h-12 rounded-lg bg-white/10 p-1" />
        <div className="hidden sm:block">
          <h1 className="text-lg font-bold text-white tracking-wide leading-tight">EduData</h1>
          <p className="text-indigo-200 text-xs">Sistem Manajemen Siswa</p>
        </div>
      </div>

      {/* Center: navigation */}
      <div className="hidden md:flex items-center gap-3">
        <NavButton active={currentView === "dashboard"} onClick={onShowDashboard} title="Dashboard">
          <LayoutDashboard className="w-4 h-4" /> <span>Dashboard</span>
        </NavButton>
        <NavButton active={currentView === "info"} onClick={onShowInfo} title="Informasi Siswa">
          <List className="w-4 h-4" /> <span>Informasi</span>
        </NavButton>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3">
        <div className="hidden md:block text-sm text-indigo-100">Admin</div>
        <button
          onClick={onLogout}
          aria-label="Logout"
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Keluar</span>
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;

