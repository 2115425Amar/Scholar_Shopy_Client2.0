import React from 'react';
import Layout from '../components/Layout/Layout';

const Policy = () => {
  return (
    <Layout title="Privacy Policy">
      <div className="flex flex-col md:flex-row items-center justify-center min-h-[75vh] bg-gray-50 p-4 gap-6">
        
        {/* Left Side Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://plus.unsplash.com/premium_photo-1661494219926-352aca04bac1?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Privacy Illustration"
            className="rounded-lg w-full h-[370px] object-cover"
          />
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">Privacy Policy</h1>
          <hr className="border-b-2 border-gray-300 mb-4 w-24" />
          <p className="text-gray-600 mb-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum vel ipsa asperiores dolorum
            nesciunt vitae, cumque ut suscipit maiores in facilis, voluptatibus distinctio odit.
          </p>

          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <i className="fas fa-envelope text-blue-600"></i>
              <span>Email: example@example.com</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fas fa-phone text-green-600"></i>
              <span>Phone: +1 123 456 7890</span>
            </div>
            <div className="flex items-center gap-3">
              <i className="fas fa-headset text-purple-600"></i>
              <span>Customer Care: +1 987 654 3210</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
