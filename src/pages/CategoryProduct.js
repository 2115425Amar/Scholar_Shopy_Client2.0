import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);

  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold text-center mb-2">
          Category - {category?.name}
        </h2>
        <h4 className="text-center text-gray-600 mb-6">
          {products?.length} result{products.length !== 1 && "s"} found
        </h4>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((p) => (
            <div
              key={p._id}
              className="bg-white shadow-lg rounded-md overflow-hidden"
            >
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="text-sm text-gray-500">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="text-indigo-600 font-bold">₹ {p.price}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  <button
                    onClick={() => navigate(`/product/${p.slug}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    More Details
                  </button>
                  <button
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                    className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button Placeholder */}
        {/* <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-500"
            onClick={() => setPage(page + 1)}
          >
            Load More
          </button>
        </div> */}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
