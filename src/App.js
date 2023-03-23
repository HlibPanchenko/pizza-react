import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from 'react'
import "./scss/app.scss"; // стили для этого компонента
import Header from "./components/Header";
import Home from "./pages/Home";
import Drawer from "./pages/Drawer";
import NotFound from "./pages/NotFound";
import { useState } from "react";
// import pizzas from "../src/assets/pizza.json";
import { useSelector, useDispatch } from 'react-redux'

export const SearchContext = React.createContext("");

function App() {
  const [searchValue, setSearchValue] = useState("");
  // const count = useSelector((state) => state.counter.value)
  // const dispatch = useDispatch()

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        {/* <Header searchValue={searchValue} setSearchValue={setSearchValue} /> */}
        <Header />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<Home />}
            ></Route>
            <Route path="/drawer" element={<Drawer />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
