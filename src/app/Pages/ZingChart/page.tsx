"use client";
import useDataChartHome from "@/components/hooks/useDataChartHome";
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./ZingChart.module.scss";
import { faL, faPlay } from "@fortawesome/free-solid-svg-icons";
import ZingChartLine from "@/components/ZingChartLine/ZingChartLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

function ZingChart() {
  // const { data } = useDataChartHome();

  return (
    <div className={cx("wrapper")}>
      <div className={cx("mh-chart")}>
        <div className={cx("mh-chart-title")}>
          <h2 className={cx("title", "title-text-box-color")}>#ZingChart</h2>
          <div className={cx("title-btn-icon-play", "title-icon")}>
            <FontAwesomeIcon className={cx("btn-play")} icon={faPlay} />
          </div>
        </div>
        <div className={cx("zing-chart")}>
          <ZingChartLine />
        </div>
      </div>
    </div>
  );
}

export default ZingChart;
