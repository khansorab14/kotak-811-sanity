"use client";
import HomeBanner from "@/components/home/home-banner";
import CardBanner from "@/components/ui/card-banner";
import DownloadSection from "@/components/ui/download-section";

import { useEffect, useState } from "react";

import InfoBanner from "../ui/info-banner-home";
import InfoSimpleBanner from "../ui/info-simple-banner";
import AskQuestionAccordion from "../comman/ask-question-accordion";
import ActiveMoneyAccordion from "../active-money/activemoney-accordion";

const BusinessMain = () => {
  const [askQuestions, setAskQuestions] = useState(null);
  const [infoBanner, setInfoBanner] = useState(null);
  const [heroData, setHeroData] = useState(null);
  const [infoCard, setInfoCard] = useState(null);
  const [detailBanner, setDetailBanner] = useState([]);
  const [cardBanner, setCardBanner] = useState<any[]>([]);
  const [simpleBanner, setSimpleBanner] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/business?populate[heroBanner][populate][image][populate]=*&populate[heroBanner][populate][button][populate]=*&populate[infoCard][populate][image][populate]=*&populate[detailBanner][populate][coverImage][populate]=*&populate[detailBanner][populate][button][populate]=*&populate[infoBanner][populate][coverImage][populate]=*&populate[infoBanner][populate][button][populate]=*&populate[askQuestions][populate][accordions][populate][accordionImage][populate]=*"
        );
        const result = await response.json();

        if (result?.data) {
          console.log("API Response (Hero Data):", result.data);
          setHeroData(result.data.heroBanner);
          setInfoCard(result.data.infoCard);
          setDetailBanner(result.data.infoBanner || []);
          setSimpleBanner(result.data.detailBanner);
          //   setAccordionBanner(result.data.accordionBanner);

          setAskQuestions(result.data.askQuestions);
          setInfoBanner(result.data.infoBanner);
          setCardBanner(result.data.cardInfoBanner || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Show loading state while data is not available
  if (!heroData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <HomeBanner data={heroData} infoCard={infoCard} />

      {/* Rendering each detail banner separately */}
      {detailBanner[0] && (
        <InfoBanner
          key={detailBanner[0].id}
          title={detailBanner[0].title}
          description={detailBanner[0].description}
          imageUrl={`http://localhost:1337${detailBanner[0]?.coverImage?.image?.[0]?.url}`}
          buttonText={detailBanner[0]?.button?.buttonLabel}
          buttonLink={detailBanner[0]?.button?.link}
          backgroundSize="half"
          backgroundPosition="right"
          textContainerPosition="left"
          textColor="text-black"
          imageStyle="rounded"
        />
      )}

      {detailBanner[1] && (
        <InfoBanner
          key={detailBanner[1].id}
          title={detailBanner[1].title}
          description={detailBanner[1].description}
          imageUrl={`http://localhost:1337${detailBanner[1]?.coverImage?.image?.[0]?.url}`}
          buttonText={detailBanner[1]?.button?.buttonLabel}
          buttonLink={detailBanner[1]?.button?.link}
          backgroundSize="half"
          backgroundPosition="left"
          textContainerPosition="right"
          textColor="text-black"
          imageStyle="rounded"
        />
      )}

      {detailBanner[2] && (
        <InfoBanner
          key={detailBanner[2].id}
          title={detailBanner[2].title}
          description={detailBanner[2].description}
          imageUrl={`http://localhost:1337${detailBanner[2]?.coverImage?.image?.[0]?.url}`}
          buttonText={detailBanner[2]?.button?.buttonLabel}
          buttonLink={detailBanner[2]?.button?.link}
          backgroundSize="half"
          backgroundPosition="right"
          textContainerPosition="left"
          textColor="text-black"
          imageStyle="rounded"
        />
      )}

      {/* Card Banners */}
      {cardBanner.length > 0 &&
        cardBanner.map((banner) => (
          <CardBanner
            key={banner.id}
            title={banner.heading}
            description={banner.description}
            buttonText={banner.ctxButton?.label}
            buttonLink={banner.ctxButton?.link || "#"}
            imageUrl={
              banner.image?.image?.[0]?.url
                ? `http://localhost:1337${banner.image.image[0].url}`
                : ""
            }
          />
        ))}
      {/* Active Money According  */}
      {/* <ActiveMoneyAccordion accordionBanner={accordionBanner} /> */}

      {/* Info Banner  */}
      <InfoSimpleBanner data={simpleBanner} />

      <AskQuestionAccordion askQuestions={askQuestions} />

      <DownloadSection />
    </>
  );
};

export default BusinessMain;
