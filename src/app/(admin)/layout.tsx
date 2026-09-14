import type { Metadata } from "next";
import type { JSX } from "react";
import { Inter, Roboto_Mono } from 'next/font/google';
import "../../styles/admin-global.css"
import { AdminSidebar } from "@/components/admin-page/sidebar";
import { ThemeProvider } from "next-themes";

// Primary UI Font
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Monospace font for data/numbers
export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Hotel Rose-Admin",
  description: "A calm, powerful command center for hotel operations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${robotoMono.variable} antialiased `}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <main className="flex min-h-screen w-full">
            <AdminSidebar />
            {children}
          </main>
        </ThemeProvider>
      </body>

    </html>
  );
}