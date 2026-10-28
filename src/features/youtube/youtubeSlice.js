import { createSlice } from "@reduxjs/toolkit";
import { getHomePageVideos } from "../../store/reducers/getHomePageVideos";
import { getSearchPageVideos } from "../../store/reducers/getSearchPageVideos";
import { getRecommendedVideos } from "../../store/reducers/getRecommendedVideos";
import { getVideoDetails } from "../../store/reducers/getVideoDetails";

const initialState = {
  videos: [],
  currentPlaying: null,
  searchTerm: "",
  selectedCategory: "All",
  nextPageToken: null,
  recommendedVideo: [],
  isLoading: false,
  isSidebarOpen: true,
  error: null
};

const youtubeSlice = createSlice({
  name: "youtubeApp",
  initialState,
  reducers: {
    clearVideos: (state) => {
      state.videos = [];
      state.nextPageToken = null;
    },
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: (state) => {
      state.searchTerm = "";
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.videos = [];
      state.nextPageToken = null;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.isSidebarOpen = action.payload;
    }
  },
  extraReducers: (builder) => {
    // getHomePageVideos
    builder.addCase(getHomePageVideos.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
      if (action.payload && action.payload.parsedData) {
        state.videos = action.payload.parsedData;
        state.nextPageToken = action.payload.nextPageToken;
      }
      state.isLoading = false;
    });
    builder.addCase(getHomePageVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to load home page videos.";
    });

    // getSearchPageVideos
    builder.addCase(getSearchPageVideos.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getSearchPageVideos.fulfilled, (state, action) => {
      if (action.payload && action.payload.parsedData) {
        state.videos = action.payload.parsedData;
        state.nextPageToken = action.payload.nextPageToken;
      }
      state.isLoading = false;
    });
    builder.addCase(getSearchPageVideos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to load search results.";
    });

    // getVideoDetails
    builder.addCase(getVideoDetails.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getVideoDetails.fulfilled, (state, action) => {
      state.currentPlaying = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getVideoDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to load video details.";
    });

    // getRecommendedVideos
    builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
      if (action.payload && action.payload.parsedData) {
        state.recommendedVideo = action.payload.parsedData;
      }
    });
  }
});

export const {
  clearVideos,
  changeSearchTerm,
  clearSearchTerm,
  setSelectedCategory,
  toggleSidebar,
  setSidebarOpen
} = youtubeSlice.actions;

export default youtubeSlice.reducer;

