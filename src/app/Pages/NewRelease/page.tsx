"use client";
import classNames from "classnames/bind";
import styles from "./NewRelease.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import useDataChartHome from "@/hooks/useDataChartHome";
import useDataHome from "@/hooks/useDataHome";
import { IHome, ITypeNewRelease, InfoSong } from "@/Interfaces/Interface";
import { useState } from "react";
import MediaSong from "@/components/MediaSong/MediaSong";
const cx = classNames.bind(styles);

function NewRelease() {
  const { data: dataHome } = useDataHome();
  const [activeId, setActiveId] = useState("1");
  const newRelease = dataHome?.data.items.filter(
    (item: IHome) => item.sectionType === "new-release"
  );
  const dataAll = newRelease?.map((item: ITypeNewRelease) => {
    return item?.items.all;
  });
  const dataVietnamese = newRelease?.map((item: ITypeNewRelease) => {
    return item?.items.vPop;
  });
  const dataOthers = newRelease?.map((item: ITypeNewRelease) => {
    return item?.items.others;
  });
  const handleChangeSection = (id: string) => {
    setActiveId(id);
  };
  console.log("dataAll", dataAll);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h2 className={cx("title")}>Mới Phát Hành</h2>
        <div className={cx("btn-icon")}>
          <FontAwesomeIcon className={cx("btn-play")} icon={faPlay} />
        </div>
      </div>
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
      <div className={cx("list-song-all")}>
        {dataAll?.map((data: any) => {
          if (activeId === "1") {
            return data?.map((item: InfoSong, index: number) => {
              return (
                <div key={index}>
                  <MediaSong
                    index={index}
                    trending={true}
                    data={item}
                    playlist={data}
                  />
                </div>
              );
            });
          }
        })}
        {dataVietnamese?.map((data: any) => {
          if (activeId === "2") {
            return data?.map((item: InfoSong, index: number) => {
              return (
                <div key={index}>
                  <MediaSong
                    index={index}
                    trending={true}
                    data={item}
                    playlist={data}
                  />
                </div>
              );
            });
          }
        })}
        {dataOthers?.map((data: any) => {
          if (activeId === "3") {
            return data?.map((item: InfoSong, index: number) => {
              return (
                <div key={index}>
                  <MediaSong
                    index={index}
                    trending={true}
                    data={item}
                    playlist={data}
                  />
                </div>
              );
            });
          }
        })}
      </div>
    </div>
  );
}

export default NewRelease;
