import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
export default function CategoryScreen({ products }) {
  console.log("products array", products);
  const router = useRouter();
  console.log(router.query.q);
  if (products.length < 1) {
    return <div>{`nothing found for ${router.query.name}`} </div>;
  }
  return (
    <div className="bg-white ">
      <div className=" mx-auto w-full py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          {router.query.name}
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:gap-x-8">
          {products?.map((product) => (
            <Link key={product._id} href={`/product/${product.slug}`}>
              <div className="group relative">
                <div className="w-full min-h-80 relative bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 ">
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
