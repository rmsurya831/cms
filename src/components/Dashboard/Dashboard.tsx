
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const stats = [
  { title: "Total Customers", value: "1,248", color: "text-blue-600" },
  { title: "Active Customers", value: "986", color: "text-green-600" },
  { title: "Total Leads", value: "156", color: "text-purple-600" },
  { title: "Follow-ups", value: "24", color: "text-orange-600" },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="min-w-0 flex-1">
        <Topbar />

        <main className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-500">
            Welcome back! Here is your customer overview.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.title}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h2 className={`mt-3 text-3xl font-bold ${stat.color}`}>
                  {stat.value}
                </h2>
              </div>
            ))}
          </div>

          <section className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Welcome to CustomerHub
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Use the sidebar to manage customers, leads, activities and reports.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
