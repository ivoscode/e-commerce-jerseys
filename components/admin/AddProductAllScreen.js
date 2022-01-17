import axios from "axios";
import products from "../../downloader/savedproducts-page.json";
//import { stringToSlug } from "../shared/helpers/helper-functions";

export default function AddProductAllScreen() {
  const data = JSON.stringify(products, undefined, 2);

  //------------

  // ---------------
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      products.map(async (product) => {
        const { data } = await axios.post("/api/products/add-product-all", {
          ...product,

          //slug: stringToSlug(product.name),
          slug: product.yuId,
          price: 0,
          description: ".",
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
        });
        console.log("product added successfully", data);
      });
    } catch (err) {
      console.log("problem adding a product", err.response);
    }
  };
  return (
    <form onSubmit={handleOnSubmit} className="w-full max-w-xl mx-auto mb-20">
      <div className="h-80 overflow-y-auto">
        <pre> {data} </pre>
      </div>

      <div className=" w-full flex justify-center">
        <button
          type="submit"
          className="border rounded-md p-3 bg-blue-500 text-white px-6 cursor-pointer mt-10"
        >
          Upload products
        </button>
      </div>
    </form>
  );
}
