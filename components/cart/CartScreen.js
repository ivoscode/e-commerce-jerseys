import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Store } from "../../utils/Store";
export default function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const {
    totalAmount,
    cart: { cartItems },
  } = state;
  const router = useRouter();

  const userSession = JSON.parse(window.sessionStorage.getItem("userSession"));

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [state.cart]);

  // change quantity and delete functions
  const updateCartHandler = async (item, quantity) => {
    dispatch({ type: "CART_UPDATE_ITEM", payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    console.log("item to remove", item);
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  ////////

  const placeOrderHandler = async () => {
    try {
      await axios.post("/api/orders/place", {
        orderItems: cartItems,
        user: { name: userSession.name },
        status: "Awaiting Approval",
      });

      dispatch({ type: "CART_CLEAR" });
      Cookies.remove("cartItems");
      router.push("/cart/order-complete");
    } catch (err) {
      console.log("problem placing an order in cart", err);
      err.response?.data ? err.response.data.message : err.message;
    }
  };
  if (cartItems.length === 0) {
    return (
      <div>
        Cart is empty. <Link href="/">Go shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="h-full flex flex-col bg-white shadow-xl ">
        <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
          <div className="mt-8">
            {/* ----item------- */}
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((product) => (
                  <li
                    key={uuidv4()}
                    className="py-6 flex flex-col xsm:flex-row  w-full"
                  >
                    {/* -----image */}
                    <div className="flex">
                      <div className="flex-shrink-0 w-24 h-24 border relative border-gray-200 rounded-md overflow-hidden">
                        <Image
                          src={product?.image[0].src}
                          alt={product?.name}
                          layout="fill"
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <h3 className="w-2/4 ml-4">
                        <a href={product?.href}>{product?.name}</a>
                      </h3>
                    </div>
                    {/* -------details--------- */}
                    <div className="ml-4 flex-1 flex  space-y-6 md:space-y-0 flex-col sm:flex-row  justify-between items-end sm:items-center">
                      {/* size */}
                      <p className="ml-4 font-bold">{product?.size}</p>
                      {/* quantity */}
                      <div className=" flex items-center sm:block    ">
                        <label htmlFor={`quantity`} className="mr-2">
                          Qty
                        </label>
                        <select
                          value={product?.quantity}
                          onChange={(e) =>
                            updateCartHandler(
                              product,
                              parseInt(e.target.value, 10)
                            )
                          }
                          className="block max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={3}>3</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={6}>6</option>
                          <option value={7}>7</option>
                          <option value={8}>8</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => removeItemHandler(product)}
                          className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                        >
                          <span>Remove</span>
                        </button>
                      </div>

                      <p className="ml-4">
                        £{product.quantity * product?.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>£{totalAmount}</p>
          </div>

          <div className="mt-6">
            <a
              onClick={() => {
                placeOrderHandler();
              }}
              className="flex justify-center cursor-pointer items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Place an Order
            </a>
          </div>
          <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
            <p>
              or
              <button
                type="button"
                className="text-indigo-600 font-medium hover:text-indigo-500 ml-1"
                onClick={() => {
                  router.push("/");
                }}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
