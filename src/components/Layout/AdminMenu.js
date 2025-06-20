import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const linkClasses = ({ isActive }) =>
    `block w-full text-left px-4 py-2 rounded-md text-sm font-medium transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "bg-gray-100 hover:bg-blue-100 text-gray-800"
    }`;

  return (
    <div className="text-center">
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-4 border-b pb-2">Admin Panel</h4>

        <NavLink to="/dashboard/admin/create-category" className={linkClasses}>
          Create Category
        </NavLink>

        <NavLink to="/dashboard/admin/create-product" className={linkClasses}>
          Create Product
        </NavLink>

        <NavLink to="/dashboard/admin/products" className={linkClasses}>
          Products
        </NavLink>

        <NavLink to="/dashboard/admin/orders" className={linkClasses}>
          Orders
        </NavLink>

        {/* 
        <NavLink to="/dashboard/admin/users" className={linkClasses}>
          Users
        </NavLink> 
        */}
      </div>
    </div>
  );
};

export default AdminMenu;
