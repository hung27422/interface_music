"use client";
import classNames from "classnames/bind";
import styles from "./ZingChart.module.scss";
import useDataChartHome from "@/hooks/api/useDataChartHome";
import { useState } from "react";
import ZingChartLine from "@/components/ZingChartLine/ZingChartLine";
import { InfoSong } from "@/Interfaces/Interface";
import MediaSong from "@/components/MediaSong/MediaSong";
import WeeklyZingchart from "./WeeklyZingchart";
import SpinnerLoading from "@/components/SpinnerLoading/SpinnerLoading";
import TitlePage from "@/components/TitlePage/TitlePage";

const cx = classNames.bind(styles);

function ZingChart() {
  const { data, isLoading } = useDataChartHome();
  const [showBtn, setShowBtn] = useState(false);
  const listSong = data?.data.RTChart.items;

  const handleShowBtn = () => {
    setShowBtn(!showBtn);
  };
  return (
    <div>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <div className={cx("wrapper")}>
          <div className={cx("mh-chart")}>
            <div className={cx("mh-chart-title")}>
              <TitlePage data={listSong} title="ZingChart" show />
            </div>
            <div className={cx("zing-chart")}>
              <ZingChartLine />
            </div>
            <div className={cx("list-song-zingchart")}>
              {!showBtn
                ? listSong
                    ?.slice(0, 10)
                    .map((item: InfoSong, index: number) => {
                      const nO = index + 1;
                      return (
                        <div
                          key={index}
                          className={cx("list-song-zingchart-item")}
                        >
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
                          <MediaSong
                            index={index}
                            data={item}
                            trending={true}
                            playlist={listSong}
                          />
                        </div>
                      );
                    })
                : listSong?.map((item: InfoSong, index: number) => {
                    const nO = index + 1;
                    return (
                      <div
                        key={index}
                        className={cx("list-song-zingchart-item")}
                      >
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
                        <MediaSong
                          index={index}
                          data={item}
                          trending={true}
                          playlist={listSong}
                        />
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
      )}
    </div>
  );
}

export default ZingChart;
