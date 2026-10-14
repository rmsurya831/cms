
// "use client";

// import { useMemo, useState } from "react";
// import Sidebar from "@/components/layout/Sidebar";
// import Topbar from "@/components/layout/Topbar";
// import { Customer, mockCustomers } from "../data/mockCustomers";


// const emptyForm = {
//   name: "",
//   email: "",
//   phone: "",
//   company: "",
//   status: "Active" as Customer["status"],
// };

// export default function Customers() {
//   const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
//   const [form, setForm] = useState(emptyForm);
//   const [search, setSearch] = useState("");
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [showForm, setShowForm] = useState(false);

//   const filteredCustomers = useMemo(
//     () =>
//       customers.filter((customer) =>
//         `${customer.name} ${customer.email} ${customer.company}`
//           .toLowerCase()
//           .includes(search.toLowerCase())
//       ),
//     [customers, search]
//   );

//   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     if (editingId !== null) {
//       setCustomers((prev) =>
//         prev.map((customer) =>
//           customer.id === editingId
//             ? { ...customer, ...form }
//             : customer
//         )
//       );
//     } else {
//       setCustomers((prev) => [
//         ...prev,
//         { id: Date.now(), ...form },
//       ]);
//     }

//     setForm(emptyForm);
//     setEditingId(null);
//     setShowForm(false);
//   }

//   function handleEdit(customer: Customer) {
//     setForm({
//       name: customer.name,
//       email: customer.email,
//       phone: customer.phone,
//       company: customer.company,
//       status: customer.status,
//     });
//     setEditingId(customer.id);
//     setShowForm(true);
//   }

//   function handleDelete(id: number) {
//     if (window.confirm("Are you sure you want to delete this customer?")) {
//       setCustomers((prev) =>
//         prev.filter((customer) => customer.id !== id)
//       );
//     }
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       <Sidebar />

//       <div className="min-w-0 flex-1">
//         <Topbar />

//         <main className="p-6">
//           <div className="flex flex-wrap items-center justify-between gap-4">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">
//                 Customers
//               </h1>
//               <p className="mt-1 text-sm text-gray-500">
//                 Manage all your customer information.
//               </p>
//             </div>

//             <button
//               onClick={() => {
//                 setForm(emptyForm);
//                 setEditingId(null);
//                 setShowForm(!showForm);
//               }}
//               className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//             >
//               + Add Customer
//             </button>
//           </div>

//           {showForm && (
//             <form
//               onSubmit={handleSubmit}
//               className="mt-6 grid gap-4 rounded-xl border bg-white p-5 sm:grid-cols-2"
//             >
//               <h2 className="text-lg font-semibold sm:col-span-2 text-black">
//                 {editingId !== null ? "Edit Customer" : "Add Customer"}
//               </h2>

//               <input
//                 required
//                 placeholder="Customer name"
//                 value={form.name}
//                 onChange={(e) =>
//                   setForm({ ...form, name: e.target.value })
//                 }
//                 className="rounded-lg border p-3 text-black"
//               />

//               <input
//                 required
//                 type="email"
//                 placeholder="Email address"
//                 value={form.email}
//                 onChange={(e) =>
//                   setForm({ ...form, email: e.target.value })
//                 }
//                 className="rounded-lg border p-3 text-black"
//               />

//               <input
//                 required
//                 placeholder="Phone number"
//                 value={form.phone}
//                 onChange={(e) =>
//                   setForm({ ...form, phone: e.target.value })
//                 }
//                 className="rounded-lg border p-3 text-black"
//               />

//               <input
//                 required
//                 placeholder="Company"
//                 value={form.company}
//                 onChange={(e) =>
//                   setForm({ ...form, company: e.target.value })
//                 }
//                 className="rounded-lg border p-3 text-black"
//               />

//               <select
//                 value={form.status}
//                 onChange={(e) =>
//                   setForm({
//                     ...form,
//                     status: e.target.value as Customer["status"],
//                   })
//                 }
//                 className="rounded-lg border p-3 text-black"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//                 <option value="Lead">Lead</option>
//               </select>

//               <div className="flex gap-3 sm:col-span-2">
//                 <button
//                   type="submit"
//                   className="rounded-lg bg-blue-600 px-5 py-2 text-white"
//                 >
//                   {editingId !== null ? "Update" : "Save"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowForm(false);
//                     setEditingId(null);
//                     setForm(emptyForm);
//                   }}
//                   className="rounded-lg border px-5 py-2 text-black"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           )}

//           <section className="mt-6 rounded-xl border bg-white p-5">
//             <input
//               type="search"
//               placeholder="Search customers..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="mb-5 w-full rounded-lg border p-3 outline-none focus:border-blue-500 text-black"
//             />

