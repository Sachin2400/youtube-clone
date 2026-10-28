import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsYoutube, BsBell } from "react-icons/bs";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa";
import { RiVideoAddLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import {
  changeSearchTerm,
  clearSearchTerm,
  clearVideos,
  toggleSidebar,
  setSelectedCategory
} from "../features/youtube/youtubeSlice";
import { getSearchPageVideos } from "../store/reducers/getSearchPageVideos";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchTerm || !searchTerm.trim()) return;

    dispatch(clearVideos());
    if (location.pathname !== "/search") {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
    dispatch(getSearchPageVideos(false));
  };

  const handleLogoClick = () => {
    dispatch(clearSearchTerm());
    dispatch(setSelectedCategory("All"));
    dispatch(clearVideos());
    if (location.pathname !== "/") {
      navigate("/");
    }
    dispatch(getHomePageVideos(false));
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-6 h-14 bg-[#0f0f0f] border-b border-[#272727] sticky top-0 z-50">
      {/* Left: Hamburger & Brand Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-full hover:bg-[#272727] text-xl transition-colors cursor-pointer text-white"
          title="Guide"
        >
          <GiHamburgerMenu />
        </button>

        <button
          onClick={handleLogoClick}
          className="flex items-center gap-1 cursor-pointer focus:outline-none"
        >
          <BsYoutube className="text-3xl text-[#ff0000]" />
          <span className="text-xl font-bold tracking-tighter text-white font-sans">
            YouTube
          </span>
          <span className="text-[10px] text-gray-400 self-start ml-0.5 font-medium">
            CLONE
          </span>
        </button>
      </div>

      {/* Center: Search Bar & Voice Input */}
      <div className="flex items-center justify-center flex-1 max-w-2xl mx-4">
        <form onSubmit={handleSearch} className="flex w-full items-center">
          <div className="flex flex-1 items-center bg-[#121212] border border-[#303030] focus-within:border-[#1c62b9] rounded-l-full px-4 h-10 transition-colors">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm"
              value={searchTerm}
              onChange={(e) => dispatch(changeSearchTerm(e.target.value))}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => dispatch(clearSearchTerm())}
                className="text-gray-400 hover:text-white p-1"
                title="Clear search"
              >
                <AiOutlineClose className="text-sm" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="h-10 px-6 bg-[#222222] hover:bg-[#272727] border border-l-0 border-[#303030] rounded-r-full text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Search"
          >
            <AiOutlineSearch className="text-xl" />
          </button>
        </form>

        <button
          className="ml-3 p-2.5 rounded-full bg-[#181818] hover:bg-[#272727] text-white text-sm hidden sm:flex items-center justify-center transition-colors cursor-pointer"
          title="Search with your voice"
        >
          <FaMicrophone />
        </button>
      </div>

      {/* Right: Quick Action Controls */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          className="p-2 rounded-full hover:bg-[#272727] text-white text-xl hidden sm:block transition-colors cursor-pointer"
          title="Create"
        >
          <RiVideoAddLine />
        </button>

        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-[#272727] text-white text-lg transition-colors cursor-pointer"
            title="Notifications"
          >
            <BsBell />
          </button>
          <span className="absolute top-1 right-1 bg-[#cc0000] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* User Profile Avatar */}
        <div
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-red-500 text-white font-semibold text-xs flex items-center justify-center ml-1 ring-1 ring-white/20 cursor-pointer"
          title="User Account"
        >
          S
        </div>
      </div>
    </nav>
  );
}

