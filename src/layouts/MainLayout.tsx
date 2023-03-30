import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout:React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
		<div className="content">
		<Outlet/> // тут будет рендериться один из роутов
		</div>
    </div>
  );
};

export default MainLayout;
