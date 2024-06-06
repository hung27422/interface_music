"use client";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import BoxAuth0 from "../../../auth0/BoxAuth0";
import Search from "./Search";
const cx = classNames.bind(styles);
function Navbar() {
  const notify = () =>
    toast("Chức năng chưa phát triển. Bạn quay lại sau nhé ^.^");
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
            <FontAwesomeIcon
              onClick={notify}
              className={cx("icon-item")}
              icon={faDownload}
            />
          </Tippy>
          <Tippy content="Cài đặt">
            <FontAwesomeIcon
              onClick={notify}
              className={cx("icon-item")}
              icon={faGear}
            />
          </Tippy>
          <BoxAuth0 />
          {/* <Image
            className={cx("avt-user")}
            src={images.avatar}
            alt="user"
            width={40}
            height={40}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
