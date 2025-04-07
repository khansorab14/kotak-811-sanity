"use client";
import Image from "next/image";
import logo from "../../../public/kotak-logo.svg";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
export const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Image
            unoptimized
            width={100}
            height={100}
            src={logo}
            alt="Kotak811 Logo"
            className="h-8 mb-4"
          />
          <p className="text-gray-700">Home</p>
          <div className="flex space-x-4 mt-3">
            <FaFacebookF className="text-gray-600 text-xl" />
            <FaInstagram className="text-gray-600 text-xl" />
            <FaTwitter className="text-gray-600 text-xl" />
            <FaYoutube className="text-gray-600 text-xl" />
          </div>
        </div>
        <div className="text-gray-700">
          <p className="font-semibold">Need help?</p>
          <p>Connect with us through the below channels</p>
          <p className="font-bold mt-2">Call us on: 1860 266 0811</p>
          <button className="mt-3 flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg">
            <FaWhatsapp /> <span>Chat with us</span>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
          <div>
            <p className="font-semibold">Company</p>
            <p>About Us</p>
            <p>Media</p>
          </div>
          <div>
            <p className="font-semibold">Products</p>
            <p>Savings Account</p>
            <p>Zero Balance Digital</p>
          </div>
          <div>
            <p className="font-semibold">Fees & Charges</p>
            <p>Savings Account Fees</p>
            <p>811 Super Savings</p>
          </div>
          <div>
            <p className="font-semibold">FAQs</p>
            <p>Savings Account FAQs</p>
            <p>Zero Balance Account</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
