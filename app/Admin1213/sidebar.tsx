"use client";

import React, { useState, useEffect, JSX } from "react";
import { FaBars, FaChevronDown, FaChevronRight } from "react-icons/fa";
import { MdClose, MdPeople, MdDashboard } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";

interface SidebarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string; // Add activeTab to props
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Automatically close sidebar when activeTab changes
  useEffect(() => {
    if (isMobile) setIsOpen(false); // Close sidebar on mobile when a tab is selected
  }, [activeTab, isMobile]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(true); // Open sidebar on desktop
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-screen bg-[#b4a483] text-white transition-all fixed left-0 top-0 z-50 p-4 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between mb-6">
        {isOpen && <h1 className="text-lg font-bold">Admin Panel</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl ml-3"
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <MdClose /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col gap-4">
        <SidebarItem
          icon={<MdDashboard />}
          label="Dashboard"
          onClick={() => setActiveTab("dashboard")}
          isOpen={isOpen}
        />

        {/* Tenant Section */}
        <SidebarItem
          icon={<MdPeople />}
          label="Manage Tenants"
          onClick={() => setActiveTab("sellers")}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<MdPeople />}
          label="In-Active Tenants"
          onClick={() => setActiveTab("propertyStatusSeller")}
          isOpen={isOpen}
        />

        {/* Landlord Section */}
        <SidebarItem
          icon={<RiUserSettingsLine />}
          label="Manage Landlords"
          onClick={() => setActiveTab("buyers")}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<RiUserSettingsLine />}
          label="In-Active Landlords"
          onClick={() => setActiveTab("propertyStatusBuyer")}
          isOpen={isOpen}
        />
      </nav>
    </div>
  );
};

const SidebarItem: React.FC<{
  icon: JSX.Element;
  label: string;
  onClick: () => void;
  isOpen: boolean;
}> = ({ icon, label, onClick, isOpen }) => {
  return (
    <button
      className="flex items-center gap-4 p-3 rounded-lg hover:bg-white hover:text-black transition-all sidebar-link"
      onClick={onClick}
      aria-label={label}
    >
      {icon}
      {isOpen && <span>{label}</span>}
    </button>
  );
};

export default Sidebar;