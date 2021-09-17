import React, { useState } from 'react';

import { getGoogleLoginUrl } from '../../api/users/usersApi';
import Container from '../../components/container/Container';

import './HomePage.scss';

const HomePage = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const clickOnYoutubeLogin = async () => {
    setIsProcessing(true);
    let getGoogleLoginUrlRepsonse;
    try {
      getGoogleLoginUrlRepsonse = await getGoogleLoginUrl();
    } catch (e) {
      setIsProcessing(false);
      console.log('error on login:', e);
      return;
    }
    window.location.href = getGoogleLoginUrlRepsonse.redirectUrl;
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
