import React, { useEffect, useState } from "react";
import "./App.css";
import { Plus } from "lucide-react";
import AnimatedBackground from "./components/AnimatedBackground";
import FormSiswa from "./components/FormSiswa";
import LoginPage from "./components/LoginPage";
import Navbar from "./components/Navbar";
import Stats from "./components/Stats";
import TableSiswa from "./components/TableSiswa";
import ToastNotification from "./components/ToastNotification";
import { APP_LOGO } from "./constants/appConfig";
import { fetchSiswaFromApi } from "./utils/studentApi";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dataSiswa, setDataSiswa] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [siswaToEdit, setSiswaToEdit] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [currentView, setCurrentView] = useState("dashboard");

  const loadSiswaFromApi = async () => {
    setIsLoading(true);
    setApiError("");
    try {
      const siswaFromApi = await fetchSiswaFromApi();
      setDataSiswa(siswaFromApi);
    } catch (error) {
      setApiError(error.message || "Terjadi kesalahan saat mengambil data.");
    } finally {
      setIsLoading(false);
    }
  };

  // Cek status login di localStorage saat aplikasi dimuat
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") setIsAuthenticated(true);
    loadSiswaFromApi();
  }, []);

  useEffect(() => {
    localStorage.setItem("siswa", JSON.stringify(dataSiswa));
  }, [dataSiswa]);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isLoggedIn", "true");
    showToast("Login Berhasil! Selamat datang Admin.");
  };

  const handleLogout = () => {
    if(window.confirm("Apakah Anda yakin ingin keluar?")) {
      setIsAuthenticated(false);
      localStorage.removeItem("isLoggedIn");
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const handleSaveSiswa = (siswa) => {
    if (siswaToEdit) {
      setDataSiswa(dataSiswa.map(s => s.id === siswa.id ? siswa : s));
      setSiswaToEdit(null);
      showToast('Data diperbarui!');
    } else {
      setDataSiswa([siswa, ...dataSiswa]);
      showToast('Data ditambahkan!');
    }
    setCurrentView("info");
  };

  const handleHapusSiswa = (id) => {
    if(window.confirm('Hapus data ini?')) {
      setDataSiswa(dataSiswa.filter(s => s.id !== id));
      showToast('Data dihapus', 'error');
    }
  };

  const handleExportCSV = () => {
    const headers = ["Nama", "NIS", "Kelas", "Nilai"];
    const csvContent = [headers.join(","), ...dataSiswa.map(s => `"${s.nama}","${s.nis}","${s.kelas}",${s.nilai}`)].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data_siswa.csv";
    link.click();
    showToast('Export berhasil!');
  };

  const filtered = dataSiswa.filter(s => s.nama.toLowerCase().includes(filter.toLowerCase()) || s.nis.includes(filter));
  const sorted = [...filtered].sort((a, b) => sortOrder === "asc" ? a.nilai - b.nilai : b.nilai - a.nilai);

  // Jika belum login, tampilkan halaman login
  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} appLogo={APP_LOGO} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-10 relative overflow-hidden animated-page">
      <AnimatedBackground variant="app" />
      <div className="relative z-10">
        <main className="max-w-5xl mx-auto px-4 py-8 animate-fade-in-up">
          <Navbar
            onLogout={handleLogout}
            appLogo={APP_LOGO}
            currentView={currentView}
            onShowDashboard={() => {
              setCurrentView("dashboard");
              setSiswaToEdit(null);
            }}
            onShowInfo={() => {
              setCurrentView("info");
              setSiswaToEdit(null);
            }}
          />
          {currentView === "dashboard" && <Stats data={dataSiswa} />}
          {currentView === "info" && (
            <>
              <div className="flex items-center justify-end mb-4">
                <button
                  onClick={() => {
                    setSiswaToEdit(null);
                    setCurrentView("form");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md"
                >
                  <Plus className="w-4 h-4" /> Tambah Siswa
                </button>
              </div>
              <TableSiswa
                data={sorted}
                hapusSiswa={handleHapusSiswa}
                handleEdit={(s) => {
                  setSiswaToEdit(s);
                  setCurrentView("form");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                setFilter={setFilter}
                setSortOrder={setSortOrder}
                handleExport={handleExportCSV}
                isLoading={isLoading}
                error={apiError}
                onRetry={loadSiswaFromApi}
              />
            </>
          )}
          {currentView === "form" && (
            <FormSiswa
              onSave={handleSaveSiswa}
              siswaToEdit={siswaToEdit}
              onCancelEdit={() => {
                setSiswaToEdit(null);
                setCurrentView("info");
              }}
            />
          )}
        </main>
      </div>
      <ToastNotification toast={toast} />
    </div>
  );
}