
"use client";

import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: "▦" },
  { name: "Customers", path: "/customers", icon: "♙" },
  { name: "Leads", path: "/leads", icon: "♧" },
  { name: "Activities", path: "/activities", icon: "◷" },
  { name: "Reports", path: "/reports", icon: "▤" },
  { name: "Settings", path: "/settings", icon: "⚙" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-gray-200 bg-white p-5">
      <h1 className="mb-8 text-2xl font-bold text-blue-600">
        CustomerHub
      </h1>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Main Menu
      </p>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition ${
              pathname === item.path
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto border-t pt-5">
        <p className="text-sm text-gray-500">Customer Management</p>
        <p className="mt-1 text-xs text-gray-400">Version 1.0</p>
      </div>
    </aside>
  );
}
