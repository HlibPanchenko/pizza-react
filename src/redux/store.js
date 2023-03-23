import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice.js";
import cartSlice from "./slices/cartSlice.js";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
  },
});
