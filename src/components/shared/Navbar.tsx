"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { useAuthModal } from "../../providers/auth-modal-context";
import { useAuth } from "@/providers/AuthContext";

import {
  FiSun,
  FiMoon,
  FiBell,
  FiLogOut,
  FiHome,
  FiGrid,
  FiImage,
  FiMail,
  FiCalendar,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { Button } from "../ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import NotificationModal from "./NotificationModal";

/* -------------------------------------------------------------------------- */
/* Navigation                                                                 */
/* -------------------------------------------------------------------------- */

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    icon: FiHome,
  },
  {
    label: "Rooms",
    href: "/rooms",
    icon: FiGrid,
  },
  {
    label: "Gallery",
    href: "/gallery",
    icon: FiImage,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: FiMail,
  },
];

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export function Navbar() {
  const pathname = usePathname();

  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();
  const { openLogin } = useAuthModal();
  const { user, isAuthenticated, logout } = useAuth();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((value) => !value);
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    closeMobileMenu();
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const userInitial =
    user?.fullName?.trim().charAt(0).toUpperCase() || "U";

  return (
    <>
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Close mobile menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 shadow-sm backdrop-blur-xl">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 min-h-18 items-center justify-between gap-4">

            {/* ---------------------------------------------------------------- */}
            {/* Logo                                                             */}
            {/* ---------------------------------------------------------------- */}

            <Link
              href="/"
              className="group flex shrink-0 items-center gap-2.5"
              aria-label="Velora Hotels home"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
                <span className="hotel-display text-lg font-semibold">
                  V
                </span>
              </div>

              <div className="flex flex-col leading-none">
                <span className="hotel-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Velora
                </span>

                <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                  Hotels & Suites
                </span>
              </div>
            </Link>

            {/* ---------------------------------------------------------------- */}
            {/* Desktop Navigation                                               */}
            {/* ---------------------------------------------------------------- */}

            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Main navigation"
            >
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />

                    <span>{item.label}</span>

                    {active && (
                      <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ---------------------------------------------------------------- */}
            {/* Right Actions                                                     */}
            {/* ---------------------------------------------------------------- */}

            <div className="flex items-center gap-1.5 sm:gap-2">

              {/* Notifications */}
              {isAuthenticated && (
                <button
                  type="button"
                  aria-label="Open notifications"
                  onClick={() => setNotifOpen(true)}
                  className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary md:flex"
                >
                  <FiBell className="h-4.5 w-4.5" />

                  <span className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
                </button>
              )}

              {/* Theme */}
              <button
                type="button"
                aria-label="Toggle theme"
                onClick={toggleTheme}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-all duration-200 hover:border-primary/40 hover:bg-primary/5"
              >
                <FiSun className="h-4.5 w-4.5 text-amber-500 transition-all dark:scale-0 dark:rotate-90" />

                <FiMoon className="absolute h-4.5 w-4.5 scale-0 rotate-90 text-slate-400 transition-all dark:scale-100 dark:rotate-0" />
              </button>

              {/* Auth */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        variant="ghost"
                        className="h-10 rounded-full p-0 hover:bg-primary/5"
                        aria-label="Open account menu"
                      >
                        <Avatar className="h-10 w-10 border border-primary/20">
                          <AvatarImage
                            src=""
                            alt={user?.fullName || "User"}
                          />

                          <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">
                            {userInitial}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    }
                  />

                  <DropdownMenuContent
                    align="end"
                    sideOffset={8}
                    className="w-56 rounded-xl p-1.5"
                  >
                    <div className="px-3 py-2.5">
                      <p className="truncate text-sm font-semibold">
                        {user?.fullName || "Guest"}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {user?.email || "Velora guest"}
                      </p>
                    </div>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                      <DropdownMenuItem >
                        <Link
                          href="/profile"
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <FiUser className="h-4 w-4" />
                          My Profile
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem >
                        <Link
                          href="admin/dashboard"
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <FiGrid className="h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem >
                        <Link
                          href="/rooms"
                          className="flex cursor-pointer items-center gap-2"
                        >
                          <FiCalendar className="h-4 w-4" />
                          Book a Room
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={logout}
                    >
                      <FiLogOut className="h-4 w-4" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  type="button"
                  onClick={openLogin}
                  className="hidden rounded-full bg-primary px-5 font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md md:flex"
                >
                  Sign In
                </Button>
              )}

              {/* Mobile menu button */}
              <button
                type="button"
                aria-label={
                  mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={mobileMenuOpen}
                onClick={toggleMobileMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 lg:hidden"
              >
                {mobileMenuOpen ? (
                  <FiX className="h-5 w-5" />
                ) : (
                  <FiMenu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------- */}
        {/* Mobile Navigation                                                    */}
        {/* -------------------------------------------------------------------- */}

        <div
          className={cn(
            "fixed inset-x-0 top-18 z-50 border-b border-border bg-background shadow-xl transition-all duration-300 lg:hidden",
            mobileMenuOpen
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-4 opacity-0"
          )}
        >
          <div className="mx-auto max-h-[calc(100dvh-4.5rem)] w-full max-w-7xl overflow-y-auto px-4 py-5 sm:px-6">


            {/* Mobile links */}
            <nav className="space-y-1" aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-all duration-200",
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-foreground hover:bg-muted"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </span>

                    {active && (
                      <span className="text-xs font-medium opacity-80">
                        Current
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Booking CTA */}
            <div className="mt-5 rounded-2xl bg-primary p-5 text-primary-foreground">
              <p className="hotel-display text-xl font-semibold">
                Your stay, your way.
              </p>

              <p className="mt-1 text-sm text-primary-foreground/75">
                Discover rooms and experiences designed for a memorable stay.
              </p>

              <Link
                href="/rooms"
                onClick={closeMobileMenu}
                className="mt-4 flex items-center justify-center rounded-lg bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-background/90"
              >
                Explore Rooms
              </Link>
            </div>

            {/* Mobile account */}
            <div className="mt-5 border-t border-border pt-5">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    href="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-muted"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user?.fullName || "Guest"}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        View profile
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="admin/dashboard"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-muted"
                  >
                    <FiGrid className="h-5 w-5" />
                    Dashboard
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      closeMobileMenu();
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-destructive transition hover:bg-destructive/10"
                  >
                    <FiLogOut className="h-5 w-5" />
                    Log Out
                  </button>
                </div>
              ) : (
                <Button
                  type="button"
                  onClick={() => {
                    closeMobileMenu();
                    openLogin();
                  }}
                  className="w-full rounded-xl bg-primary py-6 font-semibold text-primary-foreground"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <NotificationModal
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
      />
    </>
  );
}

export default Navbar;