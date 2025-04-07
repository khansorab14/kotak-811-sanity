import Image from "next/image";

const fetchPageData = async (slug: string) => {
  try {
    const res = await fetch(
      `http://localhost:1337/api/dropdown-pages?filters[slug][$eq]=${slug}&populate[image][populate]=*&populate[button][populate]=*&populate[mirrorBanner][populate][coverImage][populate]=*`,
      { cache: "no-store" }
    );
    if (!res.ok) throw new Error("Failed to fetch data");

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching page data:", error);
    return null;
  }
};

const Page = async ({ params }: { params: { slug: string } }) => {
  const pageData = await fetchPageData(params.slug);

  if (!pageData || !pageData.data || pageData.data.length === 0) {
    return <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>;
  }

  const { title, description, image, button } = pageData.data[0];

  // Safely extract image URL
  const imageUrl = image?.image[0]?.url
    ? `http://localhost:1337${image.image[0].url}`
    : null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto mt-20 p-4">
      {/* Left Side: Text Content */}
      <div className="w-full md:w-1/2 text-left px-6">
        <h1 className="text-4xl font-bold text-gray-900">{title}</h1>
        <p className="text-lg text-gray-700 mt-2">{description}</p>

        {/* Button (if available) */}
        {button?.text && button?.url && (
          <a
            href={button.url}
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {button.text}
          </a>
        )}
      </div>

      {/* Right Side: Image */}
      {imageUrl && (
        <div className="w-full md:w-1/2 h-64 md:h-[400px] relative">
          <Image
            src={imageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
            unoptimized
          />
        </div>
      )}
    </div>
  );
};

export default Page;
