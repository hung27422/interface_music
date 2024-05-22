import classNames from "classnames/bind";
import styles from "./MHSectionPlaylist.module.scss";
import Image from "next/image";
import Tippy from "@tippyjs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { InfoSong, ISectionPlaylist } from "@/Interfaces/Interface";
import { useContext, useEffect } from "react";
import { url } from "inspector";
import { MusicContext } from "../ContextMusic/ContextMusic";
import Link from "next/link";
const cx = classNames.bind(styles);
interface MHSectionPlaylistProps {
  dataSectionPlaylist: ISectionPlaylist;
  show?: boolean;
  hide?: boolean;
}
function MHSectionPlaylist({
  dataSectionPlaylist,
  show,
  hide,
}: MHSectionPlaylistProps) {
  const { setEncodeIdPlaylist } = useContext(MusicContext);

  // useEffect(() => {
  //   console.log("section", dataSectionPlaylist);
  // }, [dataSectionPlaylist]);
  const handleGetEncodeId = (encodeId: string) => {
    setEncodeIdPlaylist(encodeId);
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
        {dataSectionPlaylist?.items
          ?.slice(0, 5)
          .map((item: ISectionPlaylist, index: number) => {
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
                        backgroundImage: `url(${item?.thumbnail})`,
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
                        <FontAwesomeIcon icon={faEllipsis}></FontAwesomeIcon>
                      </button>
                    </Tippy>
                  </div>
                </div>
                <div className={cx("description")}>
                  {item.sortDescription !== "" ? (
                    <span className={cx("content-des")}>
                      {item?.sortDescription}
                    </span>
                  ) : (
                    <div className={cx("info-des")}>
                      <span className={cx("content-des")}>{item?.title}</span>
                      <span className={cx("content-des")}>
                        {item?.artistsNames}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MHSectionPlaylist;
