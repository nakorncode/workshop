import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Workshop by NakornCode",
  description: "A comprehensive guide to building applications with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 p-4 font-sans">
        {children}
      </body>
    </html>
  )
}
