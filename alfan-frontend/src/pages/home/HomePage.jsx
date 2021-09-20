import React, { useState } from 'react';

import { authGoogle } from '../../api/auth/authApi';
import Container from '../../components/container/Container';

import './HomePage.scss';

const HomePage = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const clickOnYoutubeLogin = async () => {
    setIsProcessing(true);
    try {
      await authGoogle();
    } catch (e) {
      setIsProcessing(false);
      // eslint-disable-next-line
      console.log('error on login:', e);
    }
  };

  return (
    <div className="home-page">
      <Container>
        <h1>Welcome to Alfan Assignment</h1>
        <button type="button" onClick={clickOnYoutubeLogin} disabled={isProcessing} className="home-page__youtube-login">
          Continue with Youtube
        </button>
      </Container>
    </div>
  );
};

export default HomePage;
