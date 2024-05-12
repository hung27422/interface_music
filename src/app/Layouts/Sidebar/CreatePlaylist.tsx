import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
function CreatePlaylist() {
  return (
    <div className={cx("playlist-wrapper")}>
      <div className={cx("box-icon")}>
        <i className={cx("icon-add")}>
          <FontAwesomeIcon icon={faPlus} />
        </i>
      </div>
      <span className={cx("title-playlist")}>Thêm mới Playlist</span>
    </div>
  );
}

export default CreatePlaylist;
