import React, { useState } from "react";
import { LogIn } from "lucide-react";
import AnimatedBackground from "./AnimatedBackground";

const LoginPage = ({ onLogin, appLogo }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      onLogin();
    } else {
      setError("Username atau password salah!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 relative overflow-hidden animated-page">
      <AnimatedBackground variant="login" />
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative z-10 animate-fade-in-up">
        <div className="bg-indigo-600 p-8 text-center text-white">
          <div className="bg-white/20 w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <img src={appLogo} alt="EduData Logo" className="w-16 h-16 object-contain float-gentle" />
          </div>
          <h2 className="text-2xl font-bold">Edu Data</h2>
          <p className="text-indigo-100 text-sm mt-1">Aplikasi Filtering Data Siswa</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center font-medium">
              {error}
            </div>
          )}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" /> Masuk Aplikasi
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

