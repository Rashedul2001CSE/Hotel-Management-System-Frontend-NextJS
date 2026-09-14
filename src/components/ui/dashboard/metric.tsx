import { ArrowDownRight, ArrowUpRight, BedDouble, MoreHorizontal } from "lucide-react";

export function Metric({ title, value, detail, icon: Icon, positive = true }
    : { title: string; value: string; detail: string; icon: typeof BedDouble; positive?: boolean }) {
    return <div className="dashboard-card group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5">
        <div className="flex items-start justify-between">
            <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                <Icon className="size-5" />
            </div>
            <MoreHorizontal className="size-4 text-muted-foreground" />
        </div><p className="mt-5 text-sm text-muted-foreground">{title}</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
        <p className={`mt-2 flex items-center gap-1 text-xs font-medium 
                    ${positive ? 'text-emerald-600' : 'text-amber-600'}`}>
            {positive ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {detail}</p>
        <div className="absolute -right-8 -top-8 size-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-[2.5]" />
    </div>




}