"use client"
import Responsivenav from "../components/navbar/responsivenav";
import ContactForm from "./contact";

import React from 'react'

const page = () => {
  return (
    <div><div className="min-h-screen flex flex-col bg-gray-300 ">
    {/* Fixed Navbar */}
    <div className="sticky top-0 z-50 bg-gray-100 shadow-md">
      <Responsivenav />
    </div>

    {/* Scrollable Content */}
    <div className="flex-grow p-4 bg-gray-300 mt-[6rem]">
      <div className="max-w-4xl mx-auto">
        <ContactForm />
      </div>
    </div>
  </div></div>
  )
}

export default page