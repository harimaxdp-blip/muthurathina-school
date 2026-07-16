import { Clock, MapPin, ArrowRight } from "lucide-react";

const EVENTS = [
  {
    day: "15",
    month: "JUN",
    title: "Science Exhibition",
    body: "Showcasing young innovators",
    time: "09:00 AM - 01:00 PM",
    place: "School Auditorium",
  },
  {
    day: "22",
    month: "JUN",
    title: "Annual Sports Day",
    body: "Strength. Speed. Spirit.",
    time: "08:30 AM - 02:30 PM",
    place: "School Ground",
  },
  {
    day: "05",
    month: "JUL",
    title: "Literary Fest",
    body: "Words that inspire",
    time: "10:00 AM - 12:30 PM",
    place: "Smart Classroom",
  },
];

export default function UpcomingEvents() {
  return (
    <section id="events" className="max-w-[1200px] mx-auto px-6 pt-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-navy">
            Upcoming Events
          </h2>
          <span className="block w-14 h-1 bg-gold mt-2" />
        </div>
        <a
          href="#events"
          className="hidden sm:flex items-center gap-1.5 text-navy font-medium text-sm hover:text-gold transition-colors"
        >
          View All Events
          <ArrowRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EVENTS.map((ev) => (
          <div
            key={ev.title}
            className="bg-white rounded-xl shadow-card p-5 flex gap-4 hover:-translate-y-1 transition-transform"
          >
            <div className="shrink-0 w-16 h-16 rounded-lg bg-navy text-white flex flex-col items-center justify-center">
              <span className="font-display font-bold text-xl leading-none">{ev.day}</span>
              <span className="text-[11px] tracking-widest text-gold mt-1">{ev.month}</span>
            </div>
            <div className="min-w-0">
              <h3 className="font-display font-semibold text-navy text-base">{ev.title}</h3>
              <p className="text-sm text-slate-500 mb-2">{ev.body}</p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Clock size={13} />
                {ev.time}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin size={13} />
                {ev.place}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
