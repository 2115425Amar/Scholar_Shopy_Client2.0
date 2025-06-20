import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      if (photo) productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    const answer = window.prompt("Are you sure you want to delete this product?");
    if (!answer) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <AdminMenu />
          </div>

          <div className="md:w-3/4">
            <h1 className="text-2xl font-bold mb-6">Update Product</h1>

            <div className="space-y-4">
              <Select
                placeholder="Select a category"
                size="large"
                showSearch
                className="w-full"
                onChange={(value) => setCategory(value)}
                value={category?.name || category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* Upload image */}
              <label className="cursor-pointer block w-full border px-4 py-2 bg-gray-100 border-gray-300 rounded-md text-center">
                {photo ? photo.name : "Upload Image"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>

              {/* Image Preview */}
              <div className="text-center">
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : `${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`
                  }
                  alt="product_image"
                  className="h-48 mx-auto object-contain rounded"
                />
              </div>

              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="w-full border border-gray-300 rounded px-4 py-2"
                onChange={(e) => setName(e.target.value)}
              />

              <textarea
                value={description}
                placeholder="Write a description"
                className="w-full border border-gray-300 rounded px-4 py-2"
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                type="number"
                value={price}
                placeholder="Write a price"
                className="w-full border border-gray-300 rounded px-4 py-2"
                onChange={(e) => setPrice(e.target.value)}
              />

              <input
                type="number"
                value={quantity}
                placeholder="Write quantity"
                className="w-full border border-gray-300 rounded px-4 py-2"
                onChange={(e) => setQuantity(e.target.value)}
              />

              <Select
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="w-full"
                onChange={(value) => setShipping(value)}
                value={shipping ? "1" : "0"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>

              <div className="flex gap-4">
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
                >
                  Update Product
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
