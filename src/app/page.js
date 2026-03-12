"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/vi"); // Tự động đẩy vào trang tiếng Việt.
  }, [router]);
  return null;
}
