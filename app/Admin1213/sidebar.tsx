"use client";

import React, { JSX, useState } from "react";
import {
  FaTachometerAlt,
  FaUserTie,
  FaUsers,
  FaBuilding,
  FaHandshake,
  FaBars,
  FaChevronDown,
  FaChevronRight
} from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface SidebarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [buyerOpen, setBuyerOpen] = useState(false);
  const [sellerOpen, setSellerOpen] = useState(false);

  return (
    <div className={`h-screen bg-black text-white ${isOpen ? "w-64" : "w-20"} transition-all duration-300  p-4 fixed left-0 top-0`}> 
      {/* Sidebar Header */}
      <div className="flex items-center justify-between mb-8 mt-20 xl:mt-28">
        {isOpen && <h1 className="text-lg font-bold">Admin Panel</h1>}
        <button onClick={() => setIsOpen(!isOpen)} className="text-xl">
          {isOpen ? <MdClose /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <nav className="flex flex-col gap-4 ">
        <SidebarItem icon={<FaTachometerAlt />} label="Dashboard" onClick={() => setActiveTab("dashboard")} isOpen={isOpen} />
        
        {/* Buyers Section */}
        <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-all" onClick={() => setBuyerOpen(!buyerOpen)}>
          <FaUsers />
          {isOpen && <span>Buyers</span>}
          {isOpen && (buyerOpen ? <FaChevronDown /> : <FaChevronRight />)}
        </button>
        {buyerOpen && (
          <div className="ml-6 flex flex-col gap-2">
            <SidebarItem icon={<FaUsers />} label="Manage Buyers" onClick={() => setActiveTab("buyers")} isOpen={isOpen} />
            <SidebarItem icon={<FaHandshake />} label="Status of Buyers" onClick={() => setActiveTab("propertyStatusBuyer")} isOpen={isOpen} />
          </div>
        )}
        
        {/* Sellers Section */}
        <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-all" onClick={() => setSellerOpen(!sellerOpen)}>
          <FaUserTie />
          {isOpen && <span>Tenant</span>}
          {isOpen && (sellerOpen ? <FaChevronDown /> : <FaChevronRight />)}
        </button>
        {sellerOpen && (
          <div className="ml-6 flex flex-col gap-2">
            <SidebarItem icon={<FaUserTie />} label="Manage Tenant" onClick={() => setActiveTab("sellers")} isOpen={isOpen} />
            <SidebarItem icon={<FaBuilding />} label="Status of Sellers" onClick={() => setActiveTab("propertyStatusSeller")} isOpen={isOpen} />
          </div>
        )}
      </nav>
    </div>
  );
};

const SidebarItem: React.FC<{ icon: JSX.Element; label: string; onClick: () => void; isOpen: boolean }> = ({ icon, label, onClick, isOpen }) => {
  return (
    <button
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-all"
      onClick={onClick}
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </button>
  );
};

export default Sidebar;
