"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useAuthModal } from "../../providers/auth-modal-context";
import { FiSun, FiMoon } from "react-icons/fi";
import { Button } from "../ui/button";

// *******************

import { useState, useEffect } from "react";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import Image from "next/image";

import {
  FiHome,
  FiGrid,
  FiImage,
  FiMail,
  FiSearch,
} from "react-icons/fi";


// ---- Config --------------------------------------------------------------

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: FiHome },
  { label: "Rooms", href: "/rooms", icon: FiGrid },
  { label: "Gallery", href: "/gallery", icon: FiImage },
  { label: "Contact", href: "/contact", icon: FiMail },
];

// Placeholder "logged in" user for the mock auth state. Swap this for a real
// session (NextAuth `useSession()`, Clerk `useUser()`, etc.) later — every
// place `user` is read below is the only thing you'll need to touch.
// const MOCK_USER = {
//   name: "Jordan Lee",
//   avatarUrl: "",
// };

// function getInitials(name: string) {
//   return name
//     .split(" ")
//     .map((p) => p[0])
//     .join("")
//     .slice(0, 2)
//     .toUpperCase();
// }

// ---- Component -------------------------------------------------------------

export function Navbar() {

  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const { openLogin } = useAuthModal();

  //*************************//

  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  const closeMobileMenu = () => setMobileMenuOpen(false);
  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <div
        className={cn("mobile-menu-backdrop", mobileMenuOpen && "active", "lg:hidden")}
        onClick={closeMobileMenu}
      />
      <header className="top-0 z-50 sticky overflow-x-clip transition-all duration-300 header-glass header-neon">
        <div className="mx-auto px-4 container">
          <div className="flex justify-between items-center h-20">

            {/* Logo Section */}
            <div className="flex items-center space-x-1">
              <div className="logo-container">
                <Link
                  href="/"
                  className="font-black text-2xl md:text-3xl logo-sharp clickable"
                >
                  Hotel_Rose
                </Link>
              </div>

            </div>


            <nav className="hidden lg:flex items-center space-x-8">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-medium text-gray-700 hover:text-blue-500 dark:hover:text-[#7e71f4] dark:text-gray-300 text-lg nav-item clickable"
                >
                  {item.label}
                </Link>
              ))}
            </nav>


            <div className="flex items-center space-x-4">

              <button
                type="button"
                aria-label="Search"
                className="hidden md:flex justify-center items-center neon-border rounded-full w-10 h-10 hover:scale-110 transition-all duration-300 glass-morphism interactive-element"
              >
                <FiSearch className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>


              {/* {isAuthenticated && (
                <button
                  type="button"
                  aria-label="Notifications"
                  className="hidden relative md:flex justify-center items-center neon-border rounded-full w-10 h-10 hover:scale-110 transition-all duration-300 glass-morphism interactive-element"
                >
                  <FiBell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                  <div className="notification-badge" />
                </button>
              )} */}


              {/* {isAuthenticated && (
                <button
                  type="button"
                  aria-label="Log out"
                  onClick={() => setIsAuthenticated(false)}
                  className="hidden relative md:flex justify-center items-center neon-border rounded-full w-10 h-10 hover:scale-110 transition-all duration-300 glass-morphism interactive-element"
                >
                  <FiLogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              )} */}


              {/* <div className="flex items-center">
                {/*isAuthenticated ? (
                  <Link
                    href="/profile"
                    className="flex justify-center items-center neon-border rounded-full w-9 h-9 hover:scale-110 transition-all duration-300 user-avatar glass-morphism interactive-element"
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={MOCK_USER.avatarUrl} alt={MOCK_USER.name} />
                      <AvatarFallback>{getInitials(MOCK_USER.name)}</AvatarFallback>
                    </Avatar>
                  </Link>
                ) : (
                    <button
                      type="button"
                      onClick={() => setIsAuthenticated(true)}
                      aria-label="Sign in"
                      className="flex justify-center items-center neon-border rounded-full w-12 h-12 hover:scale-110 transition-all duration-300 user-avatar glass-morphism interactive-element"
                    >
                      <FiUser className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>
                  )}
              </div> */}
              <div className="hidden md:flex justify-center items-center">
                <Button onClick={openLogin} className={"cursor-pointer logo-bg font-bold"}>Sign In</Button>
              </div>



              <button
                type="button"
                aria-label="Toggle theme"
                onClick={toggleTheme}
                className="theme-toggle interactive-element"
              >
                <div className="z-10 absolute inset-0 flex justify-center items-center">
                  <FiSun
                    className={cn(
                      "opacity-100 dark:opacity-0 w-4 h-4 text-yellow-500 transition-opacity duration-300"

                    )}
                  />
                  <FiMoon
                    className={cn(
                      "absolute opacity-0 dark:opacity-100 w-4 h-4 text-gray-400 transition-opacity duration-300"

                    )}
                  />
                </div>
              </button>

              {/* mobile menu bar toggler */}
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={toggleMobileMenu}
                className={cn("lg:hidden hamburger interactive-element", mobileMenuOpen && "active")}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>

        {/* mobile menu  */}
        <div
          className={cn(
            "lg:hidden top-22 right-0 fixed neon-border rounded-2xl w-[min(20rem,100vw)] max-w-full h-[calc(100dvh-5rem)] overflow-x-hidden mobile-menu glass-morphism",
            mobileMenuOpen && "open"
          )}
        >
          <div className="space-y-6 mt-8 p-6">

            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="px-4 py-3 neon-border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-black dark:placeholder:text-gray-400 dark:text-white placeholder:text-gray-500 glass-morphism"
              />
              <button
                type="button"
                aria-label="Search"
                className="top-1/2 right-3 absolute -translate-y-1/2 transform"
              >
                <FiSearch className="w-5 h-5 text-gray-500" />
              </button>
            </div>


            <nav className="space-y-4">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-blue-500 dark:hover:text-[#7e71f4] dark:text-gray-300 text-lg nav-item glass-morphism"
                  >
                    <span className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </span>
                  </Link>
                );
              })}
            </nav>


            {
              /* {isAuthenticated ? (
              <>
                <div className="pt-6 border-gray-300 dark:border-gray-600 border-t">
                  <Link
                    href="/profile"
                    onClick={closeMobileMenu}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:scale-105 transition-all duration-300 glass-morphism"
                  >
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={MOCK_USER.avatarUrl} alt={MOCK_USER.name} />
                      <AvatarFallback className="text-[10px]">
                        {getInitials(MOCK_USER.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-gray-700 dark:text-gray-300">
                      My Profile
                    </span>
                  </Link>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAuthenticated(false);
                      closeMobileMenu();
                    }}
                    className="block px-4 py-3 rounded-lg w-full font-medium text-gray-700 hover:text-blue-500 dark:hover:text-[#7e71f4] dark:text-gray-300 text-lg text-left nav-item glass-morphism"
                  >
                    <span className="flex items-center space-x-3">
                      <FiLogOut className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      <span>Log Out</span>
                    </span>
                  </button>
                </div>
              </>
            ) :*/
              (
                <div className="pt-6 border-gray-300 dark:border-gray-600 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      closeMobileMenu();
                    }}
                    className="w-full btn-futuristic"
                  >
                    Sign In
                  </button>
                </div>
              )}
          </div>
        </div>
      </header >
    </>
  );
}

export default Navbar;