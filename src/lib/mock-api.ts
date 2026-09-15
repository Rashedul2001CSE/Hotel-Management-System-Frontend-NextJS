export type Room = {
  id: string;
  number: string;
  type: string;
  floor: string;
  status: "Available" | "Occupied" | "Cleaning" | "Maintenance";
  rate: number;
  guest?: string;
};
export type Guest = {
  id: string;
  name: string;
  email: string;
  phone: string;
  stays: number;
  status: "In-house" | "Checked out" | "VIP";
};
export type Staff = {
  id: string;
  name: string;
  role: string;
  department: string;
  status: "On duty" | "Off duty" | "On leave";
};

export const rooms: Room[] = [
  {
    id: "RM-101",
    number: "101",
    type: "Deluxe King",
    floor: "1st floor",
    status: "Occupied",
    rate: 245,
    guest: "Amelia Stone",
  },
  {
    id: "RM-102",
    number: "102",
    type: "Deluxe Twin",
    floor: "1st floor",
    status: "Available",
    rate: 210,
  },
  {
    id: "RM-203",
    number: "203",
    type: "Executive Suite",
    floor: "2nd floor",
    status: "Cleaning",
    rate: 420,
  },
  {
    id: "RM-305",
    number: "305",
    type: "Presidential Suite",
    floor: "3rd floor",
    status: "Maintenance",
    rate: 890,
  },
  {
    id: "RM-402",
    number: "402",
    type: "Deluxe King",
    floor: "4th floor",
    status: "Occupied",
    rate: 245,
    guest: "Noah Williams",
  },
];
export const guests: Guest[] = [
  {
    id: "G-9012",
    name: "Amelia Stone",
    email: "amelia.stone@email.com",
    phone: "+1 415 555 0142",
    stays: 8,
    status: "VIP",
  },
  {
    id: "G-9013",
    name: "Noah Williams",
    email: "noah.w@email.com",
    phone: "+1 415 555 0188",
    stays: 2,
    status: "In-house",
  },
  {
    id: "G-9014",
    name: "Olivia Martin",
    email: "olivia.m@email.com",
    phone: "+1 415 555 0116",
    stays: 5,
    status: "Checked out",
  },
];
export const staff: Staff[] = [
  {
    id: "ST-01",
    name: "Sofia Chen",
    role: "Front Office Manager",
    department: "Front office",
    status: "On duty",
  },
  {
    id: "ST-02",
    name: "Marcus Reed",
    role: "Executive Housekeeper",
    department: "Housekeeping",
    status: "On duty",
  },
  {
    id: "ST-03",
    name: "Elena Rossi",
    role: "Night Auditor",
    department: "Finance",
    status: "Off duty",
  },
];

export async function getHotelData<T>(
  endpoint: string,
  fallback: T,
): Promise<T> {
  try {
    const response = await fetch(`/api${endpoint}`, {
      headers: { Accept: "application/json" },
    });
    if (!response.ok) throw new Error("API unavailable");
    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export const revenueData = [
  { month: "Jan", revenue: 32, occupancy: 54 },
  { month: "Feb", revenue: 38, occupancy: 62 },
  { month: "Mar", revenue: 35, occupancy: 58 },
  { month: "Apr", revenue: 43, occupancy: 71 },
  { month: "May", revenue: 48, occupancy: 76 },
  { month: "Jun", revenue: 52, occupancy: 82 },
  { month: "Jul", revenue: 57, occupancy: 88 },
  { month: "Aug", revenue: 61, occupancy: 91 },
];
export const arrivals = [
  ["09:30 AM", "Amelia Stone", "Executive Suite", "VIP"],
  ["11:00 AM", "Daniel Kim", "Deluxe King", "Standard"],
  ["01:45 PM", "Leah Brooks", "Presidential Suite", "VIP"],
  ["03:20 PM", "James Wilson", "Deluxe Twin", "Standard"],
];
export const statusTone: Record<string, string> = {
  Available: "bg-emerald-500",
  Occupied: "bg-primary",
  Cleaning: "bg-amber-500",
  Maintenance: "bg-rose-500",
  "On duty": "bg-emerald-500",
  "Off duty": "bg-muted-foreground",
  "On leave": "bg-amber-500",
};
