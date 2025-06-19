import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import Lottie from "lottie-react";
import cont from '../assets/JSON/cont.json';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    reason: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('/api/v1/email/request-admin-access', formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error sending request', error);
      setError('There was an issue submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
            {/* Animation */}
            <div className="w-full lg:w-1/2">
              <Lottie animationData={cont} />
            </div>

            {/* Form */}
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Request Admin Access
              </h2>
              <p className="text-gray-600 mb-6">
                If you need admin privileges, please fill out the form below with the necessary details.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <input
                  type="text"
                  id="role"
                  placeholder="Your Role or Affiliation"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <textarea
                  id="reason"
                  rows="4"
                  placeholder="Describe why you need admin access"
                  required
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                ></textarea>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Submitting...' : 'Request Admin Access'}
                </button>

                {submitted && (
                  <p className="mt-3 text-green-600">
                    Your request has been submitted successfully!
                  </p>
                )}
                {error && (
                  <p className="mt-3 text-red-600">{error}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
