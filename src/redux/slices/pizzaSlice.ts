import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

//типизация асинхронного action

// type FetchPizzasArgs = Record<string, string>;
type FetchPizzasArgs = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};

// создаем асинхронный action
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (props: FetchPizzasArgs) => {
    const { order, sortBy, category, search, currentPage } = props;
    const { data } = await axios.get<Pizza[]>(
      `https://64143c5f600d6c8387442d10.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data as Pizza[];
  }
);

type Pizza = {
  imageUrl: string;
  id: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface PizzaSliceState {
  items: Pizza[];
  // status: "loading" | "success" | "error";
  status: Status; // получим что-то из epum Status
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
  // status: "loading", // loading \ success \\ error
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state, action) => {
      // state.status = "loading";
      state.status = Status.LOADING;
      state.items = [];
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      // state.status = "success";
      state.status = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state, action) => {
      // state.status = "error";
      state.status = Status.ERROR;
      state.items = [];
    });
  },
  // extraReducers: {
  //   // в extraReducers передается логика которая не связана с нашими обычными функциями,
  //   //которые влияют на state
  //   // передаем сюда наш асинхронный action fetchPizzas
  //   [fetchPizzas.pending]: (state) => {
  //     console.log("идет отправка");
  //     state.status = "loading";
  //     state.items = [];
  //   },
  //   // если он успешно выполнится, делай что-то
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     state.items = action.payload;
  //     state.status = "success";
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     state.status = "error";
  //     state.items = [];
  //   },
  // },
});

export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
