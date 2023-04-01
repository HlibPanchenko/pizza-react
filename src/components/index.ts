// мы импортируем и сразу экспортируем - это называется реэкспорт
// export {default as Skeleton} from './PizzaBlock/Skeleton';

// это то же самое, что и:
import Skeleton from './PizzaBlock/Skeleton';
import Pagination from "./Pagination/Pagination";

export {Skeleton, Pagination}