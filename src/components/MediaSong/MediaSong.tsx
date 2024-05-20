import classNames from "classnames/bind";
import styles from "./MediaSong.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faHeart,
  faMicrophone,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import { ITrending, InfoSong } from "../../Interfaces/Interface";
import { useEffect } from "react";
import { Span } from "next/dist/trace";
const cx = classNames.bind(styles);
interface MediaSongProps {
  data: InfoSong;
  control?: string;
  trending?: boolean;
  zingChart?: string;
  weekly?: boolean;
}
function MediaSong({
  data,
  control,
  trending,
  zingChart,
  weekly,
}: MediaSongProps) {
  return (
    <div
      className={cx(
        "wrapper",
        { control },
        { zingChart },
        trending && "trending",
        weekly && "weekly"
      )}
    >
      <div
        className={cx(
          "media-left",
          { control },
          trending && "trending",
          weekly && "weeklyL"
        )}
      >
        <div className={cx("box-media")}>
          <Image
            src={data?.thumbnailM}
            alt="image-song"
            width={trending ? 40 : 60}
            height={trending ? 40 : 60}
            className={cx("image-song", trending && "trending")}
          ></Image>
          <div className={cx("icon-play", { control })}>
            <FontAwesomeIcon icon={faPlay} />
            <div className={cx("space")}></div>
            {/* <Image
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
              alt="icon-play"
              width={16}
              height={16}
            ></Image> */}
            <div className={cx("space")}></div>
          </div>
        </div>
        <div className={cx("media-info")}>
          <h3 className={cx("name-song")}>{data?.title}</h3>
          <span className={cx("name-singer", weekly && "hide")}>
            {data?.artistsNames}
          </span>
        </div>
      </div>
      {trending && !weekly && (
        <div className={cx("media-middle")}>
          <span>{data?.artistsNames}</span>
        </div>
      )}
      {trending ? (
        <>
          <span className={cx("media-duration")}>2:55</span>
          <div className={cx("media-right", { control }, weekly && "weekly")}>
            <Tippy content="Xem lời bài hát">
              <FontAwesomeIcon
                className={cx("level-item")}
                icon={faMicrophone}
              />
            </Tippy>
            {!weekly && (
              <Tippy content="Thêm vào thư viện">
                <FontAwesomeIcon className={cx("level-item")} icon={faHeart} />
              </Tippy>
            )}
            <Tippy content="Khác">
              <FontAwesomeIcon className={cx("level-item")} icon={faEllipsis} />
            </Tippy>
          </div>
        </>
      ) : (
        <div className={cx("media-right", { control })}>
          <Tippy content="Thêm vào thư viện">
            <FontAwesomeIcon className={cx("level-item")} icon={faHeart} />
          </Tippy>
          <Tippy content="Khác">
            <FontAwesomeIcon className={cx("level-item")} icon={faEllipsis} />
          </Tippy>
        </div>
      )}
    </div>
  );
}

export default MediaSong;
