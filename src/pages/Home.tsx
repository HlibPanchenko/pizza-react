import React from "react";
import { useEffect, useState } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";

import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { list } from "../components/Sort";

const Home: React.FC = () => {
  const categoryId = useSelector((state:any) => state.filterSlice.categoryId);
  const sortType = useSelector((state:any) => state.filterSlice.sort.sort);
  const currentPage = useSelector((state:any) => state.filterSlice.currentPage);
  const { items, status } = useSelector((state:any) => state.pizzaSlice);
  const searchValue = useSelector((state:any) => state.filterSlice.seacrhValue);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeCategory = (id: number) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  // const { searchValue } = React.useContext(SearchContext);
  const skeletonArr = [...Array(8)];

  const getPizzas = async () => {
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    // модификатор "-" показывает как мы хотим сортировать:
    //по возростанию или убыванию, но мы не должны передавать "-" в url, поэтому вырезаем его
    const category = categoryId > 0 ? `category=${categoryId}` : ""; // если категория 0, покажем все пиццы
    const search = searchValue ? `&search=${searchValue}` : "";

    try {
      // const res = await axios.get(
      //   `https://64143c5f600d6c8387442d10.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      // );
      // dispatch(setItems(res.data));
      // выще мы говорили: "дай данные и отправь их в редакс"
      // теперь мы сразу получаем данные и сохраняем ихimage.png
      dispatch(
        //@ts-ignore
        fetchPizzas({ 
          order,
           sortBy, 
           category, 
           search, 
           currentPage 
          }));
    } catch (error) {
      console.log("не смогли получить пиццу с бекенда", error);
    }
  };

  useEffect(() => {
    const queryString = qs.stringify({
      categoryId,
      currentPage,
      sortType,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)); // substring чтобы удалить знак ?
      // console.log(params); //{categoryId: '3', currentPage: '1', sortType: 'title'}

      const sort = list.find((obj) => obj.sort == params.sortType);
      // console.log(sort);
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
    }
  }, []);

  useEffect(() => {
    // (async () => {
    //   setIsLoading(true);
    //   const order = sortType.includes("-") ? "asc" : "desc";
    //   const sortBy = sortType.replace("-", "");
    //   // модификатор "-" показывает как мы хотим сортировать:
    //   //по возростанию или убыванию, но мы не должны передавать "-" в url, поэтому вырезаем его
    //   const category = categoryId > 0 ? `category=${categoryId}` : ""; // если категория 0, покажем все пиццы
    //   const search = searchValue ? `&search=${searchValue}` : "";

    //   try {
    //     const res = await axios.get(
    //       `https://64143c5f600d6c8387442d10.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    //     );
    //       dispatch(setItems(res.data))
    //     // setPizza(res.data);
    //   } catch (error) {
    //     console.log("не смогли получить пиццу с бекенда", error);
    //   } finally {
    //     setIsLoading(false);
    //   }

    //   window.scrollTo(0, 0);
    // })();
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onClickCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status == "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Не удалось получить пиццы.</p>
        </div>
      ) : (
        <div className="content__items">
          {status == "loading"
            ? skeletonArr.map((_, index) => <Skeleton key={index} />)
            : items
                // .filter(pizza=> pizza.title.toLowerCase().includes(searchValue.toLo erCase()))
                .map((pizza:any) => <PizzaBlock key={pizza.id} {...pizza} />)}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;