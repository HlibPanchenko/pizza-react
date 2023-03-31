import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "./slices/filterSlice";
import cartSlice from "./slices/cartSlice";
import pizzaSlice from "./slices/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzaSlice,
  },
});

// делаем тип для getState
// getState вернет весь state нашего store
// typeof store.getState - мы получаем тип функции getState, этот тип вернет функцию, которая вернет наш state
// с помощью ReturnType вынымаем содержимое функции getState, вынимаем только state
// Теперь в RootState хранится весь state
export type RootState = ReturnType<typeof store.getState>

// делаем тип для Dispatch
// мы говорим, диспатч дай все свои actions, которые есть внутри твоих слайсов
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // сделали хук

