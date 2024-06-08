import classNames from "classnames/bind";
import styles from "./SliderTrending.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { ITrending, InfoSong } from "@/Interfaces/Interface";
import useFormatDate from "../../hooks/format/useFormatDate";
import { useContext } from "react";
import { MusicContext } from "../ContextMusic/ContextMusic";
import useHandlePlayMusic from "@/hooks/handle/useHandlePlayMusic";
const cx = classNames.bind(styles);
interface ItemSliderProps {
  data: InfoSong;
  NO: number;
  playlist?: InfoSong[];
  index: number;
}
function ItemSlider({ data, NO, playlist, index }: ItemSliderProps) {
  const { encodeIdSong, activePlay } = useContext(MusicContext);
  const dateNow = useFormatDate(data?.releaseDate);
  const { handlePlayMusic, handleSaveMusicLocalStorage } = useHandlePlayMusic();
  const handlePlayMusicItemSlider = (encodeId: string) => {
    handlePlayMusic(encodeId, index, playlist);
    handleSaveMusicLocalStorage(data, playlist, encodeId, index);
  };
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
        <button
          id={data?.encodeId}
          onClick={(e) => handlePlayMusicItemSlider(e.currentTarget.id)}
          className={cx(
            activePlay && encodeIdSong === data?.encodeId
              ? "show-btn-play"
              : "btn-play"
          )}
        >
          {activePlay && encodeIdSong === data?.encodeId ? (
            <Image
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
              alt="icon-play"
              width={26}
              height={26}
              className={cx("icon-play")}
            ></Image>
          ) : (
            <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
          )}
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
