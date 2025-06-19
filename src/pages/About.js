import React from "react";
import Layout from "../components/Layout/Layout";
import Lottie from "lottie-react";
import ContactAnimation from "../assets/JSON/about.json";
import Money from "../assets/JSON/money.json";
import RRR from "../assets/JSON/rrr.json";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Animation */}
            <div>
              <Lottie animationData={ContactAnimation} aria-label="Contact animation" />
            </div>

            {/* Right Content */}
            <div>
              <h1 className="text-3xl font-serif text-blue-600 mb-6">
                What is Schola₹Shopy?
              </h1>

              <ul className="text-gray-700 space-y-4 text-lg">
                <li>
                  ✅ Developed a second-hand buy-and-sell online platform tailored for college students.
                </li>
                <li>
                  ✅ Helps students utilize resources effectively while saving both costs and time.
                </li>
                <li>
                  ✅ Ensures a safe and trusted environment as the platform is exclusively available to college students.
                </li>
                <li>
                  ✅ Enables seamless connection between buyers and sellers to meet their needs efficiently.
                </li>
              </ul>

              {/* Highlights Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16">
                    <Lottie animationData={RRR} aria-label="Circular economy animation" />
                  </div>
                  <div className="mt-3">
                    <h3 className="text-lg font-semibold">
                      Supporting a Circular Economy
                    </h3>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-16">
                    <Lottie animationData={Money} aria-label="Money-saving animation" />
                  </div>
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold">
                      Saving Money for Students
                    </h3>
                  </div>
                </div>
              </div>

              <Link to="/home" aria-label="Go to home page">
                <button
                  className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
                  type="button"
                >
                  Go To Home Page
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
