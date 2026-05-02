import React, { useEffect, useState } from "react";
import { Edit, UserPlus, X, Plus } from "lucide-react";

const FormSiswa = ({ onSave, siswaToEdit, onCancelEdit }) => {
  const initialFormData = {
    nama: "",
    foto: "",
    username: "",
    email: "",
    phone: "",
    kota: "",
    perusahaan: "",
    website: "",
    nis: "",
    kelas: "",
    nilai: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (siswaToEdit) setFormData({ ...initialFormData, ...siswaToEdit });
    else setFormData(initialFormData);
  }, [siswaToEdit]);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, foto: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.username || !formData.email || !formData.nis || !formData.kelas || !formData.nilai) return;
    onSave({
      id: siswaToEdit ? siswaToEdit.id : Date.now(),
      nama: formData.nama,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      kota: formData.kota,
      perusahaan: formData.perusahaan,
      website: formData.website,
      nis: formData.nis,
      kelas: formData.kelas,
      nilai: Number(formData.nilai),
      foto: formData.foto,
    });
    setFormData(initialFormData);
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
          {/* Foto & Upload (selalu tampil sebagai preview) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-slate-700 mb-3">Foto Siswa</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <img
                src={formData.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.nama || "Siswa")}&background=4f46e5&color=fff`}
                alt="Foto siswa"
                className="w-24 h-24 rounded-xl object-cover border border-slate-200 bg-white"
              />
              <div className="flex-1">
                <label htmlFor="foto" className="block text-sm font-medium text-slate-700 mb-2">
                  Upload Foto
                </label>
                <input
                  id="foto"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full text-sm text-slate-600 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white file:font-semibold hover:file:bg-indigo-700"
                />
                <p className="text-xs text-slate-500 mt-2">Unggah foto (opsional). Format: JPG/PNG. Maks ~2MB.</p>
              </div>
              {formData.foto && (
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, foto: "" }))}
                  className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-100"
                >
                  Hapus Foto
                </button>
              )}
            </div>
          </div>

          {/* Informasi Umum */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Informasi Umum</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="nama" className="text-sm font-semibold text-slate-700">Nama Lengkap</label>
                <input
                  id="nama"
                  type="text"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Contoh: Budi Santoso"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="username" className="text-sm font-semibold text-slate-700">Username</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Contoh: budi123"
                  required
                />
              </div>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Kontak</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">Email</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Contoh: siswa@email.com"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="phone" className="text-sm font-semibold text-slate-700">No. Telepon</label>
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Contoh: 08123456789"
                />
              </div>
            </div>
          </div>

          {/* Lokasi & Pekerjaan (opsional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="kota" className="text-sm font-semibold text-slate-700">Kota</label>
              <input
                id="kota"
                type="text"
                value={formData.kota}
                onChange={(e) => setFormData({ ...formData, kota: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Contoh: Surabaya"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="perusahaan" className="text-sm font-semibold text-slate-700">Perusahaan</label>
              <input
                id="perusahaan"
                type="text"
                value={formData.perusahaan}
                onChange={(e) => setFormData({ ...formData, perusahaan: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Contoh: Romaguera-Crona"
              />
            </div>
          </div>

          {/* Akademik */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Akademik</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="website" className="text-sm font-semibold text-slate-700">Website</label>
                <input
                  id="website"
                  type="text"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Contoh: sekolah.sch.id"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="nis" className="text-sm font-semibold text-slate-700">NIS</label>
                <input
                  id="nis"
                  type="text"
                  value={formData.nis}
                  onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="Contoh: NIS001"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-1.5">
                <label htmlFor="kelas" className="text-sm font-semibold text-slate-700">Kelas</label>
                <input
                  id="kelas"
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  value={formData.kelas}
                  onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                  placeholder="Contoh: XII IPA 1"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="nilai" className="text-sm font-semibold text-slate-700">Nilai</label>
                <input
                  id="nilai"
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

