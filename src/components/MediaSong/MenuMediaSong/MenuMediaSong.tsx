import classNames from "classnames/bind";
import styles from "./MenuMediaSong.module.scss";
const cx = classNames.bind(styles);
import TippyHeadless from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faHeadphones,
  faListOl,
  faMicrophone,
  faPlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { InfoSong } from "@/Interfaces/Interface";
import Image from "next/image";
import useGetDataPlaylist from "@/hooks/useGetDataPlaylist";
import BoxPlaylist from "@/components/BoxPlaylist/BoxPlaylist";
import { useContext } from "react";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
interface MenuMediaSongProps {
  data: InfoSong;
}
function MenuMediaSong({ data }: MenuMediaSongProps) {
  const { dataPlaylist, addSongToPlaylist, removeSongFromPlaylist } =
    useGetDataPlaylist();
  const { idPlaylistLocal } = useContext(MusicContext);
  const playlistLocal = localStorage.getItem("playlist1") || "";
  if (!playlistLocal) {
    return null;
  }
  const dataPlaylistLocal = JSON.parse(playlistLocal);
  const dataPlaylistItem = dataPlaylist.data.map((item: any) => {
    return item;
  });
  const dataPlaylistItems = dataPlaylistLocal
    ? dataPlaylistLocal.data
    : dataPlaylistItem;
  const handleAddSongToPlaylist = (playlistId: string) => {
    addSongToPlaylist(playlistId, data);
  };
  const handleRemoveSongFromPlaylist = () => {
    removeSongFromPlaylist(idPlaylistLocal, data.encodeId);
  };
  const MenuTippy = (attrs: any) => {
    return (
      <div className={cx("box-menu")} {...attrs}>
        <div className={cx("header")}>
          <Image
            className={cx("img-song")}
            src={data.thumbnailM}
            alt="img-song"
            width={50}
            height={50}
          />
          <span className={cx("name-song")}>{data.title}</span>
        </div>
        <ul className={cx("list-selectiton")}>
          <li className={cx("item-selection", "show-playlist")}>
            <span className={cx("item-select-icon")}>
              <FontAwesomeIcon icon={faPlus} />
            </span>
            <span className={cx("item-select-title")}>Thêm vào Playlist</span>
            <div className={cx("box-playlist")}>
              <div className={cx("box-playlist-btn")}>
                <BoxPlaylist />
              </div>
              <ul className={cx("list-playlist")}>
                {dataPlaylistItems.map((item: any, index: number) => {
                  return (
                    <li
                      onClick={() => handleAddSongToPlaylist(item.id)}
                      className={cx("item-playlist")}
                      key={index}
                    >
                      <span className={cx("item-playlist-icon")}>
                        <FontAwesomeIcon icon={faListOl} />
                      </span>
                      <span className={cx("item-playlist-name")}>
                        {item?.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>

          <li className={cx("item-selection")}>
            <span className={cx("item-select-icon")}>
              <FontAwesomeIcon icon={faMicrophone} />
            </span>
            <span className={cx("item-select-title")}>Xem lời bài hát</span>
          </li>
          <li
            onClick={() => handleRemoveSongFromPlaylist()}
            className={cx("item-selection", "remove-song")}
          >
            <span className={cx("item-select-icon")}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
            <span className={cx("item-select-title")}>Xóa khỏi Playlist</span>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <TippyHeadless
      trigger="click"
      render={MenuTippy}
      offset={[0, 0]}
      interactive
      placement="bottom-end"
      popperOptions={{
        modifiers: [
          {
            name: "flip",
            options: {
              fallbackPlacements: ["bottom-start", "top-end", "top-start"],
            },
          },
        ],
      }}
    >
      <div className={cx("wrapper")}>
        <FontAwesomeIcon className={cx("level-item")} icon={faEllipsis} />
      </div>
    </TippyHeadless>
  );
}

export default MenuMediaSong;
