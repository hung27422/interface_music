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
import { useContext, useEffect, useState } from "react";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import { PauseIcon } from "@/components/Icons/Icons";
import useGetDataInfoSong from "@/components/hooks/useGetDataInfoSong";
import { toast } from "react-toastify";
import useFormatDuration from "@/components/hooks/useFormatDuration";

const cx = classNames.bind(styles);
function ControlMiddle() {
  const notify = () => toast("Bạn hãy đăng ký VIP để nghe bài này nhé ^.^");
  const { data } = useGetDataInfoSong();
  const duration = useFormatDuration(data?.data?.duration);
  const {
    activePlay,
    setActivePlay,
    encodeIdSong,
    setEncodeIdSong,
    indexSong,
    setIndexSong,
    playlistContext,
    audioCurrentTime,
    audioSeek,
    audioRef,
    audioDuration,
    audioRepeatSong,
    setAudioRepeatSong,
    audioRandomSong,
    setAudioRandomSong,
  } = useContext(MusicContext);
  const [history, setHistory] = useState<string[]>([]);
  const handlePlayMusic = (encodeId: string) => {
    setEncodeIdSong(encodeId);
    setActivePlay(!activePlay);
  };
  console.log("htr", history);

  const handleNextSong = () => {
    let nextIndex = 0;
    if (audioRandomSong) {
      nextIndex =
        Math.floor(Math.random() * playlistContext.length) %
        playlistContext.length;
    } else {
      nextIndex = indexSong + 1;
    }
    if (nextIndex >= playlistContext.length) {
      nextIndex = 0;
    }
    setHistory((prev) => [...prev, playlistContext[indexSong]?.encodeId]);
    setEncodeIdSong(playlistContext[nextIndex]?.encodeId);
    setIndexSong(nextIndex);
  };
  const handlePrevSong = () => {
    if (history.length > 0) {
      const prevEncodeId = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setEncodeIdSong(prevEncodeId);
    }
  };
  const handleChangeSeek = (value: number) => {
    const audio = audioRef.current;
    if (audio !== null && audio !== undefined) {
      audio.currentTime = (audioDuration / 100) * value;
    }
  };
  const handleRepeatSong = () => {
    setAudioRepeatSong(!audioRepeatSong);
    setAudioRandomSong(false);
  };
  const handleRandomSong = () => {
    setAudioRandomSong(!audioRandomSong);
    setAudioRepeatSong(false);
  };
  useEffect(() => {
    if (data?.data?.streamingStatus === 2) {
      notify();
      const next = setTimeout(() => {
        handleNextSong();
      }, 3000);

      return () => clearTimeout(next);
    }
  }, [data?.data?.streamingStatus, encodeIdSong]); //
  return (
    <div className={cx("control-middle")}>
      <div className={cx("control-btn")}>
        {/* Random */}
        <Tippy content="Phát ngẫu nhiên">
          <button
            onClick={handleRandomSong}
            className={cx("control-btn-item", audioRandomSong && "active")}
          >
            <RandomIcon></RandomIcon>
          </button>
        </Tippy>
        {/* Prev */}
        <button
          onClick={handlePrevSong}
          className={cx("control-btn-item", history.length === 0 && "disabled")}
        >
          <PrevIcon></PrevIcon>
        </button>
        {/* Play & Pause */}
        <button
          id={data?.data?.encodeId}
          onClick={(e) => handlePlayMusic(e.currentTarget.id)}
          className={cx("control-btn-item")}
        >
          {activePlay ? <PauseIcon /> : <PlayIcon></PlayIcon>}
        </button>
        {/* Next */}
        <button onClick={handleNextSong} className={cx("control-btn-item")}>
          <NextIcon></NextIcon>
        </button>
        {/* Repeat */}
        <Tippy content="Lặp lại bài hát">
          <button
            onClick={handleRepeatSong}
            className={cx("control-btn-item", audioRepeatSong && "active")}
          >
            <RepeatIcon></RepeatIcon>
          </button>
        </Tippy>
      </div>
      <div className={cx("control-duration")}>
        <span className={cx("time-start")}>{formatTime(audioCurrentTime)}</span>
        <input
          className={cx("control-input")}
          type="range"
          name="duration"
          id="duration"
          min="0"
          max="100"
          value={audioSeek}
          onChange={(e) => handleChangeSeek(parseFloat(e.target.value))}
        />
        <span className={cx("time-end")}>{duration}</span>
      </div>
    </div>
  );
}

export default ControlMiddle;
const formatTime = (time: any) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
