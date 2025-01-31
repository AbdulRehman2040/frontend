"use client";

import React, { useState, useEffect, JSX } from "react";
import {
  FaTachometerAlt,
  FaBars,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { MdClose, MdPeople, MdOutlineManageAccounts, MdDashboard } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";

interface SidebarProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string; // Add activeTab to props
}

interface SubItem {
  label: string;
  tab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setActiveTab, activeTab }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [tenantOpen, setTenantOpen] = useState(false);
  const [landlordOpen, setLandlordOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Automatically close sidebar when activeTab changes
  useEffect(() => {
    setIsOpen(false); // Close sidebar whenever a tab is opened
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(true); // Open sidebar on desktop
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClick = () => {
      if (isMobile) {
        setIsOpen(false);
        setTenantOpen(false);
        setLandlordOpen(false);
      }
    };

    document.querySelectorAll(".sidebar-link").forEach((link) => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      document.querySelectorAll(".sidebar-link").forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, [isMobile]);

  return (
    <div
      className={`h-screen bg-[#b4a483] text-white transition-all fixed left-0 top-0 z-50 p-4 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        {isOpen && <h1 className="text-lg font-bold">Admin Panel</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-xl ml-3  "
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isOpen ? <MdClose /> : <FaBars />}
        </button>
      </div>

      <nav className="flex flex-col gap-4">
        <SidebarItem
          icon={<MdDashboard />}
          label="Dashboard"
          onClick={() => setActiveTab("dashboard")}
          isOpen={isOpen}
        />

        <DropdownItem
          icon={<MdPeople />} // Attractive icon for Tenants
          label="Tenant"
          isOpen={isOpen}
          isExpanded={tenantOpen}
          setExpanded={setTenantOpen}
          subItems={[
            { label: "Manage Tenants", tab: "sellers" },
            { label: "In-Active Tenants", tab: "propertyStatusSeller" },
          ]}
          setActiveTab={setActiveTab}
        />

        <DropdownItem
          icon={<RiUserSettingsLine />} // Attractive icon for Landlords
          label="Landlords"
          isOpen={isOpen}
          isExpanded={landlordOpen}
          setExpanded={setLandlordOpen}
          subItems={[
            { label: "Manage Landlords", tab: "buyers" },
            { label: "In-Active Landlords", tab: "propertyStatusBuyer" },
          ]}
          setActiveTab={setActiveTab}
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

const DropdownItem: React.FC<{
  icon: JSX.Element;
  label: string;
  isOpen: boolean;
  isExpanded: boolean;
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  subItems: SubItem[];
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}> = ({ icon, label, isOpen, isExpanded, setExpanded, subItems, setActiveTab }) => {
  return (
    <div>
      <button
        className="flex items-center gap-4 p-3 rounded-lg  hover:bg-white hover:text-black transition-all w-full"
        onClick={() => setExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={label}
      >
        {icon}
        {isOpen && <span>{label}</span>}
        {isOpen && (isExpanded ? <FaChevronDown /> : <FaChevronRight />)}
      </button>
      {isExpanded && (
        <div className="ml-6 flex flex-col gap-2 mt-2 transition-all duration-300">
          {subItems.map((item) => (
            <SidebarItem
              key={item.tab}
              icon={icon}
              label={item.label}
              onClick={() => setActiveTab(item.tab)}
              isOpen={isOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;