import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdHomeFilled,
  MdOutlineSlowMotionVideo,
  MdSubscriptions,
  MdOutlineVideoLibrary,
  MdHistory,
  MdOutlineWatchLater,
  MdOutlineExplore,
  MdOutlineSportsEsports
} from "react-icons/md";
import { LuThumbsUp } from "react-icons/lu";
import { HiFire } from "react-icons/hi";
import { BsMusicNoteBeamed, BsNewspaper } from "react-icons/bs";
import { useAppSelector } from "../hooks/useApp";

export default function Sidebar() {
  const location = useLocation();
  const isSidebarOpen = useAppSelector((state) => state.youtubeApp.isSidebarOpen);

  const mainLinks = [
    { icon: <MdHomeFilled className="text-xl" />, name: "Home", path: "/" },
    { icon: <MdOutlineSlowMotionVideo className="text-xl" />, name: "Shorts", path: "/" },
    { icon: <MdSubscriptions className="text-xl" />, name: "Subscriptions", path: "/" }
  ];

  const libraryLinks = [
    { icon: <MdOutlineVideoLibrary className="text-xl" />, name: "Library", path: "/" },
    { icon: <MdHistory className="text-xl" />, name: "History", path: "/" },
    { icon: <MdOutlineWatchLater className="text-xl" />, name: "Watch Later", path: "/" },
    { icon: <LuThumbsUp className="text-xl" />, name: "Liked Videos", path: "/" }
  ];

  const exploreLinks = [
    { icon: <HiFire className="text-xl" />, name: "Trending", path: "/" },
    { icon: <BsMusicNoteBeamed className="text-xl" />, name: "Music", path: "/" },
    { icon: <MdOutlineSportsEsports className="text-xl" />, name: "Gaming", path: "/" },
    { icon: <BsNewspaper className="text-xl" />, name: "News", path: "/" }
  ];

  // Collapsed Mini Sidebar (Icon + small label)
  if (!isSidebarOpen) {
    return (
      <aside className="w-18 hidden md:flex flex-col items-center py-3 bg-[#0f0f0f] border-r border-[#272727] select-none shrink-0 min-h-[calc(100vh-3.5rem)]">
        {mainLinks.map((item) => {
          const isActive = location.pathname === item.path && item.name === "Home";
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-16 py-3 rounded-lg hover:bg-[#272727] text-white transition-colors mb-1 ${
                isActive ? "bg-[#272727]" : ""
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-1 tracking-tight">{item.name}</span>
            </Link>
          );
        })}
        <Link
          to="/"
          className="flex flex-col items-center justify-center w-16 py-3 rounded-lg hover:bg-[#272727] text-white transition-colors mb-1"
        >
          <MdOutlineVideoLibrary className="text-xl" />
          <span className="text-[10px] mt-1 tracking-tight">You</span>
        </Link>
      </aside>
    );
  }

  // Expanded Full Sidebar
  return (
    <aside className="w-60 hidden md:flex flex-col bg-[#0f0f0f] border-r border-[#272727] px-3 py-3 overflow-y-auto select-none shrink-0 min-h-[calc(100vh-3.5rem)] text-sm">
      {/* Primary Section */}
      <div className="pb-3 border-b border-[#272727]">
        {mainLinks.map((item) => {
          const isActive = location.pathname === item.path && item.name === "Home";
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-5 px-3 py-2.5 rounded-xl hover:bg-[#272727] transition-colors mb-0.5 ${
                isActive ? "bg-[#272727] font-semibold text-white" : "text-gray-200"
              }`}
            >
              {item.icon}
              <span className="tracking-wide text-[13px]">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Library Section */}
      <div className="py-3 border-b border-[#272727]">
        <div className="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          You
        </div>
        {libraryLinks.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-5 px-3 py-2.5 rounded-xl hover:bg-[#272727] text-gray-200 hover:text-white transition-colors mb-0.5"
          >
            {item.icon}
            <span className="tracking-wide text-[13px]">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Explore Section */}
      <div className="py-3 border-b border-[#272727]">
        <div className="px-3 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Explore
        </div>
        {exploreLinks.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-5 px-3 py-2.5 rounded-xl hover:bg-[#272727] text-gray-200 hover:text-white transition-colors mb-0.5"
          >
            {item.icon}
            <span className="tracking-wide text-[13px]">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-4 px-3 text-[11px] text-gray-500 leading-relaxed">
        <p className="mb-2">About Press Copyright Contact us Creators Advertise Developers</p>
        <p className="mb-2">Terms Privacy Policy & Safety How YouTube works Test new features</p>
        <p className="text-gray-600 font-medium">© 2026 YouTube Clone LLC</p>
      </div>
    </aside>
  );
}

