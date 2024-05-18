"use client";
import useDataChartHome from "@/components/hooks/useDataChartHome";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ZingChart.module.scss";
import { faL } from "@fortawesome/free-solid-svg-icons";
import ZingChartLine from "@/components/ZingChartLine/ZingChartLine";

const cx = classNames.bind(styles);

function ZingChart() {
  // const { data } = useDataChartHome();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("mh-chart")}>
        <div className={cx("mh-chart-hour")}>
          <ZingChartLine />
        </div>
      </div>
    </div>
  );
}

export default ZingChart;
