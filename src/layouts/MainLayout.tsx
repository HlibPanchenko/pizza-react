import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const MainLayout:React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
		<div className="content">
		<Outlet/> 
		</div>
    </div>
  );
};

// в <Outlet/>  будет рендериться один из роутов
export default MainLayout;
