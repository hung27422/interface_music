import classNames from "classnames/bind";
import styles from "./SliderTrending.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { ITrending } from "@/Interfaces/Interface";
import FuncDate from "../hooks/useFormatDate";
const cx = classNames.bind(styles);
interface ItemSliderProps {
  data: ITrending;
  NO: number;
}
function ItemSlider({ data, NO }: ItemSliderProps) {
  const dateNow = FuncDate(data?.releaseDate);
  return (
    <div className={cx("wrapper-item")}>
      <div className={cx("slider-item-content")}>
        <Image
          src={data.thumbnailM}
          alt="slider-item"
          width={120}
          height={120}
          className={cx("slider-item-img")}
        ></Image>
        <button className={cx("btn-play", "btn-icon")}>
          <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
        </button>
        <div className={cx("slider-item-info")}>
          <div className={cx("info-song")}>
            <span className={cx("name-song")}>{data?.title}</span>
            <span className={cx("name-artists")}>{data?.artistsNames}</span>
          </div>
          <div className={cx("space")}></div>
          <div className={cx("info-des-song")}>
            <span className={cx("info-top-song")}>#{NO + 1}</span>
            <span className={cx("info-date-song")}>{dateNow}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemSlider;
