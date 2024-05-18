import { IChartHome } from "@/Interfaces/Interface";
import useDataChartHome from "../hooks/useDataChartHome";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, ChartOptions, plugins } from "chart.js";
import { useEffect } from "react";
Chart.register(CategoryScale);
import classNames from "classnames/bind";
import styles from "./ZingChartLine.module.scss";
const cx = classNames.bind(styles);

function ZingChartLine() {
  const { data } = useDataChartHome();
  const hours = data?.data.RTChart.chart.times;
  const labels = hours?.map((t: IChartHome) => `${t.hour}:00`);
  //   const labels = itemHour?.filter((item: number) => item % 2 === 0);
  const chart = data?.data.RTChart.chart;
  const chartItems = data?.data.RTChart.chart.items;
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
          pointRadius: 5,
          pointBackgroundColor: color,
          pointBorderColor: "#fff",
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
        };
      })
    : [];

  const chartData = {
    labels,
    datasets,
  };

  const options = {
    responsive: true,
    aspectRatio: 4,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          color: "red",
        },
        // globalCompositeOperation: "destination-over",
      },
      tooltip: {
        enabled: true,
      },
      hover: {
        mode: "dataset", //index
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { display: true, color: "black" },
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
  };
  //   useEffect(() => {
  //     console.log("charthome", data?.data.RTChart.chart);
  //     const hours = data?.data.RTChart.chart.times;
  //     // const labels = itemHour?.filter((item: number) => item % 2 === 0);
  //     const chart = data?.data.RTChart.chart;

  //     const test = data?.data.RTChart.chart.items;
  //     console.log(
  //       "hours",
  //       hours,
  //       "labels",
  //       labels,
  //       "t",
  //       test,
  //       "chartItems",
  //       chart
  //     );
  //   }, [data]);
  return (
    <div className={cx("wrapper")}>
      {labels && datasets.length > 0 && (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}

export default ZingChartLine;
