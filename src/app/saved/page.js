"use client";
import LikedRestaurants from "@/components/LikedRestaurants";
import SavedRestaurants from "@/components/SavedRestaurants";
import { Bookmark, Compass, Heart, Settings } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [isLiked, setLiked] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Collection</h1>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
          <button
            onClick={() => setLiked(false)}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all  cursor-pointer ${
              isLiked ? "text-gray-600" : "bg-white text-gray-900 shadow-sm"
            }`}
          >
            <span className="flex items-center justify-center gap-1">
              <Bookmark className="h-5" />
              Saved (2)
            </span>
          </button>
          <button
            onClick={() => setLiked(true)}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all cursor-pointer ${
              isLiked ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
            }`}
          >
            <span className="flex items-center justify-center gap-1">
              <Heart className="h-5" />
              Liked (3)
            </span>
          </button>
        </div>
      </div>

      {isLiked ? <LikedRestaurants /> : <SavedRestaurants />}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50">
        <div className="grid grid-cols-3 gap-2">
          <a href="/home">
            <div className="flex flex-col items-center justify-center py-2 rounded-xl transition-colors">
              <div className="w-6 h-6 flex items-center justify-center">
                <Compass className=" text-gray-500" />
              </div>
              <span className="text-xs mt-1 font-medium text-gray-500">
                Discover
              </span>
            </div>
          </a>
          <a href="/saved">
            <div className="flex flex-col items-center justify-center py-2 rounded-xl transition-colors bg-orange-50">
              <div className="w-6 h-6 flex items-center justify-center">
                <Bookmark className=" text-primary" />
              </div>
              <span className="text-xs mt-1 font-medium text-primary">
                Saved
              </span>
            </div>
          </a>
          <a href="/settings">
            <div className="flex flex-col items-center justify-center py-2 rounded-xl transition-colors ">
              <div className="w-6 h-6 flex items-center justify-center">
                <Settings className="text-gray-400" />
              </div>
              <span className="text-xs mt-1 font-medium text-gray-500">
                Settings
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
