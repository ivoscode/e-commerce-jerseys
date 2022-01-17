import { ShoppingBagIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { Store } from "../../utils/Store";
export default function CartInfo() {
  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [state.cart]);

  return (
    <div className="flex relative  h-10 items-center ml-4 md:ml-10  ">
      <Link href="/cart/cart">
        <div>
          {state.totalItems > 0 && (
            <span className="bagCount">{state.totalItems}</span>
          )}
          <ShoppingBagIcon
            className=" flex-shrink-0 h-8 w-8 text-gray-700 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </div>
      </Link>
    </div>
  );
}
