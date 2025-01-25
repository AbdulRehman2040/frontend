import Image from "next/image";
import React from "react";

// Sample URLs for the logos, replace these with your actual logo image paths or URLs.
const logos = [
  "/public/faceyb.jpg", 
  "/public/logo2.jpg", 
  "/public/logo3.jpg", 
  "/public/logo4.jpg", 
  "/public/logo5.jpg"
];

const LogoSection: React.FC = () => {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Your Property Advertised On All The Major Portals
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          We advertise all of our properties on the leading property portals giving your property maximum exposure.
        </p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-center items-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center">
              <Image
                src={logo}
                alt={`Logo ${index + 1}`}
                className="max-w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
