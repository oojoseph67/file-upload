import React, { useState, useEffect } from "react";
import FileCard from "../components/fileCard";
import axios from "axios";

const url = "http://localhost:7000/api/v1";

const Home: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [allProduct, setAllProduct] = useState([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const uploadImage = e.target.files[0];
      // setImage(uploadImage);
      const formData = new FormData();
      formData.append("image", uploadImage);

      try {
        const response = await axios.post(`${url}/products/uploads`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const {
          data: {
            path2: { src },
          },
        } = response;
        setImage(src);
      } catch (error) {
        console.error(error);
        setImage(null);
        alert(error);
        return;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !price || !image) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(`${url}/products`, {
        name,
        price,
        image,
      });

      fetchProducts();
      alert("Product created")
      setName("");
      setPrice("");
      setImage(null);
      console.log("Form submitted:", name, price, image);
    } catch (error) {
      console.error(error);
      setName("");
      setPrice("");
      setImage(null);
      alert(error);
      return;
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/products`);
      console.log("🚀 ~ fetchProducts ~ response:", response);
      const { data } = response;
      const { products, count } = data;
      setAllProduct(products);
    } catch (error) {
      console.log("🚀 ~ fetchProducts ~ error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h3>File Upload</h3>
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Name
          </label>
          <input
            autoComplete="off"
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">
            Price
          </label>
          <input
            autoComplete="off"
            type="number"
            id="price"
            value={price}
            onChange={handlePriceChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
      {/* File Card */}
      <FileCard products={allProduct} />
    </div>
  );
};

export default Home;
