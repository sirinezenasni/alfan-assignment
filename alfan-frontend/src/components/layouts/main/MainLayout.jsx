import React from 'react';

import './MainLayout.scss';

import Menu from '../../menu/Menu';
import Footer from '../../footer/Footer';

const MainLayout = (props) => {
  const { children } = props;
  return (
    <div className="main-layout">
      <div className="main-layout-menu-container">
        <Menu />
      </div>
      <div className="main-layout-main-container">
        {children}
      </div>
      <div className="main-layout-footer-container">
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
