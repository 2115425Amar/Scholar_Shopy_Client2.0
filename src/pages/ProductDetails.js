import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
            alt={product.name}
            className="w-full h-[300px]  rounded shadow"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Product Details</h1>
          <h2 className="text-lg font-semibold mb-2">Name: <span className="font-normal">{product.name}</span></h2>
          <p className="text-gray-700 mb-2">Description: {product.description}</p>
          <p className="text-gray-700 mb-2">Price: ₹ {product.price}</p>
          <p className="text-gray-700 mb-4">Category: {product?.category?.name}</p>
          <button
            className="bg-gray-800 text-white px-5 py-2 rounded hover:bg-gray-700 transition"
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
              toast.success("Item Added to cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>

      <hr className="my-10" />

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Similar Products</h2>
        {relatedProducts.length < 1 ? (
          <p className="text-center text-gray-500">No Similar Products found</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {relatedProducts.map((p) => (
              <div
                key={p._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 "
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                  alt={p.name}
                  className="w-full h-[250px] object-cover rounded-t"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1">{p.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {p.description?.substring(0, 30)}...
                  </p>
                  <p className="text-sm font-medium mb-3">₹ {p.price}</p>
                  <button
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart", JSON.stringify([...cart, p]));
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
