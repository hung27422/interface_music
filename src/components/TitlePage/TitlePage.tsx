import classNames from "classnames/bind";
import styles from "./TitlePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { InfoSong } from "@/Interfaces/Interface";
import { useContext, useEffect, useState } from "react";
import { MusicContext } from "../ContextMusic/ContextMusic";
const cx = classNames.bind(styles);
interface TitlePageProps {
  title: string;
  show?: boolean;
  data: InfoSong[];
}
function TitlePage({ title, show, data }: TitlePageProps) {
  const { setEncodeIdSong, activePlay, setActivePlay } =
    useContext(MusicContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePlaySongRandom = () => {
    let indexRadom = Math.floor(Math.random() * data.length) % data.length;
    setEncodeIdSong(data[indexRadom]?.encodeId);
    setActivePlay(true);
  };

  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title", "title-text-box-color")}>#{title}</h2>
      {show && (
        <div
          onClick={handlePlaySongRandom}
          className={cx("title-btn-icon-play", "title-icon")}
        >
          <FontAwesomeIcon className={cx("btn-play")} icon={faPlay} />
        </div>
      )}
    </div>
  );
}

export default TitlePage;
