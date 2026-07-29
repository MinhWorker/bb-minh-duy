import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://bonbonmd.com"),
  title: {
    default: "HTX Bồn Bồn Minh Duy · Cà Mau",
    template: "%s · HTX Bồn Bồn Minh Duy",
  },
  description: "Hợp tác xã tại Hưng Mỹ, Cà Mau, gắn với vùng nguyên liệu và các sản phẩm chế biến từ cây bồn bồn.",
  applicationName: "HTX Bồn Bồn Minh Duy",
  keywords: ["bồn bồn Cà Mau", "HTX Minh Duy", "dưa bồn bồn", "đặc sản Cà Mau"],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "HTX Bồn Bồn Minh Duy",
    title: "HTX Bồn Bồn Minh Duy · Cà Mau",
    description: "Sản phẩm và câu chuyện từ cây bồn bồn Cà Mau.",
    images: [{ url: "/media/hero-bon-bon.webp", width: 1452, height: 1083, alt: "Bồn bồn tươi trong rổ tre - HTX Bồn Bồn Minh Duy" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
