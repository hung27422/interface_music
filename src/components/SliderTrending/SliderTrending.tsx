import Slider from "react-slick";
import classNames from "classnames/bind";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./SliderTrending.module.scss";
import ItemSlider from "./ItemSlider";
import useDataHome from "../../hooks/api/useDataHome";
import { ITrending } from "@/Interfaces/Interface";
import { useEffect } from "react";

const cx = classNames.bind(styles);
interface SliderItemProps {
  data: ITrending;
}
function SliderItem({ data }: SliderItemProps) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 30000,
  };

  return (
    <Slider {...settings} className={cx("wrapper")}>
      {data?.items?.map((item: ITrending, index: number) => {
        return (
          <div key={index} className={cx("item-slider")}>
            <ItemSlider
              playlist={data?.items}
              index={index}
              data={item}
              NO={index}
            />
          </div>
        );
      })}
    </Slider>
  );
}
export default SliderItem;
