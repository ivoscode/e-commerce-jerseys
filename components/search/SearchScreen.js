import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
//import { useEffect, useState } from "react";
export default function SearchScreen(props) {
  const router = useRouter();
  // console.log(props);
  // const [products, setProducts] = useState();
  // useEffect(() => {
  //   fetch("/api/products")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       const dataSearch = data.filter((item) => {
  //         return Object.keys(item).some((key) =>
  //           item[key]
  //             .toString()
  //             .toLowerCase()
  //             .includes(router.query.q.toString().toLowerCase())
  //         );
  //       });
  //       setProducts(dataSearch);
  //     });
  // }, [router.query.q]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Products
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {props.products?.map((product) => (
            <Link key={product._id} href={`/product/${product.slug}`}>
              <div className="group relative">
                <div className="w-full min-h-80 bg-gray-200 relative aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 ">
                  <Image
                    src={product.image[0].src}
                    alt={product.name}
                    layout="fill"
                    className="w-full h-full object-center object-cover "
                  />
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
      </div>
    </div>
  );
}
