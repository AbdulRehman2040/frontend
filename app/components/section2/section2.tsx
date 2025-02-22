import React from "react";
import { BackgroundLines } from "../ui/background-lines";
import Link from "next/link";

export function BackgroundLinesDemo() {
  return (
    <div className="flex items-center justify-center w-full flex-col px-4  bg-gradient-to-b from-gray-900 to-gray-800 min-h-48   mx-auto"> 
      <h2 className=" text-center text-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight ">
      Looking for Tenants  <br /> or <br/> Needing a Property? 

      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg  text-neutral-400 text-center">
     We’re here to assist. Our friendly customer service team is dedicated
to helping landlords find reliable tenants with expert advice and locally tailored solutions to suit your property needs.
      </p>

    <div className="flex items-center gap-4 min-h-14">

    
      <Link href={"/Landlord-Online-form"}>
      
       <button className=" mt-10 px-8 py-2 rounded-lg  border-white hover:bg-white border-2 text-white hover:text-black font-bold ">
       Landlord
</button> 
</Link>

<Link href={"/Tenant-online-form"}>
      
      <button className=" mt-10 px-8 py-2 border-2 border-white rounded-lg hover:bg-transparent hover:text-white  bg-white text-black font-bold ">
      Tenants
</button> 
</Link>
</div>
    </div>
  );
}

