import classNames from "classnames/bind";
import styles from "./HubHotItem.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
interface IHubHotItem {
  href: string;
  title: string;
  image: string;
}
function HubHotItem({ title, href, image }: IHubHotItem) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("box-hub")}>
        <div className={cx("box-hub-item")}>
          <div className={cx("size-image")}>
            <Link
              href={href}
              className={cx("avatar")}
              style={{
                backgroundImage: `url(${image})`,
              }}
            ></Link>
          </div>
        </div>
        <div className={cx("action")}>
          <span className={cx("title-hub")}>{title}</span>
        </div>
      </div>
    </div>
  );
}

export default HubHotItem;
