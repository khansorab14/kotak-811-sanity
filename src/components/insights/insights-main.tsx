"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const InsightMain = ({ insightData }) => {
  console.log("InsightMain component rendered", insightData);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("category") || "All";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [visibleCount, setVisibleCount] = useState(3);
  const [categories, setCategories] = useState(["All"]);

  // Extracting Data
  const heroBanner = insightData.find((item) => item._type === "insightBanner");
  const insightSections = insightData.filter(
    (item) => item._type === "bannerInsight"
  );
  const addSection = insightData.find((item) => item._type === "addSection");
  // console.log("addSection", addSection);

  const popularSearches = insightData[3];
  // console.log("popularSearches", popularSearches);
  // **Get Unique Categories from All Sections**
  useEffect(() => {
    if (insightSections.length > 0) {
      const uniqueTags = new Set();

      insightSections.forEach((section) => {
        section.insightSection.forEach((item) => {
          if (item.tag?.name) {
            uniqueTags.add(item.tag.name);
          }
        });
      });

      setCategories(["All", ...Array.from(uniqueTags)]);
    }
  }, []);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const filteredSections = useMemo(() => {
    if (activeTab === "All") return insightSections.slice(0, visibleCount);
    return insightSections
      .map((section) => ({
        ...section,
        insightSection: section.insightSection.filter(
          (item) => item.tag?.name === activeTab
        ),
      }))
      .filter((section) => section.insightSection.length > 0);
  }, [activeTab, insightSections, visibleCount]);

  const handleTabChange = (category) => {
    setActiveTab(category);
    setVisibleCount(5);
    router.push(`/insights?category=${category}`, { scroll: false });
  };

  return (
    <section className="w-full">
      {/* Hero Banner */}
      {heroBanner && (
        <div className="relative w-full mt-24 h-[600px] flex items-center justify-between px-16 bg-gray-100">
          <div className="relative z-10 text-black max-w-lg">
            <h1 className="text-4xl sm:text-5xl font-bold">
              {heroBanner?.insightSection?.[0]?.title}
            </h1>
            <div className="mt-6">
              <Link
                href={"#"}
                className="bg-[#ff0049] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition"
              >
                {heroBanner?.buttonText}
              </Link>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 h-full w-1/3">
            <Image
              unoptimized
              height={600}
              width={400}
              src={heroBanner?.insightSection?.[0]?.imageUrl}
              alt="Insight Banner"
              className="h-full w-full object-cover rounded-l-lg shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="mt-12 px-16">
        <div className="flex space-x-6 overflow-x-auto border-b pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleTabChange(category)}
              className={`text-base font-semibold pb-2 ${
                activeTab === category
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-500"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Insights Section */}
      <div className="mt-6 px-16 flex flex-wrap gap-6">
        {filteredSections.length > 0 ? (
          filteredSections.map((section) =>
            section.insightSection.map((item, index) => {
              // console.log("Rendering item:", item.imageUrl);

              return (
                <div key={index} className="flex items-center space-x-6 p-10">
                  <div className="relative w-28 h-28">
                    <Image
                      unoptimized
                      src={item.imageUrl}
                      alt={"Untitled"}
                      width={112}
                      height={112}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div>
                    <div>
                      {" "}
                      <button
                        onClick={() => handleTabChange(item.tag?.name)}
                        className=" bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
                      >
                        {item.tag?.name || "Uncategorized"}
                      </button>
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">
                      <Link
                        href={`/insights/${item?.slug}`}
                        className="text-blue-500 hover:underline"
                      >
                        {item?.title || "Untitled"}
                      </Link>
                    </h2>

                    <h2 className="text-lg  text-gray-900">
                      Discover whether an e-wallet or credit card is best for
                      your shopping needs. Learn the pros and cons of each
                      method. Shop smartly with Kotak 811.
                    </h2>
                  </div>
                </div>
              );
            })
          )
        ) : (
          <p className="text-gray-600">
            No insights available for this category.
          </p>
        )}
      </div>

      {/* Add Section */}
      {addSection && (
        <div className="mt-12 px-16 text-center bg-[#ff0049] text-white py-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">{addSection?.heading}</h2>
          <Link
            href={addSection?.buttonLink || "#"}
            className="block mt-4 text-white font-semibold underline hover:text-gray-200 transition"
          >
            {addSection?.buttonLink}
          </Link>
          {addSection?.imageUrl && (
            <Image
              unoptimized
              src={addSection?.imageUrl}
              alt="Add Section Image"
              width={99}
              height={26}
              className="mt-4 mx-auto"
            />
          )}
        </div>
      )}
      {/* popular searches  */}

      <div className="w-1/3 mt-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          {popularSearches.heading}
        </h2>
        <ul className="mt-4 space-y-3">
          {popularSearches?.popularSearches?.map((search, index) => {
            return (
              <li key={index}>
                <button className="flex items-center justify-center bg-[#ff0049] w-full text-white font-semibold hover:bg-red-700 py-2 px-1 rounded-lg ">
                  <i className="fas fa-search"></i>
                  <Link
                    href={`/search/${search.title}`}
                    className="text-white hover:underline"
                  >
                    {search.title}
                  </Link>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default InsightMain;
