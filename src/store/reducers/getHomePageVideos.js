import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../utils/parseData";
import { YOUTUBE_API_URL, FALLBACK_VIDEOS } from "../../utils/constants";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getHomePageVideos = createAsyncThunk(
  "youtube/App/getHomePageVideos",
  async (isNext, { getState, rejectWithValue }) => {
    try {
      const {
        youtubeApp: { nextPageToken: nextPageTokenFromState, videos, selectedCategory }
      } = getState();

      const query = !selectedCategory || selectedCategory === "All" ? "trending videos news music gaming" : selectedCategory;
      const pageTokenParam = isNext && nextPageTokenFromState ? `&pageToken=${nextPageTokenFromState}` : "";

      const response = await axios.get(
        `${YOUTUBE_API_URL}/search?maxResults=20&q=${encodeURIComponent(query)}&key=${API_KEY}&part=snippet&type=video${pageTokenParam}`
      );

      const items = response.data?.items || [];
      const parsedData = await parseData(items);

      const newNextPageToken = response.data?.nextPageToken || null;
      const combinedVideos = isNext ? [...videos, ...parsedData] : parsedData;

      return {
        parsedData: combinedVideos,
        nextPageToken: newNextPageToken
      };
    } catch (err) {
      console.warn("YouTube API error (using graceful fallback):", err.message);
      // Graceful fallback if API key quota exceeded or offline
      return {
        parsedData: FALLBACK_VIDEOS,
        nextPageToken: null,
        isFallback: true
      };
    }
  }
);

