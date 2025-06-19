import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';

const PagenotFound = () => {
  return (
    <Layout title="404 - Page Not Found">
      <div className="min-h-[70vh] flex flex-col justify-center items-center text-center bg-white px-4">
        <h1 className="text-7xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
          Oops! Page Not Found
        </h2>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PagenotFound;
