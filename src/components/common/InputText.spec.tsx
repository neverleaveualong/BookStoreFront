import { render, screen } from "@testing-library/react";
import InputText from "./InputText";
import { BookStoreThemeProvider } from "../../context/themeContext";

describe("InputText 컴포넌트 테스트", () => {
  it("랜더를 확인", () => {
    render(
      <BookStoreThemeProvider>
        <InputText placeholder="여기에 입력" />
      </BookStoreThemeProvider>
    );

    expect(screen.getByPlaceholderText("여기에 입력")).toBeInTheDocument();
  });
});
