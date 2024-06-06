import classNames from "classnames/bind";
import styles from "./WeeklyZingchart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import useDataChartHome from "@/hooks/useDataChartHome";
import { useContext, useEffect } from "react";
import { IChartHome, InfoSong } from "@/Interfaces/Interface";
import MediaSong from "@/components/MediaSong/MediaSong";
import Link from "next/link";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
const cx = classNames.bind(styles);
interface IResult {
  items: InfoSong[];
  data: IChartHome[];
  type: string;
}
function WeeklyZingchart() {
  const { data } = useDataChartHome();
  const {
    setTypeWeekly,
    setEncodeIdSong,
    setActivePlay,
    activePlay,
    setActivePlaylist,
    setIndexSong,
    setPlaylistContext,
  } = useContext(MusicContext);
  const weekly = data?.data.weekChart;
  // console.log("weekly", weekly);

  const result: IResult[] = [];
  for (let i = 0; i < 3; i++) {
    if (weekly) {
      const key = Object.keys(weekly)[i];
      result.push({
        data: weekly[key],
        type: key,
        items: weekly[key].items || [],
      });
    }
  }
  // console.log("result", result);

  const handleGetDataWeekly = (id: string) => {
    setTypeWeekly(id);
  };
  const handlePlayMusicPlaylist = (value: InfoSong[]) => {
    if (!value || value.length === 0) return;
    setEncodeIdSong(value[0].encodeId);
    setActivePlay(!activePlay);
    setActivePlaylist(false);
    setIndexSong(0);
    setPlaylistContext(value ?? []);
    localStorage.setItem("currentSong", JSON.stringify(value[0]));
    localStorage.setItem("currentPlaylist", JSON.stringify(value));
    localStorage.setItem("encodeId", JSON.stringify(value[0].encodeId));
    localStorage.setItem("indexSong", JSON.stringify(0));
  };
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("weekly-title")}>Bảng xếp hạng tuần</h2>
      <div className={cx("weekly-container")}>
        {result?.map((item: IResult, index: number) => {
          return (
            <div key={index} className={cx("weekly-content")}>
              <div className={cx("weekly-content-title")}>
                <Link
                  href={"/Pages/ZingChart/ZingChartWeekly"}
                  className={cx("content-title")}
                  id={item.type}
                  onClick={(e) => handleGetDataWeekly(e.currentTarget.id)}
                >
                  {item.type === "vn" && "Việt Nam"}
                  {item.type === "us" && "US-UK"}
                  {item.type === "korea" && "K-POP"}
                </Link>
                <div
                  onClick={() => handlePlayMusicPlaylist(item?.items)}
                  className={cx("btn-icon-play")}
                >
                  <FontAwesomeIcon className={cx("btn-play")} icon={faPlay} />
                </div>
              </div>
              <div className={cx("weekly-content-list-song")}>
                {item.items
                  ?.slice(0, 5)
                  .map((itemI: InfoSong, index: number) => {
                    const nO = index + 1;
                    return (
                      <div key={index} className={cx("weekly-content-item")}>
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
                          data={itemI}
                          trending={true}
                          weekly={true}
                          playlist={item.items}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeeklyZingchart;
