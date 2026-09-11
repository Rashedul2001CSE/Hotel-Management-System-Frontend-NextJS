"use client";

import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import type { ReactNode } from "react";

type SearchForm = { checkIn: string; checkOut: string; guests: string; roomType: string };

export function SearchSection() {
  const { register, handleSubmit } = useForm<SearchForm>({ defaultValues: { guests: "2", roomType: "all" } });
  const submit = () => document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
  return <section className="py-20"><div className="container mx-auto px-4"><form onSubmit={handleSubmit(submit)} className="glass-morphism-strong neon-border-strong rounded-3xl p-8 md:p-12"><h2 className="mb-12 text-center text-3xl font-bold gradient-text md:text-4xl">Find Your Perfect Escape</h2><div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"><Field label="Check-in"><input type="date" {...register("checkIn", { required: true })} className="field" /></Field><Field label="Check-out"><input type="date" {...register("checkOut", { required: true })} className="field" /></Field><Field label="Guests"><select {...register("guests")} className="field"><option value="1">1 Guest</option><option value="2">2 Guests</option><option value="3">3 Guests</option><option value="4">4+ Guests</option></select></Field><Field label="Room Type"><select {...register("roomType")} className="field"><option value="all">All Rooms</option><option>Standard</option><option>Deluxe</option><option>Suite</option><option>Presidential</option></select></Field></div><div className="text-center"><button type="submit" className="btn-futuristic"><span className="flex items-center gap-3"><Search className="h-6 w-6" />Search Available Rooms</span></button></div></form></div></section>;
}
function Field({ label, children }: { label: string; children: ReactNode }) { return <div><label className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">{label}</label>{children}</div>; }
