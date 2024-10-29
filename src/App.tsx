import { ThemeProvider } from "@emotion/react";
import "./App.css";
import theme from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <></>
    </ThemeProvider>
  );
}

export default App;
