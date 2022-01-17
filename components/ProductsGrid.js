import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
//import Banner from "./shared/UI/Banner";
export default function ProductsGrid() {
  const [products, setProducts] = useState();
  //console.log(products);
  useEffect(() => {
    handlePageClick();
  }, []);

  const handlePageClick = async (e) => {
    const { data } = await axios.get("/api/products", {
      params: { page: e?.selected || 0, limit: 120 },
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setProducts(data);
  };
  if (!products) {
    return null;
  }
  return (
    <div>
      {/* <Banner /> */}
      <div className=" mx-auto py-16 px-4 sm:py-24 sm:px-6 max-w-7xl lg:px-8 bg-white">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Products
        </h2>
        {/* <img
          className="h-20 w-20"
          src="http://photo.yupoo.com/jayjersey11111/4200e33d/small.jpg"
        /> */}
        <div className="mt-6 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3  md:grid-cols-5 lg:grid-cols-6 xl:gap-x-8">
          {products?.docs.map((product) => (
            <Link href={`/product/${product.slug}`} key={product._id}>
              <div className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 ">
                  {product?.image[0]?.src && (
                    <Image
                      src={product.image[0].src}
                      alt={product.name}
                      layout="fill"
                      //  placeholder="blur"
                      //blurDataURL="data:image/png;base64,"
                      className="w-full h-full object-center object-cover "
                    />
                  )}
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={products.totalPages}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
}
