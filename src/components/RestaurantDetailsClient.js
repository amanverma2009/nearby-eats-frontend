"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getRestaurantById, SAMPLE_RESTAURANTS } from "@/lib/restaurants";

export default function RestaurantDetailsClient({ initialId }) {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    let id = initialId;
    if (!id && typeof window !== "undefined") {
      const parts = window.location.pathname.split("/").filter(Boolean);
      // expecting /restaurant/{id}
      const idx = parts.indexOf("restaurant");
      if (idx >= 0 && parts.length > idx + 1) id = parts[idx + 1];
    }

    if (!id) return;
    // try to find locally first
    const r = getRestaurantById(id) || SAMPLE_RESTAURANTS.find((x) => String(x.id) === String(id));
    setRestaurant(r);
  }, [initialId]);

  if (!restaurant)
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">Restaurant not found (client)</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <div className="relative">
        <Image
          alt={restaurant.name}
          className="w-full h-72 object-cover object-top"
          src={restaurant.image}
          width={800}
          height={450}
        />
      </div>
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-6 pt-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {(restaurant.cuisine || []).map((c, i) => (
            <span key={i} className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-medium">
              {c}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{restaurant.description}</p>
        <div className="space-y-3">
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Address</div>
            <div className="text-sm text-gray-900">{restaurant.address}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Phone</div>
            <div className="text-sm text-gray-900">{restaurant.phone}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-0.5">Hours</div>
            <div className="text-sm text-gray-900">{restaurant.hours}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
