import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CategoriesBar from "../components/CategoriesBar";
import Card from "../components/Card";
import Spinner from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";

export default function Home() {
  const dispatch = useAppDispatch();
  const { videos, isLoading, nextPageToken, error } = useAppSelector(
    (state) => state.youtubeApp
  );

  useEffect(() => {
    if (!videos.length) {
      dispatch(getHomePageVideos(false));
    }
  }, [dispatch, videos.length]);

  return (
    <div className="h-screen flex flex-col bg-[#0f0f0f] overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-y-auto" id="scrollableHomeDiv">
          <CategoriesBar />

          {/* Quota / API Warning Banner if active */}
          {error && (
            <div className="mx-4 mt-3 p-3 bg-amber-950/40 border border-amber-600/40 rounded-xl text-xs text-amber-200 flex items-center justify-between">
              <span>Notice: {error} (Displaying curated fallback catalog).</span>
            </div>
          )}

          {videos.length ? (
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getHomePageVideos(true))}
              hasMore={!!nextPageToken && videos.length < 200}
              loader={<Spinner />}
              scrollableTarget="scrollableHomeDiv"
              className="p-4 md:p-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
                {videos.map((item, index) => (
                  <Card data={item} key={`${item.videoId}-${index}`} />
                ))}
              </div>
            </InfiniteScroll>
          ) : isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-16">
              <p className="text-lg">No videos found.</p>
              <button
                onClick={() => dispatch(getHomePageVideos(false))}
                className="mt-4 px-4 py-2 bg-[#272727] text-white rounded-full text-sm hover:bg-[#3f3f3f]"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

