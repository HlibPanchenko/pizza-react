import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
 
// создаем асинхронный action
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (props, ThunkAPI) => {
    const { order, sortBy, category, search, currentPage } = props;
    const res = await axios.get(
      `https://64143c5f600d6c8387442d10.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return res.data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading \ success \\ error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    // в extraReducers передается логика которая не связана с нашими обычными функциями,
    //которые влияют на state
    // передаем сюда наш асинхронный action fetchPizzas
    [fetchPizzas.pending]: (state) => {
      console.log("идет отправка");
      state.status = "loading";
      state.items = [];
    },
    // если он успешно выполнится, делай что-то
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
