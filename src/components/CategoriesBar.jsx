import React from "react";
import { CATEGORIES } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { setSelectedCategory, clearVideos } from "../features/youtube/youtubeSlice";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import { useLocation, useNavigate } from "react-router-dom";

export default function CategoriesBar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCategory = useAppSelector((state) => state.youtubeApp.selectedCategory);

  const handleSelect = (category) => {
    if (selectedCategory === category && location.pathname === "/") return;

    dispatch(setSelectedCategory(category));
    dispatch(clearVideos());

    if (location.pathname !== "/") {
      navigate("/");
    }

    dispatch(getHomePageVideos(false));
  };

  return (
    <div className="flex items-center gap-3 overflow-x-auto py-3 px-4 md:px-6 bg-[#0f0f0f] border-b border-[#272727] no-scrollbar sticky top-14 z-40">
      {CATEGORIES.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => handleSelect(category)}
            className={`px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              isActive
                ? "bg-white text-black font-semibold"
                : "bg-[#272727] text-white hover:bg-[#3f3f3f]"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

