'use client'

import type { JSX } from "react";
import { Metric } from "@/components/ui/dashboard/metric";
import { BedDouble, CalendarDays, CircleDollarSign, Plus, SparklesIcon, Users, Utensils, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/admin-page/chartCard";
import { Arrivals } from "@/components/admin-page/arraivals";
import { RoomsWidget } from "@/components/admin-page/rooms-widget";
import { useAuth } from "@/providers/AuthContext";

export default function Dashboard(): JSX.Element {

  const date = new Date();
  const formattedDate = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const greeting = date.getHours() < 12 ? "Good morning" : date.getHours() < 18 ? "Good afternoon" : "Good evening";
  const {user} = useAuth(); 

  return <main className="w-full lg:max-w-[1600px] p-4 md:p-8 max-h-screen">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div><p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
          {formattedDate}</p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{greeting}, {user?.fullName|| "Guest"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Here&apos;s what&apos;s happening at Velora today.</p>
        </div>
        <div className="flex gap-2"><Button variant="outline"><CalendarDays data-icon="inline-start" /> Today</Button>
          <Button><Plus data-icon="inline-start" /> New reservation</Button>
        </div>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric title="Total revenue" value="$184,920" detail="12.8% from last month" icon={CircleDollarSign} />
        <Metric title="Occupancy rate" value="86.4%" detail="5.2% from last month" icon={BedDouble} />
        <Metric title="In-house guests" value="124" detail="18 arriving today" icon={Users} />
        <Metric title="Avg. daily rate" value="$286.40" detail="3.1% from last month" icon={Utensils} positive={false} />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <ChartCard />
        <Arrivals />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <RoomsWidget />
        <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
          <div className="flex items-center justify-between">
            <div><p className="text-sm font-medium">Operations pulse</p>
              <p className="mt-1 text-xs text-muted-foreground">Tasks needing attention</p>
            </div><Button variant="ghost" size="sm">Open tasks</Button>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-accent/70 p-4">
              <div className="flex items-center gap-2 text-amber-600">
                <SparklesIcon />
                <span className="text-xs font-medium">Housekeeping</span>
              </div>
              <p className="mt-3 text-2xl font-semibold">08</p>
              <p className="text-xs text-muted-foreground">rooms need service</p>
            </div>
            <div className="rounded-xl bg-accent/70 p-4">
              <div className="flex items-center gap-2 text-rose-600">
                <Wrench className="size-4" /><span className="text-xs font-medium">Maintenance</span>
              </div>
              <p className="mt-3 text-2xl font-semibold">03</p>
              <p className="text-xs text-muted-foreground">open work orders</p>
            </div>
          </div>
        </div>
      </div>
    </main>
}