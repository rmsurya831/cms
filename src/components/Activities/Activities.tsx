
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { mockActivities, type Activity } from "../data/mockActivities";

const emptyForm = {
  title: "",
  customer: "",
  date: "",
  type: "Call" as Activity["type"],
  status: "Pending" as Activity["status"],
};

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = activities.filter((activity) =>
    `${activity.title} ${activity.customer} ${activity.type}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (editingId !== null) {
      setActivities((prev) =>
        prev.map((activity) =>
          activity.id === editingId ? { ...activity, ...form } : activity
        )
      );
    } else {
      setActivities((prev) => [...prev, { id: Date.now(), ...form }]);
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function handleEdit(activity: Activity) {
    setForm({
      title: activity.title,
      customer: activity.customer,
      date: activity.date,
      type: activity.type,
      status: activity.status,
    });
    setEditingId(activity.id);
    setShowForm(true);
  }

  function handleDelete(id: number) {
    if (window.confirm("Delete this activity?")) {
      setActivities((prev) => prev.filter((activity) => activity.id !== id));
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar />

        <main className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Activities</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage calls, meetings and follow-ups.
              </p>
            </div>
            <button
              onClick={() => {
                setForm(emptyForm);
                setEditingId(null);
                setShowForm(!showForm);
              }}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              + Add Activity
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-4 rounded-xl border bg-white p-5 sm:grid-cols-2 "
            >
              <h2 className="text-lg font-semibold sm:col-span-2 text-black">
                {editingId !== null ? "Edit Activity" : "Add Activity"}
              </h2>

              <input
                required
                placeholder="Activity title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="rounded-lg border p-3 text-black"
              />
              <input
                required
                placeholder="Customer name"
                value={form.customer}
                onChange={(e) =>
                  setForm({ ...form, customer: e.target.value })
                }
                className="rounded-lg border p-3 text-black"
              />
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="rounded-lg border p-3 text-black"
              />
              <select
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as Activity["type"] })
                }
                className="rounded-lg border p-3 text-black"
              >
                <option value="Call">Call</option>
                <option value="Meeting">Meeting</option>
                <option value="Follow-up">Follow-up</option>
              </select>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as Activity["status"],
                  })
                }
                className="rounded-lg border p-3 text-black"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>

              <div className="flex gap-3 sm:col-span-2">
                <button className="rounded-lg bg-blue-600 px-5 py-2 text-white">
                  {editingId !== null ? "Update Activity" : "Save Activity"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="rounded-lg border px-5 py-2 text-black"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <section className="mt-6 rounded-xl border bg-white p-5">
            <input
              placeholder="Search activities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-5 w-full rounded-lg border p-3  text-black"
            />

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-3">Activity</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((activity) => (
                    <tr key={activity.id} className="border-t text-black">
                      <td className="p-3">{activity.title}</td>
                      <td className="p-3">{activity.customer}</td>
                      <td className="p-3">{activity.date}</td>
                      <td className="p-3">{activity.type}</td>
                      <td className="p-3">{activity.status}</td>
                      <td className="p-3">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(activity)}
                            className="text-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(activity.id)}
                            className="text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-5 text-center text-gray-500">
                        No activities found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
