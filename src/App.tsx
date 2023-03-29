import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import "./scss/app.scss"; // стили для этого компонента
 import Home from "./pages/Home";
import Drawer from "./pages/Drawer";
import NotFound from "./pages/NotFound";
import { useState } from "react";
// import pizzas from "../src/assets/pizza.json";
import { useSelector, useDispatch } from "react-redux";
import FullPizza from "./pages/FullPizza.tsx";
import MainLayout from "./layouts/MainLayout";

// export const SearchContext = React.createContext("");

function App() {
  // const [searchValue, setSearchValue] = useState("");
  // const count = useSelector((state) => state.counter.value)
  // const dispatch = useDispatch()

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />}></Route>
        <Route path="drawer" element={<Drawer />}></Route>
        <Route path="pizza/:idOfPizza" element={<FullPizza />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
