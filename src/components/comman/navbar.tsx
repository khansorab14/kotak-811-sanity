"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [navbarData, setNavbarData] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const response = await fetch(
          "http://localhost:1337/api/global?populate[navbar][populate][logo][populate]=*&populate[navbar][populate][pages][populate][dropDown][populate][cardImage][populate]=*&populate[navbar][populate][button][populate]=*"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch navbar data");
        }
        const data = await response.json();
        setNavbarData(data.data.navbar);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNavbarData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center px-6 py-3 border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" legacyBehavior>
            {navbarData?.logo && navbarData.logo[0]?.image[0]?.url && (
              <Image
                unoptimized
                src={`http://localhost:1337${navbarData.logo[0].image[0].url}`}
                alt={navbarData.logo[0].alt || "Logo"}
                width={99}
                height={26}
                className="h-8"
              />
            )}
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex text-black relative">
          {navbarData?.pages?.map((page) => (
            <li
              key={page.id}
              className="relative"
              onMouseEnter={() => setOpenDropdown(page.id)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <div className="px-4 py-4 hover:text-gray-100 rounded-md transition">
                <Link href={page.link || "#"} legacyBehavior>
                  <a className="block w-full h-full hover:text-gray-300 cursor-pointer transition duration-200">
                    {page.text}
                  </a>
                </Link>
              </div>

              {/* Full-width Dropdown */}
              {page.dropDown &&
                page.dropDown.length > 0 &&
                openDropdown === page.id && (
                  <div className="fixed left-0 h-[45vh] top-[70px] w-screen cursor-pointer bg-white shadow-lg py-4 z-30">
                    <div className="max-w-7xl mx-auto mt-3 flex items-center justify-evenly p-6">
                      {page.dropDown.map((item) => (
                        <Link
                          key={item.id}
                          href={item.routingLink || "#"}
                          legacyBehavior
                        >
                          <a className="flex items-center space-x-6 p-4 gap-3 rounded-lg w-[500px] hover:text-red-600 transition">
                            {/* Image on the Left */}
                            {item.cardImage?.image[0]?.url && (
                              <Image
                                unoptimized
                                src={`http://localhost:1337${item.cardImage.image[0].url}`}
                                alt={item.cardImage.alt || "Dropdown Image"}
                                width={150}
                                height={100}
                                className="rounded-lg w-[150px] h-auto object-cover"
                              />
                            )}

                            {/* Text on the Right */}
                            <div className="flex-1">
                              <p className="font-semibold text-xl">
                                {item.title}
                              </p>
                              <p className="text-lg text-gray-600 mt-2 leading-8">
                                {item.description}
                              </p>
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        {navbarData?.button && (
          <Link href={navbarData.button.link || "#"} legacyBehavior>
            <a className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              {navbarData.button.buttonLabel}
            </a>
          </Link>
        )}

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4 md:hidden">
          <ul className="flex flex-col space-y-2">
            {navbarData?.pages?.map((page) => (
              <li key={page.id}>
                <Link href={page.link || "#"} legacyBehavior>
                  <a className="block px-4 py-2 hover:bg-gray-100">
                    {page.text}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
