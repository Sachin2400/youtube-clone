import React from "react";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center w-full py-8">
      <div className="w-10 h-10 border-4 border-[#ff0000] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

