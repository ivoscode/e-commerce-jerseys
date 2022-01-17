import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Tabs from "../../components/shared/UI/Tabs";
import { Store } from "../../utils/Store";
import { formatDate } from "../shared/helpers/helper-functions";
export default function OrderListScreen() {
  const [orders, setOrders] = useState(null);
  const { state, dispatch } = useContext(Store);
  const [currentTab, setCurrentTab] = useState("Awaiting Approval");

  useEffect(() => {
    handleFetchOrders("Awaiting Approval");
  }, []);

  const handleFetchOrders = async (e) => {
    try {
      const { data } = await axios.get("/api/orders/get-orders-by-status", {
        params: { status: e },
      });
      setOrders(data);
      setCurrentTab(e);

      console.log("orders from api", data);
    } catch (err) {
      console.log(err.response?.data ? err.response.data.message : err.message);
    }
  };
  // const deleteOrder = async (e) => {
  //   try {
  //     confirm("are you sure you want to delete") &&
  //       (await axios.post("/api/orders/delete", { id: e }));

  //   } catch (e) {
  //     console.log(err.response?.data ? err.response.data.message : err.message);
  //   }
  // };
  const updateOrder = async (id, body) => {
    try {
      const { data } = await axios.post(`/api/orders/update?_id=${id}`, body);
      handleFetchOrders(currentTab);
      console.log(" updated orders from api", data);
    } catch (err) {
      console.log(err.response);
    }
  };
  ////////
  if (!orders) {
    return <div>No orders found</div>;
  }

  return (
    <div className=" max-w-7xl  mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8 bg-white  ">
      <div className="max-w-xl">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Order history
        </h1>
      </div>

      <ul className="mt-20">
        <Tabs
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          handleFetchOrders={handleFetchOrders}
        />
        {orders.map((order) => (
          <li key={order._id} className="py-6  ">
            {/* ---------------------------------order summary------------------------- */}

            <div className="bg-gray-100  text-sm text-gray-700 rounded-lg py-6 px-4 md:px-6 md:flex md:items-center md:justify-between md:space-x-6 lg:space-x-8">
              {/* ---left hand side---- */}
              <dl className="  font-medium divide-y divide-gray-300 space-y-6   flex-auto md:divide-y-0 md:space-y-0 md:grid md:grid-cols-4 lg:flex-none lg:w-9/12 md:gap-x-6  lg:gap-x-8">
                <div className="sm:flex sm:justify-between md:flex-col ">
                  <dt className=" ">Date placed</dt>
                  <dd className="text-gray-900 font-semibold mt-1">
                    <time>{formatDate(order.createdAt)}</time>
                  </dd>
                </div>
                <div className="sm:flex sm:justify-between md:flex-col">
                  <dt className=" ">Customer</dt>
                  <dd className="text-gray-900 font-semibold mt-1">
                    {order.user.name}
                  </dd>
                </div>
                {/* <div className="sm:flex sm:justify-between md:flex-col ">
                  <dt className=" ">Order number</dt>
                  <dd className="text-gray-900 font-semibold mt-1">
                    {order.number}
                  </dd>
                </div> */}

                {currentTab == "Awaiting Approval" ? null : (
                  <div className="sm:flex sm:justify-between  md:flex-col  ">
                    <dt>Status</dt>
                    <dd className="text-gray-900 font-semibold mt-1">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrder(order._id, { status: e.target.value })
                        }
                        className="block  w-full max-w-xs rounded-md border-2 py-1.5 text-base leading-5  text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option value={"Awaiting Approval"}>
                          Awaiting Approval
                        </option>
                        <option value={"Approved"}>Approved</option>
                        <option value={"Fulfilled"}>Fulfilled</option>
                        <option value={"Rejected"}>Rejected</option>
                      </select>
                    </dd>
                  </div>
                )}
              </dl>
              {/* ----right hand side------ */}
              <div className="flex items-center justify-between mt-5 max-w-xs mx-auto sm:px-10 md:mt-0  md:w-5/12 md:px-3 ">
                {currentTab == "Awaiting Approval" && (
                  <div className=" ">
                    <button
                      className="bg-green-500 text-white rounded p-3"
                      onClick={(e) =>
                        updateOrder(order._id, { status: "Approved" })
                      }
                    >
                      Approve
                    </button>
                  </div>
                )}
                {currentTab == "Awaiting Approval" && (
                  <div>
                    <button
                      className="text-red-500 block"
                      onClick={(e) =>
                        updateOrder(order._id, { status: "Rejected" })
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* --------Items------- */}
            <table className="w-full ">
              <thead className=" text-sm text-gray-500 text-left ">
                <tr>
                  <th className="w-1/5  pr-4 py-3 font-normal">Product</th>
                  <th className=" w-2/5 pr-10 py-3 font-normal hidden  md:table-cell"></th>
                  <th className=" w-1/5 pr-4 py-3 font-normal  sm:table-cell">
                    Size
                  </th>
                  <th className=" pr-4 py-3 font-normal sm:table-cell">
                    Quantity
                  </th>
                </tr>
              </thead>
              {/* -----------order items */}
              <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t text-gray-900 font-bold ">
                {order.orderItems.map((product) => (
                  <tr key={uuidv4()}>
                    <td className="py-6 pr-4 ">
                      <div className="relative w-24 h-24">
                        <Image
                          src={product?.image[0]?.src}
                          alt={product.name}
                          layout="fill"
                          className="w-16 h-16 object-center object-cover rounded mr-6"
                        />
                      </div>
                      <div className="md:hidden ">{product.name}</div>
                    </td>
                    <td className=" hidden md:table-cell py-6 pr-4  align-text-top">
                      {product.name}
                    </td>
                    <td className=" py-6 pr-4 sm:table-cell align-text-top">
                      {product.size}
                    </td>
                    <td className="  py-6  sm:table-cell align-text-top">
                      {product.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </li>
        ))}
      </ul>
    </div>
  );
}
