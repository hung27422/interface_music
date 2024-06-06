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
import { useContext, useEffect, useRef, useState } from "react";
import useFormatDuration from "../../hooks/useFormatDuration";
import { MusicContext } from "../ContextMusic/ContextMusic";
import { toast } from "react-toastify";
import MenuMediaSong from "./MenuMediaSong/MenuMediaSong";
const cx = classNames.bind(styles);
interface MediaSongProps {
  data: InfoSong;
  control?: string;
  trending?: boolean;
  zingChart?: string;
  weekly?: boolean;
  index?: number;
  playlist?: InfoSong[];
  releaseDate?: boolean;
}
function MediaSong({
  data,
  control,
  trending,
  zingChart,
  weekly,
  index,
  playlist,
  releaseDate,
}: MediaSongProps) {
  const notify = (title: string) =>
    toast(
      <>
        Bạn hãy đăng ký VIP để nghe bài <br></br>
        <span style={{ color: "var(--text-color)", fontWeight: "700" }}>
          {title}
        </span>{" "}
        nhé ^.^
      </>
    );

  const duration = useFormatDuration(data?.duration);
  const {
    encodeIdSong,
    setEncodeIdSong,
    activePlay,
    setActivePlay,
    setIndexSong,
    setPlaylistContext,
    setActivePlaylist,
  } = useContext(MusicContext);
  const handlePlayMusic = (encodeId: string) => {
    if (data?.streamingStatus === 2) {
      notify(data?.title);
    }
    setEncodeIdSong(encodeId);
    if (encodeId === encodeIdSong) {
      setActivePlay(!activePlay);
    } else {
      setEncodeIdSong(encodeId);
      setActivePlay(true);
    }
    setActivePlaylist(false);
    setIndexSong(index ?? 0);
    setPlaylistContext(playlist ?? []);
    localStorage.setItem("currentSong", JSON.stringify(data));
    localStorage.setItem("currentPlaylist", JSON.stringify(playlist));
    localStorage.setItem("encodeId", JSON.stringify(encodeId));
    localStorage.setItem("indexSong", JSON.stringify(index));
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
          {data?.thumbnailM && (
            <Image
              src={data.thumbnailM}
              alt="image-song"
              width={trending || weekly ? 40 : 64}
              height={trending || weekly ? 40 : 64}
              className={cx("image-song", trending && "trending")}
            />
          )}
          {!control && (
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
                  className={cx("icon-play")}
                ></Image>
              ) : (
                <FontAwesomeIcon className={cx("icon-pause")} icon={faPlay} />
              )}

              <div className={cx("space")}></div>
              <div className={cx("space")}></div>
            </div>
          )}
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
          {releaseDate && !trending && (
            <span className={cx("name-singer", weekly && "hide")}>
              {dateRelease(data?.releaseDate)}
            </span>
          )}
        </div>
      </div>
      {trending && !weekly && releaseDate ? (
        <div className={cx("media-middle", trending && "trending")}>
          <span className={cx("title-album")}>
            {dateRelease(data?.releaseDate)}
          </span>
        </div>
      ) : (
        <div
          style={{
            display: control || (weekly && trending) ? "none" : "block",
          }}
          className={cx("media-middle", trending && "trending")}
        >
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
              <MenuMediaSong data={data} />
              {/* <FontAwesomeIcon className={cx("level-item")} icon={faEllipsis} /> */}
            </Tippy>
          </div>
        </>
      ) : (
        <div className={cx("media-right", { control })}>
          <Tippy content="Thêm vào thư viện">
            <FontAwesomeIcon className={cx("level-item")} icon={faHeart} />
          </Tippy>
          <Tippy content="Khác">
            <MenuMediaSong data={data} />
          </Tippy>
        </div>
      )}
    </div>
  );
}

export default MediaSong;
const dateRelease = (timestamp: number): string => {
  const date: any = new Date(timestamp * 1000);
  const now: any = new Date();
  const differenceInDays: number = Math.floor(
    (now - date) / (1000 * 60 * 60 * 24)
  );
  let vietnamesePhrase: any;

  if (differenceInDays === 0) {
    vietnamesePhrase = "Hôm nay"; // Today
  } else if (differenceInDays === 1) {
    vietnamesePhrase = "Ngày hôm qua"; // Yesterday
  } else if (differenceInDays === 2) {
    vietnamesePhrase = "Hôm kia"; // The day before yesterday
  } else if (differenceInDays > 2) {
    // For days beyond 2, you can use a more generic phrase like "Cách đây X ngày" (X days ago)
    vietnamesePhrase = `Cách đây ${differenceInDays} ngày`;
  }
  return vietnamesePhrase;
};
