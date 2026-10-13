
export type Lead = {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "New" | "Contacted" | "Converted";
};

export const mockLeads: Lead[] = [
  {
    id: 1,
    name: "Vijay Kumar",
    email: "vijay@gmail.com",
    phone: "9876500001",
    company: "Bright Solutions",
    status: "New",
  },
  {
    id: 2,
    name: "Meena Raj",
    email: "meena@gmail.com",
    phone: "9876500002",
    company: "Sky Technologies",
    status: "Contacted",
  },
  {
    id: 3,
    name: "Karthik S",
    email: "karthik@gmail.com",
    phone: "9876500003",
    company: "NextGen Systems",
    status: "Converted",
  },
];
