import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Carousel from "./Carausal";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Spinner2 from "../components/spinner2";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();
  const [loading2, setLoading2] = useState(false);

  // It takes elements from categories[1] to categories[5]
  const citrus = categories.slice(1, 6);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading2(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setProducts(data.products);
      setLoading2(false);
    } catch (error) {
      setLoading2(false);
      console.log(error);
    }
  };



  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };


  const handleAddToCart = (p) => {
  const existingProductIndex = cart.findIndex((item) => item._id === p._id);
  let updatedCart = [];

  if (existingProductIndex !== -1) {
    updatedCart = cart.map((item, index) =>
      index === existingProductIndex
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
  } else {
    updatedCart = [...cart, { ...p, quantity: 1 }];
  }

  setCart(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  toast.success(`${p.name} added to cart`);
 };

  return (
    <Layout title="All Products - Best Offers">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Filters */}
        <div className="md:w-1/6 w-full bg-white p-4 rounded shadow">
          <h5 className="text-lg font-semibold text-center mb-2">Filter By Category</h5>
          <div className="flex flex-col gap-2">
            {citrus?.map((c) => (
              <label key={c._id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                />
                <span className="ml-2 text-sm">{c.name}</span>
              </label>
            ))}
          </div>

          <h5 className="text-lg font-semibold text-center mt-4 mb-2">Filter By Price</h5>
          <div className="flex flex-col gap-2">
            {Prices?.map((p) => (
              <label key={p._id} className="inline-flex items-center">
                <input
                  type="radio"
                  name="price"
                  className="form-radio h-4 w-4 text-indigo-600"
                  onChange={() => setRadio(p.array)}
                />
                <span className="ml-2 text-sm">{p.name}</span>
              </label>
            ))}
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gray-700 text-white text-sm py-1 px-3 rounded hover:bg-gray-800"
          >
            RESET FILTERS
          </button>
        </div>

        {/* Products */}
        <div className="md:w-4/5 w-full">
          <Carousel />

          {loading2 ? (
            <Spinner2 />
          ) : products.length > 0 ? (
            <div className="flex flex-wrap gap-2 ml-2  mt-4">
              {products?.map((p) => (
                <div key={p._id} className="w-72 border rounded shadow-md p-3">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-[60%] object-cover rounded"
                  />
                  <div className="mt-3">
                    <h5 className="text-lg font-semibold">{p.name}</h5>
                    <p className="text-sm text-gray-600">{p.description.substring(0, 30)}...</p>
                    <p className="font-semibold mt-1">₹ {p.price}</p>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600"
                      >
                        More Details
                      </button>
                      <button
                        onClick={() => handleAddToCart(p)}
                        className="bg-gray-800 text-white text-sm px-3 py-1 rounded hover:bg-gray-900"
                      >
                       ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 text-center text-gray-500">No Data Found...</div>
          )}

          {products && products.length < total && (
            <div className="flex justify-center mt-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
