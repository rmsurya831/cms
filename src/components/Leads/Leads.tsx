
"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { mockLeads, type Lead } from "../data/mockLeads";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "New" as Lead["status"],
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filteredLeads = leads.filter((lead) =>
    `${lead.name} ${lead.email} ${lead.company}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (editingId !== null) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === editingId ? { ...lead, ...form } : lead
        )
      );
    } else {
      setLeads((prev) => [...prev, { id: Date.now(), ...form }]);
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function handleEdit(lead: Lead) {
    setForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      status: lead.status,
    });
    setEditingId(lead.id);
    setShowForm(true);
  }

  function handleDelete(id: number) {
    if (window.confirm("Delete this lead?")) {
      setLeads((prev) => prev.filter((lead) => lead.id !== id));
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
              <h1 className="text-2xl font-bold text-gray-800">Leads</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your potential customers.
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
              + Add Lead
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-4 rounded-xl border bg-white p-5 sm:grid-cols-2"
            >
              <h2 className="text-lg font-semibold sm:col-span-2">
                {editingId !== null ? "Edit Lead" : "Add Lead"}
              </h2>

              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-lg border p-3"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="rounded-lg border p-3"
              />
              <input
                required
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="rounded-lg border p-3"
              />
              <input
                required
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="rounded-lg border p-3"
              />

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as Lead["status"] })
                }
                className="rounded-lg border p-3"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Converted">Converted</option>
              </select>

              <div className="flex gap-3 sm:col-span-2">
                <button className="rounded-lg bg-blue-600 px-5 py-2 text-white">
                  {editingId !== null ? "Update Lead" : "Save Lead"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="rounded-lg border px-5 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <section className="mt-6 rounded-xl border bg-white p-5">
            <input
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-5 w-full rounded-lg border p-3"
            />

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Company</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-t">
                      <td className="p-3">{lead.name}</td>
                      <td className="p-3">{lead.email}</td>
                      <td className="p-3">{lead.phone}</td>
                      <td className="p-3">{lead.company}</td>
                      <td className="p-3">{lead.status}</td>
                      <td className="p-3">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(lead)}
                            className="text-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredLeads.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-5 text-center text-gray-500">
                        No leads found.
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
