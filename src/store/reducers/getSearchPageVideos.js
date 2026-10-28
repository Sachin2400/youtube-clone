import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { parseData } from "../../utils/parseData";
import { YOUTUBE_API_URL } from "../../utils/constants";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getSearchPageVideos = createAsyncThunk(
  "youtube/App/getSearchPageVideos",
  async (isNext, { getState, rejectWithValue }) => {
    try {
      const {
        youtubeApp: { nextPageToken: nextPageTokenFromState, videos, searchTerm }
      } = getState();

      if (!searchTerm || !searchTerm.trim()) {
        return { parsedData: [], nextPageToken: null };
      }

      const pageTokenParam = isNext && nextPageTokenFromState ? `&pageToken=${nextPageTokenFromState}` : "";

      const response = await axios.get(
        `${YOUTUBE_API_URL}/search?q=${encodeURIComponent(searchTerm)}&key=${API_KEY}&part=snippet&type=video&maxResults=20${pageTokenParam}`
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
      console.error("Error in getSearchPageVideos:", err.message);
      return rejectWithValue(err.message);
    }
  }
);

