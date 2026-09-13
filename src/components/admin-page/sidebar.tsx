'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BedDouble, BookOpen, Building2, ChevronRight, ClipboardCheck, FileBarChart, Home, LogOut, Moon, Settings, Sparkles, Users, Wrench } from 'lucide-react'
import { Button } from '@/components/ui/button'

const groups = [
  { label: 'Workspace', items: [{ label: 'Overview', href: '/', icon: Home }, { label: 'Reservations', href: '/reservations', icon: BookOpen }] },
  { label: 'Operations', items: [{ label: 'Rooms', href: '/rooms', icon: BedDouble }, { label: 'Guests', href: '/guests', icon: Users }, { label: 'Staff', href: '/staff', icon: ClipboardCheck }, { label: 'Housekeeping', href: '/housekeeping', icon: Sparkles }, { label: 'Maintenance', href: '/maintenance', icon: Wrench }] },
  { label: 'Insights', items: [{ label: 'Reports', href: '/reports', icon: FileBarChart }, { label: 'Settings', href: '/settings', icon: Settings }] },
]

export function AdminSidebar({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname()
  return <aside className={`hidden h-screen shrink-0 border-r border-border/60 bg-sidebar lg:flex lg:flex-col ${collapsed ? 'w-20' : 'w-64'} transition-[width] duration-300`}>
    <div className="flex h-20 items-center gap-3 border-b border-border/60 px-5">
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"><Building2 /></div>
      {!collapsed && <div><p className="font-semibold tracking-tight">Luma House</p><p className="text-xs text-muted-foreground">Operations console</p></div>}
    </div>
    <nav className="flex-1 overflow-y-auto px-3 py-6">
      {groups.map((group) => <div key={group.label} className="mb-7">
        {!collapsed && <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{group.label}</p>}
        <div className="flex flex-col gap-1">{group.items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href
          return <Link key={href} href={href} title={collapsed ? label : undefined} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${active ? 'bg-primary text-primary-foreground shadow-md shadow-primary/15' : 'text-muted-foreground hover:bg-accent hover:text-foreground'} ${collapsed ? 'justify-center' : ''}`}>
            <Icon className="size-4.5" /><span className={collapsed ? 'sr-only' : ''}>{label}</span>{!collapsed && active && <ChevronRight className="ml-auto size-4" />}
          </Link>
        })}</div>
      </div>)}
    </nav>
    <div className="border-t border-border/60 p-3">
      {!collapsed && <div className="mb-3 rounded-xl bg-accent/60 p-3"><p className="text-xs font-medium">Luma House, San Francisco</p><p className="mt-1 text-[11px] text-muted-foreground">Connected to mock API</p><span className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-emerald-600"><span className="size-1.5 rounded-full bg-emerald-500" /> Live fallback</span></div>}
      <Button variant="ghost" className={`w-full justify-start gap-3 text-muted-foreground ${collapsed ? 'justify-center px-0' : ''}`}><LogOut data-icon="inline-start" />{!collapsed && 'Sign out'}</Button>
    </div>
  </aside>
}

export function MobileNav() { return <div className="flex h-16 items-center justify-between border-b border-border/60 bg-sidebar px-4 lg:hidden"><div className="flex items-center gap-2"><div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><Building2 className="size-4" /></div><span className="font-semibold">Luma House</span></div><Button variant="outline" size="icon" aria-label="Toggle theme"><Moon /></Button></div> }
