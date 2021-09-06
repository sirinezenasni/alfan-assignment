import React, { useState, useEffect } from 'react';

import { getIndex } from '../../api/index/indexApi';
import Container from '../../components/container/Container';

import './HomePage.scss';

const HomePage = () => {
  const [subTitle, setSubTitle] = useState('loading...');

  const loadIndex = async () => {
    const res = await getIndex();
    setSubTitle(res.title);
  };

  useEffect(() => {
    loadIndex();
  }, []);

  return (
    <div className="home-page">
      <Container>
        <h1>Home Page</h1>
        <h3>{subTitle}</h3>
      </Container>
    </div>
  );
};

export default HomePage;
