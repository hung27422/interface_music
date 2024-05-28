"use client";
import classNames from "classnames/bind";
import styles from "./BXHNewSong.module.scss";
import useDataTrending from "@/components/hooks/useDataTrending";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import MediaSong from "@/components/MediaSong/MediaSong";
import { InfoSong } from "@/Interfaces/Interface";
import SpinnerLoading from "@/components/SpinnerLoading/SpinnerLoading";
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
            <h2 className={cx("title")}>BHX Nhạc Mới</h2>
            <div className={cx("btn-icon")}>
              <FontAwesomeIcon className={cx("btn-play")} icon={faPlay} />
            </div>
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
