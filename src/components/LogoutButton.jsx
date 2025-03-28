import { LogOut } from "lucide-react";
import React from "react";

const LogoutButton = ({ handleLogout }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div></div>
      <button
        onClick={handleLogout}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 rounded-lg shadow-sm hover:bg-indigo-50 transition-colors border border-indigo-100"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default LogoutButton;
