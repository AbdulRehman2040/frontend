"use client";

import React, { useState, useEffect, JSX } from "react";
import { FaBars, FaChevronDown, FaChevronRight, FaSignOutAlt } from "react-icons/fa";
import { MdClose, MdPeople, MdDashboard, MdRadioButtonChecked } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";

interface SidebarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(true);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  // Handle tab click and close sidebar
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false); // Always close the sidebar
  };

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
      <nav className="flex flex-col gap-4 h-[calc(100vh-8rem)]">
        <SidebarItem
          icon={<MdDashboard />}
          label="Dashboard"
          onClick={() => handleTabClick("dashboard")}
          isOpen={isOpen}
        />

        <SidebarItem
          icon={<MdPeople />}
          label="Manage Tenants"
          onClick={() => handleTabClick("sellers")}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<MdPeople />}
          label="In-Active Tenants"
          onClick={() => handleTabClick("propertyStatusSeller")}
          isOpen={isOpen}
        />

        <SidebarItem
          icon={<RiUserSettingsLine />}
          label="Manage Landlords"
          onClick={() => handleTabClick("buyers")}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<RiUserSettingsLine />}
          label="In-Active Landlords"
          onClick={() => handleTabClick("propertyStatusBuyer")}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<MdRadioButtonChecked />}
          label="button"
          onClick={() => handleTabClick("matchbutton")}
          isOpen={isOpen}
        />
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <SidebarItem
          icon={<FaSignOutAlt />}
          label="Logout"
          onClick={handleLogout}
          isOpen={isOpen}
        />
      </div>
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
