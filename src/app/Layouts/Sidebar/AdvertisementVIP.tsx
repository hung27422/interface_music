import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "@/auth0/Login";
const cx = classNames.bind(styles);
function AdvertisementVIP() {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <div className={cx("advertise-wrapper")}>
      <span className={cx("title-advertise")}>
        {!isAuthenticated
          ? "Đăng nhập để khám phá playlist dành riêng cho bạn "
          : " Nghe nhạc không quảng cáo cùng Premium"}
      </span>
      <div className={cx("box-button")}>
        {!isAuthenticated ? (
          <Login secondary="secondary" />
        ) : (
          <button className={cx("button-advertise")}>
            NÂNG CẤP TÀI KHOẢN VIP
          </button>
        )}
      </div>
    </div>
  );
}

export default AdvertisementVIP;
