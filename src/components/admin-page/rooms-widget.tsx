import { rooms, statusTone } from "@/lib/mock-api";
import { useMemo } from "react";
import { Button } from "../ui/button";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

export function RoomsWidget() {
  const counts = useMemo(
    () =>
      rooms.reduce<Record<string, number>>(
        (a, r) => ({ ...a, [r.status]: (a[r.status] || 0) + 1 }),
        {},
      ),
    [],
  );
  const data = Object.entries(counts).map(([name, value]) => ({ name, value }));
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Room availability</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Live inventory snapshot
          </p>
        </div>
        <Button variant="outline" size="sm">
          Manage rooms
        </Button>
      </div>
      <div className="mt-4 flex items-center gap-5">
        <div className="h-32 w-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={40}
                outerRadius={58}
                paddingAngle={4}
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={
                      entry.name === "Available"
                        ? "#44a87e"
                        : entry.name === "Occupied"
                          ? "var(--primary)"
                          : entry.name === "Cleaning"
                            ? "#e5a84b"
                            : "#d86d70"
                    }
                  />
                ))}
              </Pie>
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-xl font-semibold"
              >
                48
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2 text-xs">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <span
                className={`size-2 rounded-full ${statusTone[item.name]}`}
              />
              <span className="text-muted-foreground">{item.name}</span>
              <span className="ml-auto font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
