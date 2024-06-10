import Slider from "react-slick";
import classNames from "classnames/bind";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./Slider.module.scss";
import Image from "next/image";
import useDataHome from "../../hooks/api/useDataHome";
import { MusicContext } from "../ContextMusic/ContextMusic";
import { useContext } from "react";
import useHandlePlayMusic from "@/hooks/handle/useHandlePlayMusic";
import { InfoSong } from "@/Interfaces/Interface";
import useGetDataInfoSong from "@/hooks/api/useGetDataInfoSong";
interface Item {
  sectionType: string;
  items: Item[];
  link: string;
  banner: string;
  encodeId: string;
  type: number;
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
  const { data: dataSong } = useGetDataInfoSong();

  const { handlePlayMusic, handleSaveMusicLocalStorage } = useHandlePlayMusic();
  const bannerItems = data?.data.items.filter(
    (item: Item) => item.sectionType === "banner"
  );

  const handlePlayMusicSlider = (
    encodeId: string,
    playlist: InfoSong[],
    index: number,
    type: number
  ) => {
    if (type === 4) return null;
    if (!dataSong) return null;
    handlePlayMusic(encodeId, index, playlist);
  };
  return (
    <Slider {...settings} className={cx("wrapper")}>
      {bannerItems?.map((item: InfoSong, index: any) =>
        item.items?.map((subItem: Item, subIndex: any) => {
          return (
            <div key={index + "-" + subIndex} className={cx("slider-item")}>
              <Image
                onClick={() =>
                  handlePlayMusicSlider(
                    subItem?.encodeId,
                    item?.items,
                    subIndex,
                    subItem?.type
                  )
                }
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
