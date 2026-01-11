"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [isRequesting, setIsRequesting] = useState(false);
  const [locationError, setLocationError] = useState("");

  function describeGeoError(err) {
    if (!err) return "";
    if (err.code === 1)
      return "Location permission was denied. Please enable it in your browser settings and try again.";
    if (err.code === 2)
      return "We couldn't get your location. Try turning on GPS/location services and retry.";
    if (err.code === 3)
      return "Location request timed out. Try again in a moment.";
    return "We couldn't access your location. Please try again.";
  }

  const requestLocation = () => {
    // Must be user-initiated on mobile Safari/Chrome or it may get blocked.
    if (isRequesting) return;
    setLocationError("");

    // Geolocation requires a secure context (https) on most mobile browsers.
    if (typeof window !== "undefined" && !window.isSecureContext) {
      setLocationError(
        "Location needs a secure connection (HTTPS). If you're on a mobile device, open the HTTPS version of this site."
      );
      return;
    }

    if (!navigator.geolocation) {
      setLocationError("Geolocation isn't supported on this device/browser.");
      return;
    }

    setIsRequesting(true);

    const run = () =>
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude, position.coords.longitude);
          // this will go to backend
          router.push("/onboarding/step-2");
        },
        (err) => {
          setIsRequesting(false);
          setLocationError(describeGeoError(err));
        },
        {
          enableHighAccuracy: true,
          timeout: 15_000,
          maximumAge: 30_000,
        }
      );

    // Optional pre-check: improves messaging when permission is already denied.
    // Not supported on all mobile browsers (e.g., some Safari versions).
    try {
      const perms = navigator.permissions;
      if (perms?.query) {
        perms
          .query({ name: "geolocation" })
          .then((status) => {
            if (status.state === "denied") {
              setLocationError(
                "Location permission is currently blocked. Enable it in your browser/site settings, then tap Enable Location again."
              );
              setIsRequesting(false);
              return;
            }
            run();
          })
          .catch(() => run());
      } else {
        run();
      }
    } catch (e) {
      run();
    }
    setTimeout(() => setIsRequesting(false), 16_000);
  };
  return (
    <div className="max-h-screen bg-linear-to-b from-orange-50 to-white flex flex-col">
      <div className="flex flex-col items-center justify-between px-6 py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            width={96}
            height={96}
            alt="Logo"
            className="mb-8"
            src="/logo.png"
          />
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Find Your Next Meal
          </h1>
          <p className="text-base text-gray-600 mb-12 max-w-xs">
            Discover amazing restaurants nearby with a simple swipe
          </p>
          <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <MapPin className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Enable Location
          </h2>
          <p className="text-sm text-gray-500 max-w-xs mb-8">
            We need your location to show you the best restaurants nearby
          </p>
          {locationError ? (
            <p className="text-sm text-red-600 max-w-xs mb-4">
              {locationError}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col items-center space-y-3">
          <Button
            content={isRequesting ? "Requesting…" : "Enable Location"}
            onClick={requestLocation}
          />
          <Link href="/onboarding/step-2">
          <button className="min-w-fit px-6 text-gray-500 py-3 text-sm cursor-pointer">
            Skip for now
          </button>
          </Link>
        </div>
        <div className="flex gap-2 mt-6">
          <div className="w-8 h-1 bg-primary rounded-full"></div>
          <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
