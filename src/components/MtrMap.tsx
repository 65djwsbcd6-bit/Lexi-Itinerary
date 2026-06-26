import React, { useState } from "react";
import { Pin, MapPin, Info, ArrowRight, Layers, Ship, Navigation, Sparkles, Castle } from "lucide-react";

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

interface MacauNode {
  id: string;
  name: string;
  portugueseName: string;
  x: number;
  y: number;
  type: "ferry" | "historical" | "casino" | "shopping";
  sequence: number;
  description: string;
  arrivalTips: string[];
  shortName?: string;
  shortPtName?: string;
}

interface DisneylandNode {
  id: string;
  name: string;
  land: string;
  x: number;
  y: number;
  type: "entrance" | "ride" | "show" | "frozen";
  sequence: number;
  description: string;
  tips: string[];
  shortName?: string;
}

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

// Macau Day Trip landmarks
const macauNodes: MacauNode[] = [
  {
    id: "outer-harbour",
    name: "Outer Harbour Ferry Terminal",
    portugueseName: "Terminal de Passageiros do Porto Exterior",
    x: 520,
    y: 120,
    type: "ferry",
    sequence: 1,
    description: "Primary point of entry to Macau from Hong Kong via TurboJET Ferry. Features immigration processing, currency counters, and hotel/casino shuttle bus bays.",
    arrivalTips: [
      "Present your Passport & HK arrival slip for Macau immigration (Visa-free for most).",
      "Head out to the underground pedestrian tunnel to find casino shuttle bus bays.",
      "Take the FREE hotel shuttle bus to Grand Lisboa or board Bus 3/10A to Senado Square."
    ],
    shortName: "Outer Harbour",
    shortPtName: "Porto Exterior"
  },
  {
    id: "grand-lisboa",
    name: "Grand Lisboa Macau",
    portugueseName: "Grande Lisboa",
    x: 360,
    y: 180,
    type: "casino",
    sequence: 2,
    description: "The most iconic golden lotus-shaped skyscraper in Macau's skyline. Famous casino resort, Michelin-starred restaurants, and gold-encrusted visual treasures inside.",
    arrivalTips: [
      "Take a free shuttle from Outer Harbour directly to Grand Lisboa.",
      "Take photos outside of the spectacular spherical podium and gold leaf design.",
      "Step inside to see the Star of Stanley Ho (218.08 carat flawless diamond) on display in the lobby."
    ],
    shortName: "Grand Lisboa",
    shortPtName: "Grande Lisboa"
  },
  {
    id: "senado-square",
    name: "Senado Square",
    portugueseName: "Largo do Senado",
    x: 240,
    y: 220,
    type: "historical",
    sequence: 3,
    description: "Paved with wave-patterned Portuguese tiles, Senado Square is the heart of the UNESCO Historic Centre of Macau. Framed by pastel neo-classical colonial buildings.",
    arrivalTips: [
      "7-minute easy walk from Grand Lisboa via Avenida de Almeida Ribeiro.",
      "Visit the yellow St. Dominic's Church and the historic Holy House of Mercy.",
      "Try iconic local snacks: Pork Chop Buns, Portuguese Egg Tarts (Margaret's Cafe e Nata), and Almond cookies."
    ],
    shortName: "Senado Square",
    shortPtName: "Largo do Senado"
  },
  {
    id: "ruins-st-paul",
    name: "Ruins of St. Paul's",
    portugueseName: "Ruínas de São Paulo",
    x: 220,
    y: 100,
    type: "historical",
    sequence: 4,
    description: "Macau's ultimate landmark. The stone facade of the 17th-century Jesuit Church of St. Paul, which burned down in 1835. Mount Fortress is directly adjacent.",
    arrivalTips: [
      "Walk 5 minutes north from Senado Square through the colorful, busy souvenir shop streets.",
      "Climb the grand stone steps to view the intricate carvings on the facade.",
      "Walk up to Mount Fortress (adjacent) for an awesome panoramic view of the old city and Zhuhai skyline."
    ],
    shortName: "Ruins of St. Paul's",
    shortPtName: "São Paulo"
  },
  {
    id: "venetian-macao",
    name: "The Venetian Macao",
    portugueseName: "O Venetian Macau",
    x: 350,
    y: 400,
    type: "shopping",
    sequence: 5,
    description: "Located on the Cotai Strip, this is the world's largest casino resort. Features recreated Venetian canals, gondola rides, replicas of Italian landmarks, and spectacular luxury malls.",
    arrivalTips: [
      "Take a taxi from Senado Square (approx. MOP 80-100) or take free shuttle bus from StarWorld Hotel / Grand Lisboa over the Sai Van Bridge.",
      "Visit the indoor Grand Canal Shoppes with artificial blue sky and romantic singing gondoliers.",
      "Sample fresh Lord Stow's Portuguese Egg Tarts inside the shopping canal area."
    ],
    shortName: "The Venetian",
    shortPtName: "Venetian Macau"
  }
];

