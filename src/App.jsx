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
import StudentManager from "./utils/StudentManager";

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
    const manager = new StudentManager(dataSiswa);
    if (siswaToEdit) {
      setDataSiswa(manager.updateStudent(siswa));
      setSiswaToEdit(null);
      showToast('Data diperbarui!');
    } else {
      setDataSiswa(manager.addStudent(siswa));
      showToast('Data ditambahkan!');
    }
    setCurrentView("info");
  };

  const handleHapusSiswa = (id) => {
    if(window.confirm('Hapus data ini?')) {
      const manager = new StudentManager(dataSiswa);
      setDataSiswa(manager.deleteStudent(id));
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
  const topStudents = new StudentManager(dataSiswa).getTopStudents(10);

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
          {currentView === "dashboard" && (
            <section className="space-y-4">
              <Stats data={dataSiswa} />
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 md:p-6 border-b border-slate-100 bg-slate-50/70">
                  <h2 className="text-lg font-bold text-slate-800">10 Siswa dengan Nilai Tertinggi</h2>
                  <p className="text-sm text-slate-500 mt-1">Data diurutkan dari nilai paling tinggi</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Peringkat</th>
                        <th className="px-6 py-4">Nama</th>
                        <th className="px-6 py-4">NIS</th>
                        <th className="px-6 py-4">Kelas</th>
                        <th className="px-6 py-4">Nilai</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {topStudents.length > 0 ? (
                        topStudents.map((siswa, index) => (
                          <tr key={siswa.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-indigo-600">#{index + 1}</td>
                            <td className="px-6 py-4 font-medium text-slate-800">{siswa.nama}</td>
                            <td className="px-6 py-4 text-slate-500">{siswa.nis}</td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-0.5 bg-slate-100 rounded text-xs">{siswa.kelas}</span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 rounded font-bold text-xs bg-green-100 text-green-700">{siswa.nilai}</span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-10 text-center text-slate-400">
                            Belum ada data siswa
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
          {currentView === "info" && (
            <section className="space-y-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">Informasi Siswa</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Menampilkan {sorted.length} dari {dataSiswa.length} data siswa
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSiswaToEdit(null);
                    setCurrentView("form");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md"
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
            </section>
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