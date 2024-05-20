"use client";
import classNames from "classnames/bind";
import styles from "./ZingChart.module.scss";
import useDataChartHome from "@/components/hooks/useDataChartHome";
import { useEffect, useState } from "react";
import { faL, faPlay } from "@fortawesome/free-solid-svg-icons";
import ZingChartLine from "@/components/ZingChartLine/ZingChartLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IChartHome } from "@/Interfaces/Interface";
import MediaSong from "@/components/MediaSong/MediaSong";
import WeeklyZingchart from "./WeeklyZingchart";

const cx = classNames.bind(styles);

function ZingChart() {
  const { data } = useDataChartHome();
  const [showBtn, setShowBtn] = useState(false);
  const listSong = data?.data.RTChart.items;

  // useEffect(() => {
  //   console.log("listSong", listSong);
  // }, [data, listSong]);
  const handleShowBtn = () => {
    setShowBtn(!showBtn);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("mh-chart")}>
        <div className={cx("mh-chart-title")}>
          <h2 className={cx("title", "title-text-box-color")}>#ZingChart</h2>
          <div className={cx("title-btn-icon-play", "title-icon")}>
            <FontAwesomeIcon className={cx("btn-play")} icon={faPlay} />
          </div>
        </div>
        <div className={cx("zing-chart")}>
          <ZingChartLine />
        </div>
        <div className={cx("list-song-zingchart")}>
          {!showBtn
            ? listSong?.slice(0, 10).map((item: IChartHome, index: number) => {
                const nO = index + 1;
                return (
                  <div key={index} className={cx("list-song-zingchart-item")}>
                    <span
                      className={cx(
                        "mh-trending_NO",
                        nO === 1 && "ontop-one",
                        index + 1 === 2 && "ontop-two",
                        nO === 3 && "ontop-three"
                      )}
                    >
                      {nO}
                    </span>
                    <span className={cx("mh-trending-space")}>-</span>
                    <MediaSong data={item} trending={true} />
                  </div>
                );
              })
            : listSong?.map((item: IChartHome, index: number) => {
                const nO = index + 1;
                return (
                  <div key={index} className={cx("list-song-zingchart-item")}>
                    <span
                      className={cx(
                        "mh-trending_NO",
                        nO === 1 && "ontop-one",
                        index + 1 === 2 && "ontop-two",
                        nO === 3 && "ontop-three"
                      )}
                    >
                      {nO}
                    </span>
                    <span className={cx("mh-trending-space")}>-</span>
                    <MediaSong data={item} trending={true} />
                  </div>
                );
              })}
        </div>
        <div className={cx("button-show-hide")} onClick={handleShowBtn}>
          {!showBtn ? "Xem thêm" : "Ẩn bớt"}
        </div>
        <div className={cx("weekly-zingchart")}>
          <WeeklyZingchart />
        </div>
      </div>
    </div>
  );
}

export default ZingChart;
