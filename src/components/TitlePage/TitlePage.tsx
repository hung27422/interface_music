import classNames from "classnames/bind";
import styles from "./TitlePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { InfoSong } from "@/Interfaces/Interface";
import { useContext } from "react";
import { MusicContext } from "../ContextMusic/ContextMusic";
const cx = classNames.bind(styles);
interface TitlePageProps {
  title: string;
  show?: boolean;
  data?: InfoSong[];
}
function TitlePage({ title, show, data }: TitlePageProps) {
  const { setEncodeIdSong, setActivePlay, setIndexSong, setPlaylistContext } =
    useContext(MusicContext);

  const handlePlaySongRandom = () => {
    if (data) {
      let indexRandom = Math.floor(Math.random() * data.length) % data.length;
      setEncodeIdSong(data[indexRandom]?.encodeId);
      setActivePlay(true);
      setIndexSong(indexRandom);
      setPlaylistContext(data);
      localStorage.setItem("currentPlaylist", JSON.stringify(data));
      localStorage.setItem("currentSong", JSON.stringify(data[indexRandom]));
      localStorage.setItem(
        "encodeId",
        JSON.stringify(data[indexRandom]?.encodeId)
      );
      localStorage.setItem("indexSong", JSON.stringify(indexRandom));
    }
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
