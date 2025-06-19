import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { IoCartOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  // close dropdowns on outside click
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown")) {
        setCategoryOpen(false);
        setUserDropdown(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Schola₹Shopy
          </Link>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-700 focus:outline-none"
          >
            <FaBars size={22} />
          </button>

          {/* Nav Items */}
          <ul className={`lg:flex lg:items-center lg:space-x-6 ${menuOpen ? "block" : "hidden"} absolute lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent px-6 lg:px-0 py-4 lg:py-0 space-y-4 lg:space-y-0`}>
            {/* Search */}
            <li className="w-full lg:w-auto">
              <SearchInput />
            </li>

            {/* Links */}
            <li>
              <NavLink to="/home" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </NavLink>
            </li>

            {/* Categories */}
            <li className="relative dropdown">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="text-gray-700 hover:text-blue-600 font-medium focus:outline-none"
              >
                Categories
              </button>
              {categoryOpen && (
                <ul className="absolute bg-white shadow rounded mt-2 w-48 z-50">
                  <li>
                    <Link to="/categories" className="block px-4 py-2 hover:bg-gray-100">
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/category/${c.slug}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            {/* Auth Links */}
            {!auth?.user ? (
              <>
                <li>
                  <NavLink to="/register" className="text-gray-700 hover:text-blue-600 font-medium">
                    Register
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="relative dropdown">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="text-gray-700 hover:text-blue-600 font-medium focus:outline-none"
                >
                  {auth?.user?.name}
                </button>
                {userDropdown && (
                  <ul className="absolute right-0 bg-white shadow rounded mt-2 w-48 z-50">
                    <li>
                      <NavLink
                        to={`/dashboard${auth?.user?.role === 1 ? "/admin" : "/user"}`}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 w-full text-left hover:bg-gray-100 text-gray-700"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            )}

            {/* Cart Icon */}
            <li>
              <Badge count={cart?.length} offset={[0, 0]} className="cursor-pointer">
                <NavLink to="/cart">
                  <IoCartOutline size={28} className="text-gray-700 hover:text-blue-600" />
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
