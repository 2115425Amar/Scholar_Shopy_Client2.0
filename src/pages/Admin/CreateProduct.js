import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <AdminMenu />
          </div>

          {/* Main Content */}
          <div className="md:w-3/4">
            <h1 className="text-2xl font-bold mb-6">Create Product</h1>

            <div className="space-y-4">
              {/* Category Dropdown */}
              <Select
                placeholder="Select a category"
                size="large"
                showSearch
                className="w-full"
                onChange={(value) => setCategory(value)}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              {/* Upload Image */}
              <div>
                <label className="cursor-pointer bg-gray-100 border border-gray-300 px-4 py-2 rounded-md w-full inline-block text-center">
                  {photo ? photo.name : "Upload Image"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* Image Preview */}
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_preview"
                    className="h-48 mx-auto rounded-md object-contain mt-2"
                  />
                </div>
              )}

              {/* Product Name */}
              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="w-full border border-gray-300 rounded px-4 py-2"
                onChange={(e) => setName(e.target.value)}
              />

              {/* Description */}
              <textarea
                value={description}
                placeholder="Write a description"
                className="w-full border border-gray-300 rounded px-4 py-2"
                onChange={(e) => setDescription(e.target.value)}
              />

              {/* Price */}
              <input
                type="number"
                value={price}
                placeholder="Write a price"
                className="w-full border border-gray-300 rounded px-4 py-2"
                onChange={(e) => setPrice(e.target.value)}
              />

              {/* Quantity */}
              <input
                type="number"
                value={quantity}
                placeholder="Write a quantity"
                className="w-full border border-gray-300 rounded px-4 py-2"
                onChange={(e) => setQuantity(e.target.value)}
              />

              {/* Shipping Select */}
              <Select
                placeholder="Select Shipping"
                size="large"
                className="w-full"
                onChange={(value) => setShipping(value)}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>

              {/* Submit Button */}
              <button
                onClick={handleCreate}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
