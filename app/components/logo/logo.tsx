import Image from 'next/image';
import React from 'react';
import logo1 from '../../../public/logo5.jpg';
import logo2 from '../../../public/l3.png';
import logo3 from '../../../public/l4.png';
import logo4 from '../../../public/l1.png';
import logo5 from '../../../public/l2.png';


function LogoSection() {
  return (
    <div className="mx-auto bg-white items-center mt-10">

     <h1>.</h1>
      <h1 className="text-3xl font-bold bg-white text-center mt-8">Our Partners.</h1>

      <div className="flex justify-center items-center mt-10 space-x-8">
        <Image src={logo1} width={200} height={150} alt="airbnb" className="hover:rounded-lg" />
        <Image src={logo2} width={200} height={150} alt="airbnb" className="hover:rounded-lg" />
        <Image src={logo3} width={200} height={150} alt="airbnb" className="hover:rounded-lg" />
        <Image src={logo4} width={200} height={150} alt="airbnb" className="hover:rounded-lg" />
        <Image src={logo5} width={200} height={150} alt="airbnb" className="hover:rounded-lg" />

        
      </div>
      <div className="border-b border-gray-400 mt-10"></div>
    </div>
  );
}

export default LogoSection;
