"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export default function ProtectedRouteToast() {
  const shown = useRef(false);

  useEffect(() => {
    if (shown.current) return;

    shown.current = true;

    toast.error(
      "এই পেজটি দেখতে প্রথমে সাইন ইন করুন।"
    );
  }, []);

  return null;
}