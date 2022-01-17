import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { stringToSlug } from "../shared/helpers/helper-functions";
export default function AddProductScreen() {
  const [frontImage, setFrontImage] = useState();
  const [backImage, setBackImage] = useState();
  const [productName, setProductName] = useState("");
  const [productSlug, setProductSlug] = useState("");
  const [productCategories, setProductCategories] = useState([]);
  const [productCategory1, setProductCategory1] = useState("");
  const [productCategory2, setProductCategory2] = useState("");
  const [productCategory3, setProductCategory3] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const fetchProductCategories = async (e) => {
    try {
      const { data } = await axios.get("/api/categories/get-categories");
      const newData = data.data;
      newData.unshift({ value: "", name: "none" });
      setProductCategories(newData);
    } catch (err) {
      console.log(err.response?.data ? err.response.data.message : err.message);
    }
  };
  const onDrop = useCallback((acceptedFiles) => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accepts: "image/*",
    //multiple: false,
  });
  const imagesForDb = [];
  //------------
  const sendToCloudinary = async (item) => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append("file", item[0]);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );
    const response = await fetch(url, {
      method: "post",
      body: formData,
    });
    const imageData = await response.json();
    imagesForDb.push({ src: imageData.public_id });
    console.log("reponse from claudinary", imagesForDb);
  };
  // ---------------
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const productCategory = [
      productCategory1,
      productCategory2,
      productCategory3,
    ];

    try {
      //sending to cloudinary
      await sendToCloudinary(frontImage);
      await sendToCloudinary(backImage);

      //sending to db
      const { data } = await axios.post("/api/products/add-product", {
        name: productName,
        slug: stringToSlug(productName),
        category: productCategory,
        price: productPrice,
        description: productDescription,
        sizes: [
          { name: "XXS", inStock: true },
          { name: "XS", inStock: true },
          { name: "S", inStock: true },
          { name: "M", inStock: true },
          { name: "L", inStock: true },
          { name: "XL", inStock: true },
          { name: "2XL", inStock: true },
          { name: "3XL", inStock: true },
        ],
        image: imagesForDb,
      });
      console.log("product added successfully", data);
      data && alert("Product added");
      data && window.location.reload();
    } catch (err) {
      console.log("problem adding a product", err.response);
    }
  };
  return (
    <form onSubmit={handleOnSubmit} className="w-full max-w-xl mx-auto mb-20">
      <div className=" my-7">
        <label className="block text-md text-gray-00 mb-1" htmlFor="title">
          Title
        </label>
        <input
          value={productName}
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          className="w-full px-5 py-1 text-gray-700 border border-gray-500 rounded"
          id="title"
          name="title"
          type="text"
          required={true}
          placeholder="Title of the product"
        />
      </div>
      {/* slug */}
      <div className=" my-7">
        <label className="block text-md text-gray-00 mb-1" htmlFor="slug">
          Slug
        </label>
        <input
          value={stringToSlug(productName)}
          onChange={(e) => {
            setProductSlug(e.target.value);
          }}
          className="w-full px-5 py-1 text-gray-700 border border-gray-500 rounded"
          id="slug"
          name="slug"
          type="text"
          disabled
          required={true}
        />
      </div>
      {/* category */}
      <div className=" my-7">
        <label className="block text-md text-gray-00 mb-1" htmlFor="category">
          Category
        </label>

        <select
          value={productCategory1}
          onChange={(e) => {
            setProductCategory1(e.target.value);
          }}
          className="block  my-2 max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {productCategories.map((cat) => {
            return (
              <option key={cat.name} value={cat.value}>
                {cat.name}
              </option>
            );
          })}
        </select>
        <select
          value={productCategory2}
          onChange={(e) => {
            setProductCategory2(e.target.value);
          }}
          className="block  my-2 max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {productCategories.map((cat) => {
            return (
              <option key={cat.name} value={cat.value}>
                {cat.name}
              </option>
            );
          })}
        </select>
        <select
          value={productCategory3}
          onChange={(e) => {
            setProductCategory3(e.target.value);
          }}
          className="block  my-2 max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          {productCategories.map((cat) => {
            return (
              <option key={cat.name} value={cat.value}>
                {cat.name}
              </option>
            );
          })}
        </select>
      </div>
      {/* price */}
      <div className=" my-7 w-32 mr-auto">
        <label className="block text-md text-gray-00 mb-1" htmlFor="price">
          Price
        </label>
        <input
          value={productPrice}
          onChange={(e) => {
            setProductPrice(e.target.value);
          }}
          className="w-full px-5 py-1 text-gray-700 border border-gray-500 rounded"
          id="price"
          name="price"
          type="text"
          required={true}
        />
      </div>
      {/* desc */}
      <div className=" my-7">
        <label
          className="block text-md text-gray-00 mb-1"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          value={productDescription}
          onChange={(e) => {
            setProductDescription(e.target.value);
          }}
          className="w-full px-5 py-1 text-gray-700 border border-gray-500 rounded"
          id="description"
          name="description"
          type="text"
          rows="2"
          cols="50"
          required={true}
        />
      </div>
      {/* ----drop zone */}
      <Dropzone
        onDrop={(e) => {
          setFrontImage(e);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className=" border border-gray-500 border-dashed text-center py-10 rounded-lg cursor-pointer">
            <div {...getRootProps({})}>
              <input {...getInputProps()} />
              <p className="text-sm text-gray-400">
                Drag drop some file here, or click to select file
              </p>
              <p className="font-bold">Front of the jersey</p>
              {frontImage && (
                <p className="font-bold text-xl">{frontImage[0].path}</p>
              )}
            </div>
          </section>
        )}
      </Dropzone>
      {/* drop zone 2 */}
      <Dropzone
        onDrop={(e) => {
          setBackImage(e);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <section className="  mt-10 border border-gray-500 border-dashed text-center py-10 rounded-lg cursor-pointer">
            <div {...getRootProps({})}>
              <input {...getInputProps()} />
              <p className="text-sm text-gray-400">
                Drag drop some file here, or click to select file
              </p>
              <p className="font-bold">Back of the jersey</p>
              {backImage && (
                <p className="font-bold text-xl">{backImage[0].path}</p>
              )}
            </div>
          </section>
        )}
      </Dropzone>
      {/* --------- */}
      <div className=" w-full flex justify-center">
        <button
          type="submit"
          className="border rounded-md p-3 bg-blue-500 text-white px-6 cursor-pointer mt-10"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
