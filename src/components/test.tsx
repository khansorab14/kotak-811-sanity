// "use client";

// import React, { useEffect, useState } from "react";
// import AskQuestionAccordion from "./comman/ask-question-accordion";

// const PersonalLoanMain = () => {
//   const [heroBanner, setHeroBanner] = useState(null);
//   const [infoSection, setInfoSection] = useState(null);
//   const [, setDocumentSection] = useState(null);
//   const [, setAffordableSection] = useState(null);
//   const [askSection, setAskSection] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:1337/api/personal-loan?populate[heroBanner][populate][image][populate]=*&populate[heroBanner][populate][bulletPoints][populate]=*&populate[heroBanner][populate][button][populate]=*&populate[infoSection][populate][infoCard][populate][image][populate]=*&populate[stepperSection][populate][stepperDetails][populate][coverImage][populate]=*&populate[documentSection][populate][button][populate]=*&populate[documentSection][populate][documentDetails][populate][icon][populate]=*&populate[affordableSection][populate][image][populate]=*&populate[affordableSection][populate][info][populate]=*&populate[askSection][populate][questions][populate]=*&populate[askQuestions][populate]=*"
//         );
//         const result = await response.json();
//         console.log("Full API Response:", result.data);

//         if (!result?.data) {
//           console.error("❌ Missing required data.");
//           return;
//         }

//         const {
//           heroBanner,
//           infoSection,
//           documentSection,
//           affordableSection,
//           askSection,
//         } = result.data;

//         setHeroBanner(
//           heroBanner
//             ? {
//                 topHeading: heroBanner.topHeading || "",
//                 heading: heroBanner.heading || "",
//                 description: heroBanner.description || "",
//                 bulletPoints: heroBanner.bulletPoints || [],
//                 buttonText: heroBanner.button?.buttonLabel || "",
//                 buttonLink: heroBanner.button?.link || "#",
//                 videoUrl: heroBanner.image?.[0]?.image?.[0]?.url
//                   ? `http://localhost:1337${heroBanner.image[0].image[0].url}`
//                   : null,
//               }
//             : null
//         );

//         setInfoSection(
//           infoSection
//             ? {
//                 heading: infoSection.heading || "",
//                 infoCards: infoSection.infoCard || [],
//               }
//             : null
//         );

//         setDocumentSection(
//           documentSection
//             ? {
//                 heading: documentSection.heading || "",
//                 buttonText: documentSection?.button?.buttonLabel || "",
//                 buttonLink: documentSection?.button?.link || "#",
//                 documentDetails: documentSection?.documentDetails || [],
//               }
//             : null
//         );

//         setAffordableSection(
//           affordableSection
//             ? {
//                 title: affordableSection.title || "",
//                 image: affordableSection.image || {},
//                 info: affordableSection.info || [],
//               }
//             : null
//         );

//         // ✅ Correctly transform `askSection` and set it
//         if (askSection) {
//           setAskSection({
//             title: "Personal Loan Eligibility Checklist",
//             heading: askSection.heading || "",
//             accordions: askSection.questions.map((q) => ({
//               id: q.id,
//               title: q.title,
//               description: q.description
//                 .map((desc) => desc.description)
//                 .join("<br/>"),
//             })),
//           });
//         }
//       } catch (error) {
//         console.error("❌ Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   if (!heroBanner || !infoSection) return <p>Loading...</p>;

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="relative w-full h-[600px] flex items-center justify-center text-center">
//         {heroBanner.videoUrl && (
//           <video
//             autoPlay
//             loop
//             muted
//             playsInline
//             className="absolute top-0 left-0 w-full h-full object-cover"
//           >
//             <source src={heroBanner.videoUrl} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         )}

//         {/* Overlay */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="px-6 max-w-2xl text-black">
//             <h3 className="text-lg text-red-500 font-semibold uppercase">
//               {heroBanner.topHeading}
//             </h3>
//             <h1 className="text-4xl font-bold mt-2">{heroBanner.heading}</h1>
//             <p className="text-lg mt-4">{heroBanner.description}</p>

//             {/* Bullet Points */}
//             {heroBanner.bulletPoints.length > 0 && (
//               <ul className="mt-4 flex flex-wrap justify-center gap-3 text-lg">
//                 {heroBanner.bulletPoints.map((point, index) => (
//                   <li key={index} className="flex items-center px-4 py-2">
//                     ✅ {point.description}
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {/* CTA Button */}
//             {heroBanner.buttonText && (
//               <a
//                 href={heroBanner.buttonLink}
//                 className="mt-6 inline-block bg-blue-500 px-6 text-white py-3 rounded-lg text-lg hover:bg-blue-700 transition"
//               >
//                 {heroBanner.buttonText}
//               </a>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* Ask Section (Accordion) */}
//       {askSection && <AskQuestionAccordion askQuestions={askSection} />}
//     </div>
//   );
// };

// export default PersonalLoanMain;
