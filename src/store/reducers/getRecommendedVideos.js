import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../utils/parseData";
import { YOUTUBE_API_URL } from "../../utils/constants";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  "youtube/App/getRecommendedVideos",
  async (videoId, { getState }) => {
    try {
      const {
        youtubeApp: { currentPlaying }
      } = getState();

      const queryTerm = currentPlaying?.channelInfo?.name || currentPlaying?.videoTitle || "popular";

      const response = await axios.get(
        `${YOUTUBE_API_URL}/search?part=snippet&maxResults=20&type=video&q=${encodeURIComponent(queryTerm)}&key=${API_KEY}`
      );

      const items = response.data?.items || [];
      const parsedData = await parseData(items);

      // Exclude currently playing video
      const filtered = parsedData.filter((v) => v.videoId !== videoId);

      return { parsedData: filtered };
    } catch (err) {
      console.warn("Could not fetch recommended videos:", err.message);
      return { parsedData: [] };
    }
  }
);

