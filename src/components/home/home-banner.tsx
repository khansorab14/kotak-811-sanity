"use client";

import React from "react";
import InfoCard from "../ui/info-card"; // Ensure correct import path

const HomeBanner = ({ data, infoCard }) => {
  if (!data || !infoCard) return null;

  const { topHeading, heading, description, image } = data;
  // Destructure button

  const getImageUrl = (image) => {
    return image || ""; // ✅ Return the image directly (not an array in your case)
  };

  const imageUrl = getImageUrl(image); // ✅ Get the correct image URL
  return (
    <section className="relative  mb-52 bg-cover  bg-center text-black py-20 flex flex-col items-center">
      {/* Hero Section */}
      <div
        className="w-full h-[600px]  flex items-center justify-center bg-cover bg-center text-center p-10"
        style={{
          backgroundImage: `url(${getImageUrl(imageUrl)})`,
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-4xl p-10 rounded-xl">
          {topHeading && (
            <h4 className="text-xl font-medium text-red-600 tracking-wide">
              {topHeading}
            </h4>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 text-gray-900">
            {heading}
          </h1>
          <p className="text-lg text-gray-500 mt-4">{description}</p>

          <a
            href={data.buttonLink}
            className="inline-block text-lg mt-6 text-red-600 hover:underline"
          >
            {data.buttonText}
          </a>
          {/* ✅ Centered Button */}
          {data.button?.buttonText && data.button?.buttonLink && (
            <div className="flex justify-center mt-6">
              <a
                href={data.button?.buttonLink}
                className="bg-blue-600 text-white w-[200px] px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {data.button?.buttonText}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Info Card Section */}
      {/* Info Card Section */}
      <div className="absolute bottom-[-180px] flex flex-wrap justify-center gap-6 w-full px-6 z-20">
        {infoCard.map((card, index) => (
          <div
            key={card._key || index}
            className="flex-1 min-w-[250px] max-w-[300px] p-4"
          >
            <InfoCard card={card} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeBanner;
