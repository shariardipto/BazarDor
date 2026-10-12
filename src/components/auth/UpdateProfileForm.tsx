"use client";

import {
  FormEvent,
  useState,
} from "react";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

interface UpdateProfileFormProps {
  currentName: string;
}

export default function UpdateProfileForm({
  currentName,
}: UpdateProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(
    currentName
  );

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    const cleanName = name.trim();

    if (!cleanName) {
      toast.error("নাম লিখুন");
      return;
    }

    try {
      setLoading(true);

      const { error } =
        await authClient.updateUser({
          name: cleanName,
        });

      if (error) {
        toast.error(
          error.message ||
            "তথ্য আপডেট করা যায়নি"
        );

        return;
      }

      toast.success(
        "তথ্য সফলভাবে আপডেট হয়েছে"
      );

      router.push("/profile");
      router.refresh();
    } catch {
      toast.error(
        "তথ্য আপডেট করা যায়নি"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          নাম
        </label>

        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="আপনার নাম"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "আপডেট হচ্ছে..."
          : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}