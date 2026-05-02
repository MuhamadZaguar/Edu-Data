import React from 'react';
import { Award } from 'lucide-react';

const TopSiswa = ({ data = [] }) => {
  const top = [...data].sort((a, b) => Number(b.nilai) - Number(a.nilai)).slice(0, 10);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Award className="w-5 h-5 text-amber-400" /> Top 10 Nilai Tertinggi</h2>
        <p className="text-sm text-slate-500">Menampilkan {top.length} siswa</p>
      </div>
      <ol className="space-y-2">
        {top.length > 0 ? top.map((s, idx) => (
          <li key={s.id} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition">
            <div className="flex items-center gap-3">
              <div className="w-8 text-indigo-600 font-bold">{idx + 1}</div>
              <div>
                <div className="font-medium text-slate-800">{s.nama}</div>
                <div className="text-xs text-slate-500">{s.kelas} · {s.nis}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {idx === 0 && <Award className="w-5 h-5 text-yellow-400" />}
              {idx === 1 && <Award className="w-5 h-5 text-slate-400" />}
              {idx === 2 && <Award className="w-5 h-5 text-amber-700" />}
              <div className="text-sm font-bold text-slate-800">{s.nilai}</div>
            </div>
          </li>
        )) : (
          <li className="text-sm text-slate-400">Belum ada data siswa</li>
        )}
      </ol>
    </div>
  );
};

export default TopSiswa;
