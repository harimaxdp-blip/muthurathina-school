import Header from "./components/Header";
import Hero from "./components/Hero";
import UpcomingEvents from "./components/UpcomingEvents";
import StatsBar from "./components/StatsBar";

export default function App() {
  return (
    <div className="min-h-screen font-body bg-[#F4F6FA]">
      <Header />
      <Hero />
      <UpcomingEvents />
      <StatsBar />
    </div>
  );
}
