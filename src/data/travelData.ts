import aquaLunaImg from "../assets/images/aqua_luna_1782483212316.jpg";
import bigBuddhaImg from "../assets/images/big_buddha_1782483227710.jpg";
import hkgDisneylandImg from "../assets/images/hkg_disneyland_1782483149053.jpg";
import lexiBirthdayImg from "../assets/images/lexi_birthday_clean_thumbnail_1782492889936.jpg";
import ramblerHotelImg from "../assets/images/rambler_hotel_1782483246933.jpg";
import ruinsStPaulImg from "../assets/images/ruins_st_paul_1782483163214.jpg";
import sky100ViewImg from "../assets/images/sky100_view_1782483190555.jpg";
import venetianMacauImg from "../assets/images/venetian_macau_1782483260021.jpg";
import victoriaPeakImg from "../assets/images/victoria_peak_1782483176438.jpg";

export { lexiBirthdayImg };

export interface Flight {
  route: string;
  date: string;
  time: string;
  duration: string;
  flightNo: string;
  departure: string;
  arrival: string;
}

export interface TransitStep {
  text: string;
}

export interface AttractionItem {
  id: string;
  time: string;
  place: string;
  description?: string;
  recommendedLeaveTime?: string;
  steps?: string[]; // step-by-step ride instructions
  travelTime?: string;
  fare?: string;
  distance?: string;
  image?: string;
  isFreeTime?: boolean;
}

export interface ItineraryDay {
  dayNum: number;
  date: string;
  title: string;
  summary: string;
  recommendedLeaveTime?: string;
  items: AttractionItem[];
}

export interface BankInfo {
  locationName: string;
  nearbyBanks: string;
  atmAvailability: string;
  cardsAccepted: string;
  distance: string;
}

export const flights: Flight[] = [
  {
    route: "MNL ➔ HKG",
    date: "09 Jul 2026",
    time: "07:10 AM – 09:45 AM",
    duration: "2h 35m",
    flightNo: "5J 110",
    departure: "Manila Ninoy Aquino International Airport – Terminal 3",
    arrival: "Hong Kong International Airport – Terminal 1",
  },
  {
    route: "HKG ➔ MNL",
    date: "13 Jul 2026",
    time: "11:00 AM – 01:30 PM",
    duration: "2h 30m",
    flightNo: "5J 111",
    departure: "Hong Kong International Airport – Terminal 1",
    arrival: "Manila Ninoy Aquino International Airport – Terminal 3",
  },
];

