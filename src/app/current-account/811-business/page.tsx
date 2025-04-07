import BusinessMain from "@/components/business/business-main";

export async function generateMetadata() {
  const response = await fetch(
    "http://localhost:1337/api/business?populate[seo][populate]=*"
  );
  const data = await response.json();
  const seo = data.data?.seo;

  return {
    title: seo?.metaTitle,
    description: seo?.metaDescription,
    keywords: seo?.metaKeywords,
    openGraph: {
      title: seo?.metaTitle,
      description: seo?.metaDescription,
      url: seo?.schema?.speakable?.url,
      siteName: seo?.schema?.name,
      images: [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.metaTitle,
      description: seo?.metaDescription,
      images: [],
    },
    alternates: {
      canonical: seo?.schema?.speakable?.url,
    },
    schema: seo?.schema || {},
  };
}

export default function Page() {
  return <BusinessMain />;
}
