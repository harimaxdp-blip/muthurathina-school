import { Users, UserCheck, BookOpen, Medal } from "lucide-react";

const STATS = [
  { icon: Users, value: "2500+", label: "Students", color: "text-blue-600 bg-blue-50" },
  { icon: UserCheck, value: "150+", label: "Teachers", color: "text-emerald-600 bg-emerald-50" },
  { icon: BookOpen, value: "35+", label: "Years of Excellence", color: "text-violet-600 bg-violet-50" },
  { icon: Medal, value: "100+", label: "Awards Won", color: "text-gold-dark bg-gold/10" },
];

export default function StatsBar() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="bg-white rounded-xl shadow-card px-6 sm:px-10 py-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {STATS.map(({ icon: Icon, value, label, color }) => (
          <div key={label} className="flex items-center gap-4">
            <span className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>
              <Icon size={22} />
            </span>
            <div>
              <div className="font-display font-bold text-2xl text-navy leading-none">{value}</div>
              <div className="text-sm text-slate-500 mt-1">{label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
