import Layout from "../components/Layout";
import store from "../store";
import { Provider } from "react-redux";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Box } from "@mui/system";

export default ({ Component, pageProps }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#63427C",
      },
      background: {
        default: "#242326",
        paper: "#63427C",
      },
    },
    typography: {
      h1: {
        fontFamily: ["Exo", "sans-serif"].join(","),
        fontSize: 25,
        color: "white",
      },
      subtitle1: {
        contSize: 18,
        color: "white",
      },
      body1: {
        color: "white",
      },
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Component {...pageProps} />
          </Box>
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};
