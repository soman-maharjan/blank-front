import React, { Component } from "react";
import Slider from "react-slick";
import axios from "axios";

export default class Carousel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: []
    }
  }

  componentDidMount() {
    axios.get('/api/ad/active-ad')
      .then(response => this.setState({ images: response.data.filter(i => i.position == 'carousel') }))
      .catch(error => console.log(error))
  }
  
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

    const img = this.state.images.map(i =>
      <div className="outline-none focus:outline-none">
        <img src={`${process.env.REACT_APP_IMAGE_URL}${i.filename}`} alt="Carousel" className="carousel-size outline-none focus:outline-none" />
      </div>
    )

    return (
      <div className="w-full">
        <Slider {...settings}>
          {img}
        </Slider>
      </div>
    );
  }
}