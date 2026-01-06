"use client";

import { useState } from "react";
import InputBar from "@/components/InputBar";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="space-y-5">
      <InputBar
        content={"Email"}
        icon={<Mail className="text-gray-400 text-lg" />}
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
            <Lock className="text-gray-400 text-lg" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            autoComplete="current-password"
          />
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? (
              <EyeOff className="text-gray-400 text-lg cursor-pointer" />
            ) : (
              <Eye className="text-gray-400 text-lg cursor-pointer" />
            )}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition-colors cursor-pointer"
      >
        Sign In
      </button>
    </form>
  );
}
