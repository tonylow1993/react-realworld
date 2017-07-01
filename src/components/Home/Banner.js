import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slick1 from '../../assets/img/slick-1.jpg';
import slick2 from '../../assets/img/slick-2.jpg';

const Banner = ({ appName, token }) => {
  if (token) {
    return null;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    fade: true,
    lazyLoad: true,
    swipe: false,
  }; 

  return (
    <Slider {...settings}>
      <div><img src={slick1}/></div>
      <div><img src={slick2}/></div>
    </Slider>
  );
};

export default Banner;
