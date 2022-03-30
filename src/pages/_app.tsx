import Layout from "../components/Layout";
import store from "../store";
import { Provider } from "react-redux";

export default ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};
