import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
const cx = classNames.bind(styles);
function AdvertisementVIP() {
  return (
    <div className={cx("advertise-wrapper")}>
      <span className={cx("title-advertise")}>
        Nghe nhạc không quảng cáo cùng Premium
      </span>
      <div className={cx("box-button")}>
        <button className={cx("button-advertise")}>
          NÂNG CẤP TÀI KHOẢN VIP
        </button>
      </div>
    </div>
  );
}

export default AdvertisementVIP;
