"use client";

import HomeBanner from "./home-banner";
import InfoBannerHome from "../comman/info-banner-card";
import CardBanner from "../ui/card-banner";

const Hero = ({ hero }) => {
  if (!hero) {
    console.error("❌ Hero data is missing!");
    return <p>No hero data available.</p>;
  }

  // Destructure only if hero exists
  const {
    heroBanner,
    infoCard = [],
    detailBanner = [],
    cardDetailBanner = [],
  } = hero;

  return (
    <>
      <HomeBanner
        data={heroBanner}
        infoCard={infoCard.map(({ imageUrl, ...rest }) => ({
          imageUrl,
          ...rest,
        }))}
      />

      {/* Render Info Banners */}
      {detailBanner.length > 0 &&
        detailBanner.map((item, index) => (
          <InfoBannerHome
            key={index}
            title={item.title}
            description={item.description}
            imageUrl={item.coverImage}
            buttonText={item?.button?.buttonLabel}
            buttonLink={item?.button?.link || "#"}
            backgroundSize={index === 2 ? "half" : "full"}
            backgroundPosition={index % 2 === 0 ? "left" : "right"}
            textContainerPosition={index % 2 === 0 ? "left" : "right"}
            textColor={index === 0 ? "text-white" : "text-black"}
          />
        ))}

      {/* Card Banner Section */}
      {cardDetailBanner?.map?.(
        ({ id, title, description, ctxButton, image }) => (
          <CardBanner
            key={id}
            title={title}
            description={description}
            buttonText={ctxButton?.label}
            buttonLink={ctxButton?.link || "#"}
            imageUrl={image}
          />
        )
      )}
    </>
  );
};

export default Hero;
