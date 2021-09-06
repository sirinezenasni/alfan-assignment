import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../container/Container';

import './Footer.scss';

const links = [
  {
    title: 'Home',
    link: '/',
  },
];

const Footer = () => {
  const getLinks = () => links.map((link) => (
    <div className="footer__link-item" key={link.title}>
      <Link to={link.link} activeclassname="active">
        {link.title}
      </Link>
    </div>
  ));

  return (
    <div className="footer">
      <Container>
        <div className="footer__main-container">
          <div className="footer__links-container">
            {getLinks()}
          </div>
        </div>
      </Container>
      <div className="footer__separator" />
      <Container>
        <div className="footer__main-container">
          <div className="footer__rights">© Alfan Assignment, Ilyess - All Rights Reserved © 2021</div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
