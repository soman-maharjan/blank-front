import {useEffect, useState} from "react";
import Slider from "react-slick";
import ProductCard from './ProductCard';
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/outline'
import axios from "axios";
import {Skeleton, Stack} from "@mui/material";

function SampleNextArrow(props) {
    const {className, style, onClick} = props;
    return (
        <ChevronRightIcon className={`chevron-icon` + className} aria-hidden="true" onClick={onClick}/>
    );
}

function SamplePrevArrow(props) {
    const {className, style, onClick} = props;
    return (
        <ChevronLeftIcon className={`chevron-icon` + className} aria-hidden="true" onClick={onClick}/>
    );
}

const settings = {
    arrows: true,
    dots: false,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>,
};


export default function ProductCarousel(props) {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(props.url)
            .then(response => {
                setProducts(response.data)
                setLoading(false)
            })
            .catch(error => console.log(error.response))
    }, []);

    const carousel = products.map((product, index) =>
        <ProductCard key={index} product={product}/>);

    const load = (
        <div className="mt-2 px-2">
            <Stack spacing={1}>
                <Skeleton variant="rectangular" height={180}/>
                <Skeleton variant="text"/>
            </Stack>

            <br/>
            <Skeleton variant="text"/>
            <Skeleton variant="text"/>
        </div>
    )

    let loadPlaceholder = [];
    for (let i = 0; i < 8; i++) {
        loadPlaceholder.push(load);
    }

    return (
        <div className="mx-24 mb-7">
            <h2 className="ml-2 text-xl flex mt-5 font-semibold">{props.title}</h2>
            <Slider {...settings}>
                {loading ? loadPlaceholder : carousel}
            </Slider>
        </div>
    )
}

