"use client";
import Image from "next/image";
import React from "react";

const InfoCard = ({ card }) => {
  // console.log("Info Card:", card);

  if (!card) return null;

  // Ensure the image URL is correctly extracted
  const imageUrl = card.image || card.imageUrl;

  return (
    <div className="p-7 min-h-full bg-gray-100 rounded-lg shadow-md flex flex-col items-start text-left">
      {imageUrl && (
        <Image
          unoptimized
          width={80}
          height={80}
          src={imageUrl}
          alt={card.title || "Info Card Image"}
          className="w-48 h-28  my-10"
        />
      )}
      <h3 className="text-2xl font-semibold">{card.title}</h3>
      <p className="text-black  mt-4">{card.description}</p>
    </div>
  );
};

export default InfoCard;
