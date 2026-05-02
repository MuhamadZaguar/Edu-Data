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
    <section className="space-y-4 mb-8">
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800">{siswaToEdit ? "Edit Data Siswa" : "Tambah Data Siswa"}</h2>
        <p className="text-sm text-slate-500 mt-1">
          {siswaToEdit
            ? "Perbarui data siswa yang dipilih lalu simpan perubahan."
            : "Isi data siswa secara lengkap untuk menambahkan ke daftar informasi siswa."}
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            {siswaToEdit ? <Edit className="text-orange-500 w-5 h-5" /> : <UserPlus className="text-indigo-600 w-5 h-5" />}
            <h3 className="text-lg font-bold text-slate-800">Form Data Siswa</h3>
          </div>
          {siswaToEdit && (
            <button onClick={onCancelEdit} className="text-sm text-slate-500 hover:text-slate-800 flex items-center gap-1">
              <X className="w-4 h-4" /> Batal
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
              <input
                type="text"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Contoh: Budi Santoso"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">NIS</label>
              <input
                type="text"
                value={formData.nis}
                onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Contoh: NIS001"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Kelas</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.kelas}
                onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                placeholder="Contoh: XII IPA 1"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Nilai</label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={formData.nilai}
                onChange={(e) => setFormData({ ...formData, nilai: e.target.value })}
                placeholder="0 - 100"
                required
              />
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-2">
            {siswaToEdit && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition-all"
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              className={`w-full sm:w-auto text-white font-semibold px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 ${
                siswaToEdit ? "bg-orange-500 hover:bg-orange-600" : "bg-indigo-600 hover:bg-indigo-700"
              } transition-all shadow-sm`}
            >
              {siswaToEdit ? <Edit className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {siswaToEdit ? "Update Data" : "Simpan Data"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default FormSiswa;

