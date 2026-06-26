import React, { useState } from "react";
import { Pin, MapPin, Info, ArrowRight, Layers } from "lucide-react";

interface StationNode {
  id: string;
  name: string;
  chineseName: string;
  x: number;
  y: number;
  days: string[];
  lines: string[];
  attractions: string[];
}

export default function MtrMap() {
  const [selectedStation, setSelectedStation] = useState<StationNode | null>(null);

  // MTR Lines and Colors
  const lineColors = {
    orange: "#F38B00", // Tung Chung Line
    red: "#E2231A",    // Tsuen Wan Line
    blue: "#007CB9",   // Island Line
    pink: "#F05AA0",   // Disneyland Resort Line
    purple: "#5C2C90", // Tseung Kwan O / general transfer
  };

  // Strategic coordinates on an 800x500 grid
  const stations: StationNode[] = [
    {
      id: "tsing-yi",
      name: "Tsing Yi",
      chineseName: "青衣",
      x: 250,
      y: 180,
      days: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
      lines: ["Tung Chung Line (Orange)"],
      attractions: ["Rambler Oasis Hotel (Base Location)"],
    },
    {
      id: "lai-king",
      name: "Lai King",
      chineseName: "荔景",
      x: 360,
      y: 180,
      days: ["Day 1 (Transfer)"],
      lines: ["Tung Chung Line (Orange)", "Tsuen Wan Line (Red)"],
      attractions: ["Key Transfer Station (Tung Chung ➔ Tsuen Wan)"],
    },
    {
      id: "sunny-bay",
      name: "Sunny Bay",
      chineseName: "欣澳",
      x: 150,
      y: 180,
      days: ["Day 2"],
      lines: ["Tung Chung Line (Orange)", "Disneyland Resort Line (Pink)"],
      attractions: ["Disneyland Transit Station"],
    },
    {
      id: "disneyland",
      name: "Disneyland Resort",
      chineseName: "迪士尼",
      x: 150,
      y: 280,
      days: ["Day 2"],
      lines: ["Disneyland Resort Line (Pink)"],
      attractions: ["Hong Kong Disneyland Park"],
    },
    {
      id: "tung-chung",
      name: "Tung Chung",
      chineseName: "東涌",
      x: 50,
      y: 180,
      days: ["Day 4"],
      lines: ["Tung Chung Line (Orange)"],
      attractions: ["Ngong Ping 360 Cable Car Terminal", "Tian Tan Big Buddha"],
    },
    {
      id: "kowloon",
      name: "Kowloon",
      chineseName: "九龍",
      x: 480,
      y: 280,
      days: ["Day 4"],
      lines: ["Tung Chung Line (Orange)"],
      attractions: ["Sky100 Observatory", "ICC Building", "Elements Mall"],
    },
    {
      id: "hong-kong",
      name: "Hong Kong / Central",
      chineseName: "香港 / 中環",
      x: 480,
      y: 400,
      days: ["Day 3", "Day 4"],
      lines: ["Tung Chung Line (Orange)", "Tsuen Wan Line (Red)", "Island Line (Blue)"],
      attractions: ["Central district", "SoHo Walkways", "Peak Tram Link", "Mid-Levels Escalators"],
    },
    {
      id: "sheung-wan",
      name: "Sheung Wan",
      chineseName: "上環",
      x: 360,
      y: 400,
      days: ["Day 3"],
      lines: ["Island Line (Blue)"],
      attractions: ["Hong Kong-Macau Ferry Terminal (TurboJET)"],
    },
    {
      id: "tsim-sha-tsui",
      name: "Tsim Sha Tsui",
      chineseName: "尖沙咀",
      x: 550,
      y: 220,
      days: ["Day 1"],
      lines: ["Tsuen Wan Line (Red)"],
      attractions: ["Hong Kong Cultural Centre", "Tsim Sha Tsui Pier 1", "Aqua Luna Harbour Cruise", "Avenue of Stars"],
    },
    {
      id: "admiralty",
      name: "Admiralty",
      chineseName: "金鐘",
      x: 580,
      y: 400,
      days: ["Day 4 (Transfer Option)"],
      lines: ["Tsuen Wan Line (Red)", "Island Line (Blue)"],
      attractions: ["Peak Tram connections & MTR lines convergence"],
    },
  ];

  return (
    <div className="bg-slate-900 text-slate-100 rounded-3xl p-6 shadow-2xl border border-slate-800">
      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        
        {/* Left Side: Dynamic Interactive Map Container */}
        <div className="flex-1 bg-slate-950 rounded-2xl p-4 border border-slate-800 relative overflow-hidden min-h-[400px]">
          <div className="absolute top-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 flex items-center gap-2">
            <Layers className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-mono tracking-wider font-semibold uppercase">Interactive MTR Route Map</span>
          </div>

          {/* SVG Map */}
          <div className="w-full h-full min-h-[380px] flex items-center justify-center">
            <svg viewBox="0 0 700 480" className="w-full max-w-2xl h-auto" xmlns="http://www.w3.org/2000/svg">
              {/* Background grid details for tech aesthetic */}
              <defs>
                <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.3" />
                </pattern>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotGrid)" rx="16" />

              {/* DRAW MTR LINES */}
              {/* Tung Chung Line (Orange) */}
              <path
                d="M 50,180 L 150,180 L 250,180 L 360,180 L 480,280 L 480,400"
                fill="none"
                stroke={lineColors.orange}
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.9"
              />

              {/* Disneyland Resort Line (Pink) */}
              <path
                d="M 150,180 L 150,280"
                fill="none"
                stroke={lineColors.pink}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray="2,2"
                opacity="0.95"
              />

              {/* Tsuen Wan Line (Red) */}
              <path
                d="M 360,180 L 480,180 L 550,220 L 580,400 L 480,400"
                fill="none"
                stroke={lineColors.red}
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />

              {/* Island Line (Blue) */}
              <path
                d="M 360,400 L 480,400 L 580,400"
                fill="none"
                stroke={lineColors.blue}
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />

              {/* LINE LABELS */}
              <text x="50" y="155" fill={lineColors.orange} fontSize="10" fontFamily="monospace" fontWeight="bold">TUNG CHUNG LINE</text>
              <text x="585" y="320" fill={lineColors.red} fontSize="10" fontFamily="monospace" fontWeight="bold" transform="rotate(80 580 320)">TSUEN WAN LINE</text>
              <text x="310" y="425" fill={lineColors.blue} fontSize="10" fontFamily="monospace" fontWeight="bold">ISLAND LINE</text>
              <text x="160" y="240" fill={lineColors.pink} fontSize="10" fontFamily="monospace" fontWeight="bold">DISNEYLAND LINE</text>

              {/* STATION NODE MARKERS & INTERACTIVITY */}
              {stations.map((station) => {
                const isSelected = selectedStation?.id === station.id;
                const isTransfer = station.lines.length > 1;

                return (
                  <g
                    key={station.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedStation(station)}
                  >
                    {/* Pulsing ring for selected station */}
                    {isSelected && (
                      <circle
                        cx={station.x}
                        cy={station.y}
                        r="18"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="2"
                        className="animate-ping"
                        style={{ transformOrigin: `${station.x}px ${station.y}px` }}
                      />
                    )}

                    {/* Outer glow ring */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? "14" : "10"}
                      fill={isTransfer ? "#1e293b" : "#0f172a"}
                      stroke={isSelected ? "#22c55e" : isTransfer ? "#ffffff" : "#64748b"}
                      strokeWidth={isSelected ? "3" : isTransfer ? "3" : "2"}
                      className="transition-all duration-300 group-hover:stroke-slate-100"
                    />

                    {/* Inner core circle */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={isSelected ? "7" : "5"}
                      fill={
                        station.lines[0]?.includes("Orange")
                          ? lineColors.orange
                          : station.lines[0]?.includes("Pink")
                          ? lineColors.pink
                          : station.lines[0]?.includes("Red")
                          ? lineColors.red
                          : lineColors.blue
                      }
                    />

                    {/* Day Highlights pin indicators */}
                    <g transform={`translate(${station.x}, ${station.y - 18})`}>
                      <rect
                        x="-20"
                        y="-14"
                        width="40"
                        height="13"
                        rx="4"
                        fill={isSelected ? "#22c55e" : "#334155"}
                        className="transition-all duration-300"
                      />
                      <text
                        x="0"
                        y="-5"
                        fill="#ffffff"
                        fontSize="8"
                        fontFamily="sans-serif"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {station.days[0].replace(" (Transfer)", "").replace(" (Transfer Option)", "")}
                      </text>
                    </g>

                    {/* Station Name Labels */}
                    <text
                      x={station.x}
                      y={station.y + 26}
                      fill={isSelected ? "#22c55e" : "#f1f5f9"}
                      fontSize="10"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                      className="transition-all duration-300 drop-shadow-md"
                    >
                      {station.name}
                    </text>
                    <text
                      x={station.x}
                      y={station.y + 36}
                      fill="#94a3b8"
                      fontSize="8"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                      className="opacity-75"
                    >
                      {station.chineseName}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Side: Station Detail Panel */}
        <div className="w-full lg:w-80 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-100 mb-1 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              Route Details
            </h3>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Select any highlighted station node on the MTR map to view visited days, lines, and target itinerary landmarks.
            </p>

            {selectedStation ? (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-800 pb-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-bold text-white">{selectedStation.name}</h4>
                    <span className="text-xs bg-slate-800 px-2.5 py-0.5 rounded-full text-slate-300 font-mono">
                      {selectedStation.chineseName}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {selectedStation.days.map((day, i) => (
                      <span
                        key={i}
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          day.includes("Transfer")
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">MTR Lines</h5>
                  <ul className="space-y-1">
                    {selectedStation.lines.map((line, i) => (
                      <li key={i} className="text-xs text-slate-200 flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block"
                          style={{
                            backgroundColor: line.includes("Orange")
                              ? lineColors.orange
                              : line.includes("Pink")
                              ? lineColors.pink
                              : line.includes("Red")
                              ? lineColors.red
                              : lineColors.blue,
                          }}
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Key Attractions</h5>
                  <ul className="space-y-1.5">
                    {selectedStation.attractions.map((attr, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold mt-0.5">•</span>
                        <span>{attr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-4">
                <Info className="w-8 h-8 text-slate-600 mb-2" />
                <p className="text-xs text-slate-500">No station selected.</p>
                <p className="text-[11px] text-slate-600 mt-1 max-w-[200px]">
                  Click on any MTR station dot (e.g. Tsing Yi, Sunny Bay, Hong Kong) to start.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Map Legend</h4>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-slate-300">Tung Chung Line</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600" />
                <span className="text-slate-300">Tsuen Wan Line</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-slate-300">Island Line</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-500" />
                <span className="text-slate-300">Disneyland Line</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