//             <div className="overflow-x-auto">
//               <table className="w-full text-left text-sm">
//                 <thead className="bg-gray-50 text-gray-600">
//                   <tr>
//                     <th className="p-3">Name</th>
//                     <th className="p-3">Email</th>
//                     <th className="p-3">Phone</th>
//                     <th className="p-3">Company</th>
//                     <th className="p-3">Status</th>
//                     <th className="p-3">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {filteredCustomers.map((customer) => (
//                     <tr key={customer.id} className="border-t">
//                       <td className="p-3 font-medium text-black">{customer.name}</td>
//                       <td className="p-3 text-black">{customer.email}</td>
//                       <td className="p-3 text-black">{customer.phone}</td>
//                       <td className="p-3 text-black">{customer.company}</td>
//                       <td className="p-3">
//                         <span
//                           className={`rounded-full px-3 py-1 text-xs  text-black ${
//                             customer.status === "Active"
//                               ? "bg-green-100 text-green-700"
//                               : customer.status === "Inactive"
//                                 ? "bg-gray-100 text-gray-700"
//                                 : "bg-orange-100 text-orange-700"
//                           }`}
//                         >
//                           {customer.status}
//                         </span>
//                       </td>
//                       <td className="p-3">
//                         <div className="flex gap-3">
//                           <button
//                             onClick={() => handleEdit(customer)}
//                             className="text-blue-600 hover:underline"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(customer.id)}
//                             className="text-red-600 hover:underline"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}

//                   {filteredCustomers.length === 0 && (
//                     <tr>
//                       <td colSpan={6} className="p-6 text-center text-gray-500">
//                         No customers found.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }




"use client";

import { useMemo, useState, useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { Customer, mockCustomers } from "../data/mockCustomers";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  status: "Active" as Customer["status"],
};

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved customers before saving anything
  useEffect(() => {
    try {
      const savedCustomers = localStorage.getItem("cmsCustomers");

      if (savedCustomers !== null) {
        setCustomers(JSON.parse(savedCustomers) as Customer[]);
      }
    } catch (error) {
      console.error("Error loading customers:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save customers whenever the list changes
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem("cmsCustomers", JSON.stringify(customers));
      window.dispatchEvent(new Event("customersUpdated"));
    } catch (error) {
      console.error("Error saving customers:", error);
    }
  }, [customers, isLoaded]);

  const filteredCustomers = useMemo(
    () =>
      customers.filter((customer) =>
        `${customer.name} ${customer.email} ${customer.company}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [customers, search]
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let updatedCustomers: Customer[];

    if (editingId !== null) {
      // Update existing customer
      updatedCustomers = customers.map((customer) =>
        customer.id === editingId
          ? { ...customer, ...form }
          : customer
      );
    } else {
      // Add new customer
      updatedCustomers = [
        ...customers,
        {
          id: Date.now(),
          ...form,
        },
      ];
    }

    // Update state and localStorage immediately
    setCustomers(updatedCustomers);

    try {
      localStorage.setItem(
        "cmsCustomers",
        JSON.stringify(updatedCustomers)
      );
      window.dispatchEvent(new Event("customersUpdated"));
    } catch (error) {
      console.error("Error saving customer:", error);
    }

    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  function handleEdit(customer: Customer) {
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      company: customer.company,
      status: customer.status,
    });

    setEditingId(customer.id);
    setShowForm(true);
  }

  function handleDelete(id: number) {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      const updatedCustomers = customers.filter(
        (customer) => customer.id !== id
      );

      setCustomers(updatedCustomers);

      try {
        localStorage.setItem(
          "cmsCustomers",
          JSON.stringify(updatedCustomers)
        );
        window.dispatchEvent(new Event("customersUpdated"));
      } catch (error) {
        console.error("Error deleting customer:", error);
      }
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
              <h1 className="text-2xl font-bold text-gray-800">
                Customers
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage all your customer information.
              </p>
            </div>

            <button
              onClick={() => {
                setForm(emptyForm);
                setEditingId(null);
                setShowForm(!showForm);
              }}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              + Add Customer
            </button>
          </div>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-4 rounded-xl border bg-white p-5 sm:grid-cols-2"
            >
              <h2 className="text-lg font-semibold sm:col-span-2 text-black">
                {editingId !== null ? "Edit Customer" : "Add Customer"}
              </h2>

              <input
                required
                placeholder="Customer name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="rounded-lg border p-3 text-black"
              />

              <input
                required
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="rounded-lg border p-3 text-black"
              />

              <input
                required
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                className="rounded-lg border p-3 text-black"
              />

              <input
                required
                placeholder="Company"
                value={form.company}
                onChange={(e) =>
                  setForm({ ...form, company: e.target.value })
                }
                className="rounded-lg border p-3 text-black"
              />

              <select
                value={form.status}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status: e.target.value as Customer["status"],
                  })
                }
                className="rounded-lg border p-3 text-black"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Lead">Lead</option>
              </select>

              <div className="flex gap-3 sm:col-span-2">
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-5 py-2 text-white"
                >
                  {editingId !== null ? "Update" : "Save"}
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
              type="search"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-5 w-full rounded-lg border p-3 outline-none focus:border-blue-500 text-black"
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
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-t">
                      <td className="p-3 font-medium text-black">
                        {customer.name}
                      </td>

                      <td className="p-3 text-black">
                        {customer.email}
                      </td>

                      <td className="p-3 text-black">
                        {customer.phone}
                      </td>

                      <td className="p-3 text-black">
                        {customer.company}
                      </td>

                      <td className="p-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs text-black ${
                            customer.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : customer.status === "Inactive"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>

                      <td className="p-3">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleEdit(customer)}
                            className="text-blue-600 hover:underline"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(customer.id)}
                            className="text-red-600 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-6 text-center text-gray-500"
                      >
                        No customers found.
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
