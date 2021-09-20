import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Container from '../../components/container/Container';
import { authGoogle } from '../../api/auth/authApi';

const Oauth2CallbackPage = () => {
  const location = useLocation();

  const googleLoginProcessing = async () => {
    try {
      const jwt = await authGoogle(location.search);
      console.log('jwt:', jwt);
      // TODO: store jwt in local storage and use as bearer token
    } catch (e) {
      // eslint-disable-next-line
      console.log('error on google login:', e);
    }
  };

  useEffect(() => {
    googleLoginProcessing();
  }, []);

  return (
    <div className="home-page">
      <Container>
        <h1>Login... Please wait</h1>
      </Container>
    </div>
  );
};

export default Oauth2CallbackPage;