export const itinerary: ItineraryDay[] = [
  {
    dayNum: 1,
    date: "July 9 (Thu)",
    title: "Arrival Day",
    summary: "Land at HKG 9:45 AM ➔ Check-in to Rambler Oasis ➔ Tsim Sha Tsui Waterfront ➔ Evening Harbour Cruise.",
    recommendedLeaveTime: "03:00 PM",
    items: [
      {
        id: "d1-1",
        time: "09:45 AM",
        place: "Hong Kong International Airport (Arrival)",
        description: "Land in Hong Kong. Retrieve baggage and clear immigration.",
        distance: "—",
        image: ramblerHotelImg,
      },
      {
        id: "d1-2",
        time: "~11:00 AM",
        place: "Airport Ground Transport Centre",
        description: "Boarding the express bus to the Tsing Yi / Kwai Chung district.",
        steps: [
          "Walk to the Airport Ground Transport Centre bus bays.",
          "Board Bus A32 (Long Win Bus) toward Kwai Chung.",
          "Alight at Ching Tao House, Cheung Ching Estate stop.",
          "Walk approximately 5 minutes to the hotel."
        ],
        travelTime: "45 minutes",
        fare: "HK$19.80 (Adult Single Journey Fare)",
        distance: "~45 min ride",
        image: ramblerHotelImg,
      },
      {
        id: "d1-3",
        time: "~11:30 AM",
        place: "Rambler Oasis Hotel (Tsing Yi)",
        description: "Arrival at hotel, drop off luggage and take a quick rest. Have a casual lunch nearby.",
        isFreeTime: true,
        distance: "—",
        image: ramblerHotelImg,
      },
      {
        id: "d1-4",
        time: "02:00 PM",
        place: "Rambler Oasis Hotel Check-in",
        description: "Official hotel check-in. Settle into the room and freshen up.",
        distance: "—",
        image: ramblerHotelImg,
      },
      {
        id: "d1-5",
        time: "03:15 PM",
        place: "Tsing Yi Station to Tsim Sha Tsui",
        description: "Travel from hotel to the Tsim Sha Tsui waterfront.",
        recommendedLeaveTime: "03:00 PM",
        steps: [
          "Board Green Minibus 88F from the Rambler Oasis Hotel driveway.",
          "Alight at Tsing Yi MTR Station (Exit A).",
          "Enter Tsing Yi Station and board the Tung Chung Line (Orange) toward Hong Kong, then alight at Lai King Station to transfer.",
          "At Lai King Station, board the Tsuen Wan Line (Red) toward Central, and alight at Tsim Sha Tsui Station (Exit E)."
        ],
        travelTime: "30 minutes",
        fare: "HK$17.50 (HK$3.40 Minibus + HK$14.10 MTR Adult Octopus Fare)",
        distance: "~30 min ride",
        image: aquaLunaImg,
      },
      {
        id: "d1-6",
        time: "04:00 PM",
        place: "Hong Kong Cultural Centre",
        description: "Iconic architectural landmark. Take photographs at the seaside promenade with views of the Victoria Harbour skyline.",
        steps: [
          "Walk approximately 8 minutes from Tsim Sha Tsui Station Exit E toward the waterfront."
        ],
        travelTime: "8 minutes",
        fare: "Free",
        distance: "~8 min walk",
        image: aquaLunaImg,
      },
      {
        id: "d1-7",
        time: "05:25 PM",
        place: "Tsim Sha Tsui Pier No. 1",
        description: "Walk to the designated pier to board the harbour cruise.",
        steps: [
          "Walk approximately 2 minutes from Hong Kong Cultural Centre along the waterfront to Pier No. 1."
        ],
        travelTime: "2 minutes",
        fare: "Free",
        distance: "~2 min walk",
        image: aquaLunaImg,
      },
      {
        id: "d1-8",
        time: "05:40 PM",
        place: "Aqua Luna Evening Harbour Cruise",
        description: "Experience Victoria Harbour on an authentic traditional red-sail Chinese junk boat during twilight. Stargazing and enjoying drinks.",
        steps: [
          "Present your digital ticket and board the Aqua Luna Chinese Junk Boat at Pier No. 1.",
          "Enjoy the evening cruise along Victoria Harbour (approx. 45-60 mins, includes 1 complimentary drink)."
        ],
        travelTime: "45 minutes",
        fare: "HK$260.00 (Adult Night Cruise Ticket)",
        distance: "45 min cruise",
        image: aquaLunaImg,
      },
      {
        id: "d1-9",
        time: "08:00 PM",
        place: "Tsim Sha Tsui to Rambler Oasis Hotel",
        description: "Return journey to the hotel after dinner on the waterfront.",
        steps: [
          "Walk to Tsim Sha Tsui MTR Station.",
          "Board the Tsuen Wan Line (Red) toward Tsuen Wan, then alight at Lai King Station to transfer.",
          "At Lai King Station, board the Tung Chung Line (Orange) toward Tung Chung, and alight at Tsing Yi Station (Exit A).",
          "Board Green Minibus 88F back to Rambler Oasis Hotel."
        ],
        travelTime: "30 minutes",
        fare: "HK$17.50 (HK$14.10 MTR + HK$3.40 Minibus Adult Octopus Fare)",
        distance: "~30 min ride",
        image: ramblerHotelImg,
      }
    ]
  },
  {
    dayNum: 2,
    date: "July 10 (Fri)",
    title: "Hong Kong Disneyland",
    summary: "Spend a magical day at HK Disneyland. Park opens at 10:30 AM. Follow recommended ride order for maximum efficiency.",
    recommendedLeaveTime: "08:40 AM",
    items: [
      {
        id: "d2-1",
        time: "09:00 AM",
        place: "Tsing Yi Station ➔ Sunny Bay Station",
        description: "Commence journey to Disneyland Resort.",
        recommendedLeaveTime: "08:40 AM",
        steps: [
          "Take Green Minibus 88F from hotel to Tsing Yi Station.",
          "Board the MTR Tung Chung Line (Orange) toward Tung Chung, and alight at Sunny Bay Station."
        ],
        travelTime: "20 minutes",
        fare: "HK$19.40 (HK$3.40 Minibus + HK$16.00 MTR Adult Octopus Fare)",
        distance: "~20 min ride",
        image: hkgDisneylandImg,
      },
      {
        id: "d2-2",
        time: "09:35 AM",
        place: "Sunny Bay Station ➔ Disneyland Resort Station",
        description: "Transfer to the iconic magical themed train line.",
        steps: [
          "Cross the platform at Sunny Bay Station.",
          "Board the MTR Disneyland Resort Line (Pink), and alight at Disneyland Resort Station."
        ],
        travelTime: "5 minutes",
        fare: "Included in MTR ticket",
        distance: "~5 min ride",
        image: hkgDisneylandImg,
      },
      {
        id: "d2-3",
        time: "10:30 AM",
        place: "Hong Kong Disneyland Entrance",
        description: "Park opens! Enter the park and immediately head to the recommended zones.",
        distance: "—",
        image: hkgDisneylandImg,
      },
      {
        id: "d2-4",
        time: "12:30 PM",
        place: "Park Grounds (Lunch Break)",
        description: "Rest, grab lunch at the Royal Banquet Hall or Comet Cafe.",
        isFreeTime: true,
        distance: "—",
        image: hkgDisneylandImg,
      },
      {
        id: "d2-5",
        time: "05:15 PM",
        place: "Main Street, USA (Parade)",
        description: "Watch the spectacular Friendtastic! Parade (arrive 15 min early for a good viewing spot).",
        distance: "—",
        image: hkgDisneylandImg,
      },
      {
        id: "d2-6",
        time: "08:00 PM",
        place: "Park Grounds (Dinner / Rest)",
        description: "Quick dinner or snack ahead of the evening castle lightshow.",
        isFreeTime: true,
        distance: "—",
        image: hkgDisneylandImg,
      },
      {
        id: "d2-7",
        time: "08:30 PM",
        place: "Main Street, USA (Momentous Show)",
        description: "Watch the incredible 'Momentous' Nighttime Spectacular light, fountain, and fireworks show (arrive 30-45 min early near the castle).",
        distance: "—",
        image: hkgDisneylandImg,
      },
      {
        id: "d2-8",
        time: "~09:30 PM",
        place: "Disneyland Resort Station to Rambler Oasis",
        description: "Return journey after park closure.",
        steps: [
          "Walk to Disneyland Resort Station.",
          "Board the MTR Disneyland Resort Line (Pink), and alight at Sunny Bay Station.",
          "At Sunny Bay Station, transfer to the Tung Chung Line (Orange) toward Hong Kong, and alight at Tsing Yi Station (Exit A).",
          "Board Green Minibus 88F back to Rambler Oasis Hotel."
        ],
        travelTime: "25 minutes",
        fare: "HK$19.40 (HK$16.00 MTR + HK$3.40 Minibus Adult Octopus Fare)",
        distance: "~25 min ride",
        image: ramblerHotelImg,
      }
    ]
  },
  {
    dayNum: 3,
    date: "July 11 (Sat)",
    title: "Macau Day Trip",
    summary: "Take the morning high-speed ferry to Macau. Explore the historic Senado Square, Ruins of St. Paul's, and the luxurious Cotai Strip (Venetian).",
    recommendedLeaveTime: "09:15 AM",
    items: [
      {
        id: "d3-1",
        time: "09:30 AM",
        place: "Tsing Yi Station ➔ Sheung Wan Station",
        description: "Head to the ferry terminal in Sheung Wan.",
        recommendedLeaveTime: "09:15 AM",
        steps: [
          "Take Green Minibus 88F from hotel to Tsing Yi Station.",
          "Enter Tsing Yi Station and board the MTR Tung Chung Line (Orange) toward Hong Kong, then alight at Hong Kong Station.",
          "From Hong Kong Station, walk via the indoor connection walkway to Central Station.",
          "At Central Station, board the Island Line (Blue) toward Chai Wan, and alight at Sheung Wan Station (Exit D).",
          "Head up to the 3F Hong Kong-Macau Ferry Terminal."
        ],
        travelTime: "35 minutes",
        fare: "HK$20.20 (HK$3.40 Minibus + HK$16.80 MTR Adult Octopus Fare)",
        distance: "~35 min ride",
        image: ruinsStPaulImg,
      },
      {
        id: "d3-2",
        time: "10:30 AM",
        place: "Hong Kong-Macau Ferry Terminal ➔ Macau",
        description: "Board the high-speed passenger TurboJET ferry to Macau Outer Harbour.",
        steps: [
          "Clear Hong Kong custom/immigration at Sheung Wan Terminal.",
          "Board the 10:30 AM TurboJET ferry bound for Macau Outer Harbour Ferry Terminal."
        ],
        travelTime: "55 minutes",
        fare: "HK$175.00 (Economy Class Ticket)",
        distance: "~55 min ride",
        image: ruinsStPaulImg,
      },
      {
        id: "d3-3",
        time: "11:45 AM",
        place: "Macau Outer Harbour ➔ Grand Lisboa",
        description: "Enter Macau, clear immigration, and take the free hotel shuttle bus.",
        steps: [
          "Exit Macau Outer Harbour Ferry Terminal, cross via underground walkway to the casino shuttle bus terminal.",
          "Board the free Grand Lisboa Casino Shuttle Bus.",
          "Alight at Grand Lisboa Hotel."
        ],
        travelTime: "10 minutes",
        fare: "Free (Shuttle Bus)",
        distance: "~10 min ride",
        image: ruinsStPaulImg,
      },
      {
        id: "d3-4",
        time: "12:00 PM",
        place: "Senado Square (Largo do Senado)",
        description: "Explore the paved wave-pattern public square, Portuguese-style facades, and heritage sites.",
        steps: [
          "Walk approximately 10 minutes from Grand Lisboa Hotel down Avenida de Almeida Ribeiro to Senado Square."
        ],
        travelTime: "10 minutes",
        fare: "Free",
        distance: "~10 min walk",
        image: ruinsStPaulImg,
      },
      {
        id: "d3-5",
        time: "12:30 PM",
        place: "Lunch (Senado Area)",
        description: "Try Macau delicacies: legendary pork chop buns, Portuguese egg tarts (Lord Stow's or Margaret's), and almond cakes.",
        isFreeTime: true,
        distance: "—",
        image: ruinsStPaulImg,
      },
      {
        id: "d3-6",
        time: "02:15 PM",
        place: "Ruins of St. Paul's",
        description: "The 17th-century Portuguese church stone facade. Landmark of Macau.",
        steps: [
          "Walk approximately 10 minutes through the walking streets from Senado Square northwards."
        ],
        travelTime: "10 minutes",
        fare: "Free",
        distance: "~10 min walk",
        image: ruinsStPaulImg,
      },
      {
        id: "d3-7",
        time: "02:45 PM",
        place: "Mount Fortress",
        description: "Historic military fort adjacent to the ruins. Offers great 360-degree views of Macau.",
        steps: [
          "Walk 5 minutes up the shaded pathways/escalators from the side of the Ruins of St. Paul's."
        ],
        travelTime: "5 minutes",
        fare: "Free",
        distance: "~5 min walk",
        image: ruinsStPaulImg,
      },
      {
        id: "d3-8",
        time: "03:15 PM",
        place: "Senado Area ➔ The Venetian Macao",
        description: "Head south to the Cotai Strip to visit the luxurious Venetian resort.",
        steps: [
          "Walk from Senado Square back to Grand Emperor Hotel or Grand Lisboa.",
          "Board the free casino shuttle bus to The Venetian Macao (alternatively, take public Bus 26A or MT4 for MOP$6.00)."
        ],
        travelTime: "20 minutes",
        fare: "Free (or MOP$6.00 on Public Bus)",
        distance: "~20 min ride",
        image: venetianMacauImg,
      },
      {
        id: "d3-9",
        time: "03:45 PM",
        place: "The Venetian Macao, Cotai",
        description: "Wander the canals with gondola rides, replicas of Venetian bridges, extensive shopping mall, and spectacular casino atrium.",
        isFreeTime: true,
        distance: "—",
        image: venetianMacauImg,
      },
      {
        id: "d3-10",
        time: "05:30 PM",
        place: "The Venetian Macao ➔ Macau Outer Harbour Terminal",
        description: "Return to the ferry terminal for the return trip.",
        steps: [
          "Walk to the West Lobby Shuttle Bus depot inside The Venetian Macao.",
          "Board the free Venetian Shuttle Bus to Macau Outer Harbour Ferry Terminal."
        ],
        travelTime: "20 minutes",
        fare: "Free (Shuttle Bus)",
        distance: "~20 min ride",
        image: venetianMacauImg,
      },
      {
        id: "d3-11",
        time: "06:30 PM",
        place: "Macau Outer Harbour Ferry Terminal ➔ Sheung Wan",
        description: "Board the high-speed ferry back to Hong Kong.",
        steps: [
          "Clear Macau immigration/custom at the Outer Harbour Terminal.",
          "Board the 06:30 PM TurboJET ferry bound for Hong Kong."
        ],
        travelTime: "55 minutes",
        fare: "HK$190.00 (Weekend Evening Fare)",
        distance: "~55 min ride",
        image: ruinsStPaulImg,
      },
      {
        id: "d3-12",
        time: "07:45 PM",
        place: "Sheung Wan Station ➔ Rambler Oasis Hotel",
        description: "MTR journey back to the hotel.",
        steps: [
          "Walk to Sheung Wan MTR Station.",
          "Board the Island Line (Blue) toward Chai Wan, then alight at Central Station.",
          "Walk via the indoor pedestrian corridor to Hong Kong Station.",
          "At Hong Kong Station, board the Tung Chung Line (Orange) toward Tung Chung, and alight at Tsing Yi Station (Exit A).",
          "Board Green Minibus 88F back to Rambler Oasis Hotel."
        ],
        travelTime: "35 minutes",
        fare: "HK$20.20 (HK$16.80 MTR + HK$3.40 Minibus Adult Octopus Fare)",
        distance: "~35 min ride",
        image: ramblerHotelImg,
      }
    ]
  },
  {
    dayNum: 4,
    date: "July 12 (Sun)",
    title: "Ngong Ping ➔ The Peak ➔ Sky100",
    summary: "Single corridor transit: Ngong Ping Big Buddha (West Lantau) ➔ Central Peak Tram ➔ Kowloon Sky100 Harbour observatory.",
    recommendedLeaveTime: "08:10 AM",
    items: [
      {
        id: "d4-1",
        time: "08:30 AM",
        place: "Tsing Yi Station ➔ Tung Chung Station",
        description: "Travel to Lantau Island for the cable car experience.",
        recommendedLeaveTime: "08:10 AM",
        steps: [
          "Board Green Minibus 88F from hotel to Tsing Yi MTR Station.",
          "Board the MTR Tung Chung Line (Orange) toward Tung Chung, and alight at Tung Chung Station (Exit B)."
        ],
        travelTime: "20 minutes",
        fare: "HK$18.50 (HK$3.40 Minibus + HK$15.10 MTR Adult Octopus Fare)",
        distance: "~20 min ride",
        image: bigBuddhaImg,
      },
      {
        id: "d4-2",
        time: "09:00 AM",
        place: "Tung Chung Cable Car Terminal ➔ Ngong Ping",
        description: "Breathtaking 25-minute glass-bottom crystal cabin cable car ride.",
        steps: [
          "Walk 2 minutes from Tung Chung Station Exit B to the Cable Car Terminal.",
          "Board the Ngong Ping 360 Crystal Cabin."
        ],
        travelTime: "25 minutes",
        fare: "HK$235.00 (Adult Single Crystal Cabin Ticket)",
        distance: "~25 min ride",
        image: bigBuddhaImg,
      },
      {
        id: "d4-3",
        time: "09:30 AM",
        place: "Tian Tan Big Buddha & Po Lin Monastery",
        description: "Climb the 268 steps to the majestic giant bronze Buddha. Explore the beautiful temple monastery.",
        steps: [
          "Walk from Ngong Ping Cable Car Village along the scenic piazza to the base of Big Buddha stairs."
        ],
        travelTime: "—",
        fare: "Free (Museum inside Buddha pedestal is HK$45, includes lunch voucher)",
        distance: "—",
        image: bigBuddhaImg,
      },
      {
        id: "d4-4",
        time: "11:30 AM",
        place: "Lunch (Ngong Ping Village)",
        description: "Grab a vegetarian meal at the monastery or a meal in the Ngong Ping theme village.",
        isFreeTime: true,
        distance: "—",
        image: bigBuddhaImg,
      },
      {
        id: "d4-5",
        time: "12:30 PM",
        place: "Ngong Ping ➔ Tung Chung Cable Car Terminal",
        description: "Return cable car down to Tung Chung.",
        steps: [
          "Board the Ngong Ping 360 Cable Car back to Tung Chung."
        ],
        travelTime: "25 minutes",
        fare: "HK$160.00 (Single Ticket or included in round-trip prebook)",
        distance: "~25 min ride",
        image: bigBuddhaImg,
      },
      {
        id: "d4-6",
        time: "01:00 PM",
        place: "Tung Chung Station ➔ Central Station",
        description: "Transit from Lantau Island directly to Hong Kong Island's Central district.",
        steps: [
          "Enter Tung Chung MTR Station.",
          "Board the MTR Tung Chung Line (Orange) toward Hong Kong, and alight at Hong Kong Station.",
          "From Hong Kong Station, walk to the Central area via the indoor walkway/escalators."
        ],
        travelTime: "35 minutes",
        fare: "HK$23.60 (Adult Octopus Fare)",
        distance: "~35 min ride",
        image: victoriaPeakImg,
      },
      {
        id: "d4-7",
        time: "02:00 PM",
        place: "Central / SoHo (Free Roam)",
        description: "Explore the mid-levels escalators, historic PMQ, boutique coffee shops, and graffiti walls in SoHo.",
        isFreeTime: true,
        distance: "—",
        image: victoriaPeakImg,
      },
      {
        id: "d4-8",
        time: "04:30 PM",
        place: "Central (Exchange Square) ➔ Peak Tram",
        description: "Transit to the historic Peak Tram lower station.",
        steps: [
          "Walk to Exchange Square Bus Terminus or Central Ferry Pier 8.",
          "Board Bus 15C (Double-decker Open-top) to Peak Tram Lower Terminus on Garden Road."
        ],
        travelTime: "20 minutes",
        fare: "HK$5.10 (Adult Octopus Fare)",
        distance: "~20 min ride",
        image: victoriaPeakImg,
      },
      {
        id: "d4-9",
        time: "05:15 PM",
        place: "The Peak / Sky Terrace 428",
        description: "Sunset viewing at Sky Terrace 428. Witness the magical transition of Hong Kong skyline from day to glittering night.",
        steps: [
          "Board the steep historical Peak Tram at the Lower Terminus.",
          "Alight at Upper Terminus (Peak Tower) and head to the outdoor observation deck (Sky Terrace 428)."
        ],
        travelTime: "10 minutes",
        fare: "HK$88.00 (Peak Tram + Sky Pass Single Combo)",
        distance: "~10 min ride",
        image: victoriaPeakImg,
      },
      {
        id: "d4-10",
        time: "07:00 PM",
        place: "The Peak Upper Terminus ➔ Central Station",
        description: "Journey down the hill towards Central.",
        steps: [
          "Board Peak Tram down to Lower Terminus (or take Bus 15 from Peak Galleria direct to Central for HK$12.10).",
          "Walk approx. 10 minutes to Central Station."
        ],
        travelTime: "20 minutes",
        fare: "HK$53.00 (Peak Tram Downward Single)",
        distance: "~20 min ride",
        image: victoriaPeakImg,
      },
      {
        id: "d4-11",
        time: "07:30 PM",
        place: "Central Station ➔ Kowloon Station",
        description: "Cross the harbour to the International Commerce Centre (ICC) in Kowloon.",
        steps: [
          "Walk from Central MTR Station to Hong Kong MTR Station via the indoor pedestrian corridor.",
          "Board the MTR Tung Chung Line (Orange) toward Tung Chung, and alight at Kowloon Station (Exit C)."
        ],
        travelTime: "15 minutes",
        fare: "HK$11.50 (Adult Octopus Fare)",
        distance: "~15 min ride",
        image: sky100ViewImg,
      },
      {
        id: "d4-12",
        time: "08:00 PM",
        place: "Sky100 Observatory (ICC)",
        description: "Take the high-speed elevator to the 100th floor. Incredible 360-degree indoor observation deck view of Hong Kong Island and Kowloon.",
        steps: [
          "Walk to Sky100 ticketing & entrance on 1/F of Elements Mall, ICC.",
          "Take the ultra-fast elevator up to the 100th floor (takes exactly 60 seconds)."
        ],
        travelTime: "—",
        fare: "HK$198.00 (Standard Admission Ticket)",
        distance: "—",
        image: sky100ViewImg,
      },
      {
        id: "d4-13",
        time: "09:30 PM",
        place: "Kowloon Station ➔ Tsing Yi Station",
        description: "Return back to the hotel.",
        steps: [
          "Enter Kowloon MTR Station.",
          "Board the MTR Tung Chung Line (Orange) toward Tung Chung, and alight at Tsing Yi Station (Exit A).",
          "Board Green Minibus 88F back to Rambler Oasis Hotel."
        ],
        travelTime: "15 minutes",
        fare: "HK$14.90 (HK$11.50 MTR + HK$3.40 Minibus Adult Octopus Fare)",
        distance: "~15 min ride",
        image: ramblerHotelImg,
      }
    ]
  },
  {
    dayNum: 5,
    date: "July 13 (Mon)",
    title: "Departure",
    summary: "Check-out of hotel, board airport express bus, and fly back to Manila.",
    recommendedLeaveTime: "07:30 AM",
    items: [
      {
        id: "d5-1",
        time: "07:30 AM",
        place: "Rambler Oasis Hotel Check-out",
        description: "Complete checkout procedures and carry baggage.",
        distance: "—",
        image: ramblerHotelImg,
      },
      {
        id: "d5-2",
        time: "07:45 AM",
        place: "Ching Tao House ➔ HKG Airport, Terminal 1",
        description: "Express airport bus directly to departures.",
        steps: [
          "Walk 5 minutes to Ching Tao House, Cheung Ching Estate Bus Stop.",
          "Board Bus A32 (Long Win Bus) toward Airport.",
          "Alight at Hong Kong International Airport Passenger Terminal 1 Departures Level."
        ],
        travelTime: "45 minutes",
        fare: "HK$19.80 (Adult Cash/Octopus Fare)",
        distance: "~45 min ride",
        image: ramblerHotelImg,
      },
      {
        id: "d5-3",
        time: "11:00 AM",
        place: "Hong Kong International Airport, Terminal 1 (Departure)",
        description: "Board Flight 5J 111 back to Manila Ninoy Aquino International Airport Terminal 3.",
        distance: "—",
        image: ramblerHotelImg,
      }
    ]
  }
];

