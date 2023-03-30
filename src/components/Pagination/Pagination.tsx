import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

type PaginationProps = {
  onChangePage: any;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  currentPage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3} // в идеале мы с бекенда должны узнавать сколько у нас страниц, но мокапи...
      previousLabel="<"
      // renderOnZeroPageCount={null}
      forcePage={currentPage - 1} // надо передавать индекс, поэтому от страницы отнимаем 1
    />
  );
};

export default Pagination;
