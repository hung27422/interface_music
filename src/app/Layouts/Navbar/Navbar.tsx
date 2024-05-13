"use client";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faDownload,
  faGear,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import Image from "next/image";
import images from "@/assets/images/images";
import Search from "./Search";
const cx = classNames.bind(styles);
function Navbar() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("navbar-left")}>
        <div className={cx("icon-back")}>
          <FontAwesomeIcon className={cx("icon-arrow")} icon={faArrowLeft} />
          <FontAwesomeIcon className={cx("icon-arrow")} icon={faArrowRight} />
        </div>
        <Search></Search>
      </div>
      <div className={cx("navbar-right")}>
        <div className={cx("icon-list")}>
          <Tippy content="Tải về">
            <FontAwesomeIcon className={cx("icon-item")} icon={faDownload} />
          </Tippy>
          <Tippy content="Cài đặt">
            <FontAwesomeIcon className={cx("icon-item")} icon={faGear} />
          </Tippy>
          <Image
            className={cx("avt-user")}
            src={images.avatar}
            alt="user"
            width={40}
            height={40}
          />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
