import { Building2, Moon } from "lucide-react";
import { Button } from "../ui/button";

export function MobileNav() {
    return <div className="flex h-16 items-center justify-between border-b border-border/60 bg-sidebar px-4 lg:hidden">
        <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Building2 className="size-4" />
            </div>
            <span className="font-semibold">Luma House</span>
        </div>
        <Button variant="outline" size="icon" aria-label="Toggle theme"><Moon /></Button>
    </div>
}