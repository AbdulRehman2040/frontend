import React from "react";
import { BackgroundLines } from "../ui/background-lines";
import Link from "next/link";

export function BackgroundLinesDemo() {
  return (
    <div className="flex items-center justify-center w-full flex-col px-4 mt-12 min-h-[50vh] sm:min-h-[40vh] lg:min-h-[75vh] md:min-h-[10vh]"> 
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900  dark:from-neutral-600 to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
      Buying or Selling?  <br /> We’re here to help.

      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg  text-neutral-400 text-center">
      Our friendly customer service team will help you along with your property buying or selling journey with relevant, expert advice and locally tailored information.
      </p>

      <Link href={"/Customer-online-form"}>
      
       <button className=" mt-10 px-8 py-2 rounded-lg hover:rounded-none bg-white text-black font-bold ">
  Get started
</button> 
</Link>
    </div>
  );
}
