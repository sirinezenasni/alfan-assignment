import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import Container from '../../components/container/Container';
import { googleLogin } from '../../api/users/usersApi';

const Oauth2CallbackPage = () => {
  const location = useLocation();
  const { code } = queryString.parse(location.search);

  const googleLoginProcessing = async () => {
    console.log('code:', code);
    try {
      const jwt = await googleLogin(code);
      console.log('jwt:', jwt);
    } catch (e) {
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
