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
import useGetDetailPlaylist from "@/hooks/api/useGetDetailPlaylist";
import useHandlePlayMusic from "@/hooks/handle/useHandlePlayMusic";
const cx = classNames.bind(styles);
interface MHSectionPlaylistProps {
  dataSectionPlaylist: ISectionPlaylist;
  show?: boolean;
  hide?: boolean;
  top100?: boolean;
  playlist?: ISectionPlaylist[];
}

function MHSectionPlaylist({
  dataSectionPlaylist,
  hide,
  top100,
  playlist,
}: MHSectionPlaylistProps) {
  const {
    encodeIdPlaylist,
    setEncodeIdPlaylist,
    setEncodeIdSong,
    setActivePlay,
    setPlaylistContext,
    setIndexSong,
    activePlaylist,
    setActivePlaylist,
    setPlaylistHub,
  } = useContext(MusicContext);
  const { data: getDataPlaylist, isValidating } = useGetDetailPlaylist();
  const { handlePlayMusicPlaylist, handleSaveMusicLocalStorage } =
    useHandlePlayMusic();
  //Set encodeIdPlaylist để chuyển qua page album
  const handleGetEncodeId = (encodeId: string) => {
    setEncodeIdPlaylist(encodeId);
    localStorage.setItem("encodeIdAlbum", JSON.stringify(encodeId));
  };

  const handlePlayMusicSectionPlaylist = (encodeIdPlaylist: string) => {
    if (!getDataPlaylist) return null;
    const playlist = getDataPlaylist?.data?.song?.items;
    const encodeIdPlaylistData = getDataPlaylist?.data?.encodeId;
    const encodeIdSong = playlist[0]?.encodeId;
    const currentIndex = 0;
    const currentSong = playlist[0];
    handlePlayMusicPlaylist(
      encodeIdPlaylist,
      encodeIdPlaylistData,
      encodeIdSong,
      currentIndex,
      playlist
    );
    handleSaveMusicLocalStorage(currentSong, playlist, encodeIdSong, 0);
  };

  // Set encodeId Song và encodeId Playlist vào useContext
  useEffect(() => {
    if (encodeIdPlaylist && getDataPlaylist && !isValidating) {
      const firstSongId = getDataPlaylist?.data?.song?.items[0]?.encodeId;
      const playlist = getDataPlaylist?.data?.song?.items;
      const currentSong = playlist[0];

      if (firstSongId) {
        setEncodeIdSong(firstSongId);
        setPlaylistContext(playlist ?? []);
        handleSaveMusicLocalStorage(currentSong, playlist, firstSongId, 0);
      }
    }
  }, [
    encodeIdPlaylist,
    getDataPlaylist,
    handleSaveMusicLocalStorage,
    isValidating,
    setEncodeIdSong,
    setPlaylistContext,
  ]);
  const handleChangPageHub = (value: string) => {
    setPlaylistHub(value);
  };
  return (
    <div className={cx("wrapper")}>
      {!hide && (
        <div className={cx("mh-section-header")}>
          <h2 className={cx("title")}>{dataSectionPlaylist?.title}</h2>
          {dataSectionPlaylist?.items &&
            dataSectionPlaylist?.items?.length > 5 && (
              <Link
                href={"/Pages/Hub"}
                onClick={() => handleChangPageHub(dataSectionPlaylist?.title)}
                className={cx("btn-all")}
              >
                Tất cả {`>`}
              </Link>
            )}
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
                          onClick={(e) =>
                            handlePlayMusicSectionPlaylist(e.currentTarget.id)
                          }
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
                          onClick={(e) =>
                            handlePlayMusicSectionPlaylist(e.currentTarget.id)
                          }
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
