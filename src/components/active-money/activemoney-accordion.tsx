"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const ActiveMoneyAccordion = ({ accordionBanner }) => {
  console.log("Accordion Banner:", accordionBanner);

  // ✅ Add default empty array fallback
  const { heading, loadingInfo = [] } = accordionBanner || {};

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto change index every 4 seconds
  useEffect(() => {
    if (loadingInfo.length) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % loadingInfo.length);
        setProgress(0);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [loadingInfo.length]);
  console.log(loadingInfo[0].coverImage.image.asset._ref, "iugipugdpiugiu");
  console.log("Loading Info:", loadingInfo);
  console.log("Active Image Object:", loadingInfo[activeIndex]?.coverImage);

  // Handle case where loadingInfo might be empty
  if (!loadingInfo.length) {
    return <p className="text-center text-gray-500">No content available</p>;
  }

  return (
    <section className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto py-12 px-6">
      <h2 className="text-5xl font-black mb-8 text-gray-900 text-center">
        {heading || "Default Heading"}
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        {/* Left Side: Dynamic Image */}
        {/* Left Side: Dynamic Image */}
        {loadingInfo[activeIndex]?.coverImage?.image?.asset?.url ? (
          <div className="w-[500px] h-[500px] md:w-[600px] md:h-[500px] relative overflow-hidden">
            <Image
              unoptimized
              src={loadingInfo[activeIndex]?.coverImage?.image?.asset?.url}
              alt={loadingInfo[activeIndex]?.coverImage?.alt || "FAQ Image"}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
        ) : (
          <div className="w-[500px] h-[500px] md:w-[600px] md:h-[500px] flex items-center justify-center bg-gray-200 rounded-2xl">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}

        {/* Right Side: Accordion */}
        <div className="w-[45%]">
          <div className="space-y-4">
            {loadingInfo.map((item, index) => (
              <div
                key={item.id || index} // ✅ Use index as fallback
                className="border-b-[1px] border-gray-300 relative"
              >
                <button
                  className="w-full flex justify-between items-center py-4 transition-all "
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="text-lg font-bold">
                    {item.title || "Untitled"}
                  </span>
                  <span
                    className={`text-2xl font-light ${
                      activeIndex === index ? "text-red-500" : "text-gray-500"
                    }`}
                  >
                    {activeIndex === index ? "+" : "-"}
                  </span>
                </button>

                {/* Show description if active */}
                {activeIndex === index && (
                  <div className=" py-4 text-gray-700">
                    {item.description || "No description available"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActiveMoneyAccordion;
