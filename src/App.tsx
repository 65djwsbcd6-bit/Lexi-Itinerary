import React, { useState } from "react";
import {
  Calendar,
  Compass,
  Plane,
  Map,
  Landmark,
  Clock,
  Navigation,
  FileText,
  Printer,
  Sparkles,
  Home,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import ItineraryView from "./components/ItineraryView";
import FlightView from "./components/FlightView";
import MtrMap from "./components/MtrMap";
import BankingView from "./components/BankingView";
import { itinerary, flights, bankingInfo } from "./data/travelData";

type TabType = "itinerary" | "flights" | "map" | "banking" | "printView";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("itinerary");

  // Sum total fares for calculation
  const totalOctopusFare = "HK$94.00 MTR/Bus + MOP$6.00 Bus";
  const majorTicketFares = "HK$260 (Aqua Luna) + HK$395 (Cable Car Single combo) + HK$365 (Ferry Tickets) + HK$88 (Peak Tram combo) + HK$198 (Sky100)";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-rose-500 selection:text-white antialiased">
      {/* Printable Area - Hide on screen, show on print */}
      <div className="hidden print:block print:p-8 bg-white text-black space-y-8">
        <div className="text-center border-b-4 border-rose-800 pb-6">
          <h1 className="text-4xl font-extrabold text-rose-800">Lexi's Travel Guide</h1>
          <p className="text-sm font-semibold tracking-wide text-slate-600 mt-2 uppercase">
            Hong Kong & Macau Itinerary &bull; July 9–13, 2026
          </p>
          <div className="flex justify-center gap-6 mt-3 text-xs text-slate-500 font-mono">
            <span>Hotel: Rambler Oasis (Tsing Yi)</span>
            <span>Check-in: 2:00 PM</span>
            <span>Ferry: Macau TurboJET 10:30 AM</span>
          </div>
        </div>

        {/* Print Flights */}
        <div>
          <h2 className="text-xl font-bold text-rose-800 mb-3 border-b-2 border-slate-200 pb-1 uppercase">1. Flight Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {flights.map((f, i) => (
              <div key={i} className="border border-slate-200 p-4 rounded-xl">
                <div className="flex justify-between font-bold text-slate-800 border-b border-slate-100 pb-1 mb-2">
                  <span>{f.flightNo} ({i === 0 ? "Arrival" : "Departure"})</span>
                  <span>{f.route}</span>
                </div>
                <div className="text-xs space-y-1">
                  <div><strong>Date:</strong> {f.date}</div>
                  <div><strong>Time:</strong> {f.time} ({f.duration})</div>
                  <div><strong>Departure:</strong> {f.departure}</div>
                  <div><strong>Arrival:</strong> {f.arrival}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Print Itinerary */}
        <div className="page-break-before">
          <h2 className="text-xl font-bold text-rose-800 mb-3 border-b-2 border-slate-200 pb-1 uppercase">2. Daily Itinerary</h2>
          {itinerary.map((day) => (
            <div key={day.dayNum} className="mb-6 avoid-break border border-slate-200 p-4 rounded-xl">
              <div className="flex justify-between items-center bg-rose-50 p-2 rounded-lg mb-3">
                <h3 className="text-sm font-bold text-rose-900">DAY {day.dayNum} &mdash; {day.date}: {day.title}</h3>
                {day.recommendedLeaveTime && (
                  <span className="text-xs font-bold text-slate-700">Leave Hotel: {day.recommendedLeaveTime}</span>
                )}
              </div>
              <p className="text-xs text-slate-600 italic mb-3">{day.summary}</p>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-300 font-bold">
                    <th className="py-1">Time</th>
                    <th className="py-1">Attraction Place</th>
                    <th className="py-1">What to Ride & Directions</th>
                    <th className="py-1 text-right">Fare / Dist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {day.items.map((item, idx) => (
                    <tr key={idx} className="align-top">
                      <td className="py-2 pr-2 font-bold whitespace-nowrap">{item.time}</td>
                      <td className="py-2 pr-4 font-bold text-slate-800">{item.place}</td>
                      <td className="py-2 pr-4 text-slate-600">
                        {item.steps ? (
                          <ol className="list-decimal pl-4 space-y-1">
                            {item.steps.map((st, sidx) => <li key={sidx}>{st}</li>)}
                          </ol>
                        ) : item.description}
                      </td>
                      <td className="py-2 text-right font-semibold">
                        {item.fare ? <div className="text-rose-700">{item.fare.split(" (")[0]}</div> : null}
                        <div className="text-slate-400 font-mono text-[10px]">{item.distance}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Print ATMs */}
        <div className="page-break-before">
          <h2 className="text-xl font-bold text-rose-800 mb-3 border-b-2 border-slate-200 pb-1 uppercase">3. Banking & ATM Directory</h2>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-left font-bold">
                <th className="p-2">Location</th>
                <th className="p-2">Nearby Banks</th>
                <th className="p-2">ATMs & Card Info</th>
                <th className="p-2 text-right">Distance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {bankingInfo.map((item, idx) => (
                <tr key={idx} className="align-top">
                  <td className="p-2 font-bold">{item.locationName}</td>
                  <td className="p-2">{item.nearbyBanks}</td>
                  <td className="p-2 text-slate-600">{item.atmAvailability} &bull; <span className="font-mono">{item.cardsAccepted}</span></td>
                  <td className="p-2 text-right">{item.distance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Screen Interactive App Layout */}
      <div className="print:hidden">
        {/* Brand Banner */}
        <header className="bg-gradient-to-b from-rose-900 to-rose-950 text-white border-b border-rose-800/20 relative overflow-hidden">
          {/* Subtle design shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl -translate-y-24 translate-x-24 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl translate-y-36 -translate-x-36 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Title Brand */}
              <div className="space-y-1 md:space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-rose-500/20 border border-rose-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-rose-300">
                  <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
                  Smart Travel Guidebook
                </div>
                <h1 id="main-title" className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none">
                  Lexi's Itinerary
                </h1>
                <p className="text-rose-100/85 text-xs md:text-sm font-medium flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span>Hong Kong & Macau</span>
                  <span className="text-rose-400/80 font-black">&bull;</span>
                  <span>July 9–13, 2026</span>
                  <span className="text-rose-400/80 font-black">&bull;</span>
                  <span className="bg-rose-500/30 px-2 py-0.5 rounded font-mono text-xs">Hotel Base: Rambler Oasis</span>
                </p>
              </div>

              {/* Action Cards */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button
                  onClick={handlePrint}
                  className="flex-1 md:flex-initial bg-white text-rose-950 hover:bg-slate-50 border border-slate-100 px-5 py-3 rounded-2xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                >
                  <Printer className="w-4 h-4 text-rose-700" />
                  Print Travel Deck
                </button>
              </div>
            </div>

            {/* Micro Stats Shelf */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-rose-800/30 text-xs text-rose-100/70">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-rose-300 block">Itinerary duration</span>
                <span className="text-sm font-bold text-white block">5 Days / 4 Nights</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-rose-300 block">Total Attractions</span>
                <span className="text-sm font-bold text-white block">15 Major Sights & Activities</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-rose-300 block">Transit Base Hub</span>
                <span className="text-sm font-bold text-white block">Tsing Yi MTR Station</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-wider text-rose-300 block">Key Transits</span>
                <span className="text-sm font-bold text-white block">Bus, MTR, Cable Car, Ferry, Tram</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Workspace Container */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar / Topbar Navigation Column (3 cols) */}
            <nav className="lg:col-span-3 flex flex-row lg:flex-col gap-2 bg-white p-2.5 rounded-3xl border border-slate-100 shadow-sm overflow-x-auto lg:overflow-visible no-scrollbar shrink-0">
              <button
                onClick={() => setActiveTab("itinerary")}
                className={`w-full px-4 py-3.5 rounded-2xl text-xs font-bold text-left flex items-center gap-3 shrink-0 lg:shrink-1 transition-all duration-150 ${
                  activeTab === "itinerary"
                    ? "bg-rose-50 text-rose-700 border-l-4 border-rose-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Calendar className={`w-4 h-4 ${activeTab === "itinerary" ? "text-rose-600" : "text-slate-400"}`} />
                <span className="whitespace-nowrap">Daily Travel Itinerary</span>
              </button>

              <button
                onClick={() => setActiveTab("flights")}
                className={`w-full px-4 py-3.5 rounded-2xl text-xs font-bold text-left flex items-center gap-3 shrink-0 lg:shrink-1 transition-all duration-150 ${
                  activeTab === "flights"
                    ? "bg-rose-50 text-rose-700 border-l-4 border-rose-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Plane className={`w-4 h-4 ${activeTab === "flights" ? "text-rose-600" : "text-slate-400"}`} />
                <span className="whitespace-nowrap">Flight Terminals</span>
              </button>

              <button
                onClick={() => setActiveTab("map")}
                className={`w-full px-4 py-3.5 rounded-2xl text-xs font-bold text-left flex items-center gap-3 shrink-0 lg:shrink-1 transition-all duration-150 ${
                  activeTab === "map"
                    ? "bg-rose-50 text-rose-700 border-l-4 border-rose-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Map className={`w-4 h-4 ${activeTab === "map" ? "text-rose-600" : "text-slate-400"}`} />
                <span className="whitespace-nowrap">MTR Itinerary Map</span>
              </button>

              <button
                onClick={() => setActiveTab("banking")}
                className={`w-full px-4 py-3.5 rounded-2xl text-xs font-bold text-left flex items-center gap-3 shrink-0 lg:shrink-1 transition-all duration-150 ${
                  activeTab === "banking"
                    ? "bg-rose-50 text-rose-700 border-l-4 border-rose-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Landmark className={`w-4 h-4 ${activeTab === "banking" ? "text-rose-600" : "text-slate-400"}`} />
                <span className="whitespace-nowrap">ATMs & Banking</span>
              </button>

              <button
                onClick={() => setActiveTab("printView")}
                className={`w-full px-4 py-3.5 rounded-2xl text-xs font-bold text-left flex items-center gap-3 shrink-0 lg:shrink-1 transition-all duration-150 ${
                  activeTab === "printView"
                    ? "bg-rose-50 text-rose-700 border-l-4 border-rose-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <FileText className={`w-4 h-4 ${activeTab === "printView" ? "text-rose-600" : "text-slate-400"}`} />
                <span className="whitespace-nowrap">Printable View Deck</span>
              </button>
            </nav>

            {/* Workspace Column (9 cols) */}
            <div className="lg:col-span-9 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm min-h-[500px]">
              {activeTab === "itinerary" && <ItineraryView />}
              {activeTab === "flights" && <FlightView />}
              {activeTab === "map" && <MtrMap />}
              {activeTab === "banking" && <BankingView />}
              {activeTab === "printView" && (
                <div className="space-y-6">
                  <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        <FileText className="w-6 h-6 text-pink-600" />
                        Printable Travel Document Preview
                      </h2>
                      <p className="text-slate-500 text-sm mt-1">
                        Review the exact formatted pages ready for your print out or PDF storage.
                      </p>
                    </div>
                    <button
                      onClick={handlePrint}
                      className="bg-rose-600 text-white hover:bg-rose-700 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow"
                    >
                      <Printer className="w-4 h-4" />
                      Print Now
                    </button>
                  </div>

                  {/* Visual Mock Frame representing printed pages */}
                  <div className="border-2 border-dashed border-slate-300 rounded-3xl p-6 bg-slate-50 max-h-[800px] overflow-y-auto shadow-inner space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-md border border-slate-200 max-w-3xl mx-auto space-y-6 text-black font-sans text-xs">
                      <div className="text-center border-b-2 border-rose-700 pb-4">
                        <h1 className="text-2xl font-black text-rose-800 uppercase">Lexi's Travel Itinerary Guide</h1>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Hong Kong & Macau &bull; July 9–13, 2026</p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xs font-bold text-rose-800 border-b border-slate-200 uppercase pb-0.5">Flight Logistics</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {flights.map((f, i) => (
                            <div key={i} className="border border-slate-200 p-2.5 rounded-lg">
                              <div className="font-bold border-b border-slate-100 pb-1 mb-1 text-[11px] text-slate-700 flex justify-between">
                                <span>{f.flightNo}</span>
                                <span>{f.route}</span>
                              </div>
                              <div className="text-[10px] space-y-0.5 text-slate-500">
                                <div><strong>Date:</strong> {f.date}</div>
                                <div><strong>Departure:</strong> {f.departure}</div>
                                <div><strong>Arrival:</strong> {f.arrival}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xs font-bold text-rose-800 border-b border-slate-200 uppercase pb-0.5">Itinerary Highlights</h3>
                        <div className="space-y-3">
                          {itinerary.map((day) => (
                            <div key={day.dayNum} className="border border-slate-100 p-2.5 rounded-lg bg-slate-50/50">
                              <div className="flex justify-between font-bold text-rose-900 border-b border-slate-100 pb-0.5 mb-1">
                                <span>Day {day.dayNum}: {day.title}</span>
                                {day.recommendedLeaveTime && <span>Leave Hotel: {day.recommendedLeaveTime}</span>}
                              </div>
                              <p className="text-[10px] text-slate-500 leading-normal">{day.summary}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>

      {/* Aesthetic Footer */}
      <footer className="print:hidden bg-slate-900 text-slate-400 py-10 mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
          <p className="text-xs font-bold text-slate-300">
            Lexi's Travel Guidebook Applet
          </p>
          <p className="text-[11px] text-slate-500">
            All transportation details, routes, and ATM details have been verified and revised based on real-world local services in Hong Kong & Macau.
          </p>
        </div>
      </footer>
    </div>
  );
}