const disneylandNodes: DisneylandNode[] = [
  {
    id: "disney-gate",
    name: "Disneyland Main Entrance",
    land: "Main Street, U.S.A.",
    x: 350,
    y: 390,
    type: "entrance",
    sequence: 1,
    description: "Your magical entry point! Pass through security, scan your app ticket, and walk down the nostalgic 20th-century Midwestern town styled with beautiful architecture.",
    tips: [
      "Arrive at 09:30 AM before rope drop at 10:00 AM.",
      "Get a photograph in front of the Train Station floral Mickey.",
      "Check out the souvenir shops on your way back out at night, not in the morning!"
    ],
    shortName: "Main Entrance"
  },
  {
    id: "castle-dreams",
    name: "Castle of Magical Dreams",
    land: "Fantasyland Hub",
    x: 350,
    y: 240,
    type: "show",
    sequence: 2,
    description: "The newly reimagined sparkling centerpiece castle of Hong Kong Disneyland, paying tribute to 13 Disney princess and queen stories. Hosts the evening 'Momentous' light spectacular.",
    tips: [
      "Perfect photo spot in the morning before crowds gather.",
      "Return here at 8:30 PM for 'Momentous' projection and fireworks.",
      "Download the official HK Disneyland app to check exact show times."
    ],
    shortName: "Magical Castle"
  },
  {
    id: "world-of-frozen",
    name: "World of Frozen (Arendelle)",
    land: "World of Frozen",
    x: 480,
    y: 90,
    type: "frozen",
    sequence: 3,
    description: "The world's first and largest Frozen-themed land! Explore Arendelle Village, the fjord, Castle, and the towering North Mountain. Features 'Frozen Ever After' boat ride.",
    tips: [
      "RUSH here immediately upon park opening (rope drop) to avoid 90+ min queues.",
      "Ride 'Frozen Ever After' boat ride first, then 'Wandering Oaken's Sliding Sleighs' coaster.",
      "Grab an iconic Forest-themed snack at the Golden Crocus Inn!"
    ],
    shortName: "World of Frozen"
  },
  {
    id: "mystic-manor",
    name: "Mystic Manor",
    land: "Mystic Point",
    x: 150,
    y: 210,
    type: "ride",
    sequence: 4,
    description: "Exclusive to Hong Kong Disneyland! A whimsical, state-of-the-art dark ride through Lord Henry Mystic's private museum where an enchanted music box brings artifacts to life.",
    tips: [
      "Features a trackless ride system and incredible special effects.",
      "Usually has moderate wait times in the early afternoon.",
      "Look closely at the magical dust effects—one of Disney's finest modern masterpieces."
    ],
    shortName: "Mystic Manor"
  },
  {
    id: "tomorrowland",
    name: "Tomorrowland (Stark Expo)",
    land: "Tomorrowland",
    x: 520,
    y: 220,
    type: "ride",
    sequence: 5,
    description: "The high-tech zone featuring Marvel integrations. Take part in the 'Iron Man Experience' simulator and the interactive 'Ant-Man and The Wasp: Nano Battle!' shooter.",
    tips: [
      "Ride 'Hyperspace Mountain' if you love thrilling indoor star wars roller coasters.",
      "Great afternoon spot as lines move fast due to high capacity rides.",
      "Visit the Stark Expo shop for cool exclusive Marvel items."
    ],
    shortName: "Tomorrowland"
  }
];

