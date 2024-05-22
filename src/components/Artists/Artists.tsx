import classNames from "classnames/bind";
import styles from "./Artists.module.scss";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { IArtist } from "@/Interfaces/Interface";
import useFormatNumber from "../hooks/useFormatNumber";
const cx = classNames.bind(styles);
interface IArtistProps {
  data: IArtist;
}
function Artists({ data }: IArtistProps) {
  const totalFollow = useFormatNumber(data?.totalFollow);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("img-hover")}>
        <div className={cx("size-image")}>
          <Link
            href={"/Pages/Album"}
            // id={item.encodeId}
            // onClick={(e) => handleGetEncodeId(e.currentTarget.id)}
            className={cx("avatar")}
            style={{
              backgroundImage: `url(${data?.thumbnail})`,
            }}
          ></Link>
        </div>
        <div className={cx("action")}>
          <Tippy content="Thêm vào thư viện">
            <button className={cx("btn-shuffle", "btn-icon")}>
              <FontAwesomeIcon icon={faShuffle} />
            </button>
          </Tippy>
        </div>
      </div>
      <div className={cx("info-artist")}>
        <span className={cx("artist-name")}>{data?.name}</span>
        <span className={cx("artist-follow")}>{totalFollow} quan tâm</span>
      </div>
      <div className={cx("btn-follow")}>
        <FontAwesomeIcon icon={faUserPlus} />
        <span>QUAN TÂM</span>
      </div>
    </div>
  );
}

export default Artists;
