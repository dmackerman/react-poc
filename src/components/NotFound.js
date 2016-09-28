import React from 'react';

const NotFound = ({ location }) => (
  <div className="page">
    <h2>Whoops</h2>
    <p>Sorry but {location.pathname} didn’t match any pages</p>
  </div>
);

export default NotFound;
