"use client"
import Footer from "../components/footer/footer";
import LogoSection from "../components/logo/logo";
import Responsivenav from "../components/navbar/responsivenav";
import ContactForm from "./contact";

import React from 'react'

const page = () => {
  return (
    <div><div className="min-h-screen flex flex-col bg-white ">
    {/* Fixed Navbar */}
    <div className="sticky top-0 z-50 bg-gray-100 shadow-md">
      <Responsivenav />
    </div>

    
    
    {/* Scrollable Content */}
    <div className="flex-grow p-4 bg-white mt-[6rem]">
    <div className="mt-6 mb-6 bg-gray-100 p-6 rounded-lg shadow-md text-center">
        {/* <h2 className="text-2xl font-semibold text-black">Contact Us</h2> */}
        <p className="mt-4 text-lg text-gray-700">
          Hearing from you is extremely important so that we can provide the best customer service possible. Feel free to contact us at any time about any subject using the form below or by emailing us directly:{" "}
          <a href="mailto:info@lbre.co.uk" className="text-blue-600 underline">
            info@lbre.co.uk
          </a>
        </p>
        <p className="mt-2 text-lg text-gray-700">
          Or call us on: <strong className="text-gray-900">0800 788 0542</strong>
        </p>
        <p className="mt-4 text-sm font-semibold text-gray-700">All feedback is welcomed.</p>
      </div>
      <div className="max-w-4xl mx-auto">
        <ContactForm />
      </div>
    

    </div>
  </div>
  <div className="border-b border-gray-400 mt-10"></div>
      <LogoSection/>
      <Footer/>
  </div>
  )
}

export default page