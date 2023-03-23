import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import qs from 'qs'
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux/es/exports";

import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination/Pagination";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import {list} from '../components/Sort'


const Home = () => {
  // достаем categoryId с filterSlice
  const categoryId = useSelector((state) => state.filterSlice.categoryId);
  const sortType = useSelector((state) => state.filterSlice.sort.sort);
  const currentPage = useSelector((state) => state.filterSlice.currentPage);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  }

  // const [sortType, setSortType] = useState({
  //   name: "популярности",
  //   sort: "rating",
  // });
  // const [categoryId, setCategoryId] = useState(0);
  const { searchValue } = React.useContext(SearchContext);
  const skeletonArr = [...Array(8)];
  const [pizza, setPizza] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);

  

  useEffect(()=>{
    const queryString = qs.stringify({
      categoryId,
      currentPage,
      sortType
    })

    navigate(`?${queryString}`)

  }, [categoryId, sortType, currentPage])

  useEffect(()=>{
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) // substring чтобы удалить знак ?
      console.log(params); //{categoryId: '3', currentPage: '1', sortType: 'title'}

      const sort = list.find(obj=>obj.sort == params.sortType)
      console.log(sort);
      dispatch(setFilters({
        ...params,
        sort
      }))
    }
  }, [])


  useEffect(() => {
    setIsLoading(true);
    const order = sortType.includes("-") ? "asc" : "desc";
    const sortBy = sortType.replace("-", "");
    // модификатор "-" показывает как мы хотим сортировать:
    //по возростанию или убыванию, но мы не должны передавать "-" в url,
    //поэтому вырезаем его
    const category = categoryId > 0 ? `category=${categoryId}` : ""; // если категория 0, покажем все пиццы
    const search = searchValue ? `&search=${searchValue}` : "";
    // fetch(
    //   `https://64143c5f600d6c8387442d10.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    // )
    //   .then((response) => response.json())
    //   .then((data) => setPizza(data))
    //   .catch((err) => {
    //     console.error(err);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });

    axios
      .get(
        `https://64143c5f600d6c8387442d10.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((response) => {
        setPizza(response.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
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
      <div className="content__items">
        {isLoading
          ? skeletonArr.map((_, index) => <Skeleton key={index} />)
          : pizza
              // .filter(pizza=> pizza.title.toLowerCase().includes(searchValue.toLo erCase()))
              .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
