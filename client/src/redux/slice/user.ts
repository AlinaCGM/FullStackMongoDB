import { createSlice } from "@reduxjs/toolkit";
import { User } from "../types/type";

type InitialState = {
  userInfo: User;
  isLogin: boolean;
  error: string;
};

const initialState: InitialState = {
  userInfo: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    image: "",
  },
  isLogin: false,
  error: "",
};
const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    getUserById: (state, action) => {
      state.userInfo = action.payload;
    },
    loginHandler: (state, action) => {
      state.isLogin = action.payload;
    },
    errorHandler: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
const reducer = userSlice.reducer;
export default reducer;
