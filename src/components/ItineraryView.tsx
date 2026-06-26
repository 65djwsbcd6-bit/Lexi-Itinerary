import React, { useState } from "react";
import { Clock, Navigation, MapPin, DollarSign, Calendar, Eye, Compass, Info, ArrowRight } from "lucide-react";
import { itinerary, AttractionItem, ItineraryDay } from "../data/travelData";

export default function ItineraryView() {
  const [activeDay, setActiveDay] = useState<number>(1);

  // Dusty Rose / Berry Accent classes matching the original itinerary
  const primaryAccentBg = "bg-rose-600";
  const primaryAccentText = "text-rose-600";
  const primaryAccentBorder = "border-rose-100";

  const selectedDayData = itinerary.find((d) => d.dayNum === activeDay) || itinerary[0];

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50/50 rounded-3xl p-6 border border-rose-100/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-widest text-rose-500 font-mono flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Active Day Guide
          </div>
          <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
            DAY {selectedDayData.dayNum} &mdash; {selectedDayData.date} • {selectedDayData.title}
          </h2>
          <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-3xl">
            {selectedDayData.summary}
          </p>
        </div>

        {selectedDayData.recommendedLeaveTime && (
          <div className="bg-white px-5 py-3 rounded-2xl border border-rose-100 shadow-sm shrink-0 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase font-mono tracking-wider text-rose-500 font-bold">Recommended Departure</span>
            <span className="text-lg font-black text-slate-800 mt-0.5 flex items-center gap-1">
              <Clock className="w-4 h-4 text-rose-500 animate-pulse" />
              {selectedDayData.recommendedLeaveTime}
            </span>
          </div>
        )}
      </div>

      {/* Day Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-1.5">
        {itinerary.map((day) => (
          <button
            key={day.dayNum}
            onClick={() => setActiveDay(day.dayNum)}
            className={`px-5 py-3.5 rounded-2xl text-xs font-bold transition-all duration-150 flex items-center gap-2 ${
              activeDay === day.dayNum
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/10"
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }`}
          >
            <span className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${
              activeDay === day.dayNum ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
            }`}>
              {day.dayNum}
            </span>
            {day.date.split(" (")[0]}
          </button>
        ))}
      </div>

      {/* Disneyland Recommendation Note if Day 2 */}
      {activeDay === 2 && (
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 space-y-2">
          <div className="flex items-center gap-1.5 text-indigo-800 font-bold text-xs">
            <Info className="w-4 h-4 shrink-0" />
            <span>Recommended Ride Order (most efficient, clockwise through the park):</span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            Go to <strong>World of Frozen</strong> first since it draws the longest queues at opening, then move clockwise through Grizzly Gulch, Mystic Point, Tomorrowland, and finish with Fantasyland/Adventureland/Toy Story Land in the afternoon.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="bg-white/80 px-2 py-0.5 rounded text-[10px] text-indigo-700 font-medium">1. World of Frozen</span>
            <span className="text-slate-400 text-[10px] font-bold">➔</span>
            <span className="bg-white/80 px-2 py-0.5 rounded text-[10px] text-indigo-700 font-medium">2. Grizzly Gulch</span>
            <span className="text-slate-400 text-[10px] font-bold">➔</span>
            <span className="bg-white/80 px-2 py-0.5 rounded text-[10px] text-indigo-700 font-medium">3. Mystic Point</span>
            <span className="text-slate-400 text-[10px] font-bold">➔</span>
            <span className="bg-white/80 px-2 py-0.5 rounded text-[10px] text-indigo-700 font-medium">4. Tomorrowland</span>
            <span className="text-slate-400 text-[10px] font-bold">➔</span>
            <span className="bg-white/80 px-2 py-0.5 rounded text-[10px] text-indigo-700 font-medium">5. Fantasyland & Adventureland</span>
          </div>
        </div>
      )}

      {/* Main Day Itinerary Table & Timeline */}
      <div className="space-y-6">
        {selectedDayData.items.map((item, idx) => (
          <div
            key={item.id}
            className={`bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col md:flex-row items-stretch gap-6 relative overflow-hidden ${
              item.isFreeTime ? "bg-emerald-50/20 border-emerald-500/10" : ""
            }`}
          >
            {/* Hour Highlight Overlay Badge */}
            <div className={`absolute top-0 left-0 h-1.5 w-full ${item.isFreeTime ? "bg-emerald-500" : "bg-rose-500"}`} />

            {/* Picture Column (First Column beside place, as requested) */}
            <div className="w-full md:w-44 shrink-0 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100 min-h-[120px] relative">
              <img
                src={item.image}
                alt={item.place}
                className="w-full h-full object-cover absolute inset-0 transform hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  // Fallback if image fails to render
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=400&q=80";
                }}
              />
              <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-md text-white font-mono text-[10px] font-bold px-2 py-1 rounded">
                {item.time}
              </div>
            </div>

            {/* Place Details Column */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="text-base md:text-lg font-black text-slate-800 leading-tight">
                    {item.place}
                  </h3>
                  {item.distance && item.distance !== "—" && (
                    <span className="bg-slate-100 text-slate-600 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {item.distance}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* What to Ride - Clear, detailed, step-by-step instructions as requested */}
                {item.steps && item.steps.length > 0 && (
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100/50 space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-500 font-bold flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-rose-500" />
                      Detailed Step-by-Step Directions
                    </span>
                    <ol className="list-decimal pl-4 text-xs text-slate-700 space-y-2 leading-relaxed">
                      {item.steps.map((step, sIdx) => {
                        // Apply beautiful inline tags for MTR colors
                        let formattedStep = step;
                        let lineStyle = "";
                        if (step.includes("Tung Chung Line (Orange)")) {
                          lineStyle = "border-orange-500 text-orange-600 bg-orange-50/40";
                        } else if (step.includes("Tsuen Wan Line (Red)")) {
                          lineStyle = "border-red-500 text-red-600 bg-red-50/40";
                        } else if (step.includes("Disneyland Resort Line (Pink)")) {
                          lineStyle = "border-pink-500 text-pink-600 bg-pink-50/40";
                        } else if (step.includes("Island Line (Blue)")) {
                          lineStyle = "border-blue-500 text-blue-600 bg-blue-50/40";
                        }

                        return (
                          <li key={sIdx} className="font-medium text-slate-700">
                            {lineStyle ? (
                              <span>
                                {step.split(/(Tung Chung Line|Tsuen Wan Line|Disneyland Resort Line|Island Line)/)[0]}
                                <span className={`inline-block px-1.5 py-0.25 text-[10px] font-black rounded border ${lineStyle}`}>
                                  {step.match(/(Tung Chung Line|Tsuen Wan Line|Disneyland Resort Line|Island Line)/)?.[0]}
                                </span>
                                {step.split(/(Tung Chung Line|Tsuen Wan Line|Disneyland Resort Line|Island Line)/).slice(2).join("")}
                              </span>
                            ) : (
                              step
                            )}
                          </li>
                        );
                      })}
                    </ol>

                    {/* Fare & Travel Time breakdown */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2.5 border-t border-slate-200/60 text-xs">
                      {item.travelTime && (
                        <div className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Estimated Travel Time: <strong>{item.travelTime}</strong></span>
                        </div>
                      )}
                      {item.fare && (
                        <div className="flex items-center gap-1 text-rose-600">
                          <DollarSign className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          <span>Transportation Fare: <strong>{item.fare}</strong></span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Free Time Indicators */}
              {item.isFreeTime && (
                <div className="mt-4 bg-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 border border-emerald-100/50">
                  <Compass className="w-4 h-4 text-emerald-600" />
                  <span><strong>Free Time Slot:</strong> Savor the local atmosphere, stroll, or grab snacks at your leisure.</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
