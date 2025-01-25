"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import AddSellerForm from './components/forms/AddSellerForm';
import AddBuyerForm from './components/forms/AddBuyerForm';
import SellerTable from './components/Tables/SellerTable';
import BuyerTable from './components/Tables/BuyerTable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MatchTable from './components/Tables/Matchtable';
import MatchesPage from './components/forms/match_find';
import MatchButton from './components/button/matchbutton';
import Hero from './components/hero/hero';
import FeaturesSection from './components/section2/section';
import { BackgroundLines } from './components/ui/background-lines';
import { BackgroundLinesDemo } from './components/section2/section2';
import LogoSection from './components/logo/logosec';


interface Seller {
  id: string;
  name: string;
  lastName: string;
  city: string;
  country: string;
  area: string;
}

interface Buyer {
  id: string;
  name: string;
  lastName: string;
  city: string;
  country: string;
  area: string;
}

export default function Home() {
  return(
     <div className="overflow-hidden relative bg-gradient-to-b from-gray-900 to-gray-800">
     
     <Hero/> 
     <FeaturesSection/>
     <BackgroundLinesDemo/>
     {/* <LogoSection/> */}
     {/* <AddBuyerForm/> 
     <AddSellerForm/>    */}
     <MatchButton/>
          {/* <MatchesPage/> */}
          
     </div>
  );
}
