import React from "react";
import { Users, TrendingUp, Award, GraduationCap } from "lucide-react";

const Stats = ({ data = [] }) => {
  const totalSiswa = data.length;
  const rataRata = totalSiswa > 0 ? (data.reduce((acc, curr) => acc + Number(curr.nilai), 0) / totalSiswa).toFixed(1) : 0;
  const nilaiTertinggi = totalSiswa > 0 ? Math.max(...data.map((d) => Number(d.nilai))) : 0;
  const siswaLulus = data.filter((d) => Number(d.nilai) >= 75).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {[
        { label: "Total Siswa", value: totalSiswa, icon: Users, color: "blue" },
        { label: "Rata-rata", value: rataRata, icon: TrendingUp, color: "indigo" },
        { label: "Tertinggi", value: nilaiTertinggi, icon: Award, color: "green" },
        { label: "Lulus", value: siswaLulus, icon: GraduationCap, color: "emerald" },
      ].map((card, i) => (
        <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className={`bg-${card.color}-50 p-3 rounded-xl text-${card.color}-600`}>
            <card.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">{card.label}</p>
            <p className="text-2xl font-bold text-slate-800">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;

