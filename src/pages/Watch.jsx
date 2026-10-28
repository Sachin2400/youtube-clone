import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { getVideoDetails } from "../store/reducers/getVideoDetails";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import { setSidebarOpen } from "../features/youtube/youtubeSlice";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike
} from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { FiDownload } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

export default function Watch() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentPlaying, recommendedVideo, isLoading } = useAppSelector(
    (state) => state.youtubeApp
  );

  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Automatically collapse sidebar on watch page for maximum cinema view
  useEffect(() => {
    dispatch(setSidebarOpen(false));
  }, [dispatch]);

  // Fetch video details and scroll to top on video ID change
  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
      dispatch(getVideoDetails(id));
      dispatch(getRecommendedVideos(id));
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      <Navbar />

      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
        <div className="max-w-[1750px] mx-auto flex flex-col lg:flex-row gap-6">
          {/* Main Primary Video & Details Column */}
          <div className="flex-1 min-w-0">
            {/* 16:9 Responsive Video Player */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
                title="YouTube Video Player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Video Details & Interaction Controls */}
            {currentPlaying && currentPlaying.videoId === id ? (
              <div className="mt-3">
                {/* Title */}
                <h1 className="text-lg md:text-xl font-bold leading-tight">
                  {currentPlaying.videoTitle}
                </h1>

                {/* Channel Bar & Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pb-3 border-b border-[#272727]">
                  {/* Channel Metadata */}
                  <div className="flex items-center gap-3">
                    {currentPlaying.channelInfo?.image ? (
                      <img
                        src={currentPlaying.channelInfo.image}
                        alt={currentPlaying.channelInfo.name}
                        className="w-10 h-10 rounded-full object-cover bg-gray-700"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-red-500 flex items-center justify-center font-bold text-sm">
                        {currentPlaying.channelInfo?.name?.[0]?.toUpperCase() || "Y"}
                      </div>
                    )}

                    <div>
                      <h2 className="font-semibold text-sm md:text-base leading-snug hover:text-gray-300 cursor-pointer">
                        {currentPlaying.channelInfo?.name || "Creator"}
                      </h2>
                      <p className="text-xs text-gray-400">
                        {currentPlaying.channelInfo?.subscribers} subscribers
                      </p>
                    </div>

                    <button
                      onClick={() => setIsSubscribed(!isSubscribed)}
                      className={`ml-3 px-4 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
                        isSubscribed
                          ? "bg-[#272727] text-white hover:bg-[#3f3f3f]"
                          : "bg-white text-black hover:bg-gray-200"
                      }`}
                    >
                      {isSubscribed ? "Subscribed" : "Subscribe"}
                    </button>
                  </div>

                  {/* Action Buttons (Like, Share, Download, More) */}
                  <div className="flex items-center gap-2">
                    {/* Like / Dislike Split Button */}
                    <div className="flex items-center bg-[#272727] rounded-full text-sm font-medium">
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className="flex items-center gap-2 px-3.5 py-2 hover:bg-[#3f3f3f] rounded-l-full transition-colors cursor-pointer"
                      >
                        {isLiked ? (
                          <AiFillLike className="text-lg text-white" />
                        ) : (
                          <AiOutlineLike className="text-lg text-white" />
                        )}
                        <span>{currentPlaying.videoLikes || "Like"}</span>
                      </button>
                      <span className="w-px h-5 bg-gray-600"></span>
                      <button
                        className="px-3 py-2 hover:bg-[#3f3f3f] rounded-r-full transition-colors cursor-pointer"
                        title="Dislike"
                      >
                        <AiOutlineDislike className="text-lg text-white" />
                      </button>
                    </div>

                    {/* Share Button */}
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        alert("Video link copied to clipboard!");
                      }}
                      className="flex items-center gap-2 bg-[#272727] hover:bg-[#3f3f3f] px-3.5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer"
                    >
                      <RiShareForwardLine className="text-lg" />
                      <span className="hidden sm:inline">Share</span>
                    </button>

                    {/* Download Button */}
                    <button
                      onClick={() => alert("Download started...")}
                      className="flex items-center gap-2 bg-[#272727] hover:bg-[#3f3f3f] px-3.5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer"
                    >
                      <FiDownload className="text-base" />
                      <span className="hidden sm:inline">Download</span>
                    </button>

                    {/* More Menu */}
                    <button
                      className="p-2.5 bg-[#272727] hover:bg-[#3f3f3f] rounded-full text-sm transition-colors cursor-pointer"
                      title="More"
                    >
                      <BsThreeDots />
                    </button>
                  </div>
                </div>

                {/* Expandable Description Card */}
                <div
                  onClick={() => setShowFullDesc(!showFullDesc)}
                  className="bg-[#272727] hover:bg-[#323232] rounded-xl p-3.5 mt-4 text-sm transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-semibold text-xs md:text-sm text-gray-200">
                    <span>{currentPlaying.videoViews} views</span>
                    <span>•</span>
                    <span>{currentPlaying.videoAge}</span>
                  </div>

                  <p
                    className={`mt-2 text-xs md:text-sm text-gray-200 whitespace-pre-line leading-relaxed ${
                      showFullDesc ? "" : "line-clamp-3"
                    }`}
                  >
                    {currentPlaying.videoDescription || "No description provided."}
                  </p>

                  <button className="text-xs font-semibold text-gray-300 mt-2 block">
                    {showFullDesc ? "Show less" : "...more"}
                  </button>
                </div>
              </div>
            ) : isLoading ? (
              <div className="py-12">
                <Spinner />
              </div>
            ) : null}
          </div>

          {/* Secondary Recommended Videos Sidebar */}
          <div className="w-full lg:w-[400px] shrink-0">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-3">
              Up Next
            </h3>

            {recommendedVideo && recommendedVideo.length ? (
              <div className="flex flex-col gap-3">
                {recommendedVideo.map((item, index) => (
                  <Link
                    key={`${item.videoId}-${index}`}
                    to={`/watch/${item.videoId}`}
                    className="flex gap-2 group cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="w-40 aspect-video rounded-lg shrink-0 overflow-hidden relative bg-[#1e1e1e]">
                      <img
                        src={item.videoThumbnail}
                        alt={item.videoTitle}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = `https://i.ytimg.com/vi/${item.videoId}/hqdefault.jpg`;
                        }}
                      />
                      {item.videoDuration && (
                        <span className="absolute bottom-1 right-1 bg-black/85 text-white text-[10px] font-semibold px-1 py-0.5 rounded tracking-wider">
                          {item.videoDuration}
                        </span>
                      )}
                    </div>

                    {/* Text Details */}
                    <div className="flex flex-col flex-1 min-w-0">
                      <h4
                        className="text-xs font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug"
                        title={item.videoTitle}
                      >
                        {item.videoTitle}
                      </h4>
                      <p className="text-[11px] text-gray-400 mt-1 truncate">
                        {item.channelInfo?.name}
                      </p>
                      <div className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                        <span>{item.videoViews} views</span>
                        <span>•</span>
                        <span>{item.videoAge}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-400 text-center py-8">
                No recommended videos available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
