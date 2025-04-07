"use client";
import React from "react";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const DownloadSection: React.FC = () => {
  return (
    <section className="bg-[#253844] h-[60vh] text-white py-16 px-6 flex flex-col justify-center items-center text-center">
      {/* Titles */}
      <div className="flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold">Download the App</h2>
        <h3 className="text-2xl md:text-3xl font-semibold mt-2">
          Get started with your digital bank
        </h3>
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {/* Google Play Button */}
        <a
          href="https://play.google.com/store/apps"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-black px-6 py-3 min-w-[200px] rounded-lg hover:bg-gray-800 transition justify-center"
        >
          <FaGooglePlay size={24} />
          <span className="font-semibold">Google Play</span>
        </a>

        {/* App Store Button */}
        <a
          href="https://www.apple.com/app-store/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-black px-6 py-3 min-w-[200px] rounded-lg hover:bg-gray-800 transition justify-center"
        >
          <FaApple size={24} />
          <span className="font-semibold">App Store</span>
        </a>
      </div>
    </section>
  );
};

export default DownloadSection;
