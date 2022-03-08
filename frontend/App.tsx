import Routes from './Routes';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default () => {
  return (
    <div>
      <Header />
      <Routes />
      <Footer />
    </div>
  );
};
