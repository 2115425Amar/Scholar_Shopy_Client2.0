import React from "react";
import { useSearch } from "../context/search";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Search = () => {
  const [values] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  return (
    <Layout title="Search results">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
          <h6 className="text-lg text-gray-600 mt-2">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {values?.results.map((p) => (
            <div
              className="bg-white rounded-lg shadow-md w-72"
              key={p._id}
            >
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h5 className="text-lg font-semibold">{p.name}</h5>
                <p className="text-sm text-gray-600 mt-1">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="text-md font-bold text-green-700 mt-2">₹ {p.price}</p>
                <div className="mt-4 flex flex-col gap-2">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                      toast.success("Item Added to cart");
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
