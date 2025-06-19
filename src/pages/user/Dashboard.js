import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Schola₹Shopy"}>
      <div className="px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Sidebar */}
          <div className="md:w-1/4 w-full">
            <UserMenu />
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 w-full">
            <div className="bg-white shadow-md rounded-lg p-6 max-w-xl">
              <h3 className="text-lg font-semibold mb-2">{auth?.user?.name}</h3>
              <h3 className="text-gray-700 mb-1">{auth?.user?.email}</h3>
              <h3 className="text-gray-600">{auth?.user?.address}</h3>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
