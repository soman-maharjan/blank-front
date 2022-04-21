import React, { Component } from "react";
import Slider from "react-slick";
import axios from "axios";
import {Skeleton} from "@mui/material";

export default class Carousel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      images: [],
      loading : true
    }
  }

  componentDidMount() {
    axios.get('/api/ad/active-ad')
      .then(response => this.setState({ images: response.data.filter(i => i.position == 'carousel'), loading : false }))
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
      autoplaySpeed: 5000,
      cssEase: "linear",
      useCss: "height: 350px;"
    };

    const img = this.state.images.map((i, index) =>
      <div className="outline-none focus:outline-none" key={index}>
        <img src={`${process.env.REACT_APP_IMAGE_URL}${i.filename}`} alt="Carousel" className="carousel-size outline-none focus:outline-none" />
      </div>
    )

    return (
      <div className="w-full">
        <Slider {...settings}>
          {this.state.loading ? <Skeleton variant="rectangular" height={300}/> :img}
        </Slider>
      </div>
    );
  }
}