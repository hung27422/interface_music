"use client";
import classNames from "classnames/bind";
import styles from "./album.module.scss";
import useGetDetailPlaylist from "@/components/hooks/useGetDetailPlaylist";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import MediaSong from "@/components/MediaSong/MediaSong";
import useFormatDate from "@/components/hooks/useFormatDate";
import { IArtist, InfoSong } from "@/Interfaces/Interface";
import useFormatTime from "@/components/hooks/useFormatTime";
import useFormatNumber from "@/components/hooks/useFormatNumber";
import ArtistItems from "@/components/ArtistItems/ArtistItems";
import SpinnerLoading from "@/components/SpinnerLoading/SpinnerLoading";
const cx = classNames.bind(styles);
function Album() {
  const { data, isLoading } = useGetDetailPlaylist();
  const infoPlaylist = data?.data;
  const contentLastUpdate = useFormatDate(infoPlaylist?.contentLastUpdate);
  const listSong = data?.data?.song.items;
  const listArtist = data?.data?.artists;
  const totalDuration = useFormatTime(infoPlaylist?.song.totalDuration);
  const like = useFormatNumber(infoPlaylist?.like);
  console.log("infoPlaylist", infoPlaylist);

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
                    <div className={cx("action")}>
                      <button className={cx("btn-play")}>
                        <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
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
                          <MediaSong data={item} trending={true} />
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
          {listArtist?.length > 1 && (
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
