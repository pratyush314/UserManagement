import React from "react";

const Footer = ({ users, currentPage, totalPages }) => {
  return (
    <div className="hidden sm:block md:block mt-16 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-wrap justify-between items-center">
        <div className="text-center px-4 py-2">
          <p className="text-3xl font-bold text-indigo-600">{users.length}</p>
          <p className="text-gray-500">Users on this page</p>
        </div>
        <div className="text-center px-4 py-2">
          <p className="text-3xl font-bold text-indigo-600">{currentPage}</p>
          <p className="text-gray-500">Current page</p>
        </div>
        <div className="text-center px-4 py-2">
          <p className="text-3xl font-bold text-indigo-600">{totalPages}</p>
          <p className="text-gray-500">Total pages</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
