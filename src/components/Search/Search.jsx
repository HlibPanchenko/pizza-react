import React from "react";
import styles from "./Search.module.scss";
import { SearchContext } from "../../App";
import debounce from "lodash.debounce";

const Search = () => {
  // сделали локальный контролируемый инпут, в который сразу будем записывать value с инпута
  const [value, setValue] = React.useState('')
  const {setSearchValue } = React.useContext(SearchContext);

  // сохранили ссылку на функцию и сделали ее отложенной
  // будем вызывать эту функции каждый раз когда меняется инпут
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      // через 350мс будем записывать новое значение в состояние инпута, которое хранится в контексте
      setSearchValue(str);
    }, 350), []
  );

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value)
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        id="Layer_1"
        version="1.1"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3  c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2  c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2  c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z" />
      </svg>
      <input
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы..."
      />
    </div>
  );
};

export default Search;
