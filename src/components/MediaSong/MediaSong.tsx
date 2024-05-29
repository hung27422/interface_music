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
import { InfoSong } from "../../Interfaces/Interface";
import { useContext, useEffect, useState } from "react";
import useFormatDuration from "../hooks/useFormatDuration";
import { MusicContext } from "../ContextMusic/ContextMusic";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
interface MediaSongProps {
  data: InfoSong;
  control?: string;
  trending?: boolean;
  zingChart?: string;
  weekly?: boolean;
  index?: number;
  playlist?: InfoSong[];
}
function MediaSong({
  data,
  control,
  trending,
  zingChart,
  weekly,
  index,
  playlist,
}: MediaSongProps) {
  const duration = useFormatDuration(data?.duration);
  const notify = () => toast("Bạn hãy đăng ký VIP để nghe bài này nhé ^.^");
  const {
    encodeIdSong,
    setEncodeIdSong,
    activePlay,
    setActivePlay,
    setIndexSong,
    setPlaylistContext,
  } = useContext(MusicContext);

  const handlePlayMusic = (encodeId: string) => {
    if (data?.streamingStatus === 2) {
      notify();
    } else {
      setEncodeIdSong(encodeId);
      setActivePlay(!activePlay);
      setIndexSong(index ?? 0);
      setPlaylistContext(playlist ?? []);
    }
  };
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
          weekly && "weekly"
        )}
      >
        <div className={cx("box-media")}>
          <Image
            src={data?.thumbnailM}
            alt="image-song"
            width={trending || weekly ? 40 : 60}
            height={trending || weekly ? 40 : 60}
            className={cx("image-song", trending && "trending")}
          ></Image>
          <div
            id={data?.encodeId}
            onClick={(e) => handlePlayMusic(e.currentTarget.id)}
            className={cx(
              "btn-icon-play",
              { control },
              activePlay && encodeIdSong === data?.encodeId && "icon-play"
            )}
          >
            {activePlay && encodeIdSong === data?.encodeId ? (
              <Image
                src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
                alt="icon-play"
                width={26}
                height={26}
                // className={cx("icon-play")}
              ></Image>
            ) : (
              <FontAwesomeIcon className={cx("icon-pause")} icon={faPlay} />
            )}

            <div className={cx("space")}></div>
            <div className={cx("space")}></div>
          </div>
        </div>
        <div className={cx("media-info")}>
          <div className={cx("premium")}>
            <div className={cx("name-song")}>{data?.title}</div>
            {data?.streamingStatus === 2 && (
              <span className={cx("premium-name")}>PREMIUM</span>
            )}
          </div>
          <span className={cx("name-singer", weekly && "hide")}>
            {data?.artistsNames}
          </span>
        </div>
      </div>
      {trending && !weekly && (
        <div className={cx("media-middle", trending && "trending")}>
          <span className={cx("title-album")}>{data?.album?.title}</span>
        </div>
      )}
      {trending ? (
        <>
          <span className={cx("media-duration")}>{duration}</span>
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
