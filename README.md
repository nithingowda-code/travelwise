# TRAVELWISE — AI Smart Tourism Planner 🌍✨

> **Explore More. Wait Less.**  
> An intelligent tourism planning platform that helps travelers discover destinations, optimize daily itineraries, and avoid queues using real-time and predictive crowd density analytics.

![TravelWise Banner](https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

- **Interactive Dynamic Map**: Built with Leaflet and CartoDB Voyager tiles, featuring color-coded crowd pins, heatmaps, and route polylines.
- **Crowd Density Engine**:
  - 🟢 **Low Crowd (<30%)**: Ideal for a peaceful visit.
  - 🟡 **Moderate Crowd (30%–65%)**: Balanced experience.
  - 🟠 **High Crowd (65%–85%)**: Expect some waiting.
  - 🔴 **Very High Crowd (>85%)**: Consider AI quiet alternatives.
- **AI Recommendation Strategy Switcher**: Toggle seamlessly between *All Attractions*, *Popular Highlights*, and *Quiet Alternatives Only*.
- **Destination Details Panel**:
  - Hourly crowd density forecast graphs (06:00 to 20:00).
  - Best visiting windows & estimated wait times.
  - Opening hours, entry fees, and live weather.
  - **1-Click AI Low-Crowd Alternatives**: Suggests quieter sister destinations (e.g. *Panna Meena Stepwell* over *Amber Fort*).
- **Smart Trip Planner Workspace**:
  - Drag-and-drop daily timeline with arrival and departure time slots.
  - **AI Auto-Optimize Route**: Reorders stops to match each attraction's lowest-crowd hour and minimize transit distance.
  - **Overcrowd Alerts & 1-Click Swap**: Replaces congested stops instantly.
  - **Crowd Comfort Score**: Dynamic score reflecting itinerary peace and efficiency.
- **Turn-by-Turn Directions & Transit Modes**: Real-time travel time estimates for Transit, Taxi/Driving, and Walking.
- **Wishlist & Saved Places**: Bookmarking destinations with crowd status alerts.
- **JSON Itinerary Export**: 1-click export of structured travel plans for offline access.

---

## 🏛️ Covered Indian Destinations & Circuits

- **Bengaluru & Karnataka**: Bengaluru Palace, Tipu Sultan's Summer Palace, Devanahalli Stone Fortress, Somnathpur Chennakeshava Temple, National Gallery of Modern Art, Sankey Tank, VV Puram Food Street.
- **Jaipur & Royal Rajasthan**: Amber Fort, Panna Meena Ka Kund, City Palace, Jaigarh Fort, Royal Gaitore Chhatris, Hawa Mahal.
- **Delhi NCR & Heritage Circuit**: Taj Mahal (Agra), Fatehpur Sikri, Humayun's Tomb, Qutub Minar, Agrasen Ki Baoli, Lodhi Gardens.
- **Goa & Konkan Coast**: Fort Aguada, Cabo de Rama Fort, Basilica of Bom Jesus, Fontainhas Latin Quarter, Baga & Calangute Beach, Butterfly Beach.
- **Kerala**: Munnar Tea Estates, Marari Secluded Beach, Mattancherry Dutch Palace.
- **Himachal (Manali & Kullu)**: Hadimba Devi Pagoda Temple, Naggar Kathkuni Castle, Solang Valley, Jogini Waterfalls Trek.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Lucide Icons
- **Mapping**: Leaflet, CartoDB Voyager tiles
- **Bundler & Tooling**: Vite 8

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/nithingowda-code/travelwise.git
cd travelwise

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will start at `http://localhost:5180/` (or the port specified in `vite.config.ts`).

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License
This project is open-source under the MIT License.
