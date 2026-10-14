
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

export default function Settings() {
  const [form, setForm] = useState({
    name: "Admin User",
    email: "admin@example.com",
    company: "CustomerHub",
    notifications: true,
    darkMode: false,
  });

  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Settings updated successfully.");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar />

        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your profile and preferences.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 max-w-2xl space-y-6 rounded-xl border bg-white p-6"
          >
            <section>
              <h2 className="mb-4 text-lg font-semibold text-black">Profile Information</h2>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Full Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setMessage("");
                    }}
                    className="w-full rounded-lg border p-3 text-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                      setMessage("");
                    }}
                    className="w-full rounded-lg border p-3 text-black"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-black">
                    Company Name
                  </label>
                  <input
                    required
                    value={form.company}
                    onChange={(e) => {
                      setForm({ ...form, company: e.target.value });
                      setMessage("");
                    }}
                    className="w-full rounded-lg border p-3 text-black"
                  />
                </div>
              </div>
            </section>

            <section className="border-t pt-5">
              <h2 className="mb-4 text-lg font-semibold text-black">Preferences</h2>

              <label className="flex items-center justify-between gap-4 py-3">
                <span>
                  <span className="block text-sm font-medium">
                    Notifications
                  </span>
                  <span className="text-xs text-gray-500">
                    Enable notification preferences.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={form.notifications}
                  onChange={(e) => {
                    setForm({ ...form, notifications: e.target.checked });
                    setMessage("");
                  }}
                  className="h-4 w-4 text-black"
                />
              </label>

              <label className="flex items-center justify-between gap-4 py-3">
                <span>
                  <span className="block text-sm font-medium">Dark Mode</span>
                  <span className="text-xs text-gray-500">
                    Save your preferred appearance setting.
                  </span>
                </span>
                <input
                  type="checkbox"
                  checked={form.darkMode}
                  onChange={(e) => {
                    setForm({ ...form, darkMode: e.target.checked });
                    setMessage("");
                  }}
                  className="h-4 w-4"
                />
              </label>
            </section>

            {message && (
              <p role="status" className="text-sm text-green-600">
                {message}
              </p>
            )}

            <button className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700">
              Save Settings
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
