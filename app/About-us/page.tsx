import Image from "next/image"; // For displaying images in Next.js
import About from "./about";
import Responsivenav from "../components/navbar/responsivenav";

const AboutUs = () => {
  return (

    <div className='min-h-screen flex flex-col bg-white'>
    <div className="sticky top-0 z-50 bg-gray-100 shadow-md">
       <Responsivenav />
     </div>
      {/* Scrollable Content */}
           <div className="">
             <div className="mt-22">
               <About />
             </div>
           </div>
     </div>
  );
};

export default AboutUs;
