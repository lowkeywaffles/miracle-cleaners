import type { Metadata, Viewport } from "next";
import { Mulish, Sora } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LangProvider } from "@/lib/i18n";
import strings from "@/content/strings.json";
import "./globals.css";

const f0 = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["500", "600", "700", "800"] });
const f1 = Mulish({ variable: "--font-mulish", subsets: ["latin"] });

const EN = strings.en as Record<string, string>;
const ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%2363d3e6'/%3E%3Cstop offset='.5' stop-color='%23a98bf5'/%3E%3Cstop offset='1' stop-color='%23f59bd0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='16' fill='%23173a4a'/%3E%3Ccircle cx='32' cy='32' r='18' fill='none' stroke='url(%23g)' stroke-width='5'/%3E%3Ccircle cx='25' cy='25' r='4' fill='%23fff'/%3E%3C/svg%3E";

export const metadata: Metadata = {
  title: EN.title.replace(/&amp;/g, "&"),
  description: EN.desc,
  icons: { icon: ICON },
};
export const viewport: Viewport = { themeColor: "#173a4a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${f0.variable} ${f1.variable}`}>
      <body className="min-h-dvh leading-relaxed">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LangProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
