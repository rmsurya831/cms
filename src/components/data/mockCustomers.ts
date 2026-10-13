
export type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "Active" | "Inactive" | "Lead";
};

export const mockCustomers: Customer[] = [
  {
    id: 1,
    name: "Arun Kumar",
    email: "arun@gmail.com",
    phone: "9876543210",
    company: "ABC Solutions",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "9876543211",
    company: "XYZ Technologies",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Rahul Das",
    email: "rahul@gmail.com",
    phone: "9876543212",
    company: "Global Tech",
    status: "Active",
  },
];
