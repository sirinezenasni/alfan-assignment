import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Drawer } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Container from '../container/Container';

import './Menu.scss';

const links = [
  {
    title: 'Home',
    link: '/',
  },
  {
    title: 'Youtube',
    link: '/youtube',
  },
  {
    title: 'Twitch',
    link: '/twitch',
  },
];

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpenMenu = () => {
    setIsOpen(true);
  };

  const onCloseMenu = () => {
    setIsOpen(false);
  };

  const getLinks = () => links.map((link) => (
    <NavLink to={link.link} activeclassname="active" onClick={onCloseMenu} key={link.title}>
      <li className="link-item">
        <span className="link-title">{link.title}</span>
      </li>
    </NavLink>
  ));

  const getMenu = () => (
    <>
      {getLinks()}
    </>
  );

  const getAppBar = () => {
    const icon = isOpen ? <CloseIcon onClick={onCloseMenu} /> : <MenuIcon onClick={onOpenMenu} className="menu-icon" />;
    return (
      <div className="app-bar">
        <Container>
          <div className="app-bar-container">
            <div className="app-bar-menu-icon">
              {icon}
            </div>
            <div className="app-bar-logo">
              <Link to="/">
                Alfan Assignment
              </Link>
            </div>
            <div className="menu-login-container">
              <AccountCircleIcon />
            </div>
          </div>
        </Container>
      </div>
    );
  };

  const getDrawer = () => (
    <Drawer anchor="top" open={isOpen} onClose={onCloseMenu} className="mobile-menu-drawer">
      <div className="menu-drawer">
        {getAppBar()}
        <div className="menu-links-container">
          {getMenu()}
        </div>
      </div>
    </Drawer>
  );

  return (
    <div className="menu">
      <div className="mobile-menu">
        {getAppBar()}
        {getDrawer()}
      </div>

      <div className="web-menu">
        <Container>
          <div className="web-menu-container">
            <div className="web-menu-logo">
              <Link to="/">
                Alfan Assignment
              </Link>
            </div>
            <div className="menu-links-container">
              {getMenu()}
            </div>
            <div className="menu-login-container">
              <AccountCircleIcon />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Menu;
