"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bookmark, Compass, Heart, Settings, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/Card";

const SAMPLE_RESTAURANTS = [
  {
    id: 1,
    name: "Bella Italia Trattoria",
    image: "/restaurant-image.jpg",
    cuisine: ["Italian", "Pasta"],
    rating: 4.8,
    distance: "0.8 km",
    price: "$$",
    reviews: 324,
    description:
      "Authentic Italian cuisine with homemade pasta and wood-fired pizzas",
  },
  {
    id: 2,
    name: "Sushi Sakura",
    image: "/restaurant-image.jpg",
    cuisine: ["Japanese", "Sushi"],
    rating: 4.7,
    distance: "1.1 km",
    price: "$$$",
    reviews: 210,
    description: "Fresh sushi and sashimi with a cozy ambiance",
  },
  {
    id: 3,
    name: "Taco Loco",
    image: "/restaurant-image.jpg",
    cuisine: ["Mexican"],
    rating: 4.5,
    distance: "0.6 km",
    price: "$",
    reviews: 89,
    description: "Street-style tacos and homemade salsas",
  },
  {
    id: 4,
    name: "Curry Corner",
    image: "/restaurant-image.jpg",
    cuisine: ["Indian"],
    rating: 4.6,
    distance: "1.4 km",
    price: "$$",
    reviews: 156,
    description: "Spicy curries and tandoori specialties",
  },
];

export default function HomePage() {
  const [cards, setCards] = useState(SAMPLE_RESTAURANTS);
  const refs = useRef([]);

  // ensure refs length matches rendered top 3
  const topCards = useMemo(() => cards.slice(0, 3), [cards]);

  useEffect(() => {
    refs.current = refs.current.slice(0, topCards.length);
  }, [topCards.length]);

  function playSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = 440;
      g.gain.value = 0.0015;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      g.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.12);
      setTimeout(() => {
        o.stop();
        ctx.close();
      }, 150);
    } catch (err) {
      // ignore
    }
  }

  function doHaptic() {
    try {
      if (navigator.vibrate) navigator.vibrate(40);
    } catch (e) {}
  }

  function handleAction(type, id) {
    // play feedback then remove top card
    playSound();
    doHaptic();
    setTimeout(() => {
      setCards((c) => {
        if (c.length === 0) return c;
        // remove the card with id (should be top)
        return c.filter((r) => r.id !== id);
      });
    }, 300);
  }

  useEffect(() => {
    function onKey(e) {
      if (cards.length === 0) return;
      const topRef = refs.current[0];
      if (!topRef) return;
      if (e.key === "ArrowRight") {
        topRef.trigger("like");
      } else if (e.key === "ArrowLeft") {
        topRef.trigger("dislike");
      } else if (e.key === "ArrowUp") {
        topRef.trigger("save");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cards]);

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
  <div className="bg-white px-6 py-4 shadow-sm relative z-50">
        <div className="flex items-center justify-between">
          <Image width={50} height={50} alt="Logo" src="/temp-logo.png" />
          <h1 className="text-lg font-bold text-gray-900">Discover</h1>
          <Link href="/settings">
            <div className="w-10 h-10 flex items-center justify-center">
              <Settings className="w-6 h-6 text-gray-600" />
            </div>
          </Link>
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        {/* Deck - render bottom-to-top */}
        {topCards
          .slice()
          .reverse()
          .map((r, idx) => {
            const displayIndex = topCards.length - 1 - idx; // 0 = top
            const z = 10 + displayIndex;
            const scale =
              displayIndex === 0 ? 1 : displayIndex === 1 ? 0.97 : 0.94;
            const translateY =
              displayIndex === 0 ? 0 : displayIndex === 1 ? 8 : 16;
            return (
              <div
                key={r.id}
                className="absolute"
                style={{
                  zIndex: z,
                  transform: `translateY(${translateY}px) scale(${scale})`,
                  transition: "transform 240ms ease",
                }}
              >
                <Card
                  ref={(el) => {
                    // only top card needs ref for keyboard
                    if (displayIndex === 0) refs.current[0] = el;
                  }}
                  draggable={displayIndex === 0}
                  onLike={() => handleAction("like", r.id)}
                  onSave={() => handleAction("save", r.id)}
                  onDislike={() => handleAction("dislike", r.id)}
                />
              </div>
            );
          })}

        {cards.length === 0 && (
          <div className="text-center text-gray-500">No more restaurants</div>
        )}
      </div>

      <div className="p-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => refs.current[0]?.trigger("dislike")}
            className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform border-2 border-gray-100"
            aria-label="Dislike"
          >
            <X className=" text-3xl text-gray-600"></X>
          </button>
          <button
            onClick={() => refs.current[0]?.trigger("save")}
            className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform border-2 border-gray-100"
            aria-label="Save"
          >
            <Bookmark className=" text-2xl text-blue-500"></Bookmark>
          </button>
          <button
            onClick={() => refs.current[0]?.trigger("like")}
            className="w-16 h-16 bg-orange-500 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform"
            aria-label="Like"
          >
            <Heart className=" text-3xl text-white"></Heart>
          </button>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 z-50">
        <div className="grid grid-cols-3 gap-2 mt-1">
          <Link href="/home">
            <div className="flex flex-col items-center justify-center py-2 rounded-xl transition-colors bg-orange-50">
              <div className="w-6 h-6 flex items-center justify-center">
                <Compass className="text-xl text-primary" />
              </div>
              <span className="text-xs font-medium text-primary">Discover</span>
            </div>
          </Link>
          <Link href="/saved">
            <div className="flex flex-col items-center justify-center py-2 rounded-xl transition-colors ">
              <div className="w-6 h-6 flex items-center justify-center">
                <Bookmark className=" text-gray-400" />
              </div>
              <span className="text-xs font-medium text-gray-500">Saved</span>
            </div>
          </Link>
          <Link href="/settings">
            <div className="flex flex-col items-center justify-center py-2 rounded-xl transition-colors ">
              <div className="w-6 h-6 flex items-center justify-center">
                <Settings className=" text-gray-400" />
              </div>
              <span className="text-xs font-medium text-gray-500">
                Settings
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
