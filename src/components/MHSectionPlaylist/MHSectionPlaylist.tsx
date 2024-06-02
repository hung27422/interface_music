import classNames from "classnames/bind";
import styles from "./MHSectionPlaylist.module.scss";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { InfoSong, ISectionPlaylist } from "@/Interfaces/Interface";
import { useContext, useEffect, useState } from "react";
import { url } from "inspector";
import { MusicContext } from "../ContextMusic/ContextMusic";
import Link from "next/link";
import useGetDetailPlaylist from "@/hooks/useGetDetailPlaylist";
const cx = classNames.bind(styles);
interface MHSectionPlaylistProps {
  dataSectionPlaylist: ISectionPlaylist;
  show?: boolean;
  hide?: boolean;
  top100?: boolean;
}

function MHSectionPlaylist({
  dataSectionPlaylist,
  show,
  hide,
  top100,
}: MHSectionPlaylistProps) {
  const { isValidating } = useGetDetailPlaylist();
  const {
    encodeIdPlaylist,
    setEncodeIdPlaylist,
    encodeIdSong,
    setEncodeIdSong,
    activePlay,
    setActivePlay,
    setPlaylistContext,
    getDataPlaylist,
    setIndexSong,
    activePlaylist,
    setActivePlaylist,
  } = useContext(MusicContext);

  //Set encodeIdPlaylist để chuyển qua page album
  const handleGetEncodeId = (encodeId: string) => {
    setEncodeIdPlaylist(encodeId);
    localStorage.setItem("encodeIdAlbum", JSON.stringify(encodeId));
  };

  const handlePlayMusic = (encodeIdPlaylist1: string) => {
    setActivePlay(false);
    const currentIndex = 0;
    setEncodeIdPlaylist(encodeIdPlaylist1);
    const playlist = getDataPlaylist?.data?.song?.items;
    console.log("playlist", playlist);
    const idPlaylist = getDataPlaylist?.data?.encodeId;
    if (!playlist) {
      console.error("Playlist is undefined.");
      return;
    }
    const firstSongId = playlist[0]?.encodeId;
    //Xử lý phát dừng nhạc, lưu lịch sử phát nhạc
    if (idPlaylist === encodeIdPlaylist1) {
      setActivePlaylist(!activePlaylist);
    } else {
      setActivePlaylist(true);
    }
    setIndexSong(currentIndex ?? 0);
    localStorage.setItem("currentSong", JSON.stringify(playlist[0]));
    localStorage.setItem("currentPlaylist", JSON.stringify(playlist));
    localStorage.setItem("encodeId", JSON.stringify(firstSongId));
  };
  // Set encodeId Song và encodeId Playlist vào useContext
  useEffect(() => {
    if (encodeIdPlaylist && getDataPlaylist && !isValidating) {
      const firstSongId = getDataPlaylist?.data?.song?.items[0]?.encodeId;
      const playlist = getDataPlaylist?.data?.song?.items;
      if (firstSongId) {
        setEncodeIdSong(firstSongId);
        setPlaylistContext(playlist ?? []);
        localStorage.setItem("currentSong", JSON.stringify(playlist[0]));
        localStorage.setItem("currentPlaylist", JSON.stringify(playlist));
        localStorage.setItem("encodeId", JSON.stringify(firstSongId));
      }
    }
  }, [
    encodeIdPlaylist,
    getDataPlaylist,
    isValidating,
    setEncodeIdSong,
    setPlaylistContext,
  ]);

  return (
    <div className={cx("wrapper")}>
      {!hide && (
        <div className={cx("mh-section-header")}>
          <h2 className={cx("title")}>{dataSectionPlaylist?.title}</h2>
          <button className={cx("btn-all")}>Tất cả {`>`}</button>
        </div>
      )}
      <div className={cx("mh-container")}>
        {!top100
          ? dataSectionPlaylist?.items
              ?.slice(0, 5)
              .map((item: ISectionPlaylist, index: number) => {
                return (
                  <div key={index} className={cx("body")}>
                    <div className={cx("img-hover")}>
                      <div className={cx("size-image")}>
                        <Link
                          href={"/Pages/Album"}
                          id={item.encodeId}
                          data-value={item}
                          onClick={(e) => handleGetEncodeId(e.currentTarget.id)}
                          className={cx("avatar")}
                          style={{
                            backgroundImage: `url(${item?.thumbnailM})`,
                          }}
                        ></Link>
                      </div>
                      <div
                        className={cx(
                          activePlaylist &&
                            getDataPlaylist?.data?.encodeId === item?.encodeId
                            ? "show-action"
                            : "action"
                        )}
                      >
                        <Tippy content="Thêm vào thư viện">
                          <button className={cx("btn-heart", "btn-icon")}>
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                          </button>
                        </Tippy>
                        <button
                          id={item.encodeId}
                          onClick={(e) => handlePlayMusic(e.currentTarget.id)}
                          className={cx("btn-play")}
                        >
                          {activePlaylist &&
                          getDataPlaylist?.data?.encodeId === item?.encodeId ? (
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
                        <Tippy content="Khác">
                          <button className={cx("btn-menu", "btn-icon")}>
                            <FontAwesomeIcon
                              icon={faEllipsis}
                            ></FontAwesomeIcon>
                          </button>
                        </Tippy>
                      </div>
                    </div>
                    <div className={cx("description")}>
                      {item.sortDescription !== "" ? (
                        <span className={cx("content-des")}>
                          {truncateTitle(item?.sortDescription, 50)}
                        </span>
                      ) : (
                        <div className={cx("info-des")}>
                          <span className={cx("content-des")}>
                            {item?.title}
                          </span>
                          <span className={cx("content-des")}>
                            {item?.artistsNames}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
          : dataSectionPlaylist?.items?.map(
              (item: ISectionPlaylist, index: number) => {
                return (
                  <div key={index} className={cx("body")}>
                    <div className={cx("img-hover")}>
                      <div className={cx("size-image")}>
                        <Link
                          href={"/Pages/Album"}
                          id={item.encodeId}
                          onClick={(e) => handleGetEncodeId(e.currentTarget.id)}
                          className={cx("avatar")}
                          style={{
                            backgroundImage: `url(${item?.thumbnailM})`,
                          }}
                        ></Link>
                      </div>
                      <div
                        className={cx(
                          activePlaylist &&
                            getDataPlaylist?.data?.encodeId === item?.encodeId
                            ? "show-action"
                            : "action"
                        )}
                      >
                        <Tippy content="Thêm vào thư viện">
                          <button className={cx("btn-heart", "btn-icon")}>
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                          </button>
                        </Tippy>
                        <button
                          id={item.encodeId}
                          onClick={(e) => handlePlayMusic(e.currentTarget.id)}
                          className={cx("btn-play")}
                        >
                          {activePlaylist &&
                          getDataPlaylist?.data?.encodeId === item?.encodeId ? (
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
                        <Tippy content="Khác">
                          <button className={cx("btn-menu", "btn-icon")}>
                            <FontAwesomeIcon
                              icon={faEllipsis}
                            ></FontAwesomeIcon>
                          </button>
                        </Tippy>
                      </div>
                    </div>
                    <div className={cx("description")}>
                      {item.sortDescription !== "" ? (
                        <span className={cx("content-des")}>
                          {truncateTitle(item?.sortDescription, 50)}
                        </span>
                      ) : (
                        <div className={cx("info-des")}>
                          <span className={cx("content-des")}>
                            {item?.title}
                          </span>
                          <span className={cx("content-des")}>
                            {item?.artistsNames}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
            )}
      </div>
    </div>
  );
}

export default MHSectionPlaylist;
const truncateTitle = (title: string, maxLength: number) => {
  if (title.length <= maxLength) {
    return title;
  }
  return title.substring(0, maxLength) + "...";
};
function setIdSongAndPlaylist(
  setEncodeIdPlaylist: any,
  encodeIdPlaylist1: string,
  setEncodeIdSong: any,
  idSong: any
) {
  setEncodeIdPlaylist(encodeIdPlaylist1);
  console.log("encodeIdPlaylist1", encodeIdPlaylist1);
  setEncodeIdSong(idSong);
}
