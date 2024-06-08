"use client";
import classNames from "classnames/bind";
import styles from "./playlist.module.scss";
import TitlePage from "@/components/TitlePage/TitlePage";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import {
  faEllipsis,
  faHeart,
  faPlay,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import useGetDataPlaylist from "@/hooks/api/useGetDataPlaylist";
import { useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import MediaSong from "@/components/MediaSong/MediaSong";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import BoxPlaylist from "@/components/BoxPlaylist/BoxPlaylist";
import { InfoSong } from "@/Interfaces/Interface";
import useHandlePlayMusic from "@/hooks/handle/useHandlePlayMusic";
const cx = classNames.bind(styles);
interface PlaylistData {
  data: any[]; // Định nghĩa kiểu cho thuộc tính data
  // Thêm các thuộc tính khác nếu cần
}
function Playlist() {
  const { user } = useAuth0();
  const { handlePlayMusic, handleSaveMusicLocalStorage } = useHandlePlayMusic();
  const { activePlay, idPlaylistLocal, setIdPlaylistLocal } =
    useContext(MusicContext);
  const { dataPlaylist, deletePlaylist } = useGetDataPlaylist();

  const [showAction, setShowAction] = useState("");
  const [dataPlaylistLocal, setDataPlaylistLocal] =
    useState<PlaylistData | null>(null);

  const playlistLocal =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("playlist1")
      : null;
  useEffect(() => {
    if (playlistLocal) {
      try {
        const dataPlaylist = JSON.parse(playlistLocal);
        setDataPlaylistLocal(dataPlaylist);
      } catch (err) {
        console.log(err);
      }
    }
  }, [playlistLocal]);

  if (!playlistLocal) {
    return null;
  }
  const dataPlaylistItem = dataPlaylist?.data.map((item: any) => {
    return item;
  });
  const dataPlaylistItems = dataPlaylistLocal
    ? dataPlaylistLocal.data
    : dataPlaylistItem;

  const handleClickShowPlaylist = (id: string) => {
    setIdPlaylistLocal(id);
  };
  const handlePlayMusicPlaylist = (value: InfoSong[], id: string) => {
    if (!value) return;
    const encodeId = value[0].encodeId;
    const currentSong = value[0];
    setIdPlaylistLocal(id);
    setShowAction(id);
    handlePlayMusic(encodeId, 0, value);
    handleSaveMusicLocalStorage(currentSong, value, encodeId, 0);
  };
  const handleRemovePlaylist = (id: string) => {
    deletePlaylist(id);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <TitlePage title="#Playlist" show={false} />
        <BoxPlaylist playlist />
      </div>
      <div className={cx("playlist")}>
        {dataPlaylistItems.map((item: any, index: number) => {
          const arrImg = item.songs
            .slice(0, 4)
            .map((song: any) => song.thumbnailM);
          return (
            <div key={item?.id} className={cx("playlist-img")}>
              {item?.songs.length === 0 && (
                <div className={cx("playlist-img-item")}>
                  <div className={cx("size-img")}>
                    <div
                      id={item?.id}
                      onClick={(e) =>
                        handleClickShowPlaylist(e.currentTarget.id)
                      }
                      className={cx("avatar")}
                      style={{
                        backgroundImage: `url("https://photo-zmp3.zmdcdn.me/album_default.png)`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
              {item.songs.length < 4 && item.songs.length > 0 ? (
                <div className={cx("playlist-img-item")}>
                  <div className={cx("size-img")}>
                    <div
                      id={item?.id}
                      onClick={(e) =>
                        handleClickShowPlaylist(e.currentTarget.id)
                      }
                      className={cx("avatar")}
                      style={{
                        backgroundImage: `url(${item.songs[0].thumbnailM})`,
                      }}
                    ></div>
                  </div>
                </div>
              ) : (
                <div className={cx("playlist-img-list")}>
                  {arrImg.map((arr: string, index: number) => {
                    return (
                      <div key={index} className={cx("size-img1")}>
                        <Image
                          id={item?.id}
                          onClick={(e) =>
                            handleClickShowPlaylist(e.currentTarget.id)
                          }
                          src={arr}
                          alt="img-playlist"
                          width={80}
                          height={80}
                          className={cx("avatar1")}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              <div
                className={cx(
                  showAction === item?.id && activePlay
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
                  onClick={() => handlePlayMusicPlaylist(item.songs, item?.id)}
                  className={cx("btn-play")}
                >
                  {showAction === item?.id && activePlay ? (
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
                <Tippy content="Xóa Playlist này">
                  <button
                    onClick={() => handleRemovePlaylist(item?.id)}
                    className={cx("btn-menu", "btn-icon")}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </Tippy>
              </div>
              <div className={cx("playlist-info")}>
                <span className={cx("playlist-name")}>{item?.name}</span>
                <span className={cx("user-name")}>{user?.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={cx("list-song")}>
        <h2>Danh sách bài hát</h2>
        {dataPlaylistItems.map((item: any, index: number) => {
          return (
            <div key={index}>
              {idPlaylistLocal === item?.id && (
                <>
                  {item?.songs.length > 0 ? (
                    <>
                      {item?.songs.map((result: InfoSong, subIndex: number) => {
                        return (
                          <MediaSong
                            trending
                            key={result.encodeId}
                            data={result}
                            index={subIndex}
                            playlist={item?.songs}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <div className={cx("playlist-empty")}>
                      <h2>Danh sách rỗng</h2>
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Playlist;
