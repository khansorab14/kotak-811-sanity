"use client";

import React, { useEffect, useState } from "react";
import AskQuestionAccordion from "../comman/ask-question-accordion";

const PersonalLoanMain = () => {
  interface HeroBanner {
    topHeading: string;
    heading: string;
    description: string;
    bulletPoints: Array<{ description: string }>;
    buttonText: string;
    buttonLink: string;
    videoUrl: string | null;
  }

  type AskSection = {
    heading: string;
    questions: {
      id: string;
      title: string;
      description: { description: string }[];
    }[];
  };

  interface ProcessedAskSection {
    title: string;
    heading: string;
    accordions: {
      id: string;
      title: string;
      description: string;
    }[];
  }

  interface InfoSection {
    heading: string;
    infoCards: Array<{
      id: string;
      title: string;
      description: string;
      image?: { image?: Array<{ url: string }>; alt?: string };
    }>;
  }

  const [heroBanner, setHeroBanner] = useState<HeroBanner | null>(null);
  const [infoSection, setInfoSection] = useState<InfoSection | null>(null);
  const [askSection, setAskSection] = useState<ProcessedAskSection | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/personal-loan?populate[heroBanner][populate][image][populate]=*&populate[heroBanner][populate][bulletPoints][populate]=*&populate[heroBanner][populate][button][populate]=*&populate[infoSection][populate][infoCard][populate][image][populate]=*&populate[stepperSection][populate][stepperDetails][populate][coverImage][populate]=*&populate[documentSection][populate][button][populate]=*&populate[documentSection][populate][documentDetails][populate][icon][populate]=*&populate[affordableSection][populate][image][populate]=*&populate[affordableSection][populate][info][populate]=*&populate[askSection][populate][questions][populate]=*&populate[askQuestions][populate]=*"
        );
        const result = await response.json();
        console.log("Full API Response:", result.data);

        const {
          heroBanner: heroData,
          infoSection: infoData,
          documentSection: documentData,
          affordableSection: affordableData,
          askSection: askData,
        } = result.data || {};

        if (!heroData || !infoData || !documentData || !affordableData) {
          console.error("❌ Missing required data.");
          return;
        }

        const videoUrl = heroData.image?.[0]?.image?.[0]?.url
          ? `http://localhost:1337${heroData.image[0].image[0].url}`
          : null;

        setHeroBanner({
          topHeading: heroData.topHeading || "",
          heading: heroData.heading || "",
          description: heroData.description || "",
          bulletPoints: heroData.bulletPoints || [],
          buttonText: heroData.button?.buttonLabel || "",
          buttonLink: heroData.button?.link || "#",
          videoUrl,
        });

        setInfoSection({
          heading: infoData.heading || "",
          infoCards: infoData.infoCard || [],
        });

        if (askData) {
          const typedSection = askData as AskSection;
          setAskSection({
            title: "Personal Loan Eligibility Checklist",
            heading: typedSection.heading || "",
            accordions: typedSection.questions.map((q) => ({
              id: q.id,
              title: q.title,
              description: q.description
                .map((desc) => desc.description)
                .join("<br/>"),
            })),
          });
        }

        // ✅ You fetched documentData and affordableData here — all good!
        // You can use them later if needed, or remove the fetch if truly unused.
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!heroBanner || !infoSection) return <p>Loading...</p>;

  return (
    <div>
      {/* Render other sections here like heroBanner, infoSection, etc. */}
      {askSection && <AskQuestionAccordion askQuestions={askSection} />}
    </div>
  );
};

export default PersonalLoanMain;
