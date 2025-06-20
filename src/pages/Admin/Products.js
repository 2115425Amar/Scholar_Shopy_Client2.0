import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      setProducts(data.products);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <AdminMenu />
          </div>

          {/* Main content */}
          <div className="md:w-3/4">
            <h1 className="text-2xl font-bold text-center mb-6">All Products List</h1>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/product/${p.slug}`}
                  className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%]"
                >
                  <div className="bg-white border rounded-lg shadow hover:shadow-lg transition-all duration-300">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="p-4 h-40 overflow-hidden">
                      <h5 className="text-lg font-semibold truncate">{p.name}</h5>
                      <p className="text-sm text-gray-600 mt-2">
                        {p.description?.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
