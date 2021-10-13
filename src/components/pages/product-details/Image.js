import React, { useState } from 'react'
import Slider from 'react-slick';

function Image(props) {

    const { images } = props;

    const [image, setImage] = useState(images[0]);

    const settings = {
        infinite: images.length > 4,
        speed: 500,
        slidesToShow: 4,
        nextArrow: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>,
        prevArrow: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>,
        slidesToScroll: 2
    };

    const carousel = images.map((i, index) =>
        <div className="outline-none focus:outline-none h-15 p-1" key={index}>
            <img src={`${process.env.REACT_APP_IMAGE_URL}${i}`} onMouseEnter={() => setImage(i)} alt="Carousel" className="object-fit product-carousel-size outline-none focus:outline-none" />
        </div>
    )

    return (
        <>
            <div className="flex justify-center">
                {/* <MagnifierContainer>
                    <div className="">
                        <SideBySideMagnifier
                            imageSrc={`${process.env.REACT_APP_IMAGE_URL}${image}`}
                            imageAlt="Example"
                            alwaysInPlace="true"
                            className="max-width-unset"
                        />
                    </div>
                </MagnifierContainer> */}
                <img className="image-size" src={`${process.env.REACT_APP_IMAGE_URL}${image}`} />
            </div>
            <div className="mt-3">
                <Slider {...settings}>
                    {carousel}
                </Slider>
            </div>
        </>
    )
}

export default React.memo(Image);