export default function MtrMap() {
  const [activeMap, setActiveMap] = useState<"hongkong" | "macau" | "disneyland">("hongkong");
  const [selectedStation, setSelectedStation] = useState<StationNode | null>(stations[0]);
  const [selectedMacauNode, setSelectedMacauNode] = useState<MacauNode | null>(null);
  const [selectedDisneyNode, setSelectedDisneyNode] = useState<DisneylandNode | null>(null);

  // MTR Lines and Colors
  const lineColors = {
    orange: "#F38B00", // Tung Chung Line
    red: "#E2231A",    // Tsuen Wan Line
    blue: "#007CB9",   // Island Line
    pink: "#F05AA0",   // Disneyland Resort Line
    purple: "#5C2C90", // Tseung Kwan O / general transfer
  };

  const handleSelectMap = (map: "hongkong" | "macau" | "disneyland") => {
    setActiveMap(map);
    setSelectedStation(map === "hongkong" ? stations[0] : null);
    setSelectedMacauNode(map === "macau" ? macauNodes[0] : null);
    setSelectedDisneyNode(map === "disneyland" ? disneylandNodes[0] : null);
  };

  return (
    <div id="itinerary-map" className="bg-slate-900 text-slate-100 rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-800">
      
      {/* Map Switcher Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-rose-500" />
            Interactive Travel Maps
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Explore geographic layout & daily routes.</p>
        </div>
        <div className="flex flex-wrap bg-slate-950 p-1 rounded-xl border border-slate-800 gap-1">
          <button
            onClick={() => handleSelectMap("hongkong")}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMap === "hongkong"
                ? "bg-rose-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Hong Kong MTR Map
          </button>
          <button
            onClick={() => handleSelectMap("disneyland")}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMap === "disneyland"
                ? "bg-rose-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Disneyland Park Map
          </button>
          <button
            onClick={() => handleSelectMap("macau")}
            className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
              activeMap === "macau"
                ? "bg-rose-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Macau Day Trip Map
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch gap-6">
        
        {/* Left Side: Dynamic Interactive Map Container */}
        <div className="flex-1 bg-slate-950 rounded-2xl p-3 sm:p-4 border border-slate-800 relative overflow-hidden min-h-[420px]">
          <div className="absolute top-4 left-4 z-10 bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 flex items-center gap-2">
            {activeMap === "hongkong" ? (
              <>
                <Layers className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-300">Hong Kong MTR Transit Network</span>
              </>
            ) : activeMap === "macau" ? (
              <>
                <Ship className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-300">Macau Day 3 Geographic Loop</span>
              </>
            ) : (
              <>
                <Castle className="w-3.5 h-3.5 text-pink-400" />
                <span className="text-[10px] font-mono tracking-wider font-semibold uppercase text-slate-300">Disneyland Day 2 Magical Hub</span>
              </>
            )}
          </div>

          {/* Map Grid Rendering */}
          <div className="w-full h-full min-h-[380px] flex items-center justify-center">
            {activeMap === "hongkong" ? (
              <svg viewBox="0 0 700 480" className="w-full max-w-2xl h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Background grid details */}
                <defs>
                  <pattern id="dotGridHK" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.3" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotGridHK)" rx="16" />

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
                <text x="50" y="155" fill={lineColors.orange} fontSize="9" fontFamily="monospace" fontWeight="bold">TUNG CHUNG LINE</text>
                <text x="590" y="320" fill={lineColors.red} fontSize="9" fontFamily="monospace" fontWeight="bold" transform="rotate(80 580 320)">TSUEN WAN LINE</text>
                <text x="310" y="425" fill={lineColors.blue} fontSize="9" fontFamily="monospace" fontWeight="bold">ISLAND LINE</text>
                <text x="160" y="240" fill={lineColors.pink} fontSize="9" fontFamily="monospace" fontWeight="bold">DISNEYLAND LINE</text>

                {/* STATION NODE MARKERS */}
                {stations.map((station) => {
                  const isSelected = selectedStation?.id === station.id;
                  const isTransfer = station.lines.length > 1;

                  return (
                    <g
                      key={station.id}
                      className="cursor-pointer group select-none"
                      onClick={() => setSelectedStation(station)}
                    >
                      {/* Pulsing ring */}
                      {isSelected && (
                        <circle
                          cx={station.x}
                          cy={station.y}
                          r="18"
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="2"
                          className="animate-ping"
                          style={{ transformOrigin: `${station.x}px ${station.y}px` }}
                        />
                      )}

                      {/* Outer ring */}
                      <circle
                        cx={station.x}
                        cy={station.y}
                        r={isSelected ? "13" : "9"}
                        fill={isTransfer ? "#1e293b" : "#0f172a"}
                        stroke={isSelected ? "#f43f5e" : isTransfer ? "#ffffff" : "#64748b"}
                        strokeWidth={isSelected ? "3" : isTransfer ? "2.5" : "1.5"}
                        className="transition-all duration-200 group-hover:stroke-slate-100"
                      />

                      {/* Core circle */}
                      <circle
                        cx={station.x}
                        cy={station.y}
                        r={isSelected ? "6" : "4"}
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

                      {/* Day Pill Indicator */}
                      <g transform={`translate(${station.x}, ${station.y - 16})`}>
                        <rect
                          x="-20"
                          y="-11"
                          width="40"
                          height="11"
                          rx="3"
                          fill={isSelected ? "#f43f5e" : "#1e293b"}
                          className="transition-all duration-200"
                        />
                        <text
                          x="0"
                          y="-3"
                          fill="#ffffff"
                          fontSize="7"
                          fontFamily="sans-serif"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          {station.days[0].replace(" (Transfer)", "").replace(" (Transfer Option)", "")}
                        </text>
                      </g>

                      {/* Station Name */}
                      <text
                        x={station.x}
                        y={station.y + 24}
                        fill={isSelected ? "#f43f5e" : "#f1f5f9"}
                        fontSize="9.5"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                        className="transition-all duration-200"
                      >
                        {station.name}
                      </text>
                      <text
                        x={station.x}
                        y={station.y + 34}
                        fill="#64748b"
                        fontSize="7.5"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                      >
                        {station.chineseName}
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : activeMap === "macau" ? (
              // MACAU DAY TRIP MAP VIEW
              <svg viewBox="0 0 700 480" className="w-full max-w-2xl h-auto" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dotGridMacau" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#334155" opacity="0.35" />
                  </pattern>
                  {/* ocean color mask */}
                  <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#090d16" />
                    <stop offset="100%" stopColor="#05070a" />
                  </linearGradient>
                </defs>
                
                {/* Background Grid */}
                <rect width="100%" height="100%" fill="url(#dotGridMacau)" rx="16" />

                {/* Ocean and Land dividers */}
                {/* Draw Macau Peninsula Border */}
                <path d="M 120,60 Q 250,20 400,60 T 580,240 L 100,240 Z" fill="#0f172a" opacity="0.4" />
                <text x="140" y="50" fill="#475569" fontSize="10" fontWeight="bold" fontFamily="monospace">MACAU PENINSULA (NORTH)</text>

                {/* Draw Taipa/Cotai Strip Border */}
                <rect x="120" y="330" width="450" height="130" rx="20" fill="#0f172a" opacity="0.5" />
                <text x="140" y="450" fill="#475569" fontSize="10" fontWeight="bold" fontFamily="monospace">COTAI STRIP / TAIPA (SOUTH)</text>

                {/* Draw Macau-Taipa Bridges */}
                {/* Sai Van Bridge (Left) */}
                <path d="M 280,220 L 280,340" fill="none" stroke="#475569" strokeWidth="4" strokeDasharray="3,3" />
                <text x="220" y="290" fill="#64748b" fontSize="8" fontFamily="monospace" transform="rotate(-90 220 290)">SAI VAN BRIDGE</text>

                {/* Governor Nobre de Carvalho Bridge (Middle - Route 5) */}
                <path d="M 360,180 L 350,400" fill="none" stroke="#dc2626" strokeWidth="4" opacity="0.4" />
                
                {/* Friendship Bridge (Right - Route 1) */}
                <path d="M 520,120 Q 500,240 450,330" fill="none" stroke="#334155" strokeWidth="4" strokeDasharray="4,4" />
                <text x="500" y="270" fill="#475569" fontSize="8" fontFamily="monospace" transform="rotate(70 500 270)">AMIZADE BRIDGE</text>

                {/* OCEAN FERRY ROUTE FROM HONG KONG */}
                <path d="M 700,120 L 520,120" fill="none" stroke="#38bdf8" strokeWidth="5" strokeDasharray="6,4" />
                <text x="590" y="110" fill="#38bdf8" fontSize="8" fontFamily="monospace" fontWeight="bold">TURBOJET FERRY FROM HONG KONG</text>

                {/* INTER-LANDMARK TRANSIT PATHS */}
                {/* 1. Ferry Terminal to Grand Lisboa (Shuttle Bus Route) */}
                <path d="M 520,120 L 360,180" fill="none" stroke="#fbbf24" strokeWidth="3.5" strokeDasharray="4,2" />
                <text x="400" y="145" fill="#fbbf24" fontSize="8.5" fontFamily="monospace">FREE SHUTTLE</text>

                {/* 2. Grand Lisboa to Senado Square (7 min walk) */}
                <path d="M 360,180 L 240,220" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="3,3" />
                <text x="260" y="195" fill="#f43f5e" fontSize="8.5" fontFamily="monospace">WALK 7 MIN</text>

                {/* 3. Senado Square to Ruins of St Pauls (5 min walk) */}
                <path d="M 240,220 Q 210,170 220,100" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="3,3" />

                {/* 4. Ruins/Peninsula to Cotai Strip (Venetian Macau) - Bridge Transit */}
                <path d="M 220,100 Q 150,220 350,400" fill="none" stroke="#10b981" strokeWidth="4" />
                <text x="180" y="320" fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">TAXI / COCO SHUTTLE</text>

                {/* 5. Cotai Strip back to Outer Harbour (Return) */}
                <path d="M 350,400 Q 420,300 520,120" fill="none" stroke="#a78bfa" strokeWidth="3" strokeDasharray="5,3" />
                <text x="440" y="375" fill="#a78bfa" fontSize="8" fontFamily="monospace">COTAI EXPRESS</text>

                {/* LANDMARK NODES */}
                {macauNodes.map((node) => {
                  const isSelected = selectedMacauNode?.id === node.id;
                  
                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer group select-none"
                      onClick={() => setSelectedMacauNode(node)}
                    >
                      {/* Selected Pulse Ring */}
                      {isSelected && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="18"
                          fill="none"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          className="animate-ping"
                          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                        />
                      )}

                      {/* Node circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="12"
                        fill={isSelected ? "#38bdf8" : "#0f172a"}
                        stroke={
                          isSelected 
                            ? "#ffffff" 
                            : node.type === "ferry" 
                            ? "#38bdf8" 
                            : node.type === "historical" 
                            ? "#f43f5e" 
                            : "#f59e0b"
                        }
                        strokeWidth="2.5"
                      />

                      {/* Sequence Number */}
                      <text
                        x={node.x}
                        y={node.y + 3}
                        fill={isSelected ? "#0f172a" : "#ffffff"}
                        fontSize="9.5"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {node.sequence}
                      </text>

                      {/* Landmark Name Label */}
                      <text
                        x={node.x}
                        y={node.y - 18}
                        fill={isSelected ? "#38bdf8" : "#f8fafc"}
                        fontSize="10"
                        fontWeight="extrabold"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                        className="transition-all duration-200"
                      >
                        {node.shortName || node.name}
                      </text>
                      <text
                        x={node.x}
                        y={node.y + 24}
                        fill="#64748b"
                        fontSize="7"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                      >
                        {node.shortPtName || node.portugueseName}
                      </text>
                    </g>
                  );
                })}
              </svg>
            ) : (
              // DISNEYLAND PARK INTERACTIVE VECTOR MAP
              <svg viewBox="0 0 700 480" className="w-full max-w-2xl h-auto" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dotGridDisney" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#ec4899" opacity="0.15" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotGridDisney)" rx="16" />

                {/* LAND CONTOURS (Translucent decorative shapes) */}
                {/* World of Frozen */}
                <path d="M 400,60 Q 480,30 580,70 T 520,160 Z" fill="#38bdf8" opacity="0.15" />
                <text x="440" y="55" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace">WORLD OF FROZEN</text>

                {/* Tomorrowland */}
                <path d="M 480,180 Q 600,180 620,260 T 480,280 Z" fill="#8b5cf6" opacity="0.15" />
                <text x="540" y="275" fill="#a78bfa" fontSize="8" fontWeight="bold" fontFamily="monospace">TOMORROWLAND</text>

                {/* Mystic Point / Adventureland */}
                <path d="M 80,140 Q 200,140 180,240 T 100,280 Z" fill="#10b981" opacity="0.12" />
                <text x="100" y="270" fill="#34d399" fontSize="8" fontWeight="bold" fontFamily="monospace">MYSTIC POINT</text>

                {/* Main Street, U.S.A. */}
                <rect x="250" y="340" width="200" height="90" rx="15" fill="#1e3a8a" opacity="0.2" />
                <text x="350" y="420" fill="#60a5fa" fontSize="8" fontWeight="bold" fontFamily="monospace" textAnchor="middle">MAIN STREET, U.S.A.</text>

                {/* Fantasyland / Castle Hub */}
                <circle cx="350" cy="240" r="60" fill="#db2777" opacity="0.1" />

                {/* MAGICAL TRANSIT PATHWAYS */}
                {/* Main Street to Castle */}
                <path d="M 350,390 L 350,240" fill="none" stroke="#f472b6" strokeWidth="4" strokeDasharray="3,3" />

                {/* Castle to Tomorrowland */}
                <path d="M 350,240 L 520,220" fill="none" stroke="#a78bfa" strokeWidth="4" strokeDasharray="3,3" />

                {/* Tomorrowland to World of Frozen */}
                <path d="M 520,220 Q 540,150 480,90" fill="none" stroke="#38bdf8" strokeWidth="4" strokeDasharray="3,3" />

                {/* World of Frozen to Castle */}
                <path d="M 480,90 L 350,240" fill="none" stroke="#db2777" strokeWidth="3" opacity="0.5" />

                {/* Castle to Mystic Manor */}
                <path d="M 350,240 L 150,210" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="3,3" />

                {/* DISNEYLAND NODES */}
                {disneylandNodes.map((node) => {
                  const isSelected = selectedDisneyNode?.id === node.id;
                  
                  return (
                    <g
                      key={node.id}
                      className="cursor-pointer group select-none"
                      onClick={() => setSelectedDisneyNode(node)}
                    >
                      {/* Pulse Ring */}
                      {isSelected && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="18"
                          fill="none"
                          stroke="#ec4899"
                          strokeWidth="2"
                          className="animate-ping"
                          style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                        />
                      )}

                      {/* Node Outer Circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="12"
                        fill={isSelected ? "#ec4899" : "#0f172a"}
                        stroke={
                          isSelected 
                            ? "#ffffff" 
                            : node.type === "entrance" 
                            ? "#1d4ed8" 
                            : node.type === "frozen" 
                            ? "#38bdf8" 
                            : node.type === "show" 
                            ? "#db2777"
                            : "#10b981"
                        }
                        strokeWidth="2.5"
                      />

                      {/* Sequence */}
                      <text
                        x={node.x}
                        y={node.y + 3}
                        fill={isSelected ? "#0f172a" : "#ffffff"}
                        fontSize="9.5"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {node.sequence}
                      </text>

                      {/* Labels */}
                      <text
                        x={node.x}
                        y={node.y - 18}
                        fill={isSelected ? "#ec4899" : "#f8fafc"}
                        fontSize="10"
                        fontWeight="extrabold"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                        className="transition-all duration-200"
                      >
                        {node.shortName || node.name}
                      </text>
                      <text
                        x={node.x}
                        y={node.y + 24}
                        fill="#64748b"
                        fontSize="7"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                      >
                        {node.land}
                      </text>
                    </g>
                  );
                })}
              </svg>
            )}
          </div>
        </div>

        {/* Right Side: Landmark Detail Panel */}
        <div className="w-full lg:w-80 bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 mb-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500" />
              {activeMap === "hongkong" 
                ? "MTR Station Details" 
                : activeMap === "macau" 
                ? "Macau Route Steps" 
                : "Disneyland Magical Lands"}
            </h3>
            <p className="text-[11px] text-slate-400 mb-4 leading-relaxed">
              {activeMap === "hongkong" 
                ? "Click any station on the Hong Kong MTR route map to view connection lines, daily target guides, and highlights."
                : activeMap === "macau"
                ? "Follow numbers 1 through 5 on the Macau map to explore Lexi's seamless Day 3 historic & resort itinerary."
                : "Explore our magical guide path through HK Disneyland. Tap nodes 1-5 to reveal expert tips, fastpass insights, and Frozen land highlights!"}
            </p>

            {/* HONG KONG DETAILS */}
            {activeMap === "hongkong" && (
              selectedStation ? (
                <div className="space-y-4 animate-fadeIn">
                  <div className="border-b border-slate-800 pb-3">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className="text-sm font-extrabold text-white">{selectedStation.name}</h4>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                        {selectedStation.chineseName}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedStation.days.map((day, i) => (
                        <span
                          key={i}
                          className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                            day.includes("Transfer")
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/15"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/15"
                          }`}
                        >
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">MTR Lines</h5>
                    <ul className="space-y-1">
                      {selectedStation.lines.map((line, i) => (
                        <li key={i} className="text-xs text-slate-200 flex items-center gap-1.5">
                          <span
                            className="w-2 h-2 rounded-full inline-block shrink-0"
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
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Main Itinerary Stops</h5>
                    <ul className="space-y-1.5">
                      {selectedStation.attractions.map((attr, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                          <span className="text-rose-500 font-bold mt-0.5">•</span>
                          <span>{attr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-4">
                  <Info className="w-7 h-7 text-slate-600 mb-1.5" />
                  <p className="text-xs text-slate-400 font-bold">No station selected</p>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-[180px]">
                    Tap on Tsing Yi, Sunny Bay, Sheung Wan, or Tsim Sha Tsui on the map.
                  </p>
                </div>
              )
            )}

            {/* MACAU DETAILS */}
            {activeMap === "macau" && (
              selectedMacauNode ? (
                <div className="space-y-4 animate-fadeIn">
                  <div className="border-b border-slate-800 pb-3">
                    <div className="flex items-start justify-between gap-1 flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-mono text-[11px] font-bold">
                          {selectedMacauNode.sequence}
                        </span>
                        <h4 className="text-xs font-extrabold text-white leading-tight">{selectedMacauNode.name}</h4>
                      </div>
                      <span className="text-[9px] text-slate-400 italic mt-1 font-mono block">
                        {selectedMacauNode.portugueseName}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Landmark Summary</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedMacauNode.description}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Step-by-Step Directions</h5>
                    <ul className="space-y-1.5">
                      {selectedMacauNode.arrivalTips.map((tip, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5 leading-snug">
                          <span className="text-sky-400 font-extrabold mt-0.5">➔</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-4">
                  <Navigation className="w-7 h-7 text-slate-600 mb-1.5" />
                  <p className="text-xs text-slate-400 font-bold">Select a Macau Landmark</p>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-[180px]">
                    Click node 1 (Ferry), 2 (Lisboa), 3 (Senado), 4 (Ruins), or 5 (Venetian) to view custom local transit guidelines.
                  </p>
                </div>
              )
            )}

            {/* DISNEYLAND DETAILS */}
            {activeMap === "disneyland" && (
              selectedDisneyNode ? (
                <div className="space-y-4 animate-fadeIn">
                  <div className="border-b border-slate-800 pb-3">
                    <div className="flex items-start justify-between gap-1 flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center font-mono text-[11px] font-bold">
                          {selectedDisneyNode.sequence}
                        </span>
                        <h4 className="text-xs font-extrabold text-white leading-tight">{selectedDisneyNode.name}</h4>
                      </div>
                      <span className="text-[9px] text-pink-400 italic mt-1 font-mono block">
                        {selectedDisneyNode.land}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 font-mono">Landmark Summary</h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {selectedDisneyNode.description}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 font-mono">Pro Birthday Tips</h5>
                    <ul className="space-y-1.5">
                      {selectedDisneyNode.tips.map((tip, i) => (
                        <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5 leading-snug">
                          <span className="text-pink-400 font-extrabold mt-0.5">★</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center p-4">
                  <Sparkles className="w-7 h-7 text-slate-600 mb-1.5 animate-pulse" />
                  <p className="text-xs text-slate-400 font-bold">Select a Magical Landmark</p>
                  <p className="text-[10px] text-slate-500 mt-1 max-w-[180px]">
                    Click node 1 (Entrance), 2 (Castle), 3 (Frozen), 4 (Mystic Manor), or 5 (Tomorrowland) on the park map to view pro birthday guidelines.
                  </p>
                </div>
              )
            )}
          </div>

          {/* Map Legend */}
          <div className="mt-6 pt-4 border-t border-slate-800">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">Map Legend</h4>
            {activeMap === "hongkong" ? (
              <div className="grid grid-cols-2 gap-2 text-[9px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                  <span className="text-slate-300">Tung Chung Line</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-600 shrink-0" />
                  <span className="text-slate-300">Tsuen Wan Line</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-slate-300">Island Line</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                  <span className="text-slate-300">Disneyland Line</span>
                </div>
              </div>
            ) : activeMap === "macau" ? (
              <div className="grid grid-cols-2 gap-2 text-[9px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                  <span className="text-slate-300">Ferry Terminals</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                  <span className="text-slate-300">History & UNESCO</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-slate-300">Casino & Luxury</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span className="text-slate-300">Taxi/Bus Bridge</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 text-[9px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#1d4ed8] shrink-0" />
                  <span className="text-slate-300">Entrance & Gates</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#db2777] shrink-0" />
                  <span className="text-slate-300">Castle Hub / Shows</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8] shrink-0" />
                  <span className="text-slate-300">World of Frozen</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] shrink-0" />
                  <span className="text-slate-300">Mystic & Marvel rides</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
