import { createSlice,PayloadAction } from "@reduxjs/toolkit";



type Sort = {
  name: string;
  sort: "rating" | "-rating" | "price" | "-price" | "title" | "-title";
};

interface FilterSLiceState {
  seacrhValue: string;
  currentPage: number;
  categoryId: number;
  sort: Sort;
}

const initialState: FilterSLiceState = {
  seacrhValue: "",
  currentPage: 1,
  categoryId: 0,
  sort: {
    name: "популярности",
    sort: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategoryId(state, action:PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action:PayloadAction<string>) {
      state.seacrhValue = action.payload;
    },
    setSort(state, action:PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action:PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    //  setFilters(state, action:PayloadAction<FilterSLiceState>)
    //  - поставил any потому что была ошибка
    setFilters(state, action:PayloadAction<any>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
