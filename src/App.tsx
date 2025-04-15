import Layout from "./components/common/layout/Layout";
import Home from "./pages/Home";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { light, dark, ThemeName, getTheme } from "./style/theme";
import ThemeSwticher from "./components/header/ThemeSwitcher";
import { useCallback, useContext, useState } from "react";
import { BookStoreThemeProvider, ThemeContext } from "./context/themeContext";

function App() {
  return (
    <BookStoreThemeProvider>
      <ThemeSwticher />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
