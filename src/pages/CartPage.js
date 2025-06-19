import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * (item.quantity || 1);
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = (pid, delta) => {
    const updatedCart = cart
      .map((item) => {
        if (item._id === pid) {
          const newQty = (item.quantity || 1) + delta;
          return newQty <= 0 ? null : { ...item, quantity: newQty };
        }
        return item;
      })
      .filter(Boolean);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleStripeCheckout = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/product/payment",
        { cart },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      const stripe = await loadStripe("pk_test_51RaE2W4NTa7mzuyraDxT3w3sPcvrd2OepQQIkwELHJHanAIQu1gliogdUCsLz1qH65HZtJzZGWfKN1at1r1fyXUV00sdhXei6j");
      await stripe.redirectToCheckout({ sessionId: data.id });
      setLoading(false);
    } catch (error) {
      console.error("Stripe checkout error:", error);
      toast.error("Payment failed");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-center text-2xl font-bold bg-gray-100 py-3 mb-2 rounded">
          {`Namaste ${auth?.token && auth?.user?.name}`}
        </h1>
        <h2 className="text-center text-lg mb-6">
          {cart?.length
            ? `You Have ${cart.length} item(s) in your cart ${auth?.token ? "" : " - please login to checkout"}`
            : "Your Cart Is Empty"}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart?.map((p) => (
              <div key={p._id} className="flex flex-col md:flex-row bg-white shadow-md rounded-md p-4">
                <div className="md:w-1/3">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
                <div className="md:w-2/3 md:pl-6 mt-3 md:mt-0 space-y-2">
                  <p className="font-semibold text-lg">{p.name}</p>
                  <p className="text-gray-600">{p.description.substring(0, 30)}...</p>
                  <p className="text-gray-700 font-medium">Price: ₹{p.price}</p>

                  <div className="flex items-center">
                    <span className="mr-2">Quantity:</span>
                    <button
                      className="px-2 py-1 bg-gray-300 rounded text-sm font-bold"
                      onClick={() => updateQuantity(p._id, -1)}
                    >
                      −
                    </button>
                    <span className="px-3">{p.quantity || 1}</span>
                    <button
                      className="px-2 py-1 bg-gray-300 rounded text-sm font-bold"
                      onClick={() => updateQuantity(p._id, 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="bg-white shadow-lg rounded-md p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Cart Summary</h2>
            <p className="text-sm text-gray-500">Total | Checkout | Payment</p>
            <hr className="my-3" />
            <h4 className="text-lg font-bold mb-4">Total : {totalPrice()} </h4>

            {auth?.user?.address ? (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700">Current Address</h4>
                <h5 className="text-gray-600">{auth?.user?.address}</h5>
                <button
                  className="mt-2 px-4 py-1 border border-yellow-500 text-yellow-600 rounded hover:bg-yellow-100"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="mb-4">
                {auth?.token ? (
                  <button
                    className="px-4 py-1 border border-yellow-500 text-yellow-600 rounded hover:bg-yellow-100"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Add Address to Proceed
                  </button>
                ) : (
                  <button
                    className="px-4 py-1 border border-yellow-500 text-yellow-600 rounded hover:bg-yellow-100"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}

            {cart?.length > 0 && (
              <button
                className={`w-full py-2 px-4 rounded text-white ${
                  loading || !auth?.user?.address
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={handleStripeCheckout}
                disabled={loading || !auth?.user?.address}
              >
                {loading ? "Processing..." : "Proceed to Payment"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
