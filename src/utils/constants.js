export const YOUTUBE_API_URL = "https://youtube.googleapis.com/youtube/v3";

export const CATEGORIES = [
  "All",
  "Music",
  "Gaming",
  "Coding",
  "ReactJS",
  "Next.js",
  "Podcasts",
  "News",
  "Live",
  "AI & ML",
  "Gadgets",
  "Watched"
];

// Fallback high-quality video mock data for graceful degradation if Google API quota is reached
export const FALLBACK_VIDEOS = [
  {
    videoId: "dQw4w9WgXcQ",
    videoTitle: "Rick Astley - Never Gonna Give You Up (Official Music Video)",
    videoDescription: "The official video for 'Never Gonna Give You Up' by Rick Astley.",
    videoThumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    videoLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoDuration: "3:33",
    videoViews: "1.4B",
    videoAge: "14 years ago",
    channelInfo: {
      id: "UCuAXFkgsw1L7xaCfnd5JJOw",
      image: "https://yt3.ggpht.com/ytc/AIdro_kX4...=s88-c-k-c0x00ffffff-no-rj",
      name: "Rick Astley",
      subscribers: "3.5M"
    }
  },
  {
    videoId: "bMknfKXIFA8",
    videoTitle: "React Course - Beginner's Tutorial for React JavaScript",
    videoDescription: "Learn React by building 8 real-world projects in this comprehensive tutorial.",
    videoThumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg",
    videoLink: "https://www.youtube.com/watch?v=bMknfKXIFA8",
    videoDuration: "11:55:27",
    videoViews: "3.8M",
    videoAge: "2 years ago",
    channelInfo: {
      id: "UC8butISFwT-Wl7EV0hUK0BQ",
      image: "https://yt3.ggpht.com/ytc/AIdro_n8...=s88-c-k-c0x00ffffff-no-rj",
      name: "freeCodeCamp.org",
      subscribers: "9.2M"
    }
  },
  {
    videoId: "Ke90Tje7VS0",
    videoTitle: "React JS - React Tutorial for Beginners",
    videoDescription: "React JS Tutorial - Get up & running with React JS in 2024.",
    videoThumbnail: "https://i.ytimg.com/vi/Ke90Tje7VS0/maxresdefault.jpg",
    videoLink: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    videoDuration: "1:20:00",
    videoViews: "2.1M",
    videoAge: "1 year ago",
    channelInfo: {
      id: "UCWv7vMbMWH4-V0ZXdm8crTw",
      image: "https://yt3.ggpht.com/ytc/AIdro_k...=s88-c-k-c0x00ffffff-no-rj",
      name: "Programming with Mosh",
      subscribers: "3.8M"
    }
  }
];

