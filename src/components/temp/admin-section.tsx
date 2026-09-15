'use client'

import { guests, rooms, staff, statusTone } from "@/lib/mock-api";
import { Check, Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export function AdminSection({
  title,
  description,
  type,
}: {
  title: string;
  description: string;
  type:
    | "rooms"
    | "guests"
    | "staff"
    | "reservations"
    | "housekeeping"
    | "maintenance"
    | "reports"
    | "settings";
}) {
  const [query, setQuery] = useState("");
  const data =
    type === "rooms"
      ? rooms
      : type === "guests"
        ? guests
        : type === "staff"
          ? staff
          : [];
  const filtered = data.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <div className="flex min-h-screen bg-background">
      <div className="min-w-0 flex-1">
        <main className="mx-auto max-w-350 p-4 md:p-8">
          <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                Admin workspace
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            </div>
            <Button>
              <Plus data-icon="inline-start" /> Add{" "}
              {type === "rooms"
                ? "room"
                : type === "guests"
                  ? "guest"
                  : type === "staff"
                    ? "staff member"
                    : "record"}
            </Button>
          </header>
          {[
            "housekeeping",
            "maintenance",
            "reports",
            "settings",
            "reservations",
          ].includes(type) ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {[
                "Daily overview",
                "Pending approvals",
                "Recent activity",
                "Team performance",
                "Export center",
                "Configuration",
              ].map((item, i) => (
                <div
                  key={item}
                  className="rounded-2xl border border-border/60 bg-card p-6"
                >
                  <div className="flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                    <Check className="size-5" />
                  </div>
                  <h2 className="mt-5 font-medium">
                    {type === "reservations"
                      ? [
                          "Upcoming arrivals",
                          "In-house stays",
                          "Admin holds",
                          "Cancellations",
                          "Room blocks",
                          "Audit log",
                        ][i]
                      : item}
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Operational controls and insights for your team.
                  </p>
                  <Button variant="outline" className="mt-5">
                    Open workspace
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-border/60 bg-card">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search records..."
                    className="h-9 rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {filtered.length} records · API fallback active
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border/60 bg-accent/40 text-xs text-muted-foreground">
                    <tr>
                      {Object.keys(data[0] || {})
                        .filter((k) => k !== "id")
                        .map((key) => (
                          <th
                            key={key}
                            className="px-5 py-3 font-medium capitalize"
                          >
                            {key}
                          </th>
                        ))}
                      <th className="px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-border/40 last:border-0 hover:bg-accent/30"
                      >
                        {Object.entries(item)
                          .filter(([key]) => key !== "id")
                          .map(([key, value]) => (
                            <td key={key} className="px-5 py-4">
                              {key === "status" ? (
                                <span className="inline-flex items-center gap-2">
                                  <span
                                    className={`size-2 rounded-full ${statusTone[String(value)] || "bg-primary"}`}
                                  />
                                  {String(value)}
                                </span>
                              ) : (
                                String(value)
                              )}
                            </td>
                          ))}
                        <td className="px-5 py-4">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
