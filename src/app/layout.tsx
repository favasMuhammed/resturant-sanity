import type { Metadata } from "next";
import "./globals.css";
import { getCafeInfo } from "@/sanity/api";
import { generateMetadata as generatePageMetadata } from "@/lib/metadata";
import { generateLocalBusinessSchema } from "@/lib/structuredData";
// import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeWrapper from "@/components/ThemeWrapper";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export async function generateMetadata(): Promise<Metadata> {
  const cafeInfo = await getCafeInfo();
  return generatePageMetadata(cafeInfo);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cafeInfo = await getCafeInfo();
  const structuredData = generateLocalBusinessSchema(cafeInfo);

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className="font-sans antialiased"
        suppressHydrationWarning={true}
      >
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
