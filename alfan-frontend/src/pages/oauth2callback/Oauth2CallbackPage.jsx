import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

import Container from '../../components/container/Container';

const Oauth2CallbackPage = () => {
  const location = useLocation();
  const { code } = queryString.parse(location.search);

  const login = async () => {
    console.log('code:', code);
  };

  useEffect(() => {
    login();
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
