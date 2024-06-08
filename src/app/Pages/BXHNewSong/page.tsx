"use client";
import classNames from "classnames/bind";
import styles from "./BXHNewSong.module.scss";
import useDataTrending from "@/hooks/api/useDataTrending";
import MediaSong from "@/components/MediaSong/MediaSong";
import { InfoSong } from "@/Interfaces/Interface";
import SpinnerLoading from "@/components/SpinnerLoading/SpinnerLoading";
import TitlePage from "@/components/TitlePage/TitlePage";
const cx = classNames.bind(styles);

function Top100() {
  const { data: dataTrending, isLoading } = useDataTrending();
  return (
    <div className={cx("wrapper")}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <>
          <div className={cx("header")}>
            <TitlePage
              title="BXH Nhạc Mới"
              show
              data={dataTrending?.data.items}
            />
          </div>
          <div className={cx("container")}>
            <div className={cx("content")}>
              {dataTrending?.data.items?.map(
                (item: InfoSong, index: number) => {
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
                      <MediaSong
                        key={index}
                        trending={true}
                        index={index}
                        data={item}
                        playlist={dataTrending?.data.items}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Top100;
