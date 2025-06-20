import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div className="m-4 p-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <AdminMenu />
          </div>

          <div className="md:w-3/4">
            <h1 className="text-2xl font-bold text-center mb-6">All Orders</h1>

            {orders.length > 0 ? (
              orders.map((o, i) => (
                <div
                  className="border rounded-lg shadow-md mb-6 overflow-x-auto"
                  key={o._id}
                >
                  <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 font-medium">#</th>
                        <th className="px-4 py-2 font-medium">Status</th>
                        <th className="px-4 py-2 font-medium">Buyer</th>
                        <th className="px-4 py-2 font-medium">Date</th>
                        <th className="px-4 py-2 font-medium">Payment</th>
                        <th className="px-4 py-2 font-medium">Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-2">{i + 1}</td>
                        <td className="px-4 py-2">{o?.status}</td>
                        <td className="px-4 py-2">{o?.buyer?.name}</td>
                        <td className="px-4 py-2">
                          {moment(o?.createAt).fromNow()}
                        </td>
                        <td className="px-4 py-2">
                          {o?.payment?.success ? "Success" : "Failed"}
                        </td>
                        <td className="px-4 py-2">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Uncomment if you want to show products of each order */}
                  {/* <div className="p-4">
                    {o?.products?.map((p) => (
                      <div
                        className="flex items-start gap-4 border rounded-md p-3 mb-3"
                        key={p._id}
                      >
                        <div className="w-24 h-24">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{p.name}</p>
                          <p className="text-sm text-gray-600">
                            {p.description?.substring(0, 30)}...
                          </p>
                          <p className="text-sm">Price: ₹{p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No orders found.
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
