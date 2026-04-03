import Script from "next/script";

export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Maa Sharda Distributors",
    description:
      "Solar panel installation and subsidy support across Yamunanagar, Ambala, Karnal and Kurukshetra",
    telephone: "+919355570048",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yamunanagar",
      addressRegion: "Haryana",
      addressCountry: "IN",
    },
    openingHours: "Mo-Sa 09:00-19:00",
    priceRange: "RsRs",
    areaServed: ["Yamunanagar", "Ambala", "Karnal", "Kurukshetra"],
    sameAs: [
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919355570048"}`,
    ],
  };

  return (
    <Script
      id="schema-local-business"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
