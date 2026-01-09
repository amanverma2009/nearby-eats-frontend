"use client";
import {
  ArrowLeft,
  Bookmark,
  CircleDollarSign,
  Compass,
  MapPin,
  Settings,
  Utensils,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center">
            <ArrowLeft
              onClick={() => router.back()}
              className="cursor-pointer text-gray-600"
            ></ArrowLeft>
          </button>
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        </div>
      </div>
      <div className="px-6 py-6 space-y-6">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Preferences</h2>
          </div>
          <button className="w-full px-5 py-4 flex items-center justify-between border-b border-gray-100 active:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <Utensils className="h-6 flex items-center justify-center text-gray-600"></Utensils>
              </div>
              <span className="text-sm text-gray-900">Food Preferences</span>
            </div>
            <i className="ri-arrow-right-s-line text-xl text-gray-400"></i>
          </button>
          <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <MapPin className="h-6 flex items-center justify-center text-gray-600"></MapPin>
              </div>
              <span className="text-sm text-gray-900">Location Services</span>
            </div>
            <button className="relative w-12 h-7 rounded-full transition-colors bg-orange-500">
              <div className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm transition-transform translate-x-6"></div>
            </button>
          </div>
        </div>
        <button className="w-full bg-white text-red-500 hover:bg-red-50 py-4 rounded-2xl font-semibold shadow-sm active:scale-98 transition-transform cursor-pointer">
          Log Out
        </button>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50">
        <div className="grid grid-cols-3 gap-2">
          <a href="/home">
            <div className="flex flex-col items-center justify-center py-2 rounded-xl transition-colors ">
              <div className="w-6 h-6 flex items-center justify-center">
                <Compass className=" text-gray-400" />
              </div>
              <span className="text-xs mt-1 font-medium text-gray-500">
                Discover
              </span>
            </div>
          </a>
          <a href="/saved">
            <div className="flex flex-col items-center justify-center py-2 rounded-xl transition-colors ">
              <div className="w-6 h-6 flex items-center justify-center">
                <Bookmark className=" text-gray-400" />
              </div>
              <span className="text-xs mt-1 font-medium text-gray-500">
                Saved
              </span>
            </div>
          </a>
          <a href="/settings">
            <div className="flex flex-col items-center justify-center py-2 rounded-xl transition-colors bg-orange-50">
              <div className="w-6 h-6 flex items-center justify-center">
                <Settings className=" text-primary" />
              </div>
              <span className="text-xs mt-1 font-medium text-primary">
                Settings
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
