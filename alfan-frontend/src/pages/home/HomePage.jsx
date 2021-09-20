import React, { useState } from 'react';

import authGoogle from '../../api/auth/authApi';
import Container from '../../components/container/Container';
import { isLogged, logout } from '../../storage/storageManager';

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

  const renderYoutubeButton = () => {
    if (isLogged()) {
      return null;
    }

    return (
      <button type="button" onClick={clickOnYoutubeLogin} disabled={isProcessing} className="home-page__youtube-login">
        Continue with Youtube
      </button>
    );
  };

  const clickOnLogout = () => {
    logout();
    window.location.href = '/';
  };

  const renderLogoutButton = () => {
    if (!isLogged()) {
      return null;
    }

    return (
      <button type="button" onClick={clickOnLogout} disabled={isProcessing} className="home-page__youtube-login">
        Logout
      </button>
    );
  };

  return (
    <div className="home-page">
      <Container>
        <h1>Welcome to Alfan Assignment</h1>
        {renderYoutubeButton()}
        {renderLogoutButton()}
      </Container>
    </div>
  );
};

export default HomePage;
