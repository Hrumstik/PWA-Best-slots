import Slider from "react-slick";
import firstScreen from "../../../public/images/firstScreen.webp";
import secondScreen from "../../../public/images/secondScreen.webp";
import thirdScreen from "../../../public/images/trirdScreen.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ScreenContainer, ScreenWrapperItem, SliderContainer } from "../styles";

export default function ContentSlider() {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <SliderContainer>
      <div className="slider-container">
        <Slider {...settings}>
          <ScreenWrapperItem>
            <ScreenContainer>
              <img
                src={firstScreen}
                width={1080}
                height={1920}
                alt="First screen"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </ScreenContainer>
          </ScreenWrapperItem>

          <ScreenWrapperItem>
            <ScreenContainer>
              <img
                src={secondScreen}
                width={1080}
                height={1920}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
                alt="Second screen"
              />
            </ScreenContainer>
          </ScreenWrapperItem>

          <ScreenWrapperItem>
            <ScreenContainer>
              <img
                src={thirdScreen}
                width={1080}
                height={1920}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
                alt="Third screen"
              />
            </ScreenContainer>
          </ScreenWrapperItem>
        </Slider>
      </div>
    </SliderContainer>
  );
}
