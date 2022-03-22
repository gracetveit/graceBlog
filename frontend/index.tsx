import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HeadProvider } from 'react-head';

import App from './App';
import store from './store';

ReactDOM.render(
  <HeadProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </HeadProvider>,
  document.getElementById('root')
);
