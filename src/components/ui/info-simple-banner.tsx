"use client";
import React from "react";

const InfoSimpleBanner = ({ data }) => {
  console.log(data, "soharaaggau");
  if (!data) return null;

  const { heading, description, buttonText, coverImage } = data;

  // Extract background image URL
  const bgImageUrl = coverImage?.image?.[0]?.url
    ? `http://localhost:1337${coverImage.image[0].url}`
    : "";

  return (
    <section
      className="relative flex flex-col h-[70vh] items-center justify-center text-center text-black py-20 px-6"
      style={{
        backgroundImage: `url(${bgImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-lg p-10 ">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          {heading}
        </h1>

        {/* Description (Optional) */}
        {description && (
          <p className="text-lg text-gray-700 mt-4">{description}</p>
        )}

        {/* Button (Optional) */}
        {buttonText?.buttonLabel && buttonText?.link && (
          <div className="flex justify-center mt-6">
            <a
              href={buttonText.link}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {buttonText.buttonLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default InfoSimpleBanner;
