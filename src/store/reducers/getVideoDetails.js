import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { convertRawtoString } from "../../utils/convertRawtoString";
import { timeSince } from "../../utils/timeSince";
import { YOUTUBE_API_URL } from "../../utils/constants";

const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_KEY;

export const getVideoDetails = createAsyncThunk(
  "youtube/App/getVideoDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${YOUTUBE_API_URL}/videos?key=${API_KEY}&part=snippet,statistics&id=${id}`
      );

      const items = response.data?.items;
      if (!items || !items.length) {
        return null;
      }

      const item = items[0];
      const snippet = item.snippet || {};
      const statistics = item.statistics || {};

      let channelImage = "";
      let subscriberCount = "0";

      if (snippet.channelId) {
        try {
          const channelResponse = await axios.get(
            `${YOUTUBE_API_URL}/channels?part=snippet,statistics&id=${snippet.channelId}&key=${API_KEY}`
          );
          const channelItem = channelResponse.data?.items?.[0];
          channelImage = channelItem?.snippet?.thumbnails?.default?.url || channelItem?.snippet?.thumbnails?.medium?.url || "";
          subscriberCount = convertRawtoString(channelItem?.statistics?.subscriberCount, true);
        } catch (e) {
          console.warn("Could not fetch channel details:", e.message);
        }
      }

      return {
        videoId: item.id,
        videoTitle: snippet.title || "Untitled Video",
        videoDescription: snippet.description || "",
        videoViews: convertRawtoString(statistics.viewCount),
        videoLikes: convertRawtoString(statistics.likeCount),
        videoAge: timeSince(snippet.publishedAt),
        channelInfo: {
          id: snippet.channelId || "",
          image: channelImage,
          name: snippet.channelTitle || "Unknown Channel",
          subscribers: subscriberCount
        }
      };
    } catch (err) {
      console.error("Error in getVideoDetails:", err.message);
      return rejectWithValue(err.message);
    }
  }
);

