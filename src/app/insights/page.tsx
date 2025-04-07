import InsightMain from "@/components/insights/insights-main";

import { client } from "@/components/lib/sanityClient";
import { Suspense } from "react";

export async function getInsightData() {
  try {
    return await client.fetch(`*[_type == "page"][2]{
  _id,
  seo,
  sections[]{
    _key,
    _type,
    topHeading,
    heading,
    title,
    description,
    buttonText,
    buttonLink,
    "imageUrl": image.asset->url,
    insightSection[]->{
      _id,
      title,
      description,
      "slug": slug.current,
      category,
      tag->{_id, name},
      "imageUrl": image.asset->url
    },
    
         popularSearches[]->{
    _id,
    title,
    slug,

  }
  }
}
`);
  } catch (error) {
    console.error("❌ Error fetching Insight data:", error);
    return null;
  }
}

export default async function Page() {
  console.log("Fetching Insight data...");

  const insightData = await getInsightData();

  if (!insightData) {
    console.error("❌ No insight data found!");
    return <p>Error fetching data</p>;
  }

  return (
    <Suspense>
      <InsightMain insightData={insightData.sections} />
    </Suspense>
  );
}
