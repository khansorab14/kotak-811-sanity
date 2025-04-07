"use client";
import Image from "next/image";
import React from "react";

type CreditCardProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
};

const CardBanner: React.FC<CreditCardProps> = ({
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-black text-white rounded-2xl shadow-lg overflow-hidden w-[90%] max-w-[1150px] h-[600px] flex flex-col md:flex-row">
        {/* Left Section (Text) */}
        <div className="p-20 flex-1 flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-5">{title}</h2>
          <p className="text-lg mb-6">{description}</p>
          <a
            href={buttonLink}
            className="text-red-500 font-semibold text-lg  py-3 rounded-lg hover:text-white transition self-start"
          >
            {buttonText}
          </a>
        </div>

        {/* Right Section (Image) */}
        <div className="w-full md:w-1/2 h-full">
          <Image
            unoptimized
            src={imageUrl}
            alt="Card Image"
            width={450}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CardBanner;
