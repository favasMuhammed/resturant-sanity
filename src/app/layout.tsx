import type { Metadata } from "next";
import "./globals.css";
import { getCafeInfo } from "@/sanity/api";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeWrapper from "@/components/ThemeWrapper";

export async function generateMetadata(): Promise<Metadata> {
  const cafeInfo = await getCafeInfo();
  return generatePageMetadata(cafeInfo);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className="font-sans antialiased"
        suppressHydrationWarning={true}
      >
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
