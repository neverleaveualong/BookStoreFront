import styled from "styled-components";
import Title from "../components/common/Title";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksEmpty from "../components/books/BooksEmpty";
import Pagination from "../components/books/Pagination";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import { Book } from "../models/book.model";
import { useBooks } from "../hooks/useBooks";
import Loading from "../components/common/Loading";
import { useBooksInfinite } from "../hooks/useBooksInfinite";
import Button from "../components/common/Button";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

function Books() {
  const {
    books,
    pagination,
    isEmpty,
    isBooksLodaing,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinite();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMore();
          observer.unobserve(entry.target);
        }
      });
    });

    if (moreRef.current) {
      observer.observe(moreRef.current);
    }

    return () => observer.disconnect();
  }, [books]);

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  }) as React.RefObject<HTMLDivElement>;

  const loadMore = () => {
    if (!hasNextPage) return;
    fetchNextPage();
  };

  if (isEmpty) {
    return <BooksEmpty />;
  }

  if (!books || !pagination || isBooksLodaing) {
    return <Loading />;
  }

  console.log("books", books);
  console.log("Pagination", pagination);

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

        {books && <BooksList books={books} />}
        {/* {<Pagination pagination={pagination} />} */}

        <div className="more" ref={moreRef}>
          <Button
            size="medium"
            scheme="normal"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            {hasNextPage ? "더보기" : "마지막 페이지"}
          </Button>
        </div>
      </BooksStyle>
    </>
  );
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books;
