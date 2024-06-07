"use client";
import classNames from "classnames/bind";
import styles from "./album.module.scss";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import MediaSong from "@/components/MediaSong/MediaSong";
import useFormatDate from "@/hooks/useFormatDate";
import { IArtist, ISectionPlaylist, InfoSong } from "@/Interfaces/Interface";
import useFormatTime from "@/hooks/useFormatTime";
import useFormatNumber from "@/hooks/useFormatNumber";
import ArtistItems from "@/components/ArtistItems/ArtistItems";
import SpinnerLoading from "@/components/SpinnerLoading/SpinnerLoading";
import { list } from "postcss";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import Image from "next/image";
import useGetDetailPlaylist from "@/hooks/useGetDetailPlaylist";
const cx = classNames.bind(styles);
function Album() {
  const {
    setAudioRandomSong,
    setAudioRepeatSong,
    setEncodeIdSong,
    setActivePlay,
    activePlay,
    setPlaylistContext,
  } = useContext(MusicContext);
  const { data: getDataPlaylist, isLoading } = useGetDetailPlaylist();
  const infoPlaylist = getDataPlaylist?.data;
  const releaseDate = getDataPlaylist?.data?.contentLastUpdate;
  const contentLastUpdate = useFormatDate(releaseDate || 0);
  const listSong = getDataPlaylist?.data?.song.items;
  const listArtist = getDataPlaylist?.data?.artists;

  const totalDuration = useFormatTime(
    getDataPlaylist?.data.song.totalDuration || 0
  );
  const like = useFormatNumber(infoPlaylist?.like || 0);

  const handlePlayMusic = () => {
    if (!listSong) return null;
    const nextIndex =
      Math.floor(Math.random() * listSong?.length) % listSong.length;
    setEncodeIdSong(listSong[nextIndex].encodeId);
    setPlaylistContext(listSong ?? []);
    setActivePlay(!activePlay);
    setAudioRandomSong(true);
    setAudioRepeatSong(false);
    localStorage.setItem("currentPlaylist", JSON.stringify(listSong));
  };
  return (
    <div className={cx("wrapper")}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <>
          <div className={cx("album-container")}>
            <div className={cx("album-detail-playlist")}>
              <div className={cx("album-detail-playlist-left")}>
                <div className={cx("img-hover")}>
                  <div className={cx("size-image")}>
                    <div
                      className={cx("avatar")}
                      style={{
                        backgroundImage: `url(${infoPlaylist?.thumbnailM})`,
                      }}
                    ></div>
                    <div className={cx(activePlay ? "show-action" : "action")}>
                      <button
                        onClick={handlePlayMusic}
                        className={cx("btn-play")}
                      >
                        {activePlay ? (
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
                    </div>
                  </div>
                </div>
                <div className={cx("playlist-left-info")}>
                  <h2 className={cx("playlist-left-info-title")}>
                    {infoPlaylist?.title}
                  </h2>
                  <span className={cx("playlist-left-info-update")}>
                    Cập nhật: {contentLastUpdate}
                  </span>
                  <span className={cx("playlist-left-info-artists")}>
                    {infoPlaylist?.artistsNames}
                  </span>
                  <span className={cx("playlist-left-info-artists")}>
                    {like} người yêu thích
                  </span>
                  <div className={cx("playlist-left-info-btn-random")}>
                    <FontAwesomeIcon
                      className={cx("playlist-left-info-btn-play")}
                      icon={faPlay}
                    ></FontAwesomeIcon>
                    <span>Tiếp tục phát</span>
                  </div>
                  <div className={cx("playlist-left-info-action")}>
                    <Tippy content="Thêm vào thư viện">
                      <FontAwesomeIcon
                        className={cx("playlist-left-info-action-item")}
                        icon={faHeart}
                      ></FontAwesomeIcon>
                    </Tippy>
                    <Tippy content="Khác">
                      <FontAwesomeIcon
                        className={cx("playlist-left-info-action-item")}
                        icon={faEllipsis}
                      ></FontAwesomeIcon>
                    </Tippy>
                  </div>
                </div>
              </div>
              <div className={cx("album-detail-playlist-right")}>
                {infoPlaylist?.description !== "" && (
                  <h3 className={cx("album-detail-playlist-right-title")}>
                    <span>Lời tựa:</span> {infoPlaylist?.description}
                  </h3>
                )}

                <div className={cx("album-detail-playlist-right-info")}>
                  <div
                    className={cx("album-detail-playlist-right-info-header")}
                  >
                    <span>BÀI HÁT</span>
                    <span style={{ marginLeft: "70px" }}>ALBUM</span>
                    <span>THỜI GIAN</span>
                  </div>
                  <div className={cx("album-detail-playlist-right-list-song")}>
                    {listSong?.map((item: InfoSong, index: number) => {
                      return (
                        <div
                          key={index}
                          className={cx(
                            "album-detail-playlist-right-item-song"
                          )}
                        >
                          <MediaSong
                            index={index}
                            data={item}
                            trending={true}
                            playlist={listSong}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className={cx("album-detail-playlist-right-info-song")}>
                    <span>{infoPlaylist?.song.total} Bài hát - </span>
                    <span>{totalDuration} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {(listArtist?.length ?? 0) > 1 && (
            <div className={cx("album-detail-artist")}>
              <h2 className={cx("album-detail-artist-title")}>
                Danh Sách Nghệ Sĩ Tham Gia
              </h2>
              <div className={cx("album-detail-list-artist")}>
                {listArtist?.map((item: IArtist, index: number) => {
                  return (
                    <div key={index} className={cx("album-detail-item-artist")}>
                      <ArtistItems data={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Album;
