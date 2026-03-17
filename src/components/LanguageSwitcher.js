"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Globe, ChevronDown } from "lucide-react";

export default function LanguageSwitcher({ lang }) {
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
        className="flex items-center gap-1 text-slate-300 text-[13px] font-medium hover:text-white"
      >
        <Globe size={14} />
        <span>{lang === "vi" ? "Tiếng Việt" : "English (US)"}</span>
        <ChevronDown size={12} />
      </button>
      {isLanguageMenuOpen && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white shadow-xl border border-slate-200 block z-50">
          <Link
            href="/en"
            className="block px-4 py-2 text-sm hover:bg-slate-100 text-slate-700"
            onClick={() => setIsLanguageMenuOpen(false)}
          >
            English (US)
          </Link>
          <Link
            href="/vi"
            className="block px-4 py-2 text-sm hover:bg-slate-100 text-slate-700"
            onClick={() => setIsLanguageMenuOpen(false)}
          >
            Tiếng Việt
          </Link>
        </div>
      )}
    </div>
  );
}
