import React from "react";
import Image from "mui-image";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export default function Carousel() {
  const options = {
    loop: true,
    margin: 10,
    items: 1,
    autoplay: true,
  };
  return (
    <React.Fragment>
      <OwlCarousel className="owl-theme" {...options}>
        <div className="item">
          <Image
            src="https://cdn.pixabay.com/photo/2019/04/24/14/01/car-4152191_960_720.jpg"
            height={400}
            showLoading
            
          />
        </div>
        <div className="item">
          <Image
            src="https://cdn.pixabay.com/photo/2016/11/22/23/44/porsche-1851246_960_720.jpg"
            height={400}
            showLoading
            
          />
        </div>
        <div className="item">
          <Image
            src="https://cdn.pixabay.com/photo/2014/01/04/13/34/taxi-238478_960_720.jpg"
            height={400}
            showLoading
            
          />
        </div>
      </OwlCarousel>
    </React.Fragment>
  );
}
