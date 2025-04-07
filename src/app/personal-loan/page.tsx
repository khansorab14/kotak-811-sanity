import PersonalLoanMain from "@/components/personal-loan/personal-loan-main";

export async function generateMetadata() {
  const response = await fetch(
    "http://localhost:1337/api/personal-loan?populate[seo][populate]=*"
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
      url: seo?.schema?.url?.[0],
      siteName: "Kotak 811",
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
      canonical: seo?.schema?.url?.[0],
    },
    schema: seo?.schema || {},
  };
}

export default function Page() {
  return <PersonalLoanMain />;
}
