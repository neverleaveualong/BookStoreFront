import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";

function BooksFilter() {
  const { category } = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newSearchParmas = new URLSearchParams(searchParams);

    if (id === null) {
      newSearchParmas.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParmas.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }
    setSearchParams(newSearchParmas);
  };

  const handleNews = () => {
    const newSearchParmas = new URLSearchParams(searchParams);

    if (newSearchParmas.get(QUERYSTRING.NEWS)) {
      newSearchParmas.delete(QUERYSTRING.NEWS);
    } else {
      newSearchParmas.set(QUERYSTRING.NEWS, "true");
    }
    setSearchParams(newSearchParmas);
  };

  return (
    <div>
      <BooksFilterStyle>
        <div className="category">
          {category.map((item) => (
            <Button
              size="medium"
              scheme={item.isActive ? "primary" : "normal"}
              key={item.category_id}
              onClick={() => handleCategory(item.category_id)}
            >
              {item.category_name}
            </Button>
          ))}
        </div>
        <div className="new">
          <Button
            size="medium"
            scheme={searchParams.get(QUERYSTRING.NEWS) ? "primary" : "normal"}
            onClick={() => handleNews()}
          >
            신간
          </Button>
        </div>
      </BooksFilterStyle>
    </div>
  );
}

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`;

export default BooksFilter;
