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
  const { setEncodeIdPlaylist } = useContext(MusicContext);
  const [playlistItem, setPlaylistItem] = useState();

  const handleGetEncodeId = (encodeId: string) => {
    setEncodeIdPlaylist(encodeId);
    localStorage.setItem("encodeIdAlbum", JSON.stringify(encodeId));
  };
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
