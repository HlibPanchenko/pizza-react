import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";



const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({
    imageUrl: '',
    title: '',
    price: 0
  });

  const params = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getOnePizza() {
      try {
        const res = await axios.get(
          `https://64143c5f600d6c8387442d10.mockapi.io/items/` +
            params.idOfPizza
        );
        setPizza(res.data);
      } catch (error) {
        console.log("ошибка получения данных одной пиццы", error);
        navigate("/");
      }
    }
    getOnePizza();
  }, []);

  // пока пицца не загрузилась, покажем загрузку.
  // если не будет этого, то у нас будет ошибка, потому что мы будем
  //пытаться достать imageUrl, title и price из pizza, которой еще нет

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img width={200} src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
