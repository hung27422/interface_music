import classNames from "classnames/bind";
import styles from "./MediaSong.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
const cx = classNames.bind(styles);
interface Props {
  control: string;
}
function MediaSong({ control }: Props) {
  return (
    <div className={cx("wrapper", { control })}>
      <div className={cx("media-left", { control })}>
        <div className={cx("box-media")}>
          <Image
            src="https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/a/5/1/e/a51eccf0d34d67155eb9ba4989ac5861.jpg"
            alt="image-song"
            width={50}
            height={50}
            className={cx("image-song")}
          ></Image>
          <div className={cx("icon-play", { control })}>
            {/* <FontAwesomeIcon icon={faPlay} /> */}
            <Image
              src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif"
              alt="icon-play"
              width={16}
              height={16}
            ></Image>
          </div>
        </div>
        <div className={cx("media-info")}>
          <h3 className={cx("name-song")}>Ngõ Chạm</h3>
          <span className={cx("name-singer")}>BigDaddy,Emily</span>
        </div>
      </div>
      <div className={cx("media-right", { control })}>
        <Tippy content="Thêm vào thư viện">
          <FontAwesomeIcon className={cx("level-item")} icon={faHeart} />
        </Tippy>
        <Tippy content="Khác">
          <FontAwesomeIcon className={cx("level-item")} icon={faEllipsis} />
        </Tippy>
      </div>
    </div>
  );
}

export default MediaSong;
