import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "BRIDGE - Ecosystem Platform",
  description:
    "ศูนย์กลางเชื่อมโยงผู้ประกอบการด้านเทคโนโลยี Big Data และ AI ของประเทศไทย",
  openGraph: {
    title: "BRIDGE - Ecosystem Platform",
    description:
      "ศูนย์กลางเชื่อมโยงผู้ประกอบการด้านเทคโนโลยี Big Data และ AI ของประเทศไทย",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>
        <Providers>
          <div className="min-h-screen bg-background">
            <Navbar />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
