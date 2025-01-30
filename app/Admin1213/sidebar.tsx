"use client";

import React, { JSX, useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaUserTie,
  FaUsers,
  FaBuilding,
  FaHandshake,
  FaBars,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface SidebarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [buyerOpen, setBuyerOpen] = useState(false);
  const [sellerOpen, setSellerOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
        setBuyerOpen(false);
        setSellerOpen(false);
      }
    };

    const links = document.querySelectorAll('.sidebar-link');
    links.forEach(link => {
      link.addEventListener('click', handleRouteChange);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleRouteChange);
      });
    };
  }, []);

  return (
    <div
      className={`h-screen overflow-hidden  bg-black text-white transition-all duration-300 p-4 fixed left-0 top-0 z-50 ${
        isOpen ? "w-64" : "w-20"
      } ${window.innerWidth < 768 ? "" : "xl:mt-18 mt-20"}`}
    >
      <div className="flex items-center justify-between mb-8">
        {isOpen && <h1 className="text-lg font-bold">Admin Panel</h1>}
        <button onClick={() => setIsOpen(!isOpen)} className="text-xl">
          {isOpen ? <MdClose /> : <FaBars />}
        </button>
      </div>

      <nav className="flex flex-col gap-4">
        <SidebarItem
          icon={<FaTachometerAlt />}
          label="Dashboard"
          onClick={() => { setActiveTab("dashboard"); setIsOpen(false); }}
          isOpen={isOpen}
          className="sidebar-link"
        />
         <button
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-all"
          onClick={() => setSellerOpen(!sellerOpen)}
        >
          <FaUserTie />
          {isOpen && <span>Tenant</span>}
          {isOpen && (sellerOpen ? <FaChevronDown /> : <FaChevronRight />)}
        </button>
        {sellerOpen && (
          <div className="ml-6 flex flex-col gap-2">
            <SidebarItem
              icon={<FaUserTie />}
              label="Manage Tenants"
              onClick={() => { setActiveTab("sellers"); setIsOpen(false); }}
              isOpen={isOpen}
              className="sidebar-link"
            />
            <SidebarItem
              icon={<FaBuilding />}
              label="In-Active Tenants"
              onClick={() => { setActiveTab("propertyStatusSeller"); setIsOpen(false); }}
              isOpen={isOpen}
              className="sidebar-link"
            />
          </div>
        )}

        <button
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-all"
          onClick={() => setBuyerOpen(!buyerOpen)}
        >
          <FaUsers />
          {isOpen && <span>Landlords</span>}
          {isOpen && (buyerOpen ? <FaChevronDown /> : <FaChevronRight />)}
        </button>
        {buyerOpen && (
          <div className="ml-6 flex flex-col gap-2">
            <SidebarItem
              icon={<FaUsers />}
              label="Manage Landlords"
              onClick={() => { setActiveTab("buyers"); setIsOpen(false); }}
              isOpen={isOpen}
              className="sidebar-link"
            />
            <SidebarItem
              icon={<FaHandshake />}
              label="In-Active Landlords"
              onClick={() => { setActiveTab("propertyStatusBuyer"); setIsOpen(false); }}
              isOpen={isOpen}
              className="sidebar-link"
            />
          </div>
        )}

       
      </nav>
    </div>
  );
};

const SidebarItem: React.FC<{
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  isOpen: boolean;
  className?: string;
}> = ({ icon, label, onClick, isOpen, className }) => {
  return (
    <button
      className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-all ${className || ""}`}
      onClick={onClick}
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </button>
  );
};

export default Sidebar;