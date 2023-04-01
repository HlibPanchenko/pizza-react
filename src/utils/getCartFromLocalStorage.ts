import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
  // сначала проверим есть ли что-то в LS
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  // если в LS ничего нету, будет пустой массив

  const totalPrice = calcTotalPrice(items);

  return {
    items,
    totalPrice,
  };
};
