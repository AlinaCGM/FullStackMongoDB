import { createSlice } from "@reduxjs/toolkit";

import { Product } from "../types/type";

type InitialState = {
  productDetail: Product;
};
const initialState: InitialState = {
  productDetail: {
    _id: "",
    title: "",
    brand: "",
    price: 0,
    description: "",
    discountPercentage: 0,
    category: "",
    thumbnail: "",
    rating: 0,
    quantity: 0,
  },
};

const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    getDetailData: (state, action) => {
      state.productDetail = action.payload;
    },
  },
});
export const detailActions = productDetailSlice.actions;
const detailReducer = productDetailSlice.reducer;
export default detailReducer;
