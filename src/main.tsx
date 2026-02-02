import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { GlobalStyles } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lime, blueGrey } from "@mui/material/colors";

const styles = {
  html: {
    margin: 0,
    padding: 0,
    backgroundColor: blueGrey[800],
    color: "#EEEEEE",
    fontFamily: "Consolas",
    fontSize: "1.2rem",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    // eslint-disable-next-line @typescript-eslint/naming-convention
    "@media (min-width:1200px)": {
      fontSize: "1.8rem",
    },
  },
  body: {
    margin: 0,
    padding: 0,
  },
  div: {
    margin: 0,
    padding: 0,
  },
};

const theme = createTheme({
  palette: {
    primary: blueGrey,
    secondary: lime,
  },
});

createRoot(document.getElementById("root")!).render(
  <>
    <GlobalStyles styles={styles} />
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </>
);

