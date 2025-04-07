import ActiveMoneyMain from "@/components/active-money/active-money-main";

import { client } from "@/components/lib/sanityClient";

export async function getActiveMoneyData() {
  try {
    return await client.fetch(`*[_type == "page"][0]{
      _id,
      seo,
      sections[]{
        _type,
        _key,
        topHeading,
        heading,
        title,
        description,
        buttonText,
        "imageUrl": image.asset->url, 
        coverImage {
          asset->{
            _id,
            url
          }
        },
        loadingInfo[]{
          title,
          description,
          "imageUrl": image.asset->url, 
          coverImage {
            image{
              asset->{
                _id,
                url
              }
            }
          }
        },
        cardInfoBanner[]{
          _key,
          description,
          "imageUrl": image.asset->url 
        }
      }
    }`);
  } catch (error) {
    console.error("❌ Error fetching Active Money data:", error);
    return null;
  }
}
export default async function Page() {
  console.log("Fetching Active Money data...");

  const activeMoneyData = await getActiveMoneyData();

  if (!activeMoneyData || !activeMoneyData.sections) {
    console.error("❌ Active Money data or sections is missing!");
    return <p>Error fetching data</p>;
  }

  return <ActiveMoneyMain sanityData={activeMoneyData} />;
}
