"use client";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
const cx = classNames.bind(styles);

import useDataHome from "@/components/hooks/useDataHome";
import { useContext, useEffect, useRef, useState } from "react";
import SliderItem from "@/components/Slider/Slider";
import NewRelease from "@/components/NewRelease/NewRelease";
import {
  IHome,
  IRadio,
  ISectionPlaylist,
  ITrending,
  ITypeNewRelease,
} from "@/Interfaces/Interface";
import MHSectionPlaylist from "@/components/MHSectionPlaylist/MHSectionPlaylist";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import { log } from "console";
import SliderTrending from "@/components/SliderTrending/SliderTrending";
import RadioItem from "@/components/RadioItem/RadioItem";
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
  const radios = data?.data.items.filter(
    (item: ISectionPlaylist) => item.sectionType === "livestream"
  );
  const rtChart = data?.data.items.filter(
    (item: ITrending) => item.sectionType === "RTChart"
  );
  console.log(radios);

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
        <div className={cx("top-5-bxh")}>
          <h2 className={cx("mh-top-title", "mh-top5-title")}>Top 5 BXH</h2>
          {rtChart?.map((item: ITrending, index: number) => {
            return (
              <div key={index}>
                <SliderTrending data={item} />
              </div>
            );
          })}
        </div>
        <div className={cx("radio")}>
          <h2 className={cx("radio-title")}>Radio Nổi bật</h2>
          <div className={cx("radio-list")}>
            {radios?.map((data: any) => {
              return data?.items.map((item: IRadio, index: number) => {
                return (
                  <div key={index}>
                    <RadioItem data={item} />
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
