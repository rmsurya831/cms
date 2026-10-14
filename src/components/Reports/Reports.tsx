"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { Customer, mockCustomers } from "../data/mockCustomers";
import { mockLeads } from "../data/mockLeads";
import { mockActivities } from "../data/mockActivities";

export default function Reports() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);

  // Load customers and refresh Reports when customer data changes
  useEffect(() => {
    const loadCustomers = () => {
      try {
        const savedCustomers = localStorage.getItem("cmsCustomers");

        setCustomers(
          savedCustomers !== null
            ? (JSON.parse(savedCustomers) as Customer[])
            : mockCustomers
        );
      } catch (error) {
        console.error("Error loading report customers:", error);
      }
    };

    loadCustomers();

    window.addEventListener("customersUpdated", loadCustomers);
    window.addEventListener("storage", loadCustomers);

    return () => {
      window.removeEventListener("customersUpdated", loadCustomers);
      window.removeEventListener("storage", loadCustomers);
    };
  }, []);

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const inactiveCustomers = customers.filter(
    (customer) => customer.status === "Inactive"
  ).length;

  const convertedLeads = mockLeads.filter(
    (lead) => lead.status === "Converted"
  ).length;

  const completedActivities = mockActivities.filter(
    (activity) => activity.status === "Completed"
  ).length;

  const reports = [
    { title: "Total Customers", value: customers.length },
    { title: "Active Customers", value: activeCustomers },
    { title: "Inactive Customers", value: inactiveCustomers },
    { title: "Converted Leads", value: convertedLeads },
    { title: "Completed Activities", value: completedActivities },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Topbar />

        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Reports
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            View a summary of your customer management data.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {reports.map((report) => (
              <div
                key={report.title}
                className="rounded-xl border bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-gray-500">
                  {report.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-blue-600">
                  {report.value}
                </h2>
              </div>
            ))}
          </div>

          <section className="mt-6 rounded-xl border bg-white p-5 ">
            <h2 className="text-lg font-semibold text-gray-800">
              Customer Status Summary
            </h2>

            {[
              {
                label: "Active",
                count: activeCustomers,
                color: "bg-green-500",
              },
              {
                label: "Inactive",
                count: inactiveCustomers,
                color: "bg-orange-500",
              },
            ].map((item) => (
              <div key={item.label} className="mt-5 text-black">
                <div className="  mb-2 flex justify-between text-sm  ">
                  <span>{item.label}</span>
                  <span>{item.count}</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full border rounded-full ${item.color}`}
                    style={{
                      width: `${
                        customers.length
                          ? (item.count / customers.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
