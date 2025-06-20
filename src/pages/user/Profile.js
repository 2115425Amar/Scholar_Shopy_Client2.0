import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Profile = () => {
  const [auth, setAuth] = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { email, name, phone, address } = auth?.user || {};
    setName(name || "");
    setEmail(email || "");
    setPhone(phone || "");
    setAddress(address || "");
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Your Profile"}>
      <div className="p-4 md:flex md:gap-6">
        {/* Sidebar */}
        <div className="md:w-1/4 w-full mb-6 md:mb-0">
          <UserMenu />
        </div>

        {/* Form Section */}
        <div className="md:w-3/4 w-full">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Edit Your Profile
            </h2>

            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full bg-gray-100 border border-gray-300 rounded-md p-2"
                value={email}
                disabled
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                minLength={6}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block font-medium mb-1">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="address" className="block font-medium mb-1">
                Address
              </label>
              <input
                id="address"
                type="text"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
