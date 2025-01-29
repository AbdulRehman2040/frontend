"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import House from "../../public/7768.jpg";
import LogoSection from "../components/logo/logo";

const About = () => {
  return (
    <section className="container mx-auto px-6 sm:px-12 lg:px-16 mt-[6rem] py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* About Content - Text Left */}
        <motion.div
          className="text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
            About Us
          </h1>
          <p className="text-gray-600 text-lg text-justify leading-relaxed">
            <span className="font-bold">At L.B.</span> Real Estate, we are passionate about simplifying the property journey for both landlords and tenants. With over 15 years of experience in the property market, we have built a reputation for delivering exceptional referral services that connect landlords with reliable tenants and businesses with the perfect commercial spaces.
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
            <br/>
            <br/>
            Our Values
Professionalism: We deliver expert advice and reliable service with integrity.
Personalisation: Tailored solutions to meet your specific property needs.
Customer Success: We focus on delivering successful outcomes, building long-lasting relationships with our clients
          </p>
        </motion.div>

        {/* Image Section - Image Right */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            className="rounded-xl shadow-lg"
            src={House}
            alt="Property"
            width={500}
            height={350}
          />
        </motion.div>

      </div>
      <div className="border-b border-gray-400 mt-10"></div>
      <LogoSection/>
    </section>
  );
};

export default About;
