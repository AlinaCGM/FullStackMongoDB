import { createSlice } from "@reduxjs/toolkit";

import { Order } from "../types/type";

type InitialState = { orders: Order[] };

const initialState: InitialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getOrderList: (state, action) => {
      state.orders = action.payload;
    },
    createOrder: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const orderActions = orderSlice.actions;

const reducer = orderSlice.reducer;

export default reducer;
