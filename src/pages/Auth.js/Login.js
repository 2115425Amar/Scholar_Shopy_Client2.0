import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { CiFaceSmile } from "react-icons/ci";
import Lottie from "lottie-react";
import ContactAnimation from "../../assets/JSON/contactus.json";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/Login`, {
        email,
        password,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    }
  };

  return (
    <Layout title="Login">
      <section className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto p-4 w-full">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* Left Animation */}
            <div className="hidden md:flex items-center justify-center p-6">
              <Lottie animationData={ContactAnimation} />
            </div>

            {/* Right Form */}
            <div className="flex items-center justify-center p-6">
              <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center space-x-2 text-3xl font-bold text-gray-800">
                    <CiFaceSmile className="text-orange-500" />
                    <span>Welcome Back</span>
                  </div>

                  <h5 className="text-gray-600 text-sm tracking-wide">
                    Sign into your account
                  </h5>

                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg transition duration-200"
                    >
                      Login
                    </button>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <NavLink to="/register" className="text-blue-600 hover:underline">
                      Register
                    </NavLink>
                  </p>

                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <a href="#!" className="hover:underline">
                      Terms of use
                    </a>
                    <NavLink to="/Policy" className="hover:underline">
                      Privacy policy
                    </NavLink>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
