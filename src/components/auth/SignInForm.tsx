"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("ইমেইল লিখুন");
      return;
    }

    if (!password) {
      toast.error("পাসওয়ার্ড লিখুন");
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(
          error.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়"
        );
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন ইন করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">
          সাইন ইন
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
          অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-4"
      >
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            ইমেইল
          </label>

          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-700"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            পাসওয়ার্ড
          </label>

          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-green-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
        </button>
      </form>

      <div className="my-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />

        <span className="text-xs text-gray-400">
          অথবা
        </span>

        <div className="h-px flex-1 bg-gray-200" />
      </div>

      <SocialButtons />

      <p className="mt-6 text-center text-sm text-gray-500">
        অ্যাকাউন্ট নেই?{" "}
        <Link
          href="/signup"
          className="font-semibold text-green-700 hover:text-green-800"
        >
          সাইন আপ করুন
        </Link>
      </p>
    </div>
  );
}