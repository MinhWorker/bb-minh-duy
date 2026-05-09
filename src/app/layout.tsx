import type { Metadata } from "next";
import { Inter, Gwendolyn } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "vietnamese"],
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
    <html lang="vi">
      <body
        className={`${inter.variable} ${gwendolyn.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
