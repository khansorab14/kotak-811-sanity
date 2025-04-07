import { client } from "@/components/lib/sanityClient";

import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/components/lib/sanityImageBuilder";

const query = `
  *[_type == "insightSection" && slug.current == $slug][0]{
    title,
    description,
    tag->{name},
    slug,
    "imageUrl": image.asset->url
  }
`;

export default async function InsightDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  console.log("Fetching insight detail for slug:", slug);
  try {
    const insight = await client.fetch(query, { slug });

    if (!insight) {
      console.log("No insight found, showing 404");
      return notFound();
    }

    const { title, description, imageUrl, tag } = insight;
    console.log("Fetched descrip:", description);
    const components = {
      types: {
        image: ({ value }) => {
          const imageUrl = urlFor(value).width(800).url(); // Optional size
          const alt = value.alt || "Sanity Image";

          return (
            <div className="my-4">
              <Image
                src={imageUrl}
                alt={alt}
                width={800}
                height={600}
                className="rounded-lg"
                unoptimized
              />
            </div>
          );
        },
      },
      block: {
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mt-6 mb-2">{children}</h2>
        ),
        normal: ({ children }) => (
          <p className="text-base text-red-700 leading-relaxed">{children}</p>
        ),
      },
    };

    return (
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="max-w-xl w-full bg-white shadow-lg rounded-lg overflow-hidden p-6 mt-20">
          {imageUrl && (
            <div className="w-full h-64 relative mb-4">
              <Image
                alt="Insight Image"
                src={imageUrl}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
                unoptimized
              />
            </div>
          )}
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <div>
            <button className=" bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
              {tag?.name || "Uncategorized"}
            </button>
          </div>

          <div className="prose prose-lg mt-4">
            <PortableText value={description} components={components} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching Sanity insight:", error);
    return notFound();
  }
}
