import Layout from "../components/Layout";
import store from "../store";
import { Provider } from "react-redux";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import "../../styles.css";

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
      allVariants: {
        color: "white",
      },
      h1: {
        fontFamily: ["Exo", "sans-serif"].join(","),
        fontSize: 25,
      },
      subtitle1: {
        contSize: 18,
      },
      body1: {},
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
