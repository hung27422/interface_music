import classNames from "classnames/bind";
import styles from "./auth0.module.scss";
import Image from "next/image";
import { useAuth0 } from "@auth0/auth0-react";
const cx = classNames.bind(styles);
function Profile() {
  const { user, isAuthenticated } = useAuth0();
  return (
    <div className={cx("profile")}>
      {user?.picture && (
        <Image
          className={cx("avt-user-profile")}
          src={user?.picture}
          alt="user"
          width={60}
          height={60}
        />
      )}
      <div className={cx("info-user")}>
        <span className={cx("user-name")}>{user?.name}</span>
        <span className={cx("user-email")}>{user?.email}</span>
      </div>
    </div>
  );
}

export default Profile;