export const bankingInfo: BankInfo[] = [
  {
    locationName: "Airport / Ground Transport Centre",
    nearbyBanks: "HSBC, Bank of China (BOC), Citibank",
    atmAvailability: "Available 24/7 in Arrivals Hall & Terminal 1 Main Concourse",
    cardsAccepted: "Visa, Mastercard, UnionPay, JCB, Plus, Cirrus",
    distance: "1-3 mins walk within the airport arrivals area",
  },
  {
    locationName: "Rambler Oasis Hotel (Tsing Yi)",
    nearbyBanks: "Hang Seng Bank ATM, BOC ATM (nearby Cheung Ching Estate)",
    atmAvailability: "Hang Seng ATM inside Tsing Yi Station, BOC ATM at Cheung Ching Shopping Centre",
    cardsAccepted: "Visa, Mastercard, UnionPay, Plus, Cirrus",
    distance: "5-10 mins walk to Cheung Ching Estate, or Tsing Yi Station (minibus)",
  },
  {
    locationName: "Tsim Sha Tsui (Cultural Centre / Harbour Cruise)",
    nearbyBanks: "HSBC TST Branch, Bank of East Asia, Hang Seng Bank",
    atmAvailability: "Multiple ATMs along Nathan Road, inside Tsim Sha Tsui MTR Station",
    cardsAccepted: "Visa, Mastercard, UnionPay, JCB, Plus, Cirrus",
    distance: "3-5 mins walk from Cultural Centre or Tsim Sha Tsui Station Exit E",
  },
  {
    locationName: "Hong Kong Disneyland",
    nearbyBanks: "Standard Chartered Bank ATMs",
    atmAvailability: "Located at Main Entrance (outside) and Town Hall on Main Street, USA",
    cardsAccepted: "Visa, Mastercard, UnionPay, JCB, Plus",
    distance: "1-2 mins walk from Park Gate or Town Hall",
  },
  {
    locationName: "Senado Square & Ruins of St. Paul's (Macau)",
    nearbyBanks: "Banco Nacional Ultramarino (BNU), Bank of China Macau, ICBC Macau",
    atmAvailability: "ATMs in Senado Square branch offices, adjacent to tourist pathways",
    cardsAccepted: "Visa, Mastercard, UnionPay, Cirrus (accepts HKD and MOP cash)",
    distance: "1-3 mins walk around Senado Square",
  },
  {
    locationName: "The Venetian Macao",
    nearbyBanks: "ICBC Macau, Luso International Bank, BOC ATMs",
    atmAvailability: "Multiple cash machines located inside the Casino lobby and Shoppes mall",
    cardsAccepted: "Visa, Mastercard, UnionPay, JCB, Plus, Cirrus",
    distance: "1-2 mins walk inside the resort complex",
  },
  {
    locationName: "Tung Chung (Cable Car Terminal / Citygate)",
    nearbyBanks: "HSBC, Hang Seng Bank, Bank of China",
    atmAvailability: "Citygate Outlets ground floor, Tung Chung MTR Station concourse",
    cardsAccepted: "Visa, Mastercard, UnionPay, Plus, Cirrus",
    distance: "2-4 mins walk from Cable Car Terminal / Station Exit B",
  },
  {
    locationName: "Ngong Ping Village",
    nearbyBanks: "BOC Macau/HK ATM kiosk",
    atmAvailability: "ATM kiosk in Ngong Ping Village near transit plaza",
    cardsAccepted: "Visa, Mastercard, UnionPay, Plus",
    distance: "2 mins walk from Cable Car Village terminal",
  },
  {
    locationName: "Central / SoHo / The Peak",
    nearbyBanks: "HSBC Main Building (Central), Hang Seng Bank HQ, Standard Chartered",
    atmAvailability: "ATMs in Central MTR Station, Peak Tower Ground Level (HSBC/BOC)",
    cardsAccepted: "Visa, Mastercard, UnionPay, JCB, Plus, Cirrus",
    distance: "1-2 mins walk from Peak Upper Terminus or Central exits",
  },
  {
    locationName: "Sky100 / ICC (Kowloon)",
    nearbyBanks: "HSBC Premier Centre, Hang Seng ATM, Bank of China",
    atmAvailability: "Inside Elements Mall (Kowloon Station) connect floors",
    cardsAccepted: "Visa, Mastercard, UnionPay, Plus, Cirrus",
    distance: "2-3 mins walk from Sky100 ticket desk",
  },
];
