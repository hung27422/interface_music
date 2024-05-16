"use client";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
const cx = classNames.bind(styles);

import useDataHome from "@/components/hooks/useDataHome";
import { useEffect, useRef, useState } from "react";
import SliderItem from "@/components/Slider/Slider";
import NewRelease from "@/components/NewRelease/NewRelease";
import {
  IHome,
  ISectionPlaylist,
  ITypeNewRelease,
  InfoSong,
} from "@/Interfaces/Interface";
import MHSectionPlaylist from "@/components/MHSectionPlaylist/MHSectionPlaylist";
interface IHomeProps {
  items: ITypeNewRelease;
}
export default function Home() {
  const { data } = useDataHome();
  //Api
  const newRelease = data?.data.items.filter(
    (item: IHome) => item.sectionType === "new-release"
  );
  const playlist = data?.data.items.filter(
    (item: ISectionPlaylist) => item.sectionType === "playlist"
  );
  // useEffect(() => {
  //   const playlist = data?.data.items.filter(
  //     (item: IHome) => item.sectionType === "playlist"
  //   );
  //   playlist?.map((item: IHomeProps) => {
  //     return console.log("item", item.items);
  //   });
  //   console.log("playlist", playlist);
  // }, [data, newRelease]);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("slider")}>
        <SliderItem></SliderItem>
      </div>
      <div className={cx("container")}>
        {newRelease?.map((item: IHomeProps, index: number) => (
          <div key={index} className={cx("new-release")}>
            <NewRelease
              dataAll={item.items.all}
              dataVietnamese={item.items.vPop}
              dataOthers={item.items.others}
            />
          </div>
        ))}
        {playlist?.map((item: ISectionPlaylist, index: number) => (
          <div key={index} className={cx("mh-section-playlist")}>
            <MHSectionPlaylist dataSectionPlaylist={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
