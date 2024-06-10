import classNames from "classnames/bind";
import styles from "./NewReleaseItem.module.scss";
import MediaSong from "../MediaSong/MediaSong";
const cx = classNames.bind(styles);
import { InfoSong, ITypeNewRelease } from "../../Interfaces/Interface";
import { useState } from "react";
import Link from "next/link";
function NewRelease({ dataAll, dataVietnamese, dataOthers }: ITypeNewRelease) {
  const [activeId, setActiveId] = useState("1");
  const handleChangeSection = (id: string) => {
    setActiveId(id);
  };
  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Mới phát hành</h1>
      <div className={cx("btn-section-page")}>
        <div className={cx("btn-section-list")}>
          <button
            id="1"
            className={cx("btn-section", activeId === "1" ? "active" : "")}
            onClick={(e) => handleChangeSection(e.currentTarget.id)}
          >
            Tất cả
          </button>
          <button
            id="2"
            className={cx("btn-section", activeId === "2" ? "active" : "")}
            onClick={(e) => handleChangeSection(e.currentTarget.id)}
          >
            Việt Nam
          </button>
          <button
            id="3"
            className={cx("btn-section", activeId === "3" ? "active" : "")}
            onClick={(e) => handleChangeSection(e.currentTarget.id)}
          >
            Quốc tế
          </button>
        </div>
        <div>
          <Link href={"/Pages/NewRelease"} className={cx("btn-all")}>
            Tất cả {`>`}
          </Link>
        </div>
      </div>
      <div className={cx("list-song")}>
        <div className={cx("list-song-all")}>
          {dataAll?.slice(0, 12).map((item: InfoSong, index: number) => {
            if (activeId === "1") {
              return (
                <div key={index}>
                  <MediaSong
                    removePlaylist={false}
                    releaseDate
                    data={item}
                    index={index}
                    playlist={dataAll}
                  />
                </div>
              );
            }
          })}
          {dataVietnamese?.slice(0, 12).map((item: InfoSong, index: number) => {
            if (activeId === "2") {
              return (
                <div key={index}>
                  <MediaSong
                    releaseDate
                    data={item}
                    index={index}
                    playlist={dataVietnamese}
                  />
                </div>
              );
            }
          })}
          {dataOthers?.slice(0, 12).map((item: InfoSong, index: number) => {
            if (activeId === "3") {
              return (
                <div key={index}>
                  <MediaSong
                    releaseDate
                    data={item}
                    index={index}
                    playlist={dataOthers}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export default NewRelease;
