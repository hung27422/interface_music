import classNames from "classnames/bind";
import styles from "./ArtistItems.module.scss";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShuffle, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { IArtist } from "@/Interfaces/Interface";
import useFormatNumber from "../hooks/useFormatNumber";
import { useContext } from "react";
import { MusicContext } from "../ContextMusic/ContextMusic";
const cx = classNames.bind(styles);
interface IArtistProps {
  data: IArtist;
}
function ArtistItems({ data }: IArtistProps) {
  const totalFollow = useFormatNumber(data?.totalFollow);
  const { setAliasArtist } = useContext(MusicContext);
  const handleGetAliasArtist = (alias: string) => {
    setAliasArtist(alias);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("img-hover")}>
        <div className={cx("size-image")}>
          <Link
            href={"/Pages/Artists"}
            id={data?.alias}
            onClick={(e) => handleGetAliasArtist(e.currentTarget.id)}
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

export default ArtistItems;
