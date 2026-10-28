import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SearchCard from "../components/SearchCard";
import Spinner from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { clearVideos, changeSearchTerm } from "../features/youtube/youtubeSlice";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { videos, isLoading, nextPageToken, searchTerm } = useAppSelector(
    (state) => state.youtubeApp
  );

  const urlQuery = searchParams.get("q") || "";

  useEffect(() => {
    const activeQuery = urlQuery || searchTerm;

    if (!activeQuery.trim()) {
      navigate("/");
      return;
    }

    if (urlQuery && urlQuery !== searchTerm) {
      dispatch(changeSearchTerm(urlQuery));
    }

    dispatch(clearVideos());
    dispatch(getSearchPageVideos(false));
  }, [dispatch, urlQuery]); // Only re-fetch when URL search query changes

  return (
    <div className="h-screen flex flex-col bg-[#0f0f0f] overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-y-auto px-4 md:px-8 py-4" id="scrollableSearchDiv">
          {videos.length ? (
            <InfiniteScroll
              dataLength={videos.length}
              next={() => dispatch(getSearchPageVideos(true))}
              hasMore={!!nextPageToken && videos.length < 200}
              loader={<Spinner />}
              scrollableTarget="scrollableSearchDiv"
            >
              <div className="flex flex-col gap-4">
                {videos.map((item, index) => (
                  <SearchCard data={item} key={`${item.videoId}-${index}`} />
                ))}
              </div>
            </InfiniteScroll>
          ) : isLoading ? (
            <div className="flex-1 flex items-center justify-center py-20">
              <Spinner />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 py-20">
              <p className="text-lg">No search results found for "{urlQuery || searchTerm}".</p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 px-5 py-2 bg-[#272727] text-white rounded-full text-sm hover:bg-[#3f3f3f]"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

