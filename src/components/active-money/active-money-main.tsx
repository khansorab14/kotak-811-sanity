"use client";

import { useEffect, useState } from "react";
import HomeBanner from "@/components/home/home-banner";

import InfoBanner from "../ui/info-banner-home";
import InfoSimpleBanner from "../ui/info-simple-banner";

import ActiveMoneyAccordion from "./activemoney-accordion";

const ActiveMoneyMain = ({ sanityData }) => {
  // console.log("bgggg ActiveMoneyMain:", sanityData);
  const [accordionBanner, setAccordionBanner] = useState([]);

  const [infoBanner, setInfoBanner] = useState(null);
  const [heroData, setHeroData] = useState(null);
  const [infoCard, setInfoCard] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cardBanner, setCardBanner] = useState<any>([]);

  useEffect(() => {
    if (!sanityData || !sanityData.sections) {
      console.error("❌ sanityData or sections is undefined!");
      return;
    }

    console.log("✅ Received sections:", sanityData.sections);

    // Make sure sections array is long enough before accessing indexes
    if (sanityData.sections.length > 6) {
      console.log("indo simple :", sanityData.sections[6]);
      setInfoBanner(sanityData.sections[6]);
    } else {
      console.warn("⚠️ sanityData.sections[6] does not exist!");
    }

    if (sanityData.sections.length > 5) {
      setAccordionBanner(sanityData.sections[5]);
    } else {
      console.warn("⚠️ sanityData.sections[5] does not exist!");
    }

    if (sanityData.sections.length > 0) {
      setHeroData(sanityData.sections[0]);
    } else {
      console.warn("⚠️ sanityData.sections[0] does not exist!");
    }

    if (
      sanityData.sections.length > 1 &&
      sanityData.sections[1].cardInfoBanner
    ) {
      setInfoCard(sanityData.sections[1].cardInfoBanner);
    } else {
      console.warn("⚠️ sanityData.sections[1].cardInfoBanner does not exist!");
    }

    setCardBanner(sanityData.sections);
  }, [sanityData]);

  if (!heroData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <HomeBanner data={heroData} infoCard={infoCard} />

      <InfoBanner
        key={cardBanner[2].id}
        title={cardBanner[2].title}
        description={cardBanner[2].description}
        imageUrl={cardBanner[2].coverImage.asset.url}
        buttonText={cardBanner[2]?.button?.buttonLabel}
        buttonLink={cardBanner[2]?.button?.link}
        backgroundSize="half"
        backgroundPosition="right"
        textContainerPosition="left"
        textColor="text-black"
        imageStyle="rounded"
      />
      <InfoBanner
        key={cardBanner[3].id}
        title={cardBanner[3].title}
        description={cardBanner[3].description}
        imageUrl={cardBanner[3].coverImage.asset.url}
        buttonText={cardBanner[3]?.button?.buttonLabel}
        buttonLink={cardBanner[3]?.button?.link}
        backgroundSize="half"
        backgroundPosition="right"
        textContainerPosition="left"
        textColor="text-black"
        imageStyle="rounded"
      />
      <InfoBanner
        key={cardBanner[4].id}
        title={cardBanner[4].title}
        description={cardBanner[4].description}
        imageUrl={cardBanner[4].coverImage.asset.url}
        buttonText={cardBanner[4]?.button?.buttonLabel}
        buttonLink={cardBanner[4]?.button?.link}
        backgroundSize="half"
        backgroundPosition="right"
        textContainerPosition="right"
        textColor="text-black"
        imageStyle="rounded"
      />

      <ActiveMoneyAccordion accordionBanner={accordionBanner} />
      <InfoSimpleBanner data={infoBanner} />
      {/* <AskQuestionAccordion askQuestions={askQuestions} /> */}
    </>
  );
};

export default ActiveMoneyMain;
