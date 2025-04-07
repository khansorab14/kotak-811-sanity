"use client";
import React from "react";

type InfoBannerHomeProps = {
  title?: string;
  description?: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundSize?: "full" | "half";
  backgroundPosition?: "left" | "right";
  textContainerPosition?: "left" | "right";
  textColor?: string;
  bgHeight?: string;
};

const InfoBannerHome: React.FC<InfoBannerHomeProps> = ({
  title = "",
  description = "",
  imageUrl = "",
  buttonText,
  buttonLink,
  backgroundSize = "full",
  backgroundPosition = "left",
  textContainerPosition = "left",
  textColor = "text-black",
  bgHeight = "h-screen",
}) => {
  return (
    <section className={`relative w-full ${bgHeight} flex items-center py-12`}>
      <div
        className={`w-full flex ${
          backgroundSize === "half" ? "md:flex-row" : "flex-col"
        } ${backgroundPosition === "right" ? "md:flex-row-reverse" : ""}`}
      >
        {/* Background Image */}
        {imageUrl && (
          <div
            className={`absolute inset-0 ${
              backgroundSize === "half" ? "w-1/2" : "w-full"
            } ${bgHeight}`}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}

        {/* Text Content */}
        <div
          className={`relative z-10 p-6 md:p-12 max-w-lg text-left ${
            backgroundSize === "half" ? "w-1/2" : "w-full"
          } ${
            textContainerPosition === "left" ? "md:mr-auto" : "md:ml-auto"
          } ${textColor}`}
        >
          {title && <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>}
          {description && (
            <p className="mt-3 text-lg md:text-xl">{description}</p>
          )}

          {buttonText && buttonLink && (
            <a
              href={buttonLink}
              role="button"
              aria-label={buttonText}
              onClick={(e) => {
                if (buttonLink === "#") {
                  e.preventDefault();
                  alert("Button link is not set!");
                }
              }}
              className="mt-4 inline-block bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {buttonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default InfoBannerHome;
