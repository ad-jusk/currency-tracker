import { createTheme } from "@mui/material/styles";
import { blueGrey, lime, orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: orange,
    secondary: lime,
    mode: "dark",
    background: {
      default: blueGrey[800],
      paper: blueGrey[800],
    },
    text: {
      primary: "#EEEEEE",
      secondary: "#EEEEEE",
    },
  },
  typography: {
    fontFamily: '"JetBrains Mono", monospace',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          margin: 0,
          padding: 0,
          color: "#EEEEEE",
          fontSize: "1.1rem",
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
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#EEEEEE",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
          // eslint-disable-next-line @typescript-eslint/naming-convention
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff",
          },
        },
      },
    },
  },
});

export default theme;
