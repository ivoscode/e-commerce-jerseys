const Fs = require("fs");
const Path = require("path");
const axios = require("axios");
const data = require("../scraper/products.json");
let products = [];
let imageCounter = 0;
let productCounter = 0;

const downloadImage = async (url) => {
  const fileName = Path.basename(url);
  const path = Path.resolve(__dirname, "images", fileName);
  const writer = Fs.createWriteStream(path);
  try {
    const response = await axios.get(url, {
      headers: {
        Referer: "http://x.yupoo.com/",
      },
      responseType: "stream",
    });
    response.data.pipe(writer);
    imageCounter++;
    console.log("downloading image", imageCounter, fileName, new Date());
  } catch (err) {
    console.log("error downloading image", err);
  }
};

const getPath = (item, counter) => {
  const result = item.image.map((img) => {
    const fileName = Path.basename(img.src);
    const path = Path.resolve(__dirname, "images", fileName);

    setTimeout(() => {
      downloadImage(img.src);
    }, 1000 * 2 * counter);

    return { src: path };
  });
  return result;
};
const saveFinalResult = () => {
  Fs.writeFile("savedproducts.json", JSON.stringify(products), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Successfully saved products ", productCounter);
  });
};

const start = () => {
  data.forEach((item) => {
    productCounter++;
    const product = { ...item, image: [] };
    const image = getPath(item, productCounter);
    product.image.push(...image);
    products.push(product);
  });
  saveFinalResult();
};
start();
