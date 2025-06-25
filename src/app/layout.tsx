import type { Metadata } from "next";
import { Geist, Geist_Mono, Gwendolyn } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gwendolyn = Gwendolyn({
  variable: "--font-gwendolyn",
  weight: "400",
  subsets: ["vietnamese"],
})

export const metadata: Metadata = {
  title: "BB Minh Duy",
  description: "Trang web hợp tác xã giới thiệu sản phẩm địa phương",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gwendolyn.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
