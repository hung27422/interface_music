"use client";
import classNames from "classnames/bind";
import styles from "./Trending.module.scss";
import Image from "next/image";
import images from "@/assets/images/images";
import MediaSong from "@/components/MediaSong/MediaSong";
import useDataHome from "@/components/hooks/useDataHome";
import { useEffect } from "react";
import { IHome, ITrending, InfoSong } from "@/Interfaces/Interface";
import useDataTrending from "@/components/hooks/useDataTrending";
import SliderTrending from "@/components/SliderTrending/SliderTrending";
const cx = classNames.bind(styles);
function Trending() {
  const { data: dataTrending } = useDataTrending();
  const { data: dataHome } = useDataHome();
  const rtChart = dataHome?.data.items.filter(
    (item: ITrending) => item.sectionType === "RTChart"
  );
  useEffect(() => {
    const trending = dataTrending?.data.items;
    console.log("trending", trending);
    const rtChart = dataHome?.data.items.filter(
      (item: ITrending) => item.sectionType === "RTChart"
    );
    console.log("rtChart", rtChart);
  }, [dataHome?.data.items, dataTrending]);
  return (
    <div className={cx("wrapper")}>
      {/* <div className={cx("mh-trending-title")}>#zingchart</div> */}
      <div className={cx("mh-trending-title")}>
        <Image
          className={cx("mh-trending-img")}
          src={images.xuhuong}
          alt="trending-img"
          width={215}
          height={68}
        />
      </div>
      <div className={cx("mh-trending-container")}>
        <div className={cx("mh-trending-content")}>
          {dataTrending?.data.items
            ?.slice(0, 10)
            .map((item: InfoSong, index: number) => {
              const nO = index + 1;
              return (
                <div className={cx("mh-trending-content-item")} key={index}>
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
                  <MediaSong key={index} trending={true} data={item} />
                </div>
              );
            })}
        </div>
      </div>
      <div className={cx("btn-top100")}>Xem top 100</div>
      <div className={cx("mh-top5-hot")}>
        <h2 className={cx("mh-top5-title")}>Top 5 BXH</h2>
        {rtChart?.map((item: ITrending, index: number) => {
          return (
            <div key={index}>
              <SliderTrending data={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Trending;
