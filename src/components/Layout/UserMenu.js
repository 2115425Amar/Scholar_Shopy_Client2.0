import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center">
      <div className="bg-white rounded shadow p-4">
        <h4 className="text-lg font-semibold mb-4">Dashboard</h4>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/dashboard/user/profile"
            className={({ isActive }) =>
              `block px-4 py-2 rounded text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/user/orders"
            className={({ isActive }) =>
              `block px-4 py-2 rounded text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
