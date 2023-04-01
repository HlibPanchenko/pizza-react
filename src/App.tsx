import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { Suspense } from "react";
import "./scss/app.scss"; // стили для этого компонента
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
// import Drawer from "./pages/Drawer";
// import NotFound from "./pages/NotFound";
// import FullPizza from "./pages/FullPizza";

// React.lazy будет подгружать файл './pages/Drawer', если компонент Drawer отрендерится
const Drawer = React.lazy(
  () => import(/* webpackChunkName: "Drawer" */ "./pages/Drawer")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);

// export const SearchContext = React.createContext("");

function App() {
  // const [searchValue, setSearchValue] = useState("");
  // const count = useSelector((state) => state.counter.value)
  // const dispatch = useDispatch()

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />}></Route>
        <Route
          path="drawer"
          element={
            // пока компонент еще не загрузился будет показываться - fallback={<div>Загрузка...</div>
            <Suspense fallback={<div>Загрузка корзины...</div>}>
              <Drawer />
            </Suspense>
          }
        ></Route>
        <Route
          path="pizza/:idOfPizza"
          element={
            <Suspense fallback={<div>Загрузка этой пиццы...</div>}>
              <FullPizza />
            </Suspense>
          }
        ></Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Ошибка...</div>}>
              <NotFound />
            </Suspense>
          }
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
