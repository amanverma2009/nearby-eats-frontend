import Image from "next/image";
import { getRestaurantById } from "@/lib/restaurants";
import RestaurantDetailsClient from "@/components/RestaurantDetailsClient";

export default async function RestaurantPage({ params }) {
  // params may be a promise in this Next.js version - await to make sure it's resolved
  const resolvedParams = params && typeof params.then === "function" ? await params : params;
  const { id } = resolvedParams || {};
  // If no id provided, show debug info instead of redirecting so we can inspect params
  if (id == null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">No restaurant id provided</div>
          <pre className="text-sm text-gray-500 bg-gray-100 rounded p-3">{JSON.stringify(params)}</pre>
        </div>
      </div>
    );
  }
  // debug: log params on the server to help diagnose lookup issues
  try {
    console.log("[restaurant page] params:", params);
  } catch (e) {}
  const restaurant = getRestaurantById(id);

  if (!restaurant) {
    // fallback to client rendering which will extract the id from the URL if params were missing
    return <RestaurantDetailsClient initialId={id} />;
  }

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
        <a href="/home" className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </a>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"/></svg>
        </button>
      </div>
      <div className="bg-white rounded-t-3xl -mt-6 relative z-10 px-6 pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {(restaurant.cuisine || []).map((c, i) => (
                <span key={i} className="text-xs bg-orange-50 text-orange-600 px-3 py-1 rounded-full font-medium">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1 bg-orange-50 px-3 py-1.5 rounded-full">
              <span className="text-base font-bold text-gray-900">{restaurant.rating}</span>
            </div>
            <span className="text-xs text-gray-500">{restaurant.reviews} reviews</span>
          </div>
        </div>
        <div className="flex items-center gap-4 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">{restaurant.price}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">{restaurant.distance}</span>
          </div>
        </div>
        <div className="flex gap-2 py-4 border-b border-gray-100">
          <button className="flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all bg-orange-500 text-white">About</button>
          <button className="flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all bg-gray-100 text-gray-600">Menu</button>
          <button className="flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all bg-gray-100 text-gray-600">Reviews</button>
        </div>
        <div className="py-6 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{restaurant.description}</p>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Address</div>
                <div className="text-sm text-gray-900">{restaurant.address}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Phone</div>
                <div className="text-sm text-gray-900">{restaurant.phone}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Hours</div>
                <div className="text-sm text-gray-900">{restaurant.hours}</div>
              </div>
            </div>
          </div>
          <button className="w-full bg-orange-500 text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2">Get Directions</button>
        </div>
      </div>
    </div>
  );
}
