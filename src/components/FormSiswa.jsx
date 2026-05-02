import React, { useEffect, useState } from "react";
import { Edit, UserPlus, X, Plus } from "lucide-react";

const FormSiswa = ({ onSave, siswaToEdit, onCancelEdit }) => {
  const [formData, setFormData] = useState({ nama: "", nis: "", kelas: "", nilai: "" });

  useEffect(() => {
    if (siswaToEdit) setFormData(siswaToEdit);
    else setFormData({ nama: "", nis: "", kelas: "", nilai: "" });
  }, [siswaToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.nis || !formData.kelas || !formData.nilai) return;
    onSave({
      id: siswaToEdit ? siswaToEdit.id : Date.now(),
      nama: formData.nama,
      nis: formData.nis,
      kelas: formData.kelas,
      nilai: Number(formData.nilai),
    });
    setFormData({ nama: "", nis: "", kelas: "", nilai: "" });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          {siswaToEdit ? <Edit className="text-orange-500 w-5 h-5" /> : <UserPlus className="text-indigo-600 w-5 h-5" />}
          <h2 className="text-lg font-bold text-slate-800">{siswaToEdit ? "Edit Data Siswa" : "Tambah Data Siswa"}</h2>
        </div>
        {siswaToEdit && (
          <button onClick={onCancelEdit} className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1">
            <X className="w-4 h-4" /> Batal
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="md:col-span-2 space-y-1.5">
          <label className="text-sm font-medium text-slate-600">Nama Lengkap</label>
          <input
            type="text"
            value={formData.nama}
            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-600">NIS</label>
          <input
            type="text"
            value={formData.nis}
            onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white outline-none"
            required
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-600">Kls / Nilai</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="w-1/2 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50"
              value={formData.kelas}
              onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
              required
            />
            <input
              type="number"
              className="w-1/2 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50"
              value={formData.nilai}
              onChange={(e) => setFormData({ ...formData, nilai: e.target.value })}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className={`w-full text-white font-medium px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${siswaToEdit ? "bg-orange-500" : "bg-indigo-600"}`}
        >
          {siswaToEdit ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {siswaToEdit ? "Update" : "Simpan"}
        </button>
      </form>
    </div>
  );
};

export default FormSiswa;

