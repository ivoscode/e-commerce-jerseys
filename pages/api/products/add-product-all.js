const cloudinary = require("cloudinary").v2;
import nc from "next-connect";
import Product from "../../../models/Product";
import db from "../../../utils/db";
const fs = require("fs");

const handler = nc();
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET,
});
handler.post(async (req, res) => {
  await db.connect();
  console.log("add product all API", req.body.name);
  const image = [];
  const getImages = async () => {
    for (let item of req.body.image) {
      await cloudinary.uploader.upload(
        item.src,
        { folder: "ecommerce" },
        function (err, res) {
          image.push({ src: res.public_id });
        }
      );
    }
  };
  await getImages();
  console.log("images from Cloudinary", image);

  const newProduct = new Product({
    ...req.body,
    image: image.reverse(),
  });
  await newProduct.save();

  res.send({ message: "product saved" });
});

export default handler;
