import classNames from "classnames/bind";
import styles from "./RecentlyPlayed.module.scss";
import { useContext, useEffect, useState } from "react";
import MHSectionPlaylist from "../MHSectionPlaylist/MHSectionPlaylist";
import { IHome, ISectionPlaylist } from "@/Interfaces/Interface";
import Link from "next/link";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import useGetDetailPlaylist from "../../hooks/useGetDetailPlaylist";
import { log } from "console";
import { MusicContext } from "../ContextMusic/ContextMusic";
import { title } from "process";
import useDataHome from "../../hooks/useDataHome";
import useTruncateTitle from "../../hooks/useTruncateTitle";
import Image from "next/image";
const cx = classNames.bind(styles);
function RecentlyPlayed() {
  const {
    data: getDataPlaylist,
    isLoading,
    isValidating,
  } = useGetDetailPlaylist();
  const [isPlaylistSaved, setIsPlaylistSaved] = useState(false);
  const {
    playlistItemStoredLocal,
    setPlaylistStoredLocal,
    setEncodeIdPlaylist,
    setActivePlay,
    setIndexSong,
    encodeIdPlaylist,
    setEncodeIdSong,
    setPlaylistContext,
    activePlaylist,
    setActivePlaylist,
  } = useContext(MusicContext);

  useEffect(() => {
    if (getDataPlaylist?.data && !isPlaylistSaved) {
      // Lấy danh sách playlist từ local storage
      const playlistItem = localStorage.getItem("playlists");
      let playlists: any[] = [];
      if (playlistItem) {
        playlists = JSON.parse(playlistItem);
      }
      // Kiểm tra xem infoPlaylist có trong danh sách không
      const isInfoPlaylistExist = playlists.some(
        (playlist: ISectionPlaylist) =>
          playlist.encodeId === getDataPlaylist?.data.encodeId
      );
      if (!isInfoPlaylistExist) {
        // Thêm playlist mới vào danh sách
        playlists.push(getDataPlaylist?.data);

        // Giới hạn danh sách chỉ chứa 14 phần tử mới nhất
        if (playlists.length > 14) {
          playlists.shift(); // Xóa phần tử cũ nhất
        }
        // Lưu danh sách mới vào local storage
        localStorage.setItem("playlists", JSON.stringify(playlists));
        setIsPlaylistSaved(true); // Đặt biến trạng thái là đã lưu
      }
      setPlaylistStoredLocal(playlists);
    }
  }, [getDataPlaylist, isPlaylistSaved, setPlaylistStoredLocal]);

  const handleGetEncodeId = (encodeId: string) => {
    setEncodeIdPlaylist(encodeId);
    localStorage.setItem("encodeIdAlbum", JSON.stringify(encodeId));
  };
  const handlePlayMusic = (encodeIdPlaylist1: string) => {
    const playlist = getDataPlaylist?.data?.song?.items;
    const idPlaylist = getDataPlaylist?.data?.encodeId;
    const currentIndex = 0;
    if (!playlist) {
      console.error("Playlist is undefined.");
      return;
    }
    const firstSongId = playlist[0]?.encodeId;
    setActivePlay(false);
    setEncodeIdPlaylist(encodeIdPlaylist1);
    //Xử lý phát dừng nhạc, lưu lịch sử phát nhạc
    if (idPlaylist === encodeIdPlaylist1) {
      setActivePlaylist(!activePlaylist);
    } else {
      setActivePlaylist(true);
      setIndexSong(currentIndex ?? 0);
      localStorage.setItem(
        "currentSong",
        JSON.stringify(playlist[currentIndex])
      );
      localStorage.setItem("currentPlaylist", JSON.stringify(playlist));
      localStorage.setItem("encodeId", JSON.stringify(firstSongId));
    localStorage.setItem("indexSong", JSON.stringify(0));

    }
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
    <>
      {playlistItemStoredLocal && (
        <div className={cx("wrapper")}>
          <h2 className={cx("title")}>Nghe gần đây</h2>
          <div className={cx("content")}>
            {playlistItemStoredLocal
              ?.slice(0, 14)
              .map((item: ISectionPlaylist, index: number) => {
                return (
                  <div key={index} className={cx("list-recently")}>
                    <div className={cx("img-hover")}>
                      <div className={cx("size-image")}>
                        <Link
                          href={"/Pages/Album"}
                          id={item?.encodeId}
                          onClick={(e) => handleGetEncodeId(e.currentTarget.id)}
                          className={cx("avatar")}
                          style={{
                            backgroundImage: `url(${item.thumbnailM})`,
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
                      <span className={cx("description")}>
                        {truncateTitle(item?.title, 15)}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

export default RecentlyPlayed;
const truncateTitle = (title: string, maxLength: number) => {
  if (title.length <= maxLength) {
    return title;
  }
  return title.substring(0, maxLength) + "...";
};
