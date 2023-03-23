import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // ищем есть ли у нас уже такая пицца в массиве
      const findItem = state.items.find((obj) => obj.id == action.payload.id);
      // если есть такая пицца, увеличим ее количество
      if (findItem) {
        findItem.count++;
      } else {
        // если такой пиццы нету, добавляем ее в массив и даем свойство count 1
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, obj) => {
        return(obj.price*obj.count) + sum;
      }, 0);
    },
    removeItem(state, action) {
      // в payload будем передавать id пиццы
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id == action.payload);
      
      if (findItem) {
        findItem.count--
      } 
    },
  },
});

export const { clearItems, removeItem, addItem, minusItem} = cartSlice.actions;
export default cartSlice.reducer;
