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
  title: "HTX Bồn Bồn Minh Duy",
  description: "Khám phá các sản phẩm nông nghiệp địa phương chất lượng cao từ hợp tác xã BB Minh Duy. Hỗ trợ nông dân và tìm kiếm trực tuyến dễ dàng.",
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
