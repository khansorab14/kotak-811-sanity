// // lib/getSanityData.js
// import { client } from "./sanityClient";

// export async function getSanityData() {
//   try {
//     const home = `*[_type == "home"][0] {
//     heroBanner{
//       heading,
//       description,
//       topHeading,
//       buttonText,
//       buttonLink,
//       "image": image.image.asset->url
//     },
//     infoCard[]{
//       title,
//       description,
//       "image": image.asset->url
//     },
//     detailBanner[]{
//       title,
//       description,
//       "coverImage": coverImage.asset->url,
//       button
//     },
//     cardDetailBanner[]{
//       title,
//       description,
//       "image": image.asset->url,
//       ctxButton
//     },
//     download{
//       topheading,
//       heading,
//       "buttons": buttons[]{
//         buttonText,
//         buttonLink
//       }
//     },
//     seo{
//       metaTitle,
//       metaDescription,
//       metaKeywords,
//       "schema": schema.json
//     }
//   }`;
//     const activeMoney = `*[_type == "page"][0]{
//   _id,
//   seo,
//   sections[]{
//     _type,
//     _key,
//     topHeading,
//     heading,
//     title,
//     description,
//     buttonText,
//     "imageUrl": image.asset->url,
//      coverImage {
//         ..., // Ensures cover image inside loadingInfo is included
//         asset->{
//           _id,
//           url
//         }
//       },
//       loadingInfo[]{
//       title,
//       description,
//         "imageUrl": image.asset->url,
//      coverImage {
//            image{
//       asset->{
//         _id,
//         url
//       }
//     }
//       },},

//     cardInfoBanner[]{
//       _key,
//       description,
//       "imageUrl": image.asset->url
//     }
//   }
// }

// `;
//     const insight = `*[_type == "page"][2]{
//   _id,
//   seo,
//   sections[]{
//     _type,
//     _key,
//     topHeading,
//     heading,
//     title,
//     description,
//     buttonText,
//     "imageUrl": image.asset->url,
//      image {
//         ..., // Ensures cover image inside loadingInfo is included
//         asset->{
//           _id,
//           url
//         }
//       },
//       insightSection[]{
//       title,
//       description,
//       image{ asset->{
//           _id,
//           url
//         }}
//       },
//     popularSearches[]{
//       _key,
//       description,

//     }
//   }
// }`;

//     const insightData = await client.fetch(insight);
//     const homeData = await client.fetch(home);
//     const activeMoneyData = await client.fetch(activeMoney);

//     const data = { homeData, activeMoneyData, insightData };

//     console.log("🚀 Server-side Sanity Data:", data); // Logs in terminal (server-side)

//     return data;
//   } catch (error) {
//     console.error("❌ Error fetching Sanity data:", error);
//     return null;
//   }
// }
