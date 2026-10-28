import React from "react";
import { Link } from "react-router-dom";

export default function Card({ data }) {
  if (!data || !data.videoId) return null;

  return (
    <div className="flex flex-col gap-3 group cursor-pointer w-full">
      {/* Video Thumbnail with Duration Badge */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#1e1e1e]">
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
          <span className="absolute bottom-2 right-2 bg-black/85 text-white text-[11px] font-semibold px-1.5 py-0.5 rounded tracking-wider z-10 pointer-events-none">
            {data.videoDuration}
          </span>
        )}
      </div>

      {/* Video Details & Channel Info */}
      <div className="flex gap-3">
        {/* Channel Avatar */}
        <Link to={`/watch/${data.videoId}`} className="shrink-0 mt-0.5">
          {data.channelInfo?.image ? (
            <img
              src={data.channelInfo.image}
              alt={data.channelInfo.name}
              className="h-9 w-9 rounded-full object-cover bg-[#272727]"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-xs font-bold text-white">
              {data.channelInfo?.name?.[0]?.toUpperCase() || "Y"}
            </div>
          )}
        </Link>

        {/* Text Details */}
        <div className="flex flex-col flex-1 min-w-0">
          <Link to={`/watch/${data.videoId}`}>
            <h3
              className="text-sm font-semibold text-white group-hover:text-gray-200 transition-colors line-clamp-2 leading-snug"
              title={data.videoTitle}
            >
              {data.videoTitle}
            </h3>
          </Link>

          <div className="text-xs text-gray-400 mt-1">
            <p className="hover:text-white transition-colors truncate">
              {data.channelInfo?.name || "YouTube Creator"}
            </p>
            <div className="flex items-center gap-1 text-[11px] mt-0.5 text-gray-400">
              <span>{data.videoViews} views</span>
              <span>•</span>
              <span>{data.videoAge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

