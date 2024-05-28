import { IChartHome, InfoSong } from "@/Interfaces/Interface";
import useDataChartHome from "../hooks/useDataChartHome";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, ChartOptions, plugins } from "chart.js";
import { useEffect, useRef, useState } from "react";
Chart.register(CategoryScale);
import classNames from "classnames/bind";
import styles from "./ZingChartLine.module.scss";
const cx = classNames.bind(styles);
import _ from "lodash";
import MediaSong from "../MediaSong/MediaSong";
function ZingChartLine() {
  const { data } = useDataChartHome();
  const chartRef = useRef(null);
  const [selectedEncodeId, setSelectedEncodeId] = useState("");
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const hours = data?.data.RTChart.chart.times;
  const labels = hours?.map((t: IChartHome) => `${t.hour}:00`);

  const chart = data?.data.RTChart.chart;
  const chartItems = data?.data.RTChart.chart.items;
  const listSong = data?.data.RTChart.items;
  const datasets = chartItems
    ? Object.keys(chartItems).map((key, index) => {
        const color = ["#36a2eb", "#4bc0c0", "#ff6384"][index % 3];
        return {
          label: `Dataset ${index + 1}`,
          data: chartItems[key].map((item: IChartHome) => item.counter),
          borderColor: color,
          backgroundColor: color,
          fill: false,
          tension: 0.4,
          pointRadius: 7,
          pointBackgroundColor: color,
          pointBorderColor: "#fff",
          pointHoverRadius: 10,
          pointHoverBorderWidth: 5,
          hoverRadius: 4,
        };
      })
    : [];

  const chartData = {
    labels,
    datasets,
  };

  const options: ChartOptions<"line"> = {
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    responsive: true,
    aspectRatio: 4,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
        labels: {
          color: "red",
        },
      },

      tooltip: {
        enabled: false,
        position: "nearest",
        yAlign: "center",
        external: (tooltip: any) => {
          const tooltipModel = tooltip.tooltip;
          if (!chartRef || !chartRef.current) return;
          if (tooltipModel.opacity === 0) {
            if (tooltipState.opacity !== 0)
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
            return;
          }
          const counter = [];
          for (let i = 0; i < 3; i++) {
            counter.push({
              data: chart?.items[Object.keys(chart?.items)[i]]
                ?.filter((item: IChartHome) => item.hour)
                .map((item: IChartHome) => item.counter),
              encodeId: Object.keys(chart?.items)[i],
            });
          }
          const splitLine = tooltipModel.body[0].lines[0].split(": ");

          const result = counter?.find((item) =>
            item.data.some(
              (itemSc: number) => itemSc === +splitLine[1].replace(".", "")
            )
          );
          if (result) {
            setSelectedEncodeId(result.encodeId);
          }
          const newTooltipData = {
            opacity: 1,
            left: tooltipModel.caretX,
            top: tooltipModel.caretY,
          };
          if (!_.isEqual(tooltipState, newTooltipData))
            setTooltipState(newTooltipData);
        },
      },
    },
    scales: {
      x: {
        ticks: { display: true, color: "white" },
        grid: { color: "transparent" },
      },

      y: {
        display: true,
        ticks: { display: false },
        grid: { color: "rgba(255, 255, 255, 0.5)", drawTicks: false },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [3, 4] },
      },
    },
    hover: {
      mode: "dataset", //index
      intersect: false,
    },
  };

  return (
    <div className={cx("wrapper")}>
      {labels && datasets.length > 0 && (
        <Line ref={chartRef} data={chartData} options={options} />
      )}
      {listSong?.map((item: InfoSong, index: number) => {
        if (item.encodeId === selectedEncodeId)
          return (
            <div
              key={index}
              className={cx("tooltip")}
              style={{
                top: tooltipState.top,
                left: tooltipState.left,
                opacity: tooltipState.opacity,
              }}
            >
              <MediaSong
                data={item}
                zingChart="zingChart"
                playlist={listSong}
              />
              <div className={cx("zing-chart-before")}></div>
            </div>
          );
      })}
    </div>
  );
}

export default ZingChartLine;
