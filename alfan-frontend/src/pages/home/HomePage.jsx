import React, { useState, useEffect } from 'react';

import { getIndex } from '../../api/index/indexApi';
import { login } from '../../api/users/usersApi';
import Container from '../../components/container/Container';

import './HomePage.scss';

const HomePage = () => {
  const [subTitle, setSubTitle] = useState('loading...');

  const loadIndex = async () => {
    const res = await getIndex();
    setSubTitle(res.title);
  };

  const clickOnLogin = async () => {
    let loginRepsonse;
    try {
      loginRepsonse = await login();
    } catch (e) {
      console.log('error on login:', e);
      return;
    }
    window.location.href = loginRepsonse.redirectUrl;
  };

  useEffect(() => {
    loadIndex();
  }, []);

  return (
    <div className="home-page">
      <Container>
        <h1>Home Page</h1>
        <h3>{subTitle}</h3>
        <button type="button" onClick={clickOnLogin}>Login</button>
      </Container>
    </div>
  );
};

export default HomePage;
