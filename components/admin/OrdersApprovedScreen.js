import axios from "axios";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Store } from "../../utils/Store";

export default function OrdersApproved() {
  const [orders, setOrders] = useState(null);
  const { state, dispatch } = useContext(Store);
  const [groupedItems, setGroupedItems] = useState();
  useEffect(() => {
    fetchOrders();
  }, []);

  console.log("grouped items", groupedItems);
  const fetchOrders = async (e) => {
    try {
      const { data } = await axios.get("/api/orders/get-orders-by-status", {
        params: { status: "Approved" },
      });
      setOrders(data);
      setGroupedItems(groupItems(data));
    } catch (err) {
      console.log(err.response?.data ? err.response.data.message : err.message);
    }
  };

  const handleUpdateOrders = () => {
    orders.forEach((order) => {
      updateOrder(order);
    });
  };
  const updateOrder = async (order) => {
    try {
      const { data } = await axios.post(`/api/orders/update?_id=${order._id}`, {
        status: "Fulfilled",
      });
      fetchOrders();
      console.log(" updated orders from api", data);
    } catch (err) {
      console.log(err.response);
    }
  };
  ///////
  const groupItems = (orders) => {
    let itemsArray = [];

    orders.forEach((order) => {
      itemsArray = itemsArray.concat(order.orderItems);
    });

    sortByName(itemsArray);
    // console.log("items array", itemsArray);
    return groupByNameAndSize(itemsArray);
  };
  /////////////
  function sortByName(arr) {
    for (var x = 0; x < arr.length; x++) {
      for (var y = 0; y < arr.length - 1; y++) {
        // compare arr[].name.toLowerCase() i.e. b > a
        if (arr[y].name.toLowerCase() > arr[y + 1].name.toLowerCase()) {
          var tmp = arr[y + 1];
          arr[y + 1] = arr[y];
          arr[y] = tmp;
        }
      }
    }
    return arr;
  }
  /////
  const groupByNameAndSize = (arr) => {
    var result = [];
    arr.forEach((order) => {
      let existing = result.find(
        (x) => x.name === order.name && x.size === order.size
      );
      if (existing) {
        existing.quantity += order.quantity;
      } else {
        result.push({ ...order });
      }
    });

    return result;
  };

  ////////
  if (!groupedItems) {
    return <div>No orders found</div>;
  }
  if (groupedItems.length == 0) {
    return (
      <dl className="my-6 sm:my-14 bg-gray-100 w-full  text-sm text-gray-700 rounded-lg py-6 px-4 md:px-6 divide-y divide-gray-200 space-y-6   sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-x-6 lg:gap-x-8">
        <div className="sm:flex sm:justify-between md:flex-col">
          <dt className=" ">Orders Count</dt>
          <dd className="text-gray-900 font-semibold mt-1 text-lg">
            {orders.length}
          </dd>
        </div>
      </dl>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8 bg-white ">
      <div className="max-w-xl ">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Orders summary
        </h1>
      </div>
      {/* summary */}

      <dl className="my-6 sm:my-14 bg-gray-100 w-full  text-sm text-gray-700 rounded-lg py-6 px-4 md:px-6 divide-y divide-gray-200 space-y-6   sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-4 sm:gap-x-6 lg:gap-x-8">
        <div className="sm:flex sm:justify-between md:flex-col">
          <dt className=" ">Orders Count</dt>
          <dd className="text-gray-900 font-semibold mt-1 text-lg">
            {orders.length}
          </dd>
        </div>
      </dl>

      {/* --------items----- */}
      {
        <table className="w-full ">
          <thead className=" text-sm text-gray-500 text-left ">
            <tr>
              <th className="w-1/5  pr-4 py-3 font-normal">Product</th>
              <th className=" w-2/5 pr-10 py-3 font-normal hidden  md:table-cell"></th>
              <th className=" w-1/5 pr-4 py-3 font-normal  sm:table-cell">
                Size
              </th>
              <th className=" pr-4 py-3 font-normal sm:table-cell">Quantity</th>
            </tr>
          </thead>
          {/* -----------order items */}
          <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t text-gray-900 font-bold ">
            {groupedItems.map((product) => (
              <tr key={uuidv4()}>
                <td className="py-3 pr-4 ">
                  <div className=" relative w-24 h-24">
                    <Image
                      src={product.image[0].src}
                      alt={product.name}
                      layout="fill"
                      className="w-16 h-16 object-center object-cover rounded mr-6"
                    />
                  </div>
                  <div className="md:hidden ">{product.name}</div>
                </td>
                <td className=" hidden md:table-cell py-3 pr-4  align-text-top">
                  {product.name}
                </td>
                <td className=" py-3 pr-4 sm:table-cell align-text-top">
                  {product.size}
                </td>
                <td className="  py-3  sm:table-cell align-text-top">
                  {product.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }
      <div className=" w-full flex justify-center">
        <button
          onClick={handleUpdateOrders}
          className="border rounded-md p-3 bg-blue-500 text-white px-6 cursor-pointer mt-10"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
