import React from "react";
import { Users, Search, ArrowUpDown, Download, Edit, Trash2 } from "lucide-react";

const TableSiswa = ({
  data = [],
  hapusSiswa,
  handleEdit,
  setFilter,
  setSortOrder,
  handleExport,
  isLoading,
  error,
  onRetry,
}) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between md:items-center gap-4 bg-slate-50/70">
      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        <Users className="text-indigo-600 w-5 h-5" /> Daftar Siswa
      </h2>
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari nama / NIS..."
            onChange={(e) => setFilter(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <button
          onClick={() => setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))}
          className="p-2.5 border border-slate-200 rounded-lg hover:bg-white text-slate-600"
          title="Urutkan nilai"
        >
          <ArrowUpDown className="w-4 h-4" />
        </button>
        <button
          onClick={handleExport}
          className="p-2.5 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-100"
          title="Export CSV"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
          <tr>
            <th className="px-6 py-4">Foto</th>
            <th className="px-6 py-4">Nama</th>
            <th className="px-6 py-4">Username</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Telepon</th>
            <th className="px-6 py-4">Kota</th>
            <th className="px-6 py-4">Perusahaan</th>
            <th className="px-6 py-4">NIS</th>
            <th className="px-6 py-4">Kelas</th>
            <th className="px-6 py-4">Nilai</th>
            <th className="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {isLoading ? (
            <tr>
              <td colSpan="12" className="px-6 py-10 text-center text-slate-500 font-medium">
                Memuat data dari API...
              </td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="12" className="px-6 py-8 text-center">
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 inline-block">
                  <p className="font-semibold">Gagal mengambil data API</p>
                  <p className="text-sm mt-1">{error}</p>
                  <button onClick={onRetry} className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg">
                    Coba Lagi
                  </button>
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <img
                    src={s.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(s.nama || "Siswa")}&background=4f46e5&color=fff`}
                    alt={s.nama}
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                  />
                </td>
                <td className="px-6 py-4 font-medium">{s.nama}</td>
                <td className="px-6 py-4 text-slate-600">{s.username || "-"}</td>
                <td className="px-6 py-4 text-slate-600">{s.email || "-"}</td>
                <td className="px-6 py-4 text-slate-600">{s.phone || "-"}</td>
                <td className="px-6 py-4 text-slate-600">{s.kota || "-"}</td>
                <td className="px-6 py-4 text-slate-600">{s.perusahaan || "-"}</td>
                <td className="px-6 py-4 text-slate-500">{s.nis}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-0.5 bg-slate-100 rounded text-xs">{s.kelas}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded font-bold text-xs ${s.nilai >= 75 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {s.nilai}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleEdit(s)} className="p-1.5 text-slate-400 hover:text-orange-500">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => hapusSiswa(s.id)} className="p-1.5 text-slate-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" className="px-6 py-10 text-center text-slate-400">
                Data tidak ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default TableSiswa;

