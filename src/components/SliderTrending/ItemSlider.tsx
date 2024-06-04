import classNames from "classnames/bind";
import styles from "./SliderTrending.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { ITrending, InfoSong } from "@/Interfaces/Interface";
import useFormatDate from "../../hooks/useFormatDate";
import { useContext } from "react";
import { MusicContext } from "../ContextMusic/ContextMusic";
const cx = classNames.bind(styles);
interface ItemSliderProps {
  data: ITrending;
  NO: number;
  playlist?: ITrending[];
  index: number;
}
function ItemSlider({ data, NO, playlist, index }: ItemSliderProps) {
  const {
    encodeIdSong,
    setEncodeIdSong,
    activePlay,
    setActivePlay,
    setIndexSong,
    setPlaylistContext,
  } = useContext(MusicContext);
  const dateNow = useFormatDate(data?.releaseDate);

  const handlePlayMusic = (encodeId: string) => {
    setEncodeIdSong(encodeId);
    setActivePlay(!activePlay);
    if (encodeId === encodeIdSong) {
      setActivePlay(!activePlay);
    } else {
      setActivePlay(true);
    }
    setPlaylistContext(playlist ?? []);
    setIndexSong(index);
    localStorage.setItem("currentSong", JSON.stringify(data));
    localStorage.setItem("currentPlaylist", JSON.stringify(playlist));
    localStorage.setItem("encodeId", JSON.stringify(encodeId));
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
          onClick={(e) => handlePlayMusic(e.currentTarget.id)}
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
