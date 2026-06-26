import React from "react";
import { Plane, Calendar, Clock, Landmark, Navigation2, ArrowRight } from "lucide-react";
import { flights } from "../data/travelData";

export default function FlightView() {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Plane className="w-6 h-6 text-pink-600 rotate-45" />
          Flight & Airport Information
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Detailed routes, timetables, and terminals for your international flights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {flights.map((flight, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
          >
            {/* Card Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-wider font-mono bg-pink-50 text-pink-600 px-3 py-1 rounded-full font-bold">
                  {index === 0 ? "Arrival Flight" : "Departure Flight"}
                </span>
                <span className="text-sm font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {flight.flightNo}
                </span>
              </div>

              {/* Route */}
              <div className="flex items-center gap-4 my-3">
                <div className="text-2xl font-black text-slate-800 tracking-tight">
                  {flight.route.split(" ➔ ")[0]}
                </div>
                <div className="flex-1 border-t-2 border-dashed border-slate-200 relative flex justify-center">
                  <Plane className="w-4 h-4 text-pink-500 absolute -top-2 bg-white px-0.5" />
                </div>
                <div className="text-2xl font-black text-slate-800 tracking-tight">
                  {flight.route.split(" ➔ ")[1]}
                </div>
              </div>

              {/* Grid details */}
              <div className="grid grid-cols-2 gap-4 my-5 border-t border-b border-slate-100 py-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase text-slate-400 font-mono">Date</div>
                    <div className="text-xs font-semibold text-slate-700">{flight.date}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase text-slate-400 font-mono">Duration</div>
                    <div className="text-xs font-semibold text-slate-700">{flight.duration}</div>
                  </div>
                </div>

                <div className="col-span-2 flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl">
                  <Clock className="w-4 h-4 text-pink-500 shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase text-slate-500 font-mono">Flight Schedule</div>
                    <div className="text-xs font-bold text-slate-800">{flight.time}</div>
                  </div>
                </div>
              </div>

              {/* Terminals list */}
              <div className="space-y-3.5">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 shrink-0 mt-0.5">
                    DEP
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-mono text-slate-400">Departure Airport & Terminal</div>
                    <div className="text-xs font-medium text-slate-800 leading-normal">{flight.departure}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 shrink-0 mt-0.5">
                    ARR
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider font-mono text-slate-400">Arrival Airport & Terminal</div>
                    <div className="text-xs font-medium text-slate-800 leading-normal">{flight.arrival}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Reminder */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5 leading-relaxed">
              <Landmark className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>We advise arriving at least 3 hours prior to international departure.</span>
            </div>
          </div>
        ))}
      </div>

      {/* Baggage and Immigration Fast Facts */}
      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider font-mono mb-3">Immigration & Entry Reminders</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-1">Hong Kong Arrive (T1)</h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Ensure you fill out the Hong Kong Arrival Card. Keep the landing slip inside your passport until departure.
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-1">Macau Entry / Exit</h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Macau uses a paper slip stamp-free entry system. No separate visa required for Philippine passports for short tourist stays.
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-1">eTravel registration</h4>
            <p className="text-[11px] text-slate-500 leading-normal">
              Must fill out the Philippine eTravel system online within 72 hours before returning to Manila (5J 111).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
