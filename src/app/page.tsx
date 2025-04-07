import Navbar from "@/components/comman/navbar";
import Hero from "@/components/home/hero";

import { client } from "@/components/lib/sanityClient";
export async function getHomeData() {
  try {
    return await client.fetch(`*[_type == "home"][0] {
      heroBanner{
        heading,
        description,
        topHeading,
        buttonText,
        buttonLink,
        "image": image.image.asset->url
      },
      infoCard[]{
        title,
        description,
        "image": image.asset->url
      },
      detailBanner[]{
        title,
        description,
        "coverImage": coverImage.asset->url,
        button
      },
      cardDetailBanner[]{
        title,
        description,
        "image": image.asset->url,
        ctxButton
      },
      download{
        topheading,
        heading,
        "buttons": buttons[]{
          buttonText,
          buttonLink
        }
      },
      seo{
        metaTitle,
        metaDescription,
        metaKeywords,
        "schema": schema.json
      }
    }`);
  } catch (error) {
    console.error("❌ Error fetching Home data:", error);
    return null;
  }
}

export default async function Home() {
  console.log("Fetching Home data...");

  const homeData = await getHomeData();

  if (!homeData) {
    console.error("❌ No homeData received!");
    return <p>Error fetching data</p>;
  }

  return (
    <>
      <Navbar />
      <Hero hero={homeData} />
    </>
  );
}
