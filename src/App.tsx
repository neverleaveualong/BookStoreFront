import Layout from "./components/common/layout/Layout";
import Home from "./pages/Home";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { light, dark, ThemeName, getTheme } from "./style/theme";
import ThemeSwticher from "./components/header/ThemeSwitcher";
import { useCallback, useContext, useState } from "react";
import { BookStoreThemeProvider, ThemeContext } from "./context/themeContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/common/Error";
import Signup from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Books from "./pages/Books";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: "/books",
    element: (
      <Layout>
        <Books />
      </Layout>
    ),
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
  },
  {
    path: "/reset",
    element: (
      <Layout>
        <ResetPassword />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <BookStoreThemeProvider>
      {/* <ThemeSwticher /> */}

      <RouterProvider router={router} />
    </BookStoreThemeProvider>
  );
}

export default App;
