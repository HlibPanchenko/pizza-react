import { createSlice,PayloadAction  } from "@reduxjs/toolkit";
import { RootState } from "../store";


export type CartItem = {
  imageUrl: string;
  id: string;
  price: number;
  title: string;
  type: string;
  size: number;
  count: number;
};

//interface типизирует только объект
//обычно когда типизируют state, делают это с помощью interface
interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}

const initialState:CartSliceState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // не работало, была ошибка с addItem(state, action:PayloadAction<CartItem>).
    // ошибка  dispatch(addItem({ id }));
    addItem(state, action:PayloadAction<CartItem>) {
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
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action:PayloadAction<string>) {
      // в payload будем передавать id пиццы
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action:PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id == action.payload);

      if (findItem) {
        findItem.count--;
      }
    },
  },
});

export const selectCart = (state:RootState) => state.cartSlice;
export const selectCartItem = (id:string) => (state:RootState) =>
  state.cartSlice.items.find((obj) => obj.id == id);

export const { clearItems, removeItem, addItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
