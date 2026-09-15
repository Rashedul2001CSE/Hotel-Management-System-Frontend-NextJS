import { revenueData } from "@/lib/mock-api";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function ChartCard() {
    return <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
            <div><p className="text-sm font-medium">Revenue & occupancy</p>
                <p className="mt-1 text-xs text-muted-foreground">Performance overview · Jan — Aug 2024</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" /> Revenue</span>
                <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-amber-500" /> Occupancy</span>
            </div>
        </div>
        <div className="mt-6 h-62.5 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ left: -20, right: 4 }}><defs><linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} /></linearGradient></defs>
                    <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="4 4" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, fontSize: 12 }} /><Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fill="url(#revenue)" /><Area type="monotone" dataKey="occupancy" stroke="#e5a84b" strokeWidth={2} fill="none" />
                </AreaChart>
            </ResponsiveContainer>
        </div></div>
}