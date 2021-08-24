import React, { Component } from "react";
import Slider from "react-slick";
import image1 from '../../images/img2.jpg';
import image2 from '../../images/download.png';
import image3 from '../../images/download.jpg';
import image4 from '../../images/Ecommerce-marketing-trends-900x450.jpeg';
import image5 from '../../images/img1.jpg';
import image6 from '../../images/img3.jpg';

export default class Carousel extends Component {
  render() {
    const settings = {
      arrows: false,
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      cssEase: "linear",
      useCss: "height: 350px;"
    };
    return (
      <div className="w-full">
        <Slider {...settings}>
          <div>
            <img src={image1} alt="alternative string" className="carousel-size" />
          </div>
          <div>
            <img src={image2} alt="alternative string" className="carousel-size" />
          </div>
          <div>
            <img src={image3} alt="alternative string" className="carousel-size" />
          </div>
          <div>
            <img src={image4} alt="alternative string" className="carousel-size" />
          </div>
          <div>
            <img src={image5} alt="alternative string" className="carousel-size" />
          </div>
          <div>
            <img src={image6} alt="alternative string" className="carousel-size" />
          </div>
        </Slider>
      </div>
    );
  }
}