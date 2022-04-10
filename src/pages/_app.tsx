import Layout from "../components/Layout";
import store from "../store";
import { Provider } from "react-redux";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Box } from "@mui/system";
import "../../styles.css";
import Head from 'next/head';

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
        <Head>
          <title>graceBlog</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <Layout>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Component {...pageProps} />
          </Box>
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};
