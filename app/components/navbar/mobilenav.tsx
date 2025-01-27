import React from 'react';
import Link from 'next/link';
import { CgClose } from 'react-icons/cg';
import { navlinks } from '@/constant/constant';

type Props = {
  shownav: boolean;
  closeNav: () => void;
};

const Mobilenav = ({ closeNav, shownav }: Props) => {
  const navOpen = shownav ? 'translate-x-0' : 'translate-x-[-100%]';

  return (
    <div>
      {/* Overlay */}
      <div
        className={`fixed ${navOpen} top-0 transform transition-all duration-500 z-[10000] left-0 right-0 bottom-0 bg-black opacity-70 w-full h-[100vh]`}
        onClick={closeNav} // Close the menu when clicking on the overlay
      />
      {/* Navigation Menu */}
      <div
        className={`text-black ${navOpen} fixed justify-center flex flex-col h-full transform transition-all duration-500 delay-300 w-[80%] sm:w-[60%] bg-gray-200 space-y-6 z-[100006]`}
      >
        {/* Nav Links */}
        {navlinks.map((link) => (
          <Link key={link.id} href={link.url}>
            <p
              className="nav__link text-black text-[20px] ml-12 border-b-[1.5] pb-2 border-white sm:text-[30px]"
              onClick={closeNav} // Close the menu when a link is clicked
            >
              {link.label}
            </p>
          </Link>
          
        ))}
        <div className=' items-center  '>
        <Link href={'/contact'}>
      <button
      onClick={closeNav}
       className={` text-center  ml-12  text-black font-bold text-[20px] transition-all duration-200 rounded-lg`}>
        Contact Us
      </button>
      </Link>
        </div>
         
        {/* Close Button */}
        <CgClose
          onClick={closeNav}
          className="absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Mobilenav;
