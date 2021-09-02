import React from "react";
import Slider from "react-slick";
import ProductCard from './ProductCard';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <ChevronRightIcon className={`chevron-icon` + className} aria-hidden="true" onClick={onClick} />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <ChevronLeftIcon className={`chevron-icon` + className} aria-hidden="true" onClick={onClick} />
    );
}

const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
};

export default function ProductCarousel(props) {
    const carousel = props.products.map((product, index) => (product.category === props.title ? <ProductCard key={index} product={product} /> : null));
    return (
        <div className="mx-24">
            <h2 className="ml-2 text-xl flex mt-5 font-semibold">{props.title}</h2>
            <Slider {...settings}>
                {carousel}
            </Slider>
        </div>
    )
}
