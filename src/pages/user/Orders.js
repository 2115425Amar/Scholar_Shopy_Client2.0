import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title="Your Orders">
      <div className="px-4 py-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Sidebar */}
          <div className="lg:w-1/4 w-full">
            <UserMenu />
          </div>

          {/* Orders */}
          <div className="lg:w-3/4 w-full">
            <h1 className="text-2xl font-semibold text-center mb-6">All Orders</h1>
            {orders.length > 0 ? (
              orders.map((o, i) => (
                <div key={o._id} className="border rounded-lg shadow-sm mb-6 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="text-left text-sm font-semibold px-4 py-2">#</th>
                        <th className="text-left text-sm font-semibold px-4 py-2">Status</th>
                        <th className="text-left text-sm font-semibold px-4 py-2">Buyer</th>
                        <th className="text-left text-sm font-semibold px-4 py-2">Date</th>
                        <th className="text-left text-sm font-semibold px-4 py-2">Payment</th>
                        <th className="text-left text-sm font-semibold px-4 py-2">Quantity</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2">{i + 1}</td>
                        <td className="px-4 py-2">{o?.status}</td>
                        <td className="px-4 py-2">{o?.buyer?.name}</td>
                        <td className="px-4 py-2">{moment(o?.createAt).fromNow()}</td>
                        <td className="px-4 py-2">{o?.payment.success ? "Success" : "Failed"}</td>
                        <td className="px-4 py-2">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Uncomment below block to show products in each order */}
                  {/* <div className="p-4">
                    {o?.products?.map((p, i) => (
                      <div key={p._id} className="flex items-center gap-4 mb-4 border rounded p-3">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="w-24 h-24 object-cover"
                        />
                        <div>
                          <p className="font-medium">{p.name}</p>
                          <p className="text-sm text-gray-600">{p.description.substring(0, 30)}...</p>
                          <p className="text-sm font-semibold">Price: ₹{p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div> */}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No orders found.</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
