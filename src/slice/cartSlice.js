import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  totalItems: localStorage.getItem("totalItems")
    ? JSON.parse(localStorage.getItem("totalItems"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    setTotalItems(state, action) {
      state.totalItems = action.payload;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
    addItem(state) {
      state.totalItems += 1;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
    removeItem(state) {
      state.totalItems -= 1;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
    resetCart(state) {
      state.totalItems = 0;
      localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
    },
  },
});

export const { setTotalItems, addItem, removeItem, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
