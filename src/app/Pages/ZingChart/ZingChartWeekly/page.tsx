"use client";
import classNames from "classnames/bind";
import styles from "./ZingChartWeekly.module.scss";
import useDataChartHome from "@/hooks/api/useDataChartHome";
import { useContext, useEffect, useState } from "react";
import { IChartHome, InfoSong } from "@/Interfaces/Interface";
import MediaSong from "@/components/MediaSong/MediaSong";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import SpinnerLoading from "@/components/SpinnerLoading/SpinnerLoading";
const cx = classNames.bind(styles);
function ZingChartWeekly() {
  const { data, isLoading } = useDataChartHome();
  const [activeId, setActiveId] = useState("1");
  const { typeWeekly } = useContext(MusicContext);

  const dataWeeklyVN = data?.data.weekChart.vn.items.map((item: IChartHome) => {
    return item;
  });
  const dataWeeklyUSUK = data?.data.weekChart.us.items.map(
    (item: IChartHome) => {
      return item;
    }
  );
  const dataWeeklyKorea = data?.data.weekChart.korea.items.map(
    (item: IChartHome) => {
      return item;
    }
  );
  useEffect(() => {
    if (typeWeekly === "vn") {
      setActiveId("1");
    }
    if (typeWeekly === "us") {
      setActiveId("2");
    }
    if (typeWeekly === "korea") {
      setActiveId("3");
    }
    console.log("type", typeWeekly);
  }, [data, typeWeekly]);
  const handleActiveId = (id: string) => {
    setActiveId(id);
  };
  return (
    <div>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <div className={cx("wrapper")}>
          <h2 className={cx("title")}>Bảng Xếp Hạng Tuần</h2>
          <div className={cx("menu")}>
            <button
              id="1"
              onClick={(e) => handleActiveId(e.currentTarget.id)}
              className={cx("btn-menu", activeId === "1" && "active")}
            >
              Việt Nam
            </button>
            <button
              id="2"
              onClick={(e) => handleActiveId(e.currentTarget.id)}
              className={cx("btn-menu", activeId === "2" && "active")}
            >
              US-UK
            </button>
            <button
              id="3"
              onClick={(e) => handleActiveId(e.currentTarget.id)}
              className={cx("btn-menu", activeId === "3" && "active")}
            >
              K-POP
            </button>
          </div>
          <div className={cx("list-song")}>
            {activeId === "1" &&
              dataWeeklyVN?.map((item: InfoSong, index: number) => {
                const nO = index + 1;
                return (
                  <div key={index} className={cx("item-song")}>
                    <span
                      className={cx(
                        "weekly-top_NO",
                        nO === 1 && "ontop-one",
                        index + 1 === 2 && "ontop-two",
                        nO === 3 && "ontop-three"
                      )}
                    >
                      {nO}
                    </span>
                    <span className={cx("weekly-top-space")}>-</span>
                    <MediaSong
                      index={index}
                      data={item}
                      trending={true}
                      playlist={dataWeeklyVN}
                    />
                  </div>
                );
              })}
            {activeId === "2" &&
              dataWeeklyUSUK?.map((item: InfoSong, index: number) => {
                const nO = index + 1;
                return (
                  <div key={index} className={cx("item-song")}>
                    <span
                      className={cx(
                        "weekly-top_NO",
                        nO === 1 && "ontop-one",
                        index + 1 === 2 && "ontop-two",
                        nO === 3 && "ontop-three"
                      )}
                    >
                      {nO}
                    </span>
                    <span className={cx("weekly-top-space")}>-</span>
                    <MediaSong
                      index={index}
                      data={item}
                      trending={true}
                      playlist={dataWeeklyUSUK}
                    />
                  </div>
                );
              })}
            {activeId === "3" &&
              dataWeeklyKorea?.map((item: InfoSong, index: number) => {
                const nO = index + 1;
                return (
                  <div key={index} className={cx("item-song")}>
                    <span
                      className={cx(
                        "weekly-top_NO",
                        nO === 1 && "ontop-one",
                        index + 1 === 2 && "ontop-two",
                        nO === 3 && "ontop-three"
                      )}
                    >
                      {nO}
                    </span>
                    <span className={cx("weekly-top-space")}>-</span>
                    <MediaSong
                      index={index}
                      data={item}
                      trending={true}
                      playlist={dataWeeklyKorea}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ZingChartWeekly;
