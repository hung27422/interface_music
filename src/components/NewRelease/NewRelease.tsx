import classNames from "classnames/bind";
import styles from "./NewRelease.module.scss";
import MediaSong from "../MediaSong/MediaSong";
const cx = classNames.bind(styles);
import { InfoSong, ITypeNewRelease } from "../../Interfaces/Interface";
import { useState } from "react";
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
          <button className={cx("btn-all")}>Tất cả {`>`}</button>
        </div>
      </div>
      <div className={cx("list-song")}>
        <div className={cx("list-song-all")}>
          {dataAll?.slice(0, 12).map((item: InfoSong, index: number) => {
            if (activeId === "1") {
              return (
                <div key={index}>
                  <MediaSong data={item} />
                </div>
              );
            }
          })}
          {dataVietnamese?.slice(0, 12).map((item: InfoSong, index: number) => {
            if (activeId === "2") {
              return (
                <div key={index}>
                  <MediaSong data={item} />
                </div>
              );
            }
          })}
          {dataOthers?.slice(0, 12).map((item: InfoSong, index: number) => {
            if (activeId === "3") {
              return (
                <div key={index}>
                  <MediaSong data={item} />
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
