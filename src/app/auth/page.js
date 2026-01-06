"use client";

import { useState } from "react";
import SignIn from "@/components/SignIn";
import SignUp from "@/components/SignUp";
import Image from "next/image";

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div className="min-h-screen bg-linear-to-b from-orange-50 to-white flex flex-col">
      <div className="flex-1 flex flex-col px-6 pt-16 pb-8">
        <div className="text-center mb-12">
          <Image
            width={96}
            height={96}
            alt="Logo"
            className="mx-auto mb-4"
            src="/temp-logo.png"
            loading="eager"
          />
          <p className="text-gray-600 text-sm">
            Welcome back! Sign in to continue
          </p>
        </div>
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <div className="flex bg-gray-100 rounded-full p-1 mb-8">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  isSignUp
                    ? "text-gray-600 bg-transparent"
                    : "bg-orange-500 text-white"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  isSignUp
                    ? "bg-orange-500 text-white"
                    : "text-gray-600 bg-transparent"
                }`}
              >
                Sign Up
              </button>
            </div>
            {isSignUp ? <SignUp /> : <SignIn />}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="font-medium text-gray-700">Google</span>
              </button>
              <button className="w-full flex items-center justify-center gap-3 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                <span className="font-medium text-gray-700">Apple</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
