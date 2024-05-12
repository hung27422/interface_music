"use client";
import Image from "next/image";
import useTest from "@/components/hooks/useTest";
import { log } from "console";

import classNames from "classnames/bind";
import styles from "./page.module.scss";
import Navbar from "./Layouts/Navbar/Navbar";
const cx = classNames.bind(styles);

export default function Home() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("page")}>Trang chủ</div>
    </div>
  );
}
