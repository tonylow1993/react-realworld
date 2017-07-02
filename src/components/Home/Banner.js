import React from 'react';
import '../../assets/css/banner.css';

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }
  return (
    <div>
      <div className="cover">
        <div className="bg"></div>
        <div className="title">
          <div className="logo"></div>
          <div className="text">Got Challenges</div>
          <div className="desc">
            "Don't limit your challenges. <b>Challenge your limits.</b>"
          </div>
        </div>
      </div>

      <div className="social">
        <a href="/"  target="_blank">Facebook</a>
        <a href="/"  target="_blank">Instagram</a>
        <a href="/" target="_blank">G+</a>
      </div>
    </div>
  );
};

export default Banner;
