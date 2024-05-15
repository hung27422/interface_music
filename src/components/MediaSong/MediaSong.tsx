import classNames from "classnames/bind";
import styles from "./MediaSong.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import { InfoSong } from "../../Interfaces/Interface";
import { useEffect } from "react";
const cx = classNames.bind(styles);
interface MediaSongProps {
  data: InfoSong;
  control?: string;
}
function MediaSong({ data, control }: MediaSongProps) {
  return (
    <div className={cx("wrapper", { control })}>
      <div className={cx("media-left", { control })}>
        <div className={cx("box-media")}>
          <Image
            src={data?.thumbnailM}
            alt="image-song"
            width={60}
            height={60}
            className={cx("image-song")}
          ></Image>
          <div className={cx("icon-play", { control })}>
            {/* <FontAwesomeIcon icon={faPlay} /> */}
            <div className={cx("space")}></div>
            <Image
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
              alt="icon-play"
              width={16}
              height={16}
            ></Image>
            <div className={cx("space")}></div>
          </div>
        </div>
        <div className={cx("media-info")}>
          <h3 className={cx("name-song")}>{data?.title}</h3>
          <span className={cx("name-singer")}>{data?.artistsNames}</span>
        </div>
      </div>
      <div className={cx("media-right", { control })}>
        <Tippy content="Thêm vào thư viện">
          <FontAwesomeIcon className={cx("level-item")} icon={faHeart} />
        </Tippy>
        <Tippy content="Khác">
          <FontAwesomeIcon className={cx("level-item")} icon={faEllipsis} />
        </Tippy>
      </div>
    </div>
  );
}

export default MediaSong;
