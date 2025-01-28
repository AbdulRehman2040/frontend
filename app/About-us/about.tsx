"use client"
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import House from "../../public/7768.jpg";
import { FaBriefcase, FaHandshake, FaUserCheck } from "react-icons/fa";

const About = () => {
  return (
    <div className="container mx-auto px-6 sm:px-12 lg:px-16 mt-0 p-5 sm:mt-48 lg:mt-28 md:mt-28">
      <div className="grid grid-cols-12 items-center gap-8">
        {/* Image Section */}
        <motion.div
          className="col-span-12 lg:pr-10 mb-10 lg:mb-0 md:col-span-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            className="mx-auto rounded-xl shadow-md"
            src={House}
            alt="Loading..."
          />
        </motion.div>

        {/* About Content */}
        <motion.div
          className="col-span-12 md:col-span-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
           <h1 className="text-2xl lg:text-3xl font-bold text-center lg:text-left mb-4">
            About Us
          </h1>
          <p className="text-gray-600 text-lg text-justify leading-relaxed">
            <span className="font-bold">At L.B.</span> Real Estate, we are
            passionate about simplifying the property journey for both landlords
            and tenants. With over 15 years of experience in the property
            market, we have built a reputation for delivering exceptional
            referral services that connect landlords with reliable tenants and
            businesses with the perfect commercial spaces.
            <br />
            <br />
            We understand that finding the right property or tenant can be
            time-consuming and stressful, which is why our expert team is here
            to guide you every step of the way. Whether you're a landlord
            seeking dependable tenants or a business owner in search of prime
            commercial spaces, we offer tailored solutions that cater to your
            unique needs.
            <br />
            <br />
            Our services are built on trust, transparency, and customer
            satisfaction. We take the time to understand your requirements,
            providing personalised advice and targeted marketing strategies to
            ensure your property stands out to the right audience.
            <br />
            <br />
            With over 1,700 successful referrals and more than 2,400 happy
            clients, our track record speaks for itself. Our goal is
            simple—make your property journey effortless and rewarding. We pride
            ourselves on exceptional customer service, and we’re always here to
            provide the support and expertise you need.
          </p>
        </motion.div>
      </div>

      {/* Our Values Section */}
      <motion.div
        className="bg-white py-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Professionalism */}
            <motion.div
              className="flex flex-col items-center text-center space-y-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-14 h-14 flex items-center justify-center bg-red-100 rounded-full">
                <FaBriefcase className="text-red-500 text-2xl" />
              </div>
              <span className="text-lg text-gray-600">
                <strong>Professionalism</strong>: We deliver expert advice and
                reliable service with integrity.
              </span>
            </motion.div>

            {/* Customer Success */}
            <motion.div
              className="flex flex-col items-center text-center space-y-4 sm:col-span-2 lg:col-span-1"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-14 h-14 flex items-center justify-center bg-red-100 rounded-full">
                <FaHandshake className="text-red-500 text-2xl" />
              </div>
              <span className="text-lg text-gray-600">
                <strong>Customer Success</strong>: We focus on delivering
                successful outcomes and building long-lasting relationships with
                our clients.
              </span>
            </motion.div>

            {/* Personalisation */}
            <motion.div
              className="flex flex-col items-center text-center space-y-4"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-14 h-14 flex items-center justify-center bg-red-100 rounded-full">
                <FaUserCheck className="text-red-500 text-2xl" />
              </div>
              <span className="text-lg text-gray-600">
                <strong>Personalisation</strong>: Tailored solutions to meet
                your specific property needs.
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div className="border-b border-gray-300 mt-10"></div>
    </div>
  );
};

export default About;
