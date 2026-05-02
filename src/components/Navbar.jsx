import React from "react";
import { LogOut, List, LayoutDashboard } from "lucide-react";

const Navbar = ({ onLogout, appLogo, currentView, onShowDashboard, onShowInfo }) => (
  <nav className="bg-indigo-600 shadow-lg sticky top-0 z-50">
    <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <img src={appLogo} alt="EduData Logo" className="w-14 h-14 rounded-lg bg-white/10 p-1 float-gentle" />
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">EduData</h1>
            <p className="text-indigo-200 text-xs font-medium">Sistem Manajemen Siswa</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onShowDashboard}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md ${
            currentView === "dashboard"
              ? "bg-white text-indigo-700"
              : "bg-indigo-500/70 hover:bg-indigo-500 text-white"
          }`}
        >
          <LayoutDashboard className="w-4 h-4" /> Dashboard
        </button>
        <button
          onClick={onShowInfo}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md ${
            currentView === "info"
              ? "bg-white text-indigo-700"
              : "bg-indigo-500/70 hover:bg-indigo-500 text-white"
          }`}
        >
          <List className="w-4 h-4" /> Informasi Siswa
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md"
        >
          <LogOut className="w-4 h-4" /> Keluar
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;

