import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../types/type";

type InitialState = {
  cartList: Product[];
};

const initialState: InitialState = {
  cartList: [],
};

const cartSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartList.push(action.payload);
      const isIncluded = state.cartList.some((cartItem) => {

        return cartItem._id === action.payload._id;
      });
      if (!isIncluded) {
        state.cartList.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const result = state.cartList.findIndex(
        (product) => product._id === action.payload
      );
      if (result !== -1) {
        state.cartList.splice(result, 1);
      }
    },
    increaseQuantity: (state, action) => {
      const result = state.cartList.findIndex(
        (product) => product._id === action.payload
      );
      state.cartList[result].price +=
        state.cartList[result].price / state.cartList[result].quantity;
      state.cartList[result].quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const result = state.cartList.findIndex(
        (product) => product._id === action.payload
      );
      if (state.cartList[result].quantity > 1) {
        state.cartList[result].price -=
          state.cartList[result].price / state.cartList[result].quantity;
        state.cartList[result].quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.cartList = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
});

export const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;
export default cartReducer;
