import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../styles/globals.css"
import "../styles/navbar.css"
import { cn } from "@/lib/utils";
import Navbar from "@/components/shared/Navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import { AuthModalProvider } from "@/providers/auth-modal-context";
import { SessionProvider } from "@/providers/session-context";
import { Toaster } from 'sonner';
import { AuthProvider } from "@/providers/AuthContext";

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


          <AuthProvider>
            <AuthModalProvider>
              <SessionProvider>

                <Navbar />
                {children}

              </SessionProvider>
            </AuthModalProvider>
          </AuthProvider>



        </ThemeProvider>

        {/* custom sonner toast style and color */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: 'w-full flex items-center gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg font-sans text-sm',
              success: 'bg-emerald-500/40 border-emerald-500/50 text-emerald-600',
              error: 'bg-rose-500/30 border-rose-500/50 text-rose-700',
              info: 'bg-blue-500/40 border-blue-500/50 text-blue-600',
            }
          }}
        />
      </body>
    </html >
  );
}
