import React from "react";

interface AdminPanelWrapperProps {
  Component: React.ComponentType<any>; // Type for a dynamic component
}

const AdminPanelWrapper: React.FC<AdminPanelWrapperProps> = ({ Component }) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <Component /> {/* Render the passed component here */}
    </div>
  );
};

export default AdminPanelWrapper;
