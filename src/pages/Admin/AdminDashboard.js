import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="m-3 p-3">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/4">
            <AdminMenu />
          </div>

          <div className="md:w-3/4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
              <h3 className="text-lg font-semibold mb-2">
                Admin Name: {auth?.user?.name}
              </h3>
              <h3 className="text-lg font-semibold mb-2">
                Admin Email: {auth?.user?.email}
              </h3>
              <h3 className="text-lg font-semibold">
                Admin Contact: {auth?.user?.phone}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
