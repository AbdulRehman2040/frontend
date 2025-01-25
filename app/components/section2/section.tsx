import React from "react";
import { FaBuilding, FaKey, FaBullhorn } from "react-icons/fa";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      id: 1,
      title: "Commercial Specialists",
      description:
        "Our property experts have extensive experience in commercial property. We'll guide you every step of the way to meet your specific needs.",
      icon: <FaBuilding className="w-12 h-12 text-white" />,
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-700",
    },
    {
      id: 2,
      title: "Property Management",
      description:
        "We’re ready to assist you with rental valuations, property management, and more to ensure peace of mind.",
      icon: <FaKey className="w-12 h-12 text-white" />,
      bgColor: "bg-gradient-to-r from-green-500 to-green-700",
    },
    {
      id: 3,
      title: "Powerful Marketing",
      description:
        "Maximize exposure with strategic advertising on top property portals, ensuring the best results for you.",
      icon: <FaBullhorn className="w-12 h-12 text-white" />,
      bgColor: "bg-gradient-to-r from-purple-500 to-purple-700",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-600 mb-12">
          We provide exceptional services to meet your property needs, ensuring
          efficiency and success every step of the way.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div
                className={`p-4 rounded-full ${feature.bgColor} mb-6 flex items-center justify-center`}
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="mt-4 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
