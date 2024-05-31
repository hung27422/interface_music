import Slider from "react-slick";
import classNames from "classnames/bind";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./Slider.module.scss";
import Image from "next/image";
import useDataHome from "../../hooks/useDataHome";
interface Item {
  sectionType: string;
  items: Item[];
  link: string;
  banner: string;
}
const cx = classNames.bind(styles);
function SliderItem() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const { data } = useDataHome();

  const bannerItems = data?.data.items.filter(
    (item: Item) => item.sectionType === "banner"
  );
  return (
    <Slider {...settings} className={cx("wrapper")}>
      {bannerItems?.map((item: Item, index: any) =>
        item.items?.map((subItem: Item, index: any) => {
          return (
            <div key={index} className={cx("slider-item")}>
              <Image
                src={subItem.banner}
                className={cx("image-slider")}
                alt="slider"
                width={374}
                height={210}
              />
            </div>
          );
        })
      )}
    </Slider>
  );
}
export default SliderItem;
