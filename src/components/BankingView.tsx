import React, { useState } from "react";
import { Landmark, Search, CreditCard, Compass, AlertCircle } from "lucide-react";
import { bankingInfo } from "../data/travelData";

export default function BankingView() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBanks = bankingInfo.filter((item) =>
    item.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.nearbyBanks.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Landmark className="w-6 h-6 text-pink-600" />
            ATM & Cash Withdrawal Directory
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Cash withdrawal points and ATMs near major itinerary landmarks to prevent being stranded without local cash.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by location or bank..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-full pl-10 pr-4 py-2 focus:bg-white focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all duration-150"
          />
        </div>
      </div>

      {/* Overview Tips */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 leading-relaxed">
          <span className="font-bold">Crucial Cash Tip:</span> Hong Kong and Macau run heavily on physical cash for taxis, small local eateries (including legendary egg tart/pork chop bun shops), and Green Minibuses. Octopus cards are highly recommended, but carrying around <span className="font-bold">HK$500–1000 in cash</span> is essential. In Macau, HKD is accepted 1:1 with Macau Pataca (MOP), so you do not need to convert separately unless desired.
        </div>
      </div>

      {/* Banking Table - Desktop / Big View */}
      <div className="hidden md:block overflow-hidden bg-white border border-slate-100 rounded-3xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/70 border-b border-slate-100 text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">
              <th className="py-4 px-6">Major Attraction Location</th>
              <th className="py-4 px-6">Nearby Bank Branches</th>
              <th className="py-4 px-6">ATM Availability</th>
              <th className="py-4 px-6">Accepted Cards</th>
              <th className="py-4 px-6 text-right">Est. Walking Distance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs text-slate-600">
            {filteredBanks.length > 0 ? (
              filteredBanks.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors duration-150">
                  <td className="py-4 px-6 font-bold text-slate-800">{item.locationName}</td>
                  <td className="py-4 px-6">{item.nearbyBanks}</td>
                  <td className="py-4 px-6 text-slate-500">{item.atmAvailability}</td>
                  <td className="py-4 px-6 font-mono text-[10px]">
                    <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">
                      {item.cardsAccepted}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-medium text-slate-700">{item.distance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-slate-400">
                  No matches found for your search term.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Banking List - Mobile View */}
      <div className="block md:hidden space-y-4">
        {filteredBanks.length > 0 ? (
          filteredBanks.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <h4 className="text-sm font-bold text-slate-800">{item.locationName}</h4>
                <span className="text-[10px] font-mono font-semibold text-slate-400 shrink-0">
                  {item.distance}
                </span>
              </div>

              <div className="space-y-2 border-t border-slate-50 pt-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">Nearby Banks</span>
                  <span className="text-slate-700 font-medium">{item.nearbyBanks}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">ATM Notes</span>
                  <span className="text-slate-500">{item.atmAvailability}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block">International Cards</span>
                  <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono">
                    {item.cardsAccepted}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl">
            No matches found.
          </div>
        )}
      </div>

      {/* Card Partners Logos */}
      <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100 flex flex-wrap justify-center items-center gap-6">
        <span className="text-[10px] uppercase tracking-wider font-mono text-slate-400">Supported Networks:</span>
        <div className="flex gap-4 text-xs font-mono font-bold text-slate-500">
          <span className="border border-slate-200 px-2.5 py-1 rounded bg-white">VISA</span>
          <span className="border border-slate-200 px-2.5 py-1 rounded bg-white">MASTERCARD</span>
          <span className="border border-slate-200 px-2.5 py-1 rounded bg-white">UNIONPAY</span>
          <span className="border border-slate-200 px-2.5 py-1 rounded bg-white">JCB</span>
          <span className="border border-slate-200 px-2.5 py-1 rounded bg-white">PLUS / CIRRUS</span>
        </div>
      </div>
    </div>
  );
}
