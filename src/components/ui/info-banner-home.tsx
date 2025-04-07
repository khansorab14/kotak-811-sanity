"use client";

import Image from "next/image";

interface InfoBannerProps {
  title: string;
  description: string;
  imageUrl?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundSize?: "full" | "half";
  backgroundPosition?: "left" | "right";
  textContainerPosition?: "left" | "right";
  textColor?: string;
  imageStyle?: string;
}

const InfoBanner: React.FC<InfoBannerProps> = ({
  title,
  description,
  imageUrl,
  buttonText,
  buttonLink,
  backgroundSize = "full",
  backgroundPosition = "left",
  textContainerPosition = "right",
  textColor = "text-black",
  imageStyle = "rounded-lg",
}) => {
  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-between ${
        backgroundSize === "half" ? "lg:h-[500px]" : "lg:h-[600px]"
      } p-6 lg:p-12 bg-gray-100`}
    >
      {/* Text Content */}
      <div
        className={`w-full lg:w-1/2 ${
          textContainerPosition === "left" ? "order-1" : "order-2"
        } p-6`}
      >
        <h2 className={`text-2xl lg:text-4xl font-bold ${textColor}`}>
          {title}
        </h2>
        <p className="text-lg mt-4">{description}</p>
        {buttonText && buttonLink && (
          <a
            href={buttonLink}
            className="mt-6 inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
          >
            {buttonText}
          </a>
        )}
      </div>

      {/* Image Section */}
      <div
        className={`w-full lg:w-1/2 ${
          backgroundPosition === "left" ? "order-1" : "order-2"
        } flex justify-center`}
      >
        {imageUrl && (
          <Image
            unoptimized
            src={imageUrl}
            alt={title}
            width={500}
            height={300}
            className={`${imageStyle} object-cover`}
          />
        )}
      </div>
    </div>
  );
};

export default InfoBanner;
