import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import InputText from "../common/InputText";
import Button from "../common/Button";
import { useState } from "react";
import { addCart } from "../../api/carts.api";
import { useAlert } from "../../hooks/useAlert";
import { Link } from "react-router-dom";
import { useBook } from "../../hooks/useBook";

interface Props {
  book: BookDetail;
}
function AddToCart({ book }: Props) {
  const { addToCart, cartAdded } = useBook(book.id.toString());
  const { showAlert } = useAlert();
  const [quantity, setQuantitiy] = useState<number>(1);
  //   const [cartAdded, setCardAdded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantitiy(Number(e.target.value));
  };
  const handleIncrease = () => {
    setQuantitiy(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) return;
    setQuantitiy(quantity - 1);
  };

  //   const AddToCart = () => {
  //     addCart({
  //       book_id: book.id,
  //       quantity: quantity,
  //     }).then(() => {
  //       setCardAdded(true);
  //       setTimeout(() => {
  //         setCardAdded(false);
  //       }, 3000);
  //       //   showAlert("장바구니에 추가되었습니다.");
  //     });
  //   };
  return (
    <AddToCartStyle $added={cartAdded}>
      <InputText inputType="number" value={quantity} onChange={handleChange} />
      <div>
        <Button size="medium" scheme="normal" onClick={handleIncrease}>
          +
        </Button>
        <Button size="medium" scheme="normal" onClick={handleDecrease}>
          -
        </Button>
      </div>
      <Button
        size="medium"
        scheme="primary"
        onClick={() => addToCart(quantity)}
      >
        장바구니 담기
      </Button>

      <div className="added">
        <p>장바구니의 추가되었습니다.</p>
        <Link to="/cart">장바구니로 이동</Link>
      </div>
    </AddToCartStyle>
  );
}

interface AddToCartStyleProps {
  $added: boolean;
}

const AddToCartStyle = styled.div<AddToCartStyleProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  .added {
    position: absolute;

    right: 0;
    bottom: -90px;
    background: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 8px 12px;
    opacity: ${({ $added }) => ($added ? "1" : "0")};
    transition: all 0.5s ease;

    p {
      padding: 0 0 8px 0;
      margin: 0;
    }
  }
`;

export default AddToCart;
