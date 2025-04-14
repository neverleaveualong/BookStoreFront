import Layout from "./components/common/layout/Layout";
import Home from "./pages/Home";
import { GlobalStyle } from "./style/global";
import { ThemeProvider } from "styled-components";
import { light, dark } from "./style/theme";

function App() {
  // return <Home />;
  return (
    <ThemeProvider theme={dark}>
      <GlobalStyle themeName="light" />
      <Layout>
        <Home />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
