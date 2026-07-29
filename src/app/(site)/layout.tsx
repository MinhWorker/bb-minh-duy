import type { ReactNode } from "react";
import { SiteShell } from "@/components/site/site-shell";
import { site } from "@/content/site";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: baseUrl,
    logo: `${baseUrl}/media/logo-minh-duy.png`,
    email: site.email,
    telephone: site.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Cà Mau",
      addressCountry: "VN",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
