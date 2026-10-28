import React from "react";
import { Link } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";

export default function SearchCard({ data }) {
  if (!data || !data.videoId) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-4 group cursor-pointer w-full max-w-5xl py-2">
      {/* Thumbnail */}
      <div className="w-full sm:w-80 md:w-96 aspect-video shrink-0 relative overflow-hidden rounded-xl bg-[#1e1e1e]">
        <Link to={`/watch/${data.videoId}`}>
          <img
            src={data.videoThumbnail}
            alt={data.videoTitle}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.target.src = `https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`;
            }}
          />
        </Link>
        {data.videoDuration && (
          <span className="absolute bottom-2 right-2 bg-black/85 text-white text-xs font-semibold px-1.5 py-0.5 rounded tracking-wider z-10 pointer-events-none">
            {data.videoDuration}
          </span>
        )}
      </div>

      {/* Content Details */}
      <div className="flex flex-col flex-1 min-w-0 justify-start">
        <Link to={`/watch/${data.videoId}`}>
          <h2
            className="text-base md:text-lg font-normal text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug"
            title={data.videoTitle}
          >
            {data.videoTitle}
          </h2>
        </Link>

        {/* Views & Age */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
          <span>{data.videoViews} views</span>
          <span>•</span>
          <span>{data.videoAge}</span>
        </div>

        {/* Channel Details */}
        <div className="flex items-center gap-2 my-2.5">
          {data.channelInfo?.image ? (
            <img
              src={data.channelInfo.image}
              alt={data.channelInfo.name}
              className="h-6 w-6 rounded-full object-cover bg-gray-700"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-purple-600 to-red-500 flex items-center justify-center text-[10px] font-bold text-white">
              {data.channelInfo?.name?.[0]?.toUpperCase() || "Y"}
            </div>
          )}
          <span className="text-xs text-gray-300 hover:text-white transition-colors flex items-center gap-1 truncate">
            {data.channelInfo?.name || "YouTube Creator"}
            <BsCheckCircleFill className="text-[10px] text-gray-400 shrink-0" />
          </span>
        </div>

        {/* Description Snippet */}
        {data.videoDescription && (
          <p className="line-clamp-2 text-xs text-gray-400 leading-relaxed hidden sm:block">
            {data.videoDescription}
          </p>
        )}
      </div>
    </div>
  );
}

