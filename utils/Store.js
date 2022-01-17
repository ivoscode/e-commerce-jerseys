import Cookies from "js-cookie";
import { signOut } from "next-auth/client";
import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = {
  totalItems: 0,
  totalAmount: 0,
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_UPDATE_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id && item.size === newItem.size
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id && item.size === existItem.size
              ? newItem
              : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id && item.size === newItem.size
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) => {
            if (item._id === existItem._id && item.size === existItem.size) {
              item.quantity += newItem.quantity;
            }
            return item;
          })
        : [...state.cart.cartItems, newItem];
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter((item) => {
        const result =
          item.size == action.payload.size && item._id == action.payload._id;
        return !result;
      });
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "USER_LOGOUT":
      signOut();
      window.sessionStorage.removeItem("userSession");

    case "GET_TOTAL": {
      let { totalItems, totalAmount } = state.cart.cartItems.reduce(
        (accum, curVal) => {
          let { price, quantity } = curVal;
          let updatedTotalAmount = price * quantity;
          accum.totalAmount += updatedTotalAmount;
          accum.totalItems += quantity;
          return accum;
        },
        {
          totalItems: 0,
          totalAmount: 0,
        }
      );
      return {
        ...state,
        totalItems,
        totalAmount,
      };
    }
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
