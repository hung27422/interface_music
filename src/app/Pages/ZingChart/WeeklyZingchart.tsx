import classNames from "classnames/bind";
import styles from "./WeeklyZingchart.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import useDataChartHome from "@/components/hooks/useDataChartHome";
import { useEffect } from "react";
import { IChartHome } from "@/Interfaces/Interface";
import MediaSong from "@/components/MediaSong/MediaSong";
const cx = classNames.bind(styles);
interface IResult {
  items: any;
  data: IChartHome[];
  type: string;
}
function WeeklyZingchart() {
  const { data } = useDataChartHome();
  const weekly = data?.data.weekChart;
  const result: IResult[] = [];
  for (let i = 0; i < 3; i++) {
    if (weekly) {
      result.push({
        data: weekly?.[Object.keys(weekly)[i]],
        type: Object.keys(weekly)[i],
        items: weekly?.[Object.keys(weekly)[i]].items,
      });
    }
  }
  useEffect(() => {
    // const weekly = data?.data.weekChart.vn?.map(
    //   (item: IChartHome, index: number) => {
    //     return console.log("weekly", item);
    //   }
    // );
    console.log("result", result);

    console.log(weekly);
  }, [data, result, weekly]);
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("weekly-title")}>Bảng xếp hạng tuần</h2>
      <div className={cx("weekly-container")}>
        {result?.map((item: IResult, index: number) => {
          return (
            <div key={index} className={cx("weekly-content")}>
              <div className={cx("weekly-content-title")}>
                <h4 className={cx("content-title")}>
                  {item.type === "vn" && "Việt Nam"}
                  {item.type === "us" && "US-UK"}
                  {item.type === "korea" && "K-POP"}
                </h4>
                <div className={cx("title-btn-icon-play", "btn-icon-play")}>
                  <FontAwesomeIcon className={cx("btn-play")} icon={faPlay} />
                </div>
              </div>
              <div className={cx("weekly-content-list-song")}>
                {item.items
                  ?.slice(0, 5)
                  .map((itemI: IChartHome, index: number) => {
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
                        <MediaSong data={itemI} trending={true} weekly={true} />
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
