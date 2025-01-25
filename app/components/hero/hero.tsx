"use client";
import { HiLocationMarker } from "react-icons/hi";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import logo from "../../../public/hero-image.png";
import Image from "next/image";
const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-6 mt-20 ">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between ">
        {/* Left Side */}
        <div className="flex flex-col items-start space-y-8 lg:w-1/2">
          {/* Title */}
          <div className="relative">
            <div className="absolute w-16 h-16 bg-orange-400 rounded-full -top-4 -left-8 z-0 blur-lg"></div>
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 2, type: "ease-in" }}
              className="text-5xl lg:text-6xl font-bold leading-tight relative z-10"
            >
              Discover <br />
              Most Suitable <br />
              Property
            </motion.h1>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed">
            Find a variety of properties that suit you very easily. Forget all
            the difficulties in finding a residence for you.
          </p>

          {/* Search Bar */}
          {/* <div className="flex items-center w-full bg-white rounded-lg px-4 py-2 space-x-4">
            <HiLocationMarker className="text-blue-500 text-2xl" />
            <input
              type="text"
              placeholder="Search location..."
              className="w-full text-gray-700 outline-none border-none"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              Search
            </button>
          </div> */}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-6 w-full">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">
                <CountUp start={8800} end={9000} duration={4} />+
              </span>
              <span className="text-gray-300 text-sm">Premium Products</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">
                <CountUp start={1950} end={2000} duration={4} />+
              </span>
              <span className="text-gray-300 text-sm">Happy Customers</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold">
                <CountUp end={28} />+
              </span>
              <span className="text-gray-300 text-sm">Awards Won</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center">
          <motion.div
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 2, type: "ease-in" }}
            className="w-80 h-96 bg-gray-700 rounded-t-[10rem] overflow-hidden shadow-lg"
          >
            <Image
              src={logo}
              alt="Property"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
