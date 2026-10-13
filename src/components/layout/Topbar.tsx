
"use client";

import { useState } from "react";

export default function Topbar() {
  const [search, setSearch] = useState("");

  return (
    <header className="flex min-h-16 flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-3">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Customer Management System
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-48 rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500"
        />

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
        >
          ♧
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
          A
        </div>
      </div>
    </header>
  );
}
