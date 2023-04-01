import React, { useState } from "react";
import { useWhyDidYouUpdate } from "ahooks";

const arrCategories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];
// создадим тп для свойств
type CategoriesProps = {
  categoryId: number;
  onClickCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ onClickCategory, categoryId }) => {
    // const onClickCategory = (index) => {
    //   setActiveIndex(index);
    // };

    useWhyDidYouUpdate("Categories", {
      onClickCategory,
      categoryId,
    });

    return (
      <div className="categories">
        <ul>
          {arrCategories.map((item, index) => (
            <li
              key={index}
              onClick={() => onClickCategory(index)}
              className={categoryId == index ? "active" : ""}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
export default Categories;
