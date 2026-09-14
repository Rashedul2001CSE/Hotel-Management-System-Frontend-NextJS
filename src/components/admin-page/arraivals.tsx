import { arrivals } from "@/lib/mock-api";
import { Button } from "../ui/button";

export function Arrivals() {
    return <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium">Today&apos;s arrivals</p>
                <p className="mt-1 text-xs text-muted-foreground">4 expected check-ins</p>
            </div>
            <Button variant="ghost" size="sm">View all</Button>
        </div>
        <div className="mt-5 flex flex-col gap-1">
            {arrivals.map(([time, name, room, tier]) =>
                <div key={name} className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-accent">
                    <div className="flex size-9 items-center justify-center rounded-full bg-accent text-xs font-semibold">{name.split(' ').map((n) => n[0]).join('')}</div>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{name}</p>
                        <p className="text-xs text-muted-foreground">{room}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-medium">{time}</p>
                        <p className={`text-[10px] ${tier === 'VIP' ? 'text-amber-600' : 'text-muted-foreground'}`}>
                            {tier}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
}