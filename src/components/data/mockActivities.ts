
export type Activity = {
  id: number;
  title: string;
  customer: string;
  date: string;
  type: "Call" | "Meeting" | "Follow-up";
  status: "Pending" | "Completed";
};

export const mockActivities: Activity[] = [
  {
    id: 1,
    title: "Discuss project requirements",
    customer: "Arun Kumar",
    date: "2026-10-15",
    type: "Meeting",
    status: "Pending",
  },
  {
    id: 2,
    title: "Product enquiry call",
    customer: "Priya Sharma",
    date: "2026-10-14",
    type: "Call",
    status: "Completed",
  },
  {
    id: 3,
    title: "Send quotation",
    customer: "Rahul Das",
    date: "2026-10-16",
    type: "Follow-up",
    status: "Pending",
  },
];
