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
const cx = classNames.bind(styles);
function RecentlyPlayed() {
  const { data } = useGetDetailPlaylist();
  const [isPlaylistSaved, setIsPlaylistSaved] = useState(false);
  const {
    playlistItemStoredLocal,
    setPlaylistStoredLocal,
    setEncodeIdPlaylist,
  } = useContext(MusicContext);

  useEffect(() => {
    if (data?.data && !isPlaylistSaved) {
      // Lấy danh sách playlist từ local storage
      const playlistItem = localStorage.getItem("playlists");
      let playlists: any[] = [];
      if (playlistItem) {
        playlists = JSON.parse(playlistItem);
      }
      // Kiểm tra xem infoPlaylist có trong danh sách không
      const isInfoPlaylistExist = playlists.some(
        (playlist: ISectionPlaylist) =>
          playlist.encodeId === data?.data.encodeId
      );
      if (!isInfoPlaylistExist) {
        // Thêm playlist mới vào danh sách
        playlists.push(data?.data);

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
  }, [data, isPlaylistSaved, setPlaylistStoredLocal]);

  const handleGetEncodeId = (encodeId: string) => {
    setEncodeIdPlaylist(encodeId);
    localStorage.setItem("encodeIdAlbum", JSON.stringify(encodeId));
  };
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
                      <div className={cx("action")}>
                        <Tippy content="Thêm vào thư viện">
                          <button className={cx("btn-heart", "btn-icon")}>
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                          </button>
                        </Tippy>
                        <button className={cx("btn-play")}>
                          <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
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
