import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../styles/globals.css"
import "../styles/navbar.css"
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hotel Rose",
  description: "Experience the luxury of Hotel Rose",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        geistSans.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <head>
        <title>Hotel Rose</title>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="flex flex-col min-h-full">

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >

          <Navbar />
          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}
