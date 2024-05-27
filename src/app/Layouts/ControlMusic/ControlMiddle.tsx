"use client";
import classNames from "classnames/bind";
import styles from "./ControlMusic.module.scss";
import {
  NextIcon,
  PlayIcon,
  PrevIcon,
  RandomIcon,
  RepeatIcon,
} from "@/components/Icons";
import Tippy from "@tippyjs/react";
import { useContext, useEffect } from "react";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import { PauseIcon } from "@/components/Icons/Icons";
import useGetDataInfoSong from "@/components/hooks/useGetDataInfoSong";
import { toast } from "react-toastify";

const cx = classNames.bind(styles);
function ControlMiddle() {
  const { activePlay, setActivePlay } = useContext(MusicContext);
  const { encodeIdSong, setEncodeIdSong } = useContext(MusicContext);
  const { indexSong, setIndexSong } = useContext(MusicContext);
  const { playlistContext, setPlaylistContext } = useContext(MusicContext);
  const notify = () => toast("Bạn hãy đăng ký VIP để nghe bài này nhé ^.^");

  const { data } = useGetDataInfoSong();

  const handlePlayMusic = (encodeId: string) => {
    setEncodeIdSong(encodeId);
    setActivePlay(!activePlay);
  };

  const handleNextSong = () => {
    let nextIndex = indexSong + 1;
    if (nextIndex >= playlistContext.length) {
      nextIndex = playlistContext.length - 1;
    }
    setEncodeIdSong(playlistContext[nextIndex]?.encodeId);
    setIndexSong(nextIndex);
  };
  const handlePrevSong = () => {
    let prevIndex = indexSong - 1;
    if (prevIndex === 0) {
      prevIndex = 0;
    }
    setEncodeIdSong(playlistContext[prevIndex].encodeId);
    setIndexSong(prevIndex);
  };
  useEffect(() => {
    if (data?.data?.streamingStatus === 2) {
      notify();
      const next = setTimeout(() => {
        handleNextSong();
      }, 3000);

      return () => clearTimeout(next);
    }
  }, [data?.data?.streamingStatus]); //
  return (
    <div className={cx("control-middle")}>
      <div className={cx("control-btn")}>
        <Tippy content="Phát ngẫu nhiên">
          <button className={cx("control-btn-item")}>
            <RandomIcon></RandomIcon>
          </button>
        </Tippy>
        <button onClick={handlePrevSong} className={cx("control-btn-item")}>
          <PrevIcon></PrevIcon>
        </button>
        <button
          id={data?.data?.encodeId}
          onClick={(e) => handlePlayMusic(e.currentTarget.id)}
          className={cx("control-btn-item")}
        >
          {activePlay ? <PauseIcon /> : <PlayIcon></PlayIcon>}
        </button>
        <button onClick={handleNextSong} className={cx("control-btn-item")}>
          <NextIcon></NextIcon>
        </button>
        <Tippy content="Lặp lại bài hát">
          <button className={cx("control-btn-item")}>
            <RepeatIcon></RepeatIcon>
          </button>
        </Tippy>
      </div>
      <div className={cx("control-duration")}>
        <span className={cx("time-start")}>0:00</span>
        <input
          className={cx("control-input")}
          type="range"
          name="duration"
          id="duration"
          min="0"
          max="100"
        />
        <span className={cx("time-end")}>1:00</span>
      </div>
    </div>
  );
}

export default ControlMiddle;
