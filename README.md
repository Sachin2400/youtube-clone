# YouTube Clone — Modern Video Streaming Web Platform

A high-performance, responsive YouTube web application built from the ground up with **React 18**, **Vite**, **Redux Toolkit**, **Tailwind CSS**, and the **YouTube Data API v3**.

Designed with authentic YouTube dark theme styling, fluid interactions, responsive layouts across mobile/tablet/desktop, and built-in graceful API quota fallback handling.

---

## 🌟 Key Features

- **YouTube Dark Theme UI**: Custom tailored dark palette (`#0f0f0f` background, `#272727` hover surfaces, `#ff0000` brand accents, and YouTube-style thin scrollbars).
- **Infinite Scrolling Feed**: Seamless continuous scrolling on the Home and Search feeds powered by `react-infinite-scroll-component` with pagination token management.
- **Dynamic Category Filtering**: Horizontal scrollable pill bar allowing instant topic filtering (Music, Gaming, News, Technology, Podcasts, Live, etc.).
- **Real-Time Video Search**: Search query synchronization via URL search parameters (`/search?q=...`), with instant clear action and voice query placeholder.
- **Dedicated Watch Experience**:
  - Embedded 16:9 YouTube video player with autoplay.
  - Channel branding: Avatar, channel title, verified badge, subscriber count, and interactive Subscribe toggle.
  - Social interactions: Like / Dislike split-button counters, Share, and Download actions.
  - Expandable video description container with formatted view counters and upload dates.
  - Related & recommended video rail.
- **Channel Avatar & Duration Parser**: ISO 8601 duration parser supporting live broadcasts (`LIVE`), and batch-fetched channel avatars mapped safely by ID.
- **API Quota Protection & Offline Fallback**: Graceful fallback dataset activates seamlessly if the YouTube Data API daily request quota is exhausted, ensuring the UI never crashes or stays blank.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 18 (`react`, `react-dom`) |
| **Build & Bundler** | Vite 5 (`@vitejs/plugin-react`) |
| **State Management** | Redux Toolkit (`@reduxjs/toolkit`, `react-redux`) |
| **Routing** | React Router DOM v6 |
| **Styling** | Tailwind CSS v3 + PostCSS + Autoprefixer |
| **Icons** | React Icons (`react-icons/ai`, `bi`, `bs`, `md`, `tb`, `fi`) |
| **HTTP Client** | Axios |
| **Data Provider** | YouTube Data API v3 (Google Cloud Platform) |

---

## 📁 Project Structure

```
youtube-clone/
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Card.jsx              # Responsive video thumbnail card with duration & avatar
│   │   ├── CategoriesBar.jsx     # Horizontal category filter pill bar
│   │   ├── Navbar.jsx            # Top navigation, search bar, profile & quick actions
│   │   ├── SearchCard.jsx        # Horizontal search result layout card
│   │   ├── Sidebar.jsx           # Collapsible side navigation drawer
│   │   └── Spinner.jsx           # YouTube red circular loading indicator
│   ├── features/
│   │   └── youtube/
│   │       └── youtubeSlice.js   # Central Redux slice for feed, search, player & sidebar state
│   ├── hooks/
│   │   └── useApp.js             # Typed Redux dispatch and selector hooks
│   ├── pages/
│   │   ├── Home.jsx              # Main home feed with category bar & infinite grid
│   │   ├── Search.jsx            # Search results feed with URL query sync
│   │   └── Watch.jsx             # Dedicated video player, channel info & recommendations
│   ├── store/
│   │   ├── configureStore.js     # Redux Toolkit store setup
│   │   └── reducers/
│   │       ├── getHomePageVideos.js    # Home feed async thunk with pagination
│   │       ├── getRecommendedVideos.js # Related videos async thunk
│   │       ├── getSearchPageVideos.js  # Search async thunk
│   │       └── getVideoDetails.js      # Watch page metadata & statistics async thunk
│   ├── utils/
│   │   ├── constants.js          # API endpoints, category list & fallback mock data
│   │   ├── convertRawtoString.js # Formats numbers to K, M, B (e.g. 1.2M views)
│   │   ├── parseData.js          # Normalizes search items with channel & video statistics
│   │   ├── parseRecommendedData.js # Filters and formats related video items
│   │   ├── parseVideoDuration.js # Converts ISO 8601 durations to MM:SS / HH:MM:SS
│   │   └── timeSince.js          # Relative time formatter ("2 days ago", "1 month ago")
│   ├── App.jsx                   # Route provider
│   ├── index.css                 # Tailwind directives & YouTube dark styling
│   └── index.jsx                 # React root DOM mount point
├── .env.example                  # Environment configuration template
├── .gitignore                    # Git ignore file (protects .env, node_modules, dist)
├── index.html                    # Root HTML entry point
├── package.json                  # Dependencies & scripts
├── postcss.config.js             # PostCSS Tailwind integration
├── START_YOUTUBE_CLONE.bat       # 1-click launch batch script
├── tailwind.config.js            # Tailwind theme tokens & extensions
└── vite.config.js                # Vite build configuration & environment injection
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Sachin2400/youtube-clone.git
cd youtube-clone
npm install
```

### 3. Environment Setup
Create a `.env` file in the project root:
```bash
cp .env.example .env
```
Add your YouTube Data API v3 Key:
```env
REACT_APP_YOUTUBE_DATA_API_KEY=your_api_key_here
```
*(A fallback dataset is automatically bundled, so the app will still function even without an API key).*

### 4. Running the App
Start the local development server:
```bash
npm run dev
```
Or double-click `START_YOUTUBE_CLONE.bat` on Windows.

Open your browser at `http://localhost:3000`.

### 5. Production Build
Compile optimized static production files:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

