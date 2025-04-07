"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AskQuestionAccordion from "../comman/ask-question-accordion";

const PersonalLoanMain = () => {
  const [heroBanner, setHeroBanner] = useState(null);
  const [infoSection, setInfoSection] = useState(null);
  const [documentSection, setDocumentSection] = useState(null);
  const [affordableSection, setAffordableSection] = useState(null);
  const [askSection, setAskSection] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/personal-loan?populate[heroBanner][populate][image][populate]=*&populate[heroBanner][populate][bulletPoints][populate]=*&populate[heroBanner][populate][button][populate]=*&populate[infoSection][populate][infoCard][populate][image][populate]=*&populate[stepperSection][populate][stepperDetails][populate][coverImage][populate]=*&populate[documentSection][populate][button][populate]=*&populate[documentSection][populate][documentDetails][populate][icon][populate]=*&populate[affordableSection][populate][image][populate]=*&populate[affordableSection][populate][info][populate]=*&populate[askSection][populate][questions][populate]=*&populate[askQuestions][populate]=*"
        );
        const result = await response.json();
        console.log("Full API Response:", result.data);

        if (
          !result?.data?.heroBanner ||
          !result?.data?.infoSection ||
          !result?.data?.documentSection ||
          !result?.data?.affordableSection // ✅ Added affordableSection check
        ) {
          console.error("❌ Missing required data.");
          return;
        }

        const heroData = result.data.heroBanner;
        const infoData = result.data.infoSection;
        const documentData = result.data.documentSection;
        const affordableData = result.data.affordableSection; // ✅ Extract affordableSection

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

        setAffordableSection({
          title: affordableData.title || "",
          image: affordableData.image || {},
          info: affordableData.info || [],
        });

        setInfoSection({
          heading: infoData.heading || "",
          infoCards: infoData.infoCard || [],
        });

        setDocumentSection({
          heading: documentData?.heading || "",
          buttonText: documentData?.button?.buttonLabel || "",
          buttonLink: documentData?.button?.link || "#",
          documentDetails: documentData?.documentDetails || [],
        });
        // ✅ Correctly transform `askSection` and set it
        if (askSection) {
          setAskSection({
            title: "Personal Loan Eligibility Checklist",
            heading: askSection.heading || "",
            accordions: askSection.questions.map((q) => ({
              id: q.id,
              title: q.title,
              description: q.description
                .map((desc) => desc.description)
                .join("<br/>"),
            })),
          });
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!heroBanner || !infoSection) return <p>Loading...</p>;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center text-center">
        {heroBanner.videoUrl && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src={heroBanner.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="px-6 max-w-2xl text-black">
            <h3 className="text-lg text-red-500 font-semibold uppercase">
              {heroBanner.topHeading}
            </h3>
            <h1 className="text-4xl font-bold mt-2">{heroBanner.heading}</h1>
            <p className="text-lg mt-4">{heroBanner.description}</p>

            {/* Bullet Points */}
            {heroBanner.bulletPoints.length > 0 && (
              <ul className="mt-4 flex flex-wrap justify-center gap-3 text-lg">
                {heroBanner.bulletPoints.map((point, index) => (
                  <li key={index} className="flex items-center px-4 py-2">
                    ✅ {point.description}
                  </li>
                ))}
              </ul>
            )}

            {/* CTA Button */}
            {heroBanner.buttonText && (
              <a
                href={heroBanner.buttonLink}
                className="mt-6 inline-block bg-blue-500 px-6 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition"
              >
                {heroBanner.buttonText}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-gray-700">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">{infoSection.heading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infoSection.infoCards.map((card) => (
              <div key={card.id} className="bg-white p-6 rounded-lg shadow-lg">
                {card.image?.image?.[0]?.url && (
                  <Image
                    unoptimized
                    width={80}
                    height={80}
                    src={`http://localhost:1337${card.image.image[0].url}`}
                    alt={card.image.alt || card.title}
                    className="w-20 h-20 mx-auto mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold">{card.title}</h3>
                <p className="text-gray-600 mt-2">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8">{documentSection.heading}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {documentSection.documentDetails.map((doc) => (
              <div
                key={doc.id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
              >
                {doc.icon?.image?.[0]?.url && (
                  <Image
                    unoptimized
                    width={80}
                    height={80}
                    src={`http://localhost:1337${doc.icon.image[0].url}`}
                    alt={doc.icon.alt || doc.title}
                    className="w-20 h-20 mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold">{doc.title}</h3>
                <p className="text-gray-600 mt-2">{doc.description}</p>
                <p
                  className="text-gray-600 mt-2"
                  dangerouslySetInnerHTML={{ __html: doc.content }}
                />
              </div>
            ))}
          </div>

          {documentSection.buttonText && (
            <a
              href={documentSection.buttonLink || "#"}
              className="mt-8 inline-block bg-blue-500 px-6 py-3 text-white rounded-lg text-lg hover:bg-blue-700 transition"
            >
              {documentSection.buttonText}
            </a>
          )}
        </div>
      </section>

      {/* affordable section */}
      {/* Affordable Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            {affordableSection.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Image */}
            <div className="flex bg-black/25 justify-center">
              {affordableSection.image?.image?.[0]?.url && (
                <Image
                  unoptimized
                  width={500}
                  height={472}
                  src={`http://localhost:1337${affordableSection.image.image[0].url}`}
                  alt={
                    affordableSection.image.alt || "Affordable Interest Rates"
                  }
                  className="w-full max-w-md rounded-lg shadow-lg"
                />
              )}
            </div>

            {/* Right Side - Information Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {affordableSection.info.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-2 font-medium">{item.line1}</p>
                  <p className="text-blue-500 text-lg font-bold">
                    {item.line2}
                  </p>
                  <p className="text-gray-500 mt-2">{item.line3}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Ask Section (Accordion) */}
      {askSection && <AskQuestionAccordion askQuestions={askSection} />}
    </div>
  );
};

export default PersonalLoanMain;
