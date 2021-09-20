import React, { useEffect, useState } from 'react';

import authGoogle from '../../api/auth/authApi';
import getYoutubeData from '../../api/users/usersApi';
import Container from '../../components/container/Container';
import YoutubeChannel from '../../components/youtubeChannel/YoutubeChannel';
import { isLogged, logout } from '../../storage/storageManager';

import './HomePage.scss';

const HomePage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [youtubeData, setYoutubeData] = useState(null);

  const fetchYoutubeData = async () => {
    try {
      const youtubeDataResponse = await getYoutubeData();
      setYoutubeData(youtubeDataResponse.items[0]);
    } catch (e) {
      // eslint-disable-next-line
      console.log('error while getting youtube data:', e);
      clickOnLogout();
    }
  };

  useEffect(() => {
    if (!isLogged()) {
      return;
    }

    fetchYoutubeData();
  }, []);

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

  const renderYoutubeHero = () => {
    if (!youtubeData) {
      return null;
    }

    return (
      <YoutubeChannel
        imageUrl={youtubeData.snippet.thumbnails.medium.url}
        title={youtubeData.snippet.title}
        subscriberCount={youtubeData.statistics.subscriberCount}
        videoCount={youtubeData.statistics.videoCount}
        viewCount={youtubeData.statistics.viewCount}
      />
    );
  };

  return (
    <div className="home-page">
      <Container>
        <h1>Welcome to Alfan Assignment</h1>
        {renderYoutubeButton()}
        {renderYoutubeHero()}
        {renderLogoutButton()}
      </Container>
    </div>
  );
};

export default HomePage;
