import React from "react";
import { FaBuilding, FaKey, FaBullhorn } from "react-icons/fa";
import { motion } from "framer-motion";
import { MdOutlineRealEstateAgent } from "react-icons/md";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      id: 1,
      title: "Property Referral Experts",
      description:
        "Our team specialises in connecting you with the right property opportunities. Whether it's commercial or industrial, we guide you to the best matches for your specific needs.",
      icon: <FaBuilding className="w-12 h-12 text-white" />,
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-700",
    },
    {
      id: 2,
      title: "Targeted Marketing Reach",
      description:
        "Get your property noticed through strategic referrals across top property platforms, maximising exposure and connecting you with the right buyers or tenants.",
      icon: <FaKey className="w-12 h-12 text-white" />,
      bgColor: "bg-gradient-to-r from-green-500 to-green-700",
    },
    {
      id: 3,
      title: "Tenant Sourcing for Landlords",
      description:
        "We assist landlords in finding reliable tenants by providing expert referrals and property management solutions, ensuring your rental property is in good hands.",
      icon: <MdOutlineRealEstateAgent className="w-12 h-12 text-white" />,
      bgColor: "bg-gradient-to-r from-purple-500 to-purple-700",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <motion.div
        className="max-w-7xl mx-auto px-6 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Trigger animations on scroll
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
             Why Choose Us?
        </h2>
        <p className="text-lg text-gray-600 mb-12">
        We offer exceptional property referral services, ensuring a seamless process and successful outcomes at every stage.

        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                delay: index * 0.2, // Stagger effect for each card
                duration: 0.8,
                ease: "easeOut",
              }}
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
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
