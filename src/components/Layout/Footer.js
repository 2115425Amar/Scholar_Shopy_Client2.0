import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#1a1a2e] text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo and Credit */}
        <div className="flex flex-col items-center">
          <img src="" alt="" className="w-24 mb-3" />
          <span className="text-sm text-gray-400">designedby©amargupta</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:scale-110 transition"
          >
            <i className="bi bi-facebook text-[30px]"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:scale-110 transition"
          >
            <i className="bi bi-twitter text-[30px]"></i>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:scale-110 transition"
          >
            <i className="bi bi-instagram text-[30px]"></i>
          </a>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col items-center gap-3">
          <Link to="/about">
            <button className="text-sm bg-gray-900 text-white px-4 py-2 rounded border border-blue-500 hover:bg-blue-600">
              About Schola₹Shopy
            </button>
          </Link>

          <Link to="/contact">
            <button className="text-sm bg-gray-900 text-white px-4 py-2 rounded border border-blue-500 hover:bg-blue-600">
              Contact Me for Admin Access
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
