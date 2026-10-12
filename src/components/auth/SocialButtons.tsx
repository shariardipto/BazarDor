"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function SocialButtons() {
  const handleLogin = async (
    provider: "google" | "github"
  ) => {
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(
          error.message || "সোশ্যাল লগইন করা যায়নি"
        );
      }
    } catch {
      toast.error("সোশ্যাল লগইন করা যায়নি");
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => handleLogin("google")}
        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        Google দিয়ে চালিয়ে যান
      </button>

      <button
        type="button"
        onClick={() => handleLogin("github")}
        className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}