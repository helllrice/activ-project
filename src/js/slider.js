import $ from 'jquery';
import 'slick-carousel';

const slider = () => {
    $('.slider').slick({
        arrows: false,
        autoplay: true,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        fade: true,
        speed: 600,
     });    
};

export default slider;

