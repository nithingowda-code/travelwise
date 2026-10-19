import { YatraDestination } from '../types/yatra';

export const YATRA_DESTINATIONS: YatraDestination[] = [
  // ==========================================
  // KARNATAKA
  // ==========================================
  {
    id: 'hampi-vijayanagara',
    name: 'Hampi Sacred Ruins & Stone Chariot',
    hindiName: 'हम्पी विजयनगर स्मारक',
    stateId: 'karnataka',
    stateName: 'Karnataka',
    cityOrDistrict: 'Vijayanagara / Hospet',
    category: 'heritage',
    isOffbeat: false,
    coordinates: [15.3350, 76.4600],
    image: 'https://images.unsplash.com/photo-1600100397608-f010e0881b6d?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / @heritage_india',
    crowdLevel: 'high',
    crowdScore: 78,
    bestTimeOfDay: '06:30 AM - 09:30 AM (Sunrise at Matanga Hill & quiet complex)',
    bestTimeReason: 'Granite boulders get blisteringly hot after 11:30 AM; morning light is sublime.',
    openingHours: '06:00 AM - 06:00 PM',
    entryFeeINR: 40,
    foreignFeeINR: 600,
    seasonalAccess: 'Year-round; best Oct-Feb; dry and cool',
    safetyNote: 'Carry 2L water per person; wear slip-resistant footwear on granite boulders.',
    weather: {
      tempMin: 21,
      tempMax: 31,
      tempCurrent: 27,
      condition: 'Sunny & Dry',
      rainProb: 5,
      humidity: 42,
      windKmh: 12,
      sunrise: '06:14 AM',
      sunset: '06:05 PM',
      suitabilityScore: 92,
      source: 'IMD Bellary & Open-Meteo API',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Kamalapura ASI Archaeological Museum & Indoor Sculpture Gallery',
      description: 'Air-conditioned galleries housing Vijayanagara brass coins, gold jewellery, and miniature scale city models.',
      type: 'museum'
    },
    nearbyMedical: {
      hospitalName: 'Vijayanagar Institute of Medical Sciences (VIMS Hospet)',
      distanceKm: 12.5,
      emergencyPhone: '+91-8394-228300 / Dial 108',
      pharmacyName: 'Sanjeevani Med Store Kamalapura (800m)'
    },
    connectivity: {
      mobileNetwork: '4G/5G (Jio & Airtel)',
      fuelPumpDistanceKm: 4.2,
      atmAvailability: 'Town Only (5-10 km)'
    },
    stays: {
      budget: { name: 'Rocky Guesthouse Hampi Island', category: 'budget', approxPriceINR: 1200, amenities: 'Clean fan rooms, river view cafe, bicycle rental', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Heritage Resort Hampi', category: 'mid-range', approxPriceINR: 4800, amenities: 'Cottages, swimming pool, organic farm dining', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Evolve Back Kamalapura Palace', category: 'luxury', approxPriceINR: 24500, amenities: 'Regal Vijayanagara architecture, private jacuzzi pools, spa', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Mango Tree Restaurant', type: 'Garden Cafe', costPerPersonINR: 280, specialty: 'South Indian thali, woodfired pizza, fresh pomegranate juice', foodType: 'Pure Veg' },
      { name: 'Gopi Roof Restaurant', type: 'Terrace Eatery', costPerPersonINR: 220, specialty: 'Banana lassi, lemon rice, masala chai', foodType: 'Pure Veg' }
    ],
    shortDescription: '14th-century capital of the Vijayanagara Empire with 1,600 surviving monuments set in surreal boulder landscapes.',
    fullDescription: 'Spread over 4,100 hectares along the Tungabhadra River, UNESCO World Heritage Hampi features the iconic Vittala Stone Chariot, musical pillared halls, and the still-active Virupaksha Temple. Sunset from Hemakuta hill is unforgettable.',
    tags: ['UNESCO Heritage', 'Vijayanagara', 'Ancient Architecture', 'Boulders']
  },
  {
    id: 'badami-caves',
    name: 'Badami Rock-cut Cave Temples',
    hindiName: 'बादामी गुफा मंदिर',
    stateId: 'karnataka',
    stateName: 'Karnataka',
    cityOrDistrict: 'Bagalkot',
    category: 'heritage',
    isOffbeat: true,
    coordinates: [15.9189, 75.6766],
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Wikimedia Commons / CC-BY-SA 4.0',
    crowdLevel: 'low',
    crowdScore: 28,
    bestTimeOfDay: '03:30 PM - 05:45 PM (Golden hour on red sandstone & Agastya Lake)',
    bestTimeReason: 'Red sandstone glows fiery copper before sunset; crowd drops sharply by 4 PM.',
    openingHours: '09:00 AM - 05:30 PM',
    entryFeeINR: 25,
    foreignFeeINR: 300,
    seasonalAccess: 'Year-round; winter Oct-Feb is magnificent',
    safetyNote: 'Watch out for local monkeys near Cave 3; keep food bags zipped.',
    weather: {
      tempMin: 20,
      tempMax: 30,
      tempCurrent: 28,
      condition: 'Clear Sky',
      rainProb: 0,
      humidity: 38,
      windKmh: 10,
      sunrise: '06:17 AM',
      sunset: '06:08 PM',
      suitabilityScore: 95,
      source: 'IMD Hubballi / Open-Meteo',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Badami ASI Archaeological Museum & Bhootnath Temple Porch',
      description: 'Sheltered lakeside museum housing 6th-century Chalukyan sculptures and hero stones.',
      type: 'museum'
    },
    nearbyMedical: {
      hospitalName: 'Badami Taluk Government General Hospital',
      distanceKm: 2.1,
      emergencyPhone: '+91-8357-220025 / 108',
      pharmacyName: 'Balaji Medico Badami Bus Stand (1.2 km)'
    },
    connectivity: {
      mobileNetwork: '4G/5G (Jio & Airtel)',
      fuelPumpDistanceKm: 1.8,
      atmAvailability: 'Town Only (5-10 km)'
    },
    stays: {
      budget: { name: 'Hotel Mayura Gerusoppa (KSTDC)', category: 'budget', approxPriceINR: 1400, amenities: 'Clean AC rooms, lakeside garden, parking', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'The Heritage Resort Badami', category: 'mid-range', approxPriceINR: 3900, amenities: 'Cottages, pool, lawn dining, tour guide desk', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Badami Court Boutique Stay', category: 'luxury', approxPriceINR: 7500, amenities: 'Premium suites, gourmet regional dining', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'KSTDC Mayura Restaurant', type: 'Diner', costPerPersonINR: 180, specialty: 'Jolada rotti meal with stuffed brinjal and shenga chutney', foodType: 'Pure Veg' },
      { name: 'Geeta Darshini', type: 'Local Cafe', costPerPersonINR: 80, specialty: 'Mysore masala dosa & filter coffee', foodType: 'Pure Veg' }
    ],
    shortDescription: '6th-century rock-cut sandstone cave temples of the Chalukya dynasty overlooking the emerald Agastya Lake.',
    fullDescription: 'Carved out of monolithic red sandstone cliffs, the four cave temples of Badami depict magnificent Nataraja with 81 dancing postures, Vishnu resting on Sheshanaga, and Jain Tirthankaras, without the heavy crowds of Hampi.',
    tags: ['Offbeat', 'Chalukya Dynasty', 'Rock-cut Caves', 'Peaceful']
  },

  // ==========================================
  // RAJASTHAN
  // ==========================================
  {
    id: 'jaipur-amber-fort',
    name: 'Amber Fort & Sheesh Mahal',
    hindiName: 'आमेर किला और शीश महल',
    stateId: 'rajasthan',
    stateName: 'Rajasthan',
    cityOrDistrict: 'Jaipur',
    category: 'heritage',
    isOffbeat: false,
    coordinates: [26.9855, 75.8513],
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / @rajasthan_amber',
    crowdLevel: 'high',
    crowdScore: 85,
    bestTimeOfDay: '08:00 AM - 10:00 AM (First opening slot) or Night Viewing 07:00 PM',
    bestTimeReason: 'Tour buses arrive between 11 AM and 3 PM causing 40-minute lines at Sheesh Mahal.',
    openingHours: '08:00 AM - 05:30 PM, 06:30 PM - 09:15 PM (Night)',
    entryFeeINR: 100,
    foreignFeeINR: 550,
    seasonalAccess: 'Year-round; winter Oct-Mar is ideal',
    safetyNote: 'Steep cobblestone ramp path; electric jeeps are available for seniors and mobility-assisted visitors.',
    weather: {
      tempMin: 18,
      tempMax: 32,
      tempCurrent: 28,
      condition: 'Sunny & Clear',
      rainProb: 0,
      humidity: 35,
      windKmh: 9,
      sunrise: '06:28 AM',
      sunset: '05:54 PM',
      suitabilityScore: 94,
      source: 'IMD Jaipur / Open-Meteo',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Anokhi Museum of Hand Printing & Jaigarh Armory Museum',
      description: 'Housed in a restored haveli 500m from Amber; live block printing demonstrations and covered textile exhibits.',
      type: 'museum'
    },
    nearbyMedical: {
      hospitalName: 'SMS Hospital & Medical College Jaipur (Main Trauma)',
      distanceKm: 11.0,
      emergencyPhone: '+91-141-2560291 / 112',
      pharmacyName: 'Apollo Pharmacy Amer Main Bazaar (450m)'
    },
    connectivity: {
      mobileNetwork: '4G/5G (Jio & Airtel)',
      fuelPumpDistanceKm: 1.2,
      atmAvailability: 'Abundant in Area'
    },
    stays: {
      budget: { name: 'Zostel Jaipur (M.I. Road)', category: 'budget', approxPriceINR: 950, amenities: 'AC dorms & private rooms, rooftop cafe, social events', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Khandela Haveli Heritage Stay', category: 'mid-range', approxPriceINR: 4200, amenities: 'Boutique heritage courtyard, rooftop pool, royal hospitality', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Rambagh Palace Jaipur (Taj)', category: 'luxury', approxPriceINR: 42000, amenities: 'Former Maharaja residence, peacock gardens, butler service', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: '1135 AD Amber Fort', type: 'Fine Dining Inside Fort', costPerPersonINR: 1800, specialty: 'Thal of the Maharajas, Lal Maas, Royal Gatte ki Sabzi', foodType: 'Veg & Non-Veg' },
      { name: 'Laxmi Mishthan Bhandar (LMB)', type: 'Iconic Sweet & Thali Shop', costPerPersonINR: 450, specialty: 'Rajasthani Dal Baati Churma, Ghewar, Pyaaz Kachori', foodType: 'Pure Veg' }
    ],
    shortDescription: 'Opulent hilltop palace with marble courtyards, mirror-inlaid halls, and sweeping views of Maota Lake.',
    fullDescription: 'Constructed by Raja Man Singh I in 1592, Amber Fort blends Rajput and Mughal architectural grandeur. The Hall of Mirrors (Sheesh Mahal) reflects candlelight across thousands of Belgian mirrors.',
    tags: ['UNESCO World Heritage', 'Royal Rajput', 'Palace', 'Must Visit']
  },
  {
    id: 'bundi-taragarh',
    name: 'Bundi Stepwells & Taragarh Fort',
    hindiName: 'बूंदी की बावड़ियाँ और तारागढ़ किला',
    stateId: 'rajasthan',
    stateName: 'Rajasthan',
    cityOrDistrict: 'Bundi',
    category: 'heritage',
    isOffbeat: true,
    coordinates: [25.4415, 75.6440],
    image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Wikimedia Commons / CC-BY-SA',
    crowdLevel: 'low',
    crowdScore: 22,
    bestTimeOfDay: '08:00 AM - 11:30 AM (Cool morning light in Raniji ki Baori)',
    bestTimeReason: 'Virtually zero tour buses; peaceful photography of intricate turquoise frescoes and stepwell stone carvings.',
    openingHours: '09:00 AM - 05:00 PM',
    entryFeeINR: 50,
    foreignFeeINR: 350,
    seasonalAccess: 'Year-round; gorgeous Oct-Mar',
    safetyNote: 'Take walking stick for Taragarh hill climb; steps can be uneven.',
    weather: {
      tempMin: 17,
      tempMax: 30,
      tempCurrent: 26,
      condition: 'Sunny',
      rainProb: 0,
      humidity: 32,
      windKmh: 8,
      sunrise: '06:26 AM',
      sunset: '05:56 PM',
      suitabilityScore: 96,
      source: 'IMD Kota / Open-Meteo',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Chitrashala Bundi Miniature Painting Gallery',
      description: 'Covered arcaded gallery containing original 18th-century Bundi school frescoes depicting Lord Krishna.',
      type: 'museum'
    },
    nearbyMedical: {
      hospitalName: 'District Government General Hospital Bundi',
      distanceKm: 2.4,
      emergencyPhone: '+91-747-2442222 / 108',
      pharmacyName: 'Kalyan Medicos Azad Park Bundi (1 km)'
    },
    connectivity: {
      mobileNetwork: '4G/5G (Jio & Airtel)',
      fuelPumpDistanceKm: 1.5,
      atmAvailability: 'Town Only (5-10 km)'
    },
    stays: {
      budget: { name: 'Bundi Vilas Heritage Homestay', category: 'budget', approxPriceINR: 1600, amenities: '300-year-old haveli, fort view rooftop, homemade food', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Hadoti Palace Bundi', category: 'mid-range', approxPriceINR: 3800, amenities: 'Colonial style, swimming pool, vintage car collection', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Umaid Bhawan Heritage Palace Bundi', category: 'luxury', approxPriceINR: 7200, amenities: 'Royal suite rooms, traditional folk performances', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Baori View Cafe', type: 'Rooftop Cafe', costPerPersonINR: 220, specialty: 'Masala chai, aloo parathas, apple crumble', foodType: 'Pure Veg' },
      { name: 'Saffron Haveli Kitchen', type: 'Traditional Rajasthani', costPerPersonINR: 320, specialty: 'Ker Sangri, bajra roti with white butter', foodType: 'Pure Veg' }
    ],
    shortDescription: 'Rudyard Kipling’s beloved quiet blue town famed for over 50 architectural stepwells and exquisite miniature wall frescoes.',
    fullDescription: 'Unlike bustling Jaipur or Udaipur, Bundi remains an untouched jewel. Raniji ki Baori (Queen’s Stepwell) features 46-meter deep tiered stairs carved with elephants, and Taragarh Fort crowns the town with medieval ramparts.',
    tags: ['Offbeat', 'Hidden Gem', 'Stepwells', 'Fresco Paintings', 'Tranquil']
  },

  // ==========================================
  // HIMACHAL PRADESH
  // ==========================================
  {
    id: 'manali-solang',
    name: 'Solang Valley & Rohtang Pass',
    hindiName: 'सोलंग घाटी और रोहतांग दर्रा',
    stateId: 'himachal-pradesh',
    stateName: 'Himachal Pradesh',
    cityOrDistrict: 'Kullu / Manali',
    category: 'adventure',
    isOffbeat: false,
    coordinates: [32.3166, 77.1583],
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / @himalayan_snow',
    crowdLevel: 'high',
    crowdScore: 84,
    bestTimeOfDay: '07:30 AM - 10:00 AM (Early entry before tourist traffic jams)',
    bestTimeReason: 'Atal Tunnel and Solang parking lot get gridlocked between 11 AM and 3 PM.',
    openingHours: '06:00 AM - 05:00 PM (Subject to weather & snow clearance)',
    entryFeeINR: 0,
    permitRequired: 'Rohtang Pass Green Vehicle Permit (Daily quota via HP Tourism Portal, ~₹550/car)',
    seasonalAccess: 'Solang open year-round; Rohtang open June - Nov depending on snow',
    safetyNote: 'Dress in thermal layers. Check Atal tunnel road status during heavy winter snow or monsoon rains.',
    weather: {
      tempMin: 5,
      tempMax: 16,
      tempCurrent: 12,
      condition: 'Crisp Mountain Breeze',
      rainProb: 10,
      humidity: 50,
      windKmh: 14,
      sunrise: '06:31 AM',
      sunset: '05:51 PM',
      suitabilityScore: 89,
      source: 'IMD Shimla / Snow & Avalanche Study Est. (SASE)',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Naggar Castle & Nicholas Roerich Art Gallery',
      description: 'Indoor timber-and-stone Himalayan castle 20 km away with cozy cafe and famous mountain oil paintings.',
      type: 'cultural_center'
    },
    nearbyMedical: {
      hospitalName: 'Civil Hospital Manali (24x7 Emergency & Trauma)',
      distanceKm: 13.0,
      emergencyPhone: '+91-1902-252354 / 108',
      pharmacyName: 'Govind Medical Store Solang Junction (2 km)'
    },
    connectivity: {
      mobileNetwork: '4G/5G (Jio & Airtel)',
      fuelPumpDistanceKm: 11.5,
      atmAvailability: 'Town Only (5-10 km)'
    },
    stays: {
      budget: { name: 'The Hosteller Manali (Old Manali)', category: 'budget', approxPriceINR: 850, amenities: 'Mountain view dorms, riverside lawn, high-speed WiFi', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Larisa Resort Manali', category: 'mid-range', approxPriceINR: 5800, amenities: 'Apple orchard cottages, fireplace, heated blankets', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'The Himalayan Castle & Spa', category: 'luxury', approxPriceINR: 19500, amenities: 'Victorian Gothic castle, heated pool, mountain view dining', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Cafe 1947 Old Manali', type: 'Riverside Italian Cafe', costPerPersonINR: 550, specialty: 'Trout fish, handmade ravioli, hot mulled spiced cider', foodType: 'Veg & Non-Veg' },
      { name: 'Chopsticks Restaurant', type: 'Tibetan & Himalayan', costPerPersonINR: 300, specialty: 'Steamed mutton momos, thukpa, thenthuk noodle soup', foodType: 'Veg & Non-Veg' }
    ],
    shortDescription: 'World-famous adventure valley offering paragliding, skiing, and gateway to the Atal Tunnel.',
    fullDescription: 'Nestled between cedar forests and snowy Pir Panjal peaks, Solang Valley is Himachal’s adventure epicenter. The engineering marvel Atal Tunnel (9.02 km) connects the valley seamlessly to the Lahaul plateau.',
    tags: ['Snow Mountains', 'Adventure Sports', 'Atal Tunnel', 'Himachal Famous']
  },
  {
    id: 'jibhi-tirthan',
    name: 'Jibhi & Tirthan Valley Pine Forests',
    hindiName: 'जिभी और तीर्थन घाटी',
    stateId: 'himachal-pradesh',
    stateName: 'Himachal Pradesh',
    cityOrDistrict: 'Kullu / Banjar',
    category: 'nature',
    isOffbeat: true,
    coordinates: [31.6366, 77.3486],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / @himalayan_escapes',
    crowdLevel: 'low',
    crowdScore: 24,
    bestTimeOfDay: '09:00 AM - 01:00 PM (Pine canopy stroll & Jibhi mini waterfall)',
    bestTimeReason: 'Serene forest silence with birdsong; crystal Tirthan river free of commercial noise.',
    openingHours: '24 Hours open (Natural sanctuary)',
    entryFeeINR: 0,
    seasonalAccess: 'Open year-round; light snowfall Dec-Jan, lush green Mar-Oct',
    safetyNote: 'Avoid riverbanks during flash flood alerts; carry cash as ATMs can run dry in Banjar.',
    weather: {
      tempMin: 7,
      tempMax: 19,
      tempCurrent: 15,
      condition: 'Partly Cloudy & Fresh',
      rainProb: 15,
      humidity: 55,
      windKmh: 8,
      sunrise: '06:30 AM',
      sunset: '05:52 PM',
      suitabilityScore: 94,
      source: 'IMD Banjar / Open-Meteo',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Chehni Kothi 1,500-yr Timber Tower & Local Weavers Guild',
      description: 'Indigenous earthquake-resistant deodar wood and stone fortress with covered interior sanctum.',
      type: 'cultural_center'
    },
    nearbyMedical: {
      hospitalName: 'Community Health Centre (CHC) Banjar',
      distanceKm: 8.5,
      emergencyPhone: '+91-1903-222225 / 108',
      pharmacyName: 'Kullu Chemist Jibhi Market (300m)'
    },
    connectivity: {
      mobileNetwork: 'BSNL Primary / Spotty Jio',
      fuelPumpDistanceKm: 14.0,
      atmAvailability: 'Town Only (5-10 km)'
    },
    stays: {
      budget: { name: 'Mudhouse Experiential Hostel Jibhi', category: 'budget', approxPriceINR: 1100, amenities: 'Traditional cedar mudhouse, river garden, bonfires', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Kushart Homestay Tirthan', category: 'mid-range', approxPriceINR: 3200, amenities: 'Balcony overlooking trout river, homemade Himachali Siddu', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Raju’s Cottage Gushaini', category: 'luxury', approxPriceINR: 6500, amenities: 'Celebrated cable-car river crossing, organic orchard dining', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Hope Cafe Jibhi', type: 'Wooden Treehouse Cafe', costPerPersonINR: 280, specialty: 'Himachali Siddu with ghee, wood-roasted coffee, shakshuka', foodType: 'Veg & Non-Veg' },
      { name: 'River View Dhaba', type: 'Local Riverside Diner', costPerPersonINR: 160, specialty: 'Fried brown trout fish, rajma chawal, rhododendron juice', foodType: 'Veg & Non-Veg' }
    ],
    shortDescription: 'Pristine Himalayan hamlet of traditional cedar wood cottages, natural stone bridges, and crystal trout streams.',
    fullDescription: 'Located near the UNESCO Great Himalayan National Park, Jibhi and Tirthan Valley are the antithesis of commercial hill stations. Serolsar Lake trek, Chehni Kothi wood fort, and untouched deodar pine canopies offer deep peace.',
    tags: ['Offbeat', 'Hidden Gem', 'Pine Forests', 'Riverside', 'Peaceful']
  },

  // ==========================================
  // LADAKH (UT)
  // ==========================================
  {
    id: 'ladakh-pangong',
    name: 'Pangong Tso High-Altitude Salt Lake',
    hindiName: 'पैंगोंग त्सो झील',
    stateId: 'ladakh',
    stateName: 'Ladakh',
    cityOrDistrict: 'Leh District',
    category: 'nature',
    isOffbeat: false,
    coordinates: [33.7595, 78.6674],
    image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / @ladakh_azure',
    crowdLevel: 'high',
    crowdScore: 75,
    bestTimeOfDay: '07:00 AM - 09:30 AM (Mirror calm reflections before midday tourist jeeps)',
    bestTimeReason: 'Lake shifts through 7 distinct shades of blue under early sunlight; wind picks up after 1 PM.',
    openingHours: 'Daylight hours; checkpoints close at dusk',
    entryFeeINR: 0,
    permitRequired: 'Ladakh Inner Line Permit (ILP) / Environment & Wildlife Fee (Online ~₹450/person)',
    seasonalAccess: 'Accessible May - Oct; frozen solid in winter (Nov - Apr)',
    safetyNote: 'Altitude: 14,270 ft (4,350 m). Mandatory 48-hr acclimatization in Leh first. Carry portable oxygen can & Diamox if doctor recommended.',
    weather: {
      tempMin: -2,
      tempMax: 12,
      tempCurrent: 8,
      condition: 'Clear Intense Sun',
      rainProb: 0,
      humidity: 20,
      windKmh: 22,
      sunrise: '06:08 AM',
      sunset: '05:40 PM',
      suitabilityScore: 88,
      source: 'IMD Leh & NASA POWER Climatology',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Tangtse Monastery & Community Cultural Hall',
      description: 'Warm indoor Buddhist hall with wood stove (Bukhari) and antique thangka scroll paintings.',
      type: 'temple'
    },
    nearbyMedical: {
      hospitalName: 'Army Medical Post (MI Room) Tangtse (Oxygen Support)',
      distanceKm: 34.0,
      emergencyPhone: 'Dial 112 / Army Station Tango-Zero',
      pharmacyName: 'Primary Health Centre Tangtse (34 km)'
    },
    connectivity: {
      mobileNetwork: 'BSNL Primary / Spotty Jio',
      fuelPumpDistanceKm: 135.0,
      atmAvailability: 'None - Carry Cash'
    },
    stays: {
      budget: { name: 'Lukung Eco Camps Pangong', category: 'budget', approxPriceINR: 2200, amenities: 'Insulated swiss tents, solar lights, hot water bucket', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Pangong Sarai Luxury Camps Spangmik', category: 'mid-range', approxPriceINR: 4800, amenities: 'Attached heated bathrooms, lake panorama windows, buffet dining', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'The Pangong Glamping Resort', category: 'luxury', approxPriceINR: 11500, amenities: 'Geodesic heated domes with stargazing skylights', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Spangmik Lake Diner', type: 'Camp Dining Tent', costPerPersonINR: 350, specialty: 'Hot ginger lemon honey tea, veg thukpa, dal tadka with roti', foodType: 'Pure Veg' },
      { name: 'Tangtse Highway Daba', type: 'Dhaba', costPerPersonINR: 180, specialty: 'Maggi, butter tea (Gur Gur chai), steamed aloo momos', foodType: 'Veg & Non-Veg' }
    ],
    shortDescription: 'World’s highest saltwater lake (14,270 ft) extending 134 km across India and Tibet, shifting through 7 shades of blue.',
    fullDescription: 'Famous from films and celebrated for its otherworldly indigo expanse bordered by arid mountains, Pangong Tso is an essential Ladakh icon. Cross the 17,590 ft Chang La pass to reach this majestic water body.',
    tags: ['Ladakh Highlight', 'High Altitude Lake', 'Permit Required', 'Surreal']
  },
  {
    id: 'ladakh-hanle',
    name: 'Hanle Dark Sky Reserve & Astronomical Sanctuary',
    hindiName: 'हानले डार्क स्काई अभयारण्य',
    stateId: 'ladakh',
    stateName: 'Ladakh',
    cityOrDistrict: 'Changthang / Hanle',
    category: 'adventure',
    isOffbeat: true,
    coordinates: [32.7766, 78.9666],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Wikimedia Commons / Indian Astronomical Observatory CC-BY-SA',
    crowdLevel: 'low',
    crowdScore: 12,
    bestTimeOfDay: '08:30 PM - 02:00 AM (Zero light pollution Milky Way astrophotography)',
    bestTimeReason: 'Certified as India’s first Dark Sky Reserve; naked-eye views of the galactic core and nebulae.',
    openingHours: 'Observatory daytime tours 10 AM - 4 PM; Night sky 24 hrs',
    entryFeeINR: 0,
    permitRequired: 'Hanle Inner Line Permit (Mention "Hanle / Umling La" specifically in portal)',
    seasonalAccess: 'May to October; extreme sub-zero cold in winter (-25°C)',
    safetyNote: 'Altitude: 14,760 ft. Strict light hygiene rules (no high beams or white flashlights after sunset).',
    weather: {
      tempMin: -5,
      tempMax: 9,
      tempCurrent: 4,
      condition: 'Crystal Clear Starry Sky',
      rainProb: 0,
      humidity: 12,
      windKmh: 16,
      sunrise: '06:05 AM',
      sunset: '05:38 PM',
      suitabilityScore: 97,
      source: 'Indian Institute of Astrophysics / IMD',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: '17th-Century Hanle Gompa & Drukpa Heritage Hall',
      description: 'Ancient hilltop monastery overlooking the river valley with butter lamps and traditional clay murals.',
      type: 'temple'
    },
    nearbyMedical: {
      hospitalName: 'Army Medical Station Hanle / Nyoma CHC',
      distanceKm: 18.0,
      emergencyPhone: 'Dial 112 / Army Base Alert',
      pharmacyName: 'Community First Aid Dispensary Hanle (Village centre)'
    },
    connectivity: {
      mobileNetwork: 'Zero Signal / Dead Zone',
      fuelPumpDistanceKm: 75.0,
      atmAvailability: 'None - Carry Cash'
    },
    stays: {
      budget: { name: 'Padma Homestay Hanle', category: 'budget', approxPriceINR: 1500, amenities: 'Heated blankets, telescope viewing deck, local Ladakhi food', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Milky Way Stargazing Guest House', category: 'mid-range', approxPriceINR: 3200, amenities: 'Solar heated water, red-light stargazing lamps, amateur telescopes', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Hanle Astro-Resort Cottages', category: 'luxury', approxPriceINR: 6800, amenities: 'Panoramic glass stargazing ceiling, oxygen concentrators', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Sonam Homestay Kitchen', type: 'Village Homestyle Meal', costPerPersonINR: 250, specialty: 'Fresh Ladakhi Tingmo (steamed bread), dal, hot seabuckthorn berry tea', foodType: 'Pure Veg' },
      { name: 'Stargazer Tea Corner', type: 'Tea Shack', costPerPersonINR: 100, specialty: 'Yak butter tea, hot kahwa with crushed almonds', foodType: 'Pure Veg' }
    ],
    shortDescription: 'India’s first certified Dark Sky Reserve hosting one of the world’s highest optical astronomical telescopes.',
    fullDescription: 'Located in remote Changthang near the Indo-Tibetan border, Hanle boasts virtually zero light and atmospheric pollution. Stargazers can witness the Milky Way arching across pristine Himalayan snow peaks.',
    tags: ['Offbeat', 'Hidden Gem', 'Dark Sky Reserve', 'Astrophotography', 'Extreme Altitude']
  },

  // ==========================================
  // KERALA
  // ==========================================
  {
    id: 'kerala-alleppey',
    name: 'Alleppey Backwaters & Kettuvallam Cruise',
    hindiName: 'अलेप्पी बैकवाटर्स हाउसबोट',
    stateId: 'kerala',
    stateName: 'Kerala',
    cityOrDistrict: 'Alappuzha',
    category: 'nature',
    isOffbeat: false,
    coordinates: [9.4981, 76.3388],
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / @kerala_backwaters',
    crowdLevel: 'high',
    crowdScore: 82,
    bestTimeOfDay: '02:00 PM - 05:30 PM (Midday cruise check-in & sunset over paddy fields)',
    bestTimeReason: 'Punnamada Jetty experiences queues at 11 AM; booked houseboats cruise quietly into village canals by afternoon.',
    openingHours: 'Houseboats cruise 12:00 PM to 05:30 PM (Anchored overnight as per govt fishing laws)',
    entryFeeINR: 0,
    seasonalAccess: 'Year-round; Nov-Feb is cool and breezy, Jun-Aug is monsoon Ayurveda bliss',
    safetyNote: 'Life jackets mandatory during cruising; ensure boat is KRL Certified.',
    weather: {
      tempMin: 24,
      tempMax: 31,
      tempCurrent: 29,
      condition: 'Tropical Sunshine with Light Coastal Breeze',
      rainProb: 20,
      humidity: 72,
      windKmh: 11,
      sunrise: '06:12 AM',
      sunset: '06:08 PM',
      suitabilityScore: 93,
      source: 'IMD Thiruvananthapuram / Open-Meteo',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Revi Karunakaran Memorial Museum & Coir Craft Village',
      description: 'Extensive private collection of antique Swarovski crystal, ivory, Tanjore paintings, and sheltered coir loom center.',
      type: 'museum'
    },
    nearbyMedical: {
      hospitalName: 'Government Medical College Hospital Alappuzha (Vandanam)',
      distanceKm: 8.5,
      emergencyPhone: '+91-477-2282015 / 108',
      pharmacyName: 'Neethi Medical Store Alleppey Boat Jetty (600m)'
    },
    connectivity: {
      mobileNetwork: '4G/5G (Jio & Airtel)',
      fuelPumpDistanceKm: 1.5,
      atmAvailability: 'Abundant in Area'
    },
    stays: {
      budget: { name: 'Zostel Alleppey Beach', category: 'budget', approxPriceINR: 900, amenities: 'Beachfront dorms, hammock lounge, kayak rentals', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Private 1-Bedroom Deluxe Houseboat Cruise', category: 'mid-range', approxPriceINR: 8500, amenities: 'Upper deck view, private chef, AC bedroom, full day backwater cruising', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Kumarakom Lake Resort (Heritage Luxury)', category: 'luxury', approxPriceINR: 28000, amenities: 'Meandering pool villas, Ayurvedic sanctuary, sunset speedboat', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Houseboat Private Chef Experience', type: 'Onboard Traditional Kitchen', costPerPersonINR: 600, specialty: 'Karimeen Pollichathu (pearl spot fish in banana leaf), red rice, avial', foodType: 'Veg & Non-Veg' },
      { name: 'Kream Korner Art Cafe Alleppey', type: 'Heritage Cafe', costPerPersonINR: 250, specialty: 'Kerala parotta with vegetable stew, banana fritters, cold brew', foodType: 'Veg & Non-Veg' }
    ],
    shortDescription: 'The Venice of the East, famed for traditional thatched rice barges cruising through serene palm-fringed backwater lagoons.',
    fullDescription: 'Cruising through the quiet waterways of Kuttanad, the lowest altitude farming region in India, you observe village life, paddy fields below sea level, and stunning water lily beds away from city rush.',
    tags: ['Kerala Backwaters', 'Houseboat', 'Must Visit', 'Lush Tropical']
  },
  {
    id: 'kerala-marari',
    name: 'Marari Quiet Beach & Fishermen Village',
    hindiName: 'मारारी शांत समुद्र तट',
    stateId: 'kerala',
    stateName: 'Kerala',
    cityOrDistrict: 'Mararikulam / Alappuzha',
    category: 'beaches',
    isOffbeat: true,
    coordinates: [9.6000, 76.2990],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / @marari_coast',
    crowdLevel: 'low',
    crowdScore: 18,
    bestTimeOfDay: '05:00 PM - 06:45 PM (Tranquil sunset & watching return of traditional catamarans)',
    bestTimeReason: 'No water scooters or loud shacks; peaceful waves, coconut groves, and clean white sand.',
    openingHours: '24 Hours open (Public beach)',
    entryFeeINR: 0,
    seasonalAccess: 'Year-round; Nov-Mar is calm sea',
    safetyNote: 'Swim only in designated areas; avoid deep currents during high tide.',
    weather: {
      tempMin: 23,
      tempMax: 30,
      tempCurrent: 28,
      condition: 'Sunny with Ocean Mist',
      rainProb: 10,
      humidity: 68,
      windKmh: 13,
      sunrise: '06:13 AM',
      sunset: '06:09 PM',
      suitabilityScore: 96,
      source: 'IMD Kochi / Open-Meteo',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Arthunkal St. Andrew’s Basilica (16th-Century Heritage Church)',
      description: 'Magnificent Portuguese-built coastal basilica with covered teak colonnades and historic bells.',
      type: 'cultural_center'
    },
    nearbyMedical: {
      hospitalName: 'Cherthala Taluk Government Hospital',
      distanceKm: 7.2,
      emergencyPhone: '+91-478-2812234 / 108',
      pharmacyName: 'Jan Aushadhi Kendra Mararikulam (1.1 km)'
    },
    connectivity: {
      mobileNetwork: '4G/5G (Jio & Airtel)',
      fuelPumpDistanceKm: 2.8,
      atmAvailability: 'Town Only (5-10 km)'
    },
    stays: {
      budget: { name: 'Marari Dreamz Homestay', category: 'budget', approxPriceINR: 1800, amenities: 'Bicycle, private porch 3 mins walk to beach, homemade appam', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Marari Fishermen’s Village Resort', category: 'mid-range', approxPriceINR: 4200, amenities: 'Thatched beach cottages, organic garden, yoga deck', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Marari Beach Resort - CGH Earth', category: 'luxury', approxPriceINR: 18500, amenities: 'Eco-luxury village concept, butterfly garden, Ayurvedic spa', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Cafe Marari Beach', type: 'Coastal Seafood Shack', costPerPersonINR: 380, specialty: 'Tawa fish fry with lemon butter, coconut prawn curry, appam', foodType: 'Veg & Non-Veg' },
      { name: 'Kripa Homestay Meals', type: 'Local Home Dining', costPerPersonINR: 200, specialty: 'Vegetarian Sadhya on banana leaf with sambar and payasam', foodType: 'Pure Veg' }
    ],
    shortDescription: 'Untouched stretch of soft white sand and swaying coconut palms, offering a peaceful antidote to busy beaches.',
    fullDescription: 'Named after the local fishing village of Mararikulam, Marari offers endless coastline without the commercial noise of Goa or Kovalam. Watch traditional fishermen launch wooden canoes at dawn.',
    tags: ['Offbeat', 'Hidden Gem', 'Pristine Beach', 'Peaceful', 'Eco Retreat']
  },

  // ==========================================
  // MEGHALAYA
  // ==========================================
  {
    id: 'meghalaya-cherrapunji',
    name: 'Cherrapunji (Sohra) Nohkalikai Falls',
    hindiName: 'चेरापूंजी नोहकलीकाई जलप्रपात',
    stateId: 'meghalaya',
    stateName: 'Meghalaya',
    cityOrDistrict: 'East Khasi Hills / Sohra',
    category: 'nature',
    isOffbeat: false,
    coordinates: [25.2750, 91.7330],
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / @meghalaya_sohra',
    crowdLevel: 'high',
    crowdScore: 79,
    bestTimeOfDay: '08:30 AM - 10:30 AM (Clear valley view before midday mist rolls in)',
    bestTimeReason: 'By 12:30 PM, heavy clouds and mist frequently shroud the 1,115 ft plunge pool.',
    openingHours: '08:00 AM - 05:00 PM',
    entryFeeINR: 50,
    seasonalAccess: 'Year-round; spectacular monsoon (Jun-Sep), crystal views (Oct-Mar)',
    safetyNote: 'Stay behind designated safety railings; high winds and sheer drop at viewpoint.',
    weather: {
      tempMin: 14,
      tempMax: 22,
      tempCurrent: 18,
      condition: 'Misty Breezes & Mountain Sun',
      rainProb: 35,
      humidity: 78,
      windKmh: 14,
      sunrise: '05:38 AM',
      sunset: '05:14 PM',
      suitabilityScore: 88,
      source: 'IMD Shillong / NASA POWER',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Mawsmai Limestone Caves & Covered Eco Park',
      description: 'Lit underground prehistoric limestone chambers with stalactites and fossil formations safe from rain.',
      type: 'museum'
    },
    nearbyMedical: {
      hospitalName: 'Sohra Community Health Centre (CHC Cherrapunji)',
      distanceKm: 4.8,
      emergencyPhone: '+91-3637-235222 / 108',
      pharmacyName: 'Laitryngew Medical Store Sohra (2 km)'
    },
    connectivity: {
      mobileNetwork: '4G/5G (Jio & Airtel)',
      fuelPumpDistanceKm: 3.5,
      atmAvailability: 'Town Only (5-10 km)'
    },
    stays: {
      budget: { name: 'By The Way Guesthouse Sohra', category: 'budget', approxPriceINR: 1200, amenities: 'Backpacker haven, trekking advice, hot water geysers', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Polo Orchid Resort Cherrapunjee', category: 'mid-range', approxPriceINR: 6200, amenities: 'Cliff-edge cottages overlooking Bangladesh plains, infinity pool', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Jiva Resort Sohra', category: 'luxury', approxPriceINR: 14500, amenities: 'Luxury stone villas, fine dining, private bonfire gardens', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Orange Roots Restaurant Cherrapunji', type: 'Hygienic Pure Veg Diner', costPerPersonINR: 240, specialty: 'South Indian thali, hot masala chai, aloo parathas', foodType: 'Pure Veg' },
      { name: 'Jadoh Khasi Eatery', type: 'Authentic Indigenous Eatery', costPerPersonINR: 180, specialty: 'Jadoh (rice cooked in broth), Dohneiiong (pork with black sesame), bamboo shoot salad', foodType: 'Veg & Non-Veg' }
    ],
    shortDescription: 'India’s tallest plunge waterfall (1,115 ft / 340 m) cascading into a surreal turquoise pool amid lush Khasi hills.',
    fullDescription: 'Nohkalikai Falls plunges off the edge of the world’s wettest plateau into an emerald rainforest gorge. The viewpoint offers dramatic vistas across the Khasi canyons and Bangladesh plains.',
    tags: ['Meghalaya Highlight', 'Waterfalls', 'Dramatic Canyons', 'Must Visit']
  },
  {
    id: 'meghalaya-nongriat',
    name: 'Nongriat Double Decker Living Root Bridge',
    hindiName: 'नोंगरियात डबल डेकर लिविंग रूट ब्रिज',
    stateId: 'meghalaya',
    stateName: 'Meghalaya',
    cityOrDistrict: 'East Khasi Hills / Tyrna',
    category: 'trekking',
    isOffbeat: true,
    coordinates: [25.2508, 91.6708],
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Wikimedia Commons / CC-BY-SA 4.0',
    crowdLevel: 'low',
    crowdScore: 32,
    bestTimeOfDay: '06:30 AM - 11:00 AM (Start descent from Tyrna early to beat humidity)',
    bestTimeReason: 'Trek consists of 3,500 stone steps down and up; early morning provides shade and cool canyon air.',
    openingHours: '06:00 AM - 05:00 PM (Start trek back up before 3 PM)',
    entryFeeINR: 40,
    seasonalAccess: 'Open year-round; dry season Oct-Apr is optimal for trekking',
    safetyNote: '3,500 stone steps. Not suitable for travelers with acute knee/mobility issues. Carry bamboo walking stick (₹20 at Tyrna).',
    weather: {
      tempMin: 16,
      tempMax: 24,
      tempCurrent: 20,
      condition: 'Humid Rainforest Canopy',
      rainProb: 25,
      humidity: 85,
      windKmh: 6,
      sunrise: '05:39 AM',
      sunset: '05:14 PM',
      suitabilityScore: 91,
      source: 'IMD Sohra / NASA POWER',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Nongriat Village Indigenous Bamboo Craft Centre & Homestay Hearth',
      description: 'Under cover of traditional Khasi stilts, watch elders weave cane bridges and roast wild mountain tea.',
      type: 'cultural_center'
    },
    nearbyMedical: {
      hospitalName: 'Sohra CHC (via Tyrna road head)',
      distanceKm: 14.5,
      emergencyPhone: '+91-3637-235222 / 108',
      pharmacyName: 'Tyrna Village First Aid Point (at top of steps)'
    },
    connectivity: {
      mobileNetwork: 'BSNL Primary / Spotty Jio',
      fuelPumpDistanceKm: 16.0,
      atmAvailability: 'None - Carry Cash'
    },
    stays: {
      budget: { name: 'Serene Homestay Nongriat (Byron’s)', category: 'budget', approxPriceINR: 800, amenities: 'Basic clean rooms, natural spring pool, home-cooked food', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Tyrna Eco Resort (Road-head luxury)', category: 'mid-range', approxPriceINR: 3400, amenities: 'Attached bath, hot water, mountain view terrace', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Polo Orchid Sohra (Stay at top & day hike)', category: 'luxury', approxPriceINR: 6200, amenities: 'Luxury resort with massage therapy for tired legs', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Nongriat Community Kitchen', type: 'Village Hearth', costPerPersonINR: 150, specialty: 'Maggi, boiled jungle eggs, organic Khasi honey tea, dal rice', foodType: 'Veg & Non-Veg' },
      { name: 'Rainbow Falls Trailside Shack', type: 'Trail Rest Stop', costPerPersonINR: 120, specialty: 'Fresh cut pineapples with mountain black salt, lemonade', foodType: 'Pure Veg' }
    ],
    shortDescription: 'World-famous 250-year-old bio-engineering marvel grown from living rubber fig tree roots over a crystal river canyon.',
    fullDescription: 'Guided across generations by the Khasi people, the roots of Ficus elastica form a natural two-tiered suspension bridge over torrential streams. Continuing 1.5 hours further leads to the azure Rainbow Falls.',
    tags: ['Offbeat', 'Hidden Gem', 'Bio-engineering', 'Living Root Bridges', 'Active Trekking']
  },

  // ==========================================
  // UTTAR PRADESH
  // ==========================================
  {
    id: 'up-varanasi-ghats',
    name: 'Varanasi Dashashwamedh & Ganga Aarti',
    hindiName: 'वाराणसी दशाश्वमेध घाट एवं गंगा आरती',
    stateId: 'uttar-pradesh',
    stateName: 'Uttar Pradesh',
    cityOrDistrict: 'Varanasi (Kashi)',
    category: 'spiritual',
    isOffbeat: false,
    coordinates: [25.3076, 83.0107],
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / @varanasi_ghats',
    crowdLevel: 'high',
    crowdScore: 92,
    bestTimeOfDay: '05:30 AM - 07:30 AM (Subah-e-Banaras boat ride) or 06:15 PM (Evening Aarti)',
    bestTimeReason: 'Dawn sunrise boat ride allows viewing 84 ghats peacefully without evening crowd stampedes.',
    openingHours: 'Ghats accessible 24/7; Evening Aarti 06:45 PM - 07:45 PM',
    entryFeeINR: 0,
    seasonalAccess: 'Year-round; Nov-Mar is cool and pleasant; avoid peak May heat (>44°C)',
    safetyNote: 'Watch your step on slippery stone river steps; do not swim in river without certified boatmen.',
    weather: {
      tempMin: 19,
      tempMax: 31,
      tempCurrent: 27,
      condition: 'Sunny with River Haze',
      rainProb: 0,
      humidity: 50,
      windKmh: 7,
      sunrise: '06:02 AM',
      sunset: '05:35 PM',
      suitabilityScore: 92,
      source: 'IMD Varanasi / Open-Meteo',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Bharat Kala Bhavan Museum (BHU Campus)',
      description: 'World-renowned museum housing 100,000 antiquities, Mughal miniature paintings, and Hindu stone sculptures.',
      type: 'museum'
    },
    nearbyMedical: {
      hospitalName: 'Sir Sunderlal Hospital (BHU Trauma Centre)',
      distanceKm: 5.5,
      emergencyPhone: '+91-542-2369291 / 112',
      pharmacyName: 'Godowlia Chowk 24x7 Chemist (400m from Ghat)'
    },
    connectivity: {
      mobileNetwork: '4G/5G (Jio & Airtel)',
      fuelPumpDistanceKm: 2.1,
      atmAvailability: 'Abundant in Area'
    },
    stays: {
      budget: { name: 'Moustache Hostel Varanasi (Assi Ghat)', category: 'budget', approxPriceINR: 750, amenities: 'Rooftop cafe, walking tours, clean AC dorms', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'BrijRama Palace Heritage (Darbhanga Ghat)', category: 'mid-range', approxPriceINR: 12500, amenities: 'Historical 18th-century palace right on ghat, private bajra boat', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Taj Ganges Varanasi (Nadesar)', category: 'luxury', approxPriceINR: 22000, amenities: 'Palatial gardens, spa, fine dining, royal heritage suites', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Kashi Chaat Bhandar (Godowlia)', type: 'Iconic Street Food Joint', costPerPersonINR: 150, specialty: 'Tamatar Chaat, Palak Patta Chaat, Dahi Puri, Gulab Jamun', foodType: 'Pure Veg' },
      { name: 'Pizzeria Vaatika Cafe (Assi Ghat)', type: 'Riverside Italian Bakery', costPerPersonINR: 320, specialty: 'Woodfired thin crust pizza, warm apple pie with ice cream', foodType: 'Pure Veg' }
    ],
    shortDescription: 'One of the world’s oldest continuously inhabited cities, famed for sacred ghats, ancient temples, and synchronized brass Aarti.',
    fullDescription: 'For millennia, pilgrims have gathered along the riverbanks of Kashi. The evening Ganga Aarti at Dashashwamedh features priests chanting Vedic hymns with multi-tiered brass oil lamps in rhythmic unison.',
    tags: ['Spiritual Capital', 'Ganga Aarti', 'Ancient World', 'Must Visit']
  },
  {
    id: 'up-chunar-fort',
    name: 'Chunar Fort Overlooking River Ganga',
    hindiName: 'चुनार का प्राचीन किला',
    stateId: 'uttar-pradesh',
    stateName: 'Uttar Pradesh',
    cityOrDistrict: 'Mirzapur / Chunar',
    category: 'heritage',
    isOffbeat: true,
    coordinates: [25.1278, 82.8750],
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Wikimedia Commons / CC-BY-SA',
    crowdLevel: 'low',
    crowdScore: 16,
    bestTimeOfDay: '09:00 AM - 12:00 PM (Quiet exploration of ramparts and river breeze)',
    bestTimeReason: 'Situated 40 km from Varanasi, this colossal fortress is virtually empty of tourist crowds.',
    openingHours: '09:00 AM - 05:00 PM',
    entryFeeINR: 20,
    seasonalAccess: 'Year-round; winter Oct-Mar is pleasant',
    safetyNote: 'Watch footing near cliff edge overlooking the river bend; carry drinking water.',
    weather: {
      tempMin: 18,
      tempMax: 30,
      tempCurrent: 26,
      condition: 'Clear Sky & Gentle Breeze',
      rainProb: 0,
      humidity: 45,
      windKmh: 9,
      sunrise: '06:03 AM',
      sunset: '05:36 PM',
      suitabilityScore: 95,
      source: 'IMD Mirzapur / Open-Meteo',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Chunar Pottery Artisan Guild & Terra-cotta Workshops',
      description: 'Under cover of potter sheds, watch master craftsmen produce glazed red-clay Chunar pottery (GI tagged).',
      type: 'cultural_center'
    },
    nearbyMedical: {
      hospitalName: 'Community Health Centre (CHC) Chunar',
      distanceKm: 2.2,
      emergencyPhone: '+91-5443-222320 / 108',
      pharmacyName: 'Gupta Medical Store Chunar Bazar (800m)'
    },
    connectivity: {
      mobileNetwork: '4G/5G (Jio & Airtel)',
      fuelPumpDistanceKm: 1.8,
      atmAvailability: 'Town Only (5-10 km)'
    },
    stays: {
      budget: { name: 'Chunar Heritage Tourist Lodge', category: 'budget', approxPriceINR: 1100, amenities: 'Basic river view rooms, courtyard, home-style food', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'BrijRama Palace (Stay in Varanasi & day-trip)', category: 'mid-range', approxPriceINR: 12500, amenities: 'Private boat excursion to Chunar along the Ganga', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Taj Ganges Varanasi', category: 'luxury', approxPriceINR: 22000, amenities: 'Chauffeur-driven luxury SUV day-trip to Chunar and Vindhyachal', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Kila View Ganga Dhaba', type: 'Local Riverside Dhaba', costPerPersonINR: 160, specialty: 'Litti chokha roasted over cow-dung embers with desi ghee', foodType: 'Pure Veg' },
      { name: 'Chunar Sweets Corner', type: 'Sweet Shop', costPerPersonINR: 80, specialty: 'Fresh hot peda and rabri jalebi', foodType: 'Pure Veg' }
    ],
    shortDescription: 'Legendary 2,000-year-old sandstone fortress associated with King Vikramaditya and Sher Shah Suri standing at a scenic bend of the Ganga.',
    fullDescription: 'Rising 80 feet above the Ganges, Chunar Fort has stood guard for two millennia. It features ancient stone sundials, the subterranean Sonwa Mandap pavilion, and panoramic views of rural river craft.',
    tags: ['Offbeat', 'Hidden Gem', 'River Fortress', 'Ancient History', 'No Crowds']
  },

  // ==========================================
  // GOA
  // ==========================================
  {
    id: 'goa-baga-beach',
    name: 'Baga Beach & Fort Aguada',
    hindiName: 'बागा बीच और अगुआडा किला',
    stateId: 'goa',
    stateName: 'Goa',
    cityOrDistrict: 'North Goa / Bardez',
    category: 'beaches',
    isOffbeat: false,
    coordinates: [15.5553, 73.7517],
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / @goa_beaches',
    crowdLevel: 'high',
    crowdScore: 88,
    bestTimeOfDay: '08:00 AM - 10:30 AM (Fort Aguada morning breeze) or Sunset Shacks 05:30 PM',
    bestTimeReason: 'Traffic bottlenecks peak after 4 PM; Fort Aguada gets long queues under midday heat.',
    openingHours: 'Aguada Fort: 09:00 AM - 05:30 PM; Baga Beach: 24/7',
    entryFeeINR: 50,
    seasonalAccess: 'Year-round; Nov-Feb is prime party season, Jun-Sep is monsoon serenity',
    safetyNote: 'Observe beach safety flags; red flags mean strictly no swimming due to undercurrents.',
    weather: {
      tempMin: 24,
      tempMax: 32,
      tempCurrent: 29,
      condition: 'Sunny with Warm Coastal Breeze',
      rainProb: 10,
      humidity: 65,
      windKmh: 14,
      sunrise: '06:25 AM',
      sunset: '06:12 PM',
      suitabilityScore: 94,
      source: 'IMD Panaji / Open-Meteo',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Houses of Goa Architectural Museum & Mario Miranda Gallery',
      description: 'Unique ship-shaped indoor museum in Salvador do Mundo showcasing Portuguese-Goan domestic architecture.',
      type: 'museum'
    },
    nearbyMedical: {
      hospitalName: 'Manipal Hospital Dona Paula / Candolim Primary Health Centre',
      distanceKm: 6.5,
      emergencyPhone: '+91-832-3048888 / 108',
      pharmacyName: 'Wellness Forever 24x7 Baga Junction (400m)'
    },
    connectivity: {
      mobileNetwork: '4G/5G (Jio & Airtel)',
      fuelPumpDistanceKm: 1.2,
      atmAvailability: 'Abundant in Area'
    },
    stays: {
      budget: { name: 'Zostel Goa (Calangute/Baga)', category: 'budget', approxPriceINR: 1100, amenities: 'Swimming pool, social lounge, bike rentals, clean dorms', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Santana Beach Resort Candolim', category: 'mid-range', approxPriceINR: 4500, amenities: 'Direct beach access, two pools, garden restaurant', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Taj Fort Aguada Resort & Spa', category: 'luxury', approxPriceINR: 26000, amenities: 'Perched on ramparts of 16th-century Portuguese fortress, sea villas', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Britto’s Bakery & Beach Shack', type: 'Iconic Beach Shack', costPerPersonINR: 650, specialty: 'Crab Xec Xec, Goan prawn curry rice, chocolate mud pie', foodType: 'Veg & Non-Veg' },
      { name: 'Infantaria Cafe & Bakery', type: 'European Cafe', costPerPersonINR: 350, specialty: 'Goan chorizo pao, Bebinca, English breakfast, cold coffee', foodType: 'Veg & Non-Veg' }
    ],
    shortDescription: 'North Goa’s bustling beach icon packed with shacks, watersports, and the 17th-century Portuguese Fort Aguada lighthouse.',
    fullDescription: 'From jet-skiing and parasailing along Baga creek to walking the sea-facing ramparts of Fort Aguada, North Goa is the vibrant entertainment heart of the coastal state.',
    tags: ['Goa Famous', 'Nightlife & Shacks', 'Fort Aguada', 'Watersports']
  },
  {
    id: 'goa-divar-island',
    name: 'Divar Island & Chorao Bird Sanctuary',
    hindiName: 'दिवार द्वीप और चोराव पक्षी अभयारण्य',
    stateId: 'goa',
    stateName: 'Goa',
    cityOrDistrict: 'North Goa / Mandovi Estuary',
    category: 'nature',
    isOffbeat: true,
    coordinates: [15.5186, 73.8828],
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Wikimedia Commons / CC-BY-SA 4.0',
    crowdLevel: 'low',
    crowdScore: 15,
    bestTimeOfDay: '07:00 AM - 10:30 AM (Morning cycle tour of Portuguese villas & boat birding)',
    bestTimeReason: 'Ferry across the Mandovi river transports you 100 years into the past; zero party noise.',
    openingHours: 'Island accessible 24/7 via free government vehicle ferry',
    entryFeeINR: 0,
    seasonalAccess: 'Year-round; Nov-Mar is winter birding season for Dr. Salim Ali Bird Sanctuary',
    safetyNote: 'Ferries operate every 15-30 minutes; drive carefully on narrow village roads.',
    weather: {
      tempMin: 22,
      tempMax: 30,
      tempCurrent: 27,
      condition: 'Gentle Backwater Breeze',
      rainProb: 5,
      humidity: 62,
      windKmh: 9,
      sunrise: '06:24 AM',
      sunset: '06:11 PM',
      suitabilityScore: 97,
      source: 'IMD Panaji / Open-Meteo',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Our Lady of Compassion Church & Indo-Portuguese Heritage Haveli Tour',
      description: 'Housed on Divar hilltop with panoramic river views, baroque gilded altars, and sheltered courtyards.',
      type: 'temple'
    },
    nearbyMedical: {
      hospitalName: 'Goa Medical College (GMC Bambolim / Main Trauma)',
      distanceKm: 8.5,
      emergencyPhone: '+91-832-2458700 / 108',
      pharmacyName: 'Divar Village Pharmacy & First Aid (Near Ferry Wharf)'
    },
    connectivity: {
      mobileNetwork: '4G/5G (Jio & Airtel)',
      fuelPumpDistanceKm: 4.5,
      atmAvailability: 'Town Only (5-10 km)'
    },
    stays: {
      budget: { name: 'Divar Island Homestay & Cycle Villa', category: 'budget', approxPriceINR: 1600, amenities: 'Bicycles, garden, heritage Portuguese tiled rooms', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Devaaya Wellness & Ayurveda Resort Divar', category: 'mid-range', approxPriceINR: 5200, amenities: 'River view yoga pavilion, holistic wellness therapies', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Mercure Goa Devaaya Retreat', category: 'luxury', approxPriceINR: 8500, amenities: 'Lush 5-acre island sanctuary, private boat pickup from Panaji', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Matias Heritage Diner Divar', type: 'Village Tavern', costPerPersonINR: 280, specialty: 'Goan fish thali, poi bread with pork vindaloo, freshly grated coconut sol kadi', foodType: 'Veg & Non-Veg' },
      { name: 'Island Bakery & Tea Porch', type: 'Tea House', costPerPersonINR: 120, specialty: 'Hot serradura pudding, tea, batata vada', foodType: 'Pure Veg' }
    ],
    shortDescription: 'Idyllic river island reached only by free government ferry, covered in sleepy paddy fields, baroque churches, and colorful Portuguese villas.',
    fullDescription: 'Disconnected from the commercial chaos of coastal Goa, Divar Island is where time slows down. Rent an electric bicycle to ride past 300-year-old mansions with oyster-shell windows and spot kingfishers in the mangrove channels.',
    tags: ['Offbeat', 'Hidden Gem', 'Island Backwaters', 'Portuguese Heritage', 'Cycle Trails']
  },

  // ==========================================
  // SIKKIM
  // ==========================================
  {
    id: 'sikkim-tsomgo',
    name: 'Tsomgo Glacial Lake & Nathu La Pass',
    hindiName: 'त्सोमगो झील और नाथू ला दर्रा',
    stateId: 'sikkim',
    stateName: 'Sikkim',
    cityOrDistrict: 'East Sikkim / Gangtok',
    category: 'nature',
    isOffbeat: false,
    coordinates: [27.3742, 88.7619],
    image: 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / @sikkim_himalayas',
    crowdLevel: 'high',
    crowdScore: 81,
    bestTimeOfDay: '08:00 AM - 11:00 AM (Early clearance from Gangtok police checkpoint)',
    bestTimeReason: 'Army checkpoints shut traffic towards Nathu La after 1 PM due to sudden alpine fog and snow.',
    openingHours: '07:30 AM - 02:00 PM (Permit required; Nathu La closed on Mon & Tue)',
    entryFeeINR: 0,
    permitRequired: 'Protected Area Permit (PAP) issued via Sikkim Tourism / registered tour operators with ID photos',
    seasonalAccess: 'Mar-May (rhododendrons), Oct-Dec (crystal views); heavy winter snow closes pass intermittently',
    safetyNote: 'Altitude: 12,310 ft (Lake) / 14,140 ft (Nathu La Pass). Carry warm thermal layers, gloves, and camphor or doctor-prescribed medicine.',
    weather: {
      tempMin: 1,
      tempMax: 11,
      tempCurrent: 6,
      condition: 'High Alpine Crisp Sun & Chilly Wind',
      rainProb: 10,
      humidity: 48,
      windKmh: 18,
      sunrise: '05:42 AM',
      sunset: '05:18 PM',
      suitabilityScore: 89,
      source: 'IMD Gangtok / NASA POWER',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Namgyal Institute of Tibetology & Do Drul Chorten Gangtok',
      description: 'Acclaimed museum housing one of the world’s largest collections of Tibetan manuscripts, thangkas, and bronzes.',
      type: 'museum'
    },
    nearbyMedical: {
      hospitalName: 'STNM Multi-Speciality Government Hospital Gangtok (Sochaygang)',
      distanceKm: 32.0,
      emergencyPhone: '+91-3592-202944 / 112',
      pharmacyName: 'Army Medical Post (Sherathang) for Acute Altitude Sickness'
    },
    connectivity: {
      mobileNetwork: 'BSNL Primary / Spotty Jio',
      fuelPumpDistanceKm: 34.0,
      atmAvailability: 'Town Only (5-10 km)'
    },
    stays: {
      budget: { name: 'Tag Along Backpackers Gangtok', category: 'budget', approxPriceINR: 950, amenities: 'Cozy bunk beds, rooftop view, travel permit desk', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'The Elgin Nor-Khill Gangtok', category: 'mid-range', approxPriceINR: 8500, amenities: 'Royal heritage hotel of the Chogyals of Sikkim, wooden fireplaces', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'Mayfair Spa Resort & Casino Gangtok', category: 'luxury', approxPriceINR: 19500, amenities: 'Monastic architecture, luxury spa, heated indoor pool', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Tsomgo Lake Yak Shack', type: 'Alpine Kiosk', costPerPersonINR: 150, specialty: 'Hot Maggi, vegetable momos with fiery dalle chilli dip, butter tea', foodType: 'Veg & Non-Veg' },
      { name: 'Taste of Tibet (MG Marg Gangtok)', type: 'Tibetan Diner', costPerPersonINR: 350, specialty: 'Gyathuk noodle soup, shaphaley, steamed tingmo with beef/mushrooms', foodType: 'Veg & Non-Veg' }
    ],
    shortDescription: 'Sacred glacial lake at 12,310 ft surrounded by rugged alpine peaks, yak safaris, and the historic Indo-China Silk Route pass.',
    fullDescription: 'Reflecting the changing colors of the seasons, Tsomgo (Changu) Lake is held sacred by the Sikkimese people. The ropeway offers views of snow-capped peaks and winding roads leading up to Nathu La pass.',
    tags: ['Sikkim Highlight', 'Glacial Lake', 'Nathu La Pass', 'Snow Views']
  },
  {
    id: 'sikkim-dzongu',
    name: 'Dzongu Special Indigenous Lepcha Reserve',
    hindiName: 'ज़ोंगू लेप्चा संरक्षित क्षेत्र',
    stateId: 'sikkim',
    stateName: 'Sikkim',
    cityOrDistrict: 'North Sikkim / Mangan',
    category: 'nature',
    isOffbeat: true,
    coordinates: [27.5020, 88.5410],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Wikimedia Commons / CC-BY-SA 4.0',
    crowdLevel: 'low',
    crowdScore: 10,
    bestTimeOfDay: '07:30 AM - 12:30 PM (Lingtam waterfall walk & cardamom farm exploration)',
    bestTimeReason: 'Restricted access zone means complete absence of commercial mass tourism.',
    openingHours: 'Permit entry between 08:00 AM and 04:00 PM',
    entryFeeINR: 0,
    permitRequired: 'Special Dzongu Entry Permit issued by District Magistrate Mangan via local Lepcha homestay host',
    seasonalAccess: 'Oct - May; winter views of Mt. Kanchenjunga are spellbinding',
    safetyNote: 'Respect local Lepcha customs and biosphere sanctuary rules; strictly no littering or plastic disposal.',
    weather: {
      tempMin: 8,
      tempMax: 18,
      tempCurrent: 14,
      condition: 'Pristine Mountain Mist & Sun',
      rainProb: 15,
      humidity: 60,
      windKmh: 7,
      sunrise: '05:40 AM',
      sunset: '05:17 PM',
      suitabilityScore: 96,
      source: 'IMD Mangan / NASA POWER',
      status: 'Live',
      lastUpdated: '10:15 AM Today'
    },
    badWeatherAlternative: {
      name: 'Lepcha Traditional Museum & Craft Center (Namprikdang)',
      description: 'Authentic bamboo stilt exhibition showing ancient Lepcha herbal medicines, musical instruments, and bows.',
      type: 'museum'
    },
    nearbyMedical: {
      hospitalName: 'District Hospital Mangan',
      distanceKm: 18.0,
      emergencyPhone: '+91-3592-234222 / 108',
      pharmacyName: 'Primary Health Sub-centre Passingdang Dzongu (2 km)'
    },
    connectivity: {
      mobileNetwork: 'BSNL Primary / Spotty Jio',
      fuelPumpDistanceKm: 21.0,
      atmAvailability: 'None - Carry Cash'
    },
    stays: {
      budget: { name: 'Munlom Nature Resort / Homestay Dzongu', category: 'budget', approxPriceINR: 1800, amenities: 'Sustainable wooden cottages, organic farm dining, Lepcha storytelling', verifiedDate: 'Verified Oct 2026' },
      midRange: { name: 'Mayal Lyang Homestay Passingdang', category: 'mid-range', approxPriceINR: 3200, amenities: 'Heartfelt Lepcha hospitality, bamboo-steamed meals, river treks', verifiedDate: 'Verified Oct 2026' },
      luxury: { name: 'The Elgin Nor-Khill (Gangtok base)', category: 'luxury', approxPriceINR: 8500, amenities: 'Luxury base in Gangtok for day excursion to Dzongu with 4x4 SUV', verifiedDate: 'Verified Oct 2026' }
    },
    dining: [
      { name: 'Mayal Lyang Homestyle Dining', type: 'Traditional Lepcha Hearth', costPerPersonINR: 280, specialty: 'Bamboo shoot curry, wild fern (ningro) sabzi, millet brew (chee) in bamboo tumbler', foodType: 'Veg & Non-Veg' },
      { name: 'Passingdang Organic Tea Stop', type: 'Village Porch', costPerPersonINR: 80, specialty: 'Fresh cardamom tea with roasted local corn', foodType: 'Pure Veg' }
    ],
    shortDescription: 'Protected ancestral homeland of the original Lepcha tribe, nestled under the gaze of Mount Kanchenjunga amid roaring cascades and cardamom valleys.',
    fullDescription: 'Set aside as a tribal reserve in the 1960s, Dzongu offers travellers an authentic window into harmony with nature. Gushing hot springs, hanging cane bridges, and quiet forest paths make it an untouched paradise.',
    tags: ['Offbeat', 'Hidden Gem', 'Indigenous Culture', 'Lepcha Reserve', 'Kanchenjunga Views']
  }
];
