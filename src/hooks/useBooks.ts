import { useLocation } from "react-router-dom";
import { fetchBooks, FetchBooksResponse } from "../api/books.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useQuery } from "react-query";

export const useBooks = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { data: booksData, isLoading: isBooksLodaing } =
    useQuery<FetchBooksResponse>(["books", location.search], () =>
      fetchBooks({
        category_id: params.get(QUERYSTRING.CATEGORY_ID)
          ? Number(params.get(QUERYSTRING.CATEGORY_ID))
          : undefined,
        news: params.get(QUERYSTRING.NEWS) ? true : undefined,
        currentPage: params.get(QUERYSTRING.PAGE)
          ? Number(params.get(QUERYSTRING.PAGE))
          : 1,
        limit: LIMIT,
      })
    );

  return {
    books: booksData?.books ?? [],
    pagination: booksData?.pagination ?? { totalCount: 0, currentPage: 1 },
    isEmpty: (booksData?.books.length ?? 0) === 0,
    isBooksLodaing,
  };
};
