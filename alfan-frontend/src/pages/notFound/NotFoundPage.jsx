import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <div>Sorry, that page doesn't exist!</div>
    <div><Link to="/">Home</Link></div>
  </div>
);

export default NotFoundPage;
