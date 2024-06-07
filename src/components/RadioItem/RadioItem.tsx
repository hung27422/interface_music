import classNames from "classnames/bind";
import styles from "./RadioItem.module.scss";
import Link from "next/link";
import { url } from "inspector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { IRadio, ISectionPlaylist } from "@/Interfaces/Interface";
import useFormatTime from "../../hooks/useFormatTime";
import useFormatDate from "../../hooks/useFormatDate";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
interface IRadioProps {
  data: IRadio;
}
function RadioItem({ data }: IRadioProps) {
  const notify = () => {
    toast("Hiện chức năng chưa được phát triển. Bạn quay lại sau nhé ^.^");
  };
  const handlePlayMusicRadio = () => {
    notify();
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("body")}>
        <div className={cx("img-hover")}>
          <div className={cx("size-image")}>
            <div
              className={cx("avatar")}
              style={{
                backgroundImage: `url(${data?.program?.thumbnail})`,
              }}
            ></div>
          </div>
          <div className={cx("action")}>
            <button
              onClick={handlePlayMusicRadio}
              className={cx("btn-play-radio")}
            >
              <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
      <div className={cx("radio-info")}>
        <span className={cx("title-live")}>Live</span>
        <span className={cx("radio-name")}>{data?.host?.name}</span>
        <span className={cx("radio-active-user")}>
          {data?.activeUsers} người đang nghe
        </span>
      </div>
    </div>
  );
}

export default RadioItem;
