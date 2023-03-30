import React, { useState } from "react";

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

const Categories: React.FC<CategoriesProps> = ({
  onClickCategory,
  categoryId,
}) => {
  // const onClickCategory = (index) => {
  //   setActiveIndex(index);
  // };

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
};

export default Categories;
