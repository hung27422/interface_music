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
import useGetDataInfoSong from "@/hooks/api/useGetDataInfoSong";
import { toast } from "react-toastify";
import useFormatDuration from "@/hooks/format/useFormatDuration";
import { InfoSong } from "@/Interfaces/Interface";

const cx = classNames.bind(styles);
function ControlMiddle() {
  const { data } = useGetDataInfoSong();
  const [playlistLocal, setPlaylistLocal] = useState<InfoSong[] | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [indexLocal, setIndexLocal] = useState<number>(0);

  const notify = (title: string) =>
    toast(
      <>
        Bạn hãy đăng ký VIP để nghe bài <br></br>
        <span style={{ color: "var(--text-color)", fontWeight: "700" }}>
          {title}
        </span>
        nhé ^.^
      </>
    );
  const {
    activePlay,
    setActivePlay,
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
    autoClick,
    dataStorage,
    activePlaylist,
    setActivePlaylist,
  } = useContext(MusicContext);

  const dataSong = data?.data ? data.data : dataStorage;
  const duration = useFormatDuration(dataSong?.duration);

  const dataPlaylist =
    playlistContext?.length > 0 ? playlistContext : playlistLocal;
  // Lấy dữ liệu của localStorage "currentPlaylist" set cho setPlaylistLocal
  useEffect(() => {
    const storedDataPlaylist = localStorage.getItem("currentPlaylist");
    if (storedDataPlaylist) {
      try {
        const storedPlaylist = JSON.parse(storedDataPlaylist);
        setPlaylistLocal(storedPlaylist);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);
  // Lưu indexSong để khi reload lại vẫn còn index để next song
  useEffect(() => {
    const storedIndexSong = localStorage.getItem("indexSong");
    if (storedIndexSong) {
      try {
        const storedIndex = JSON.parse(storedIndexSong);
        setIndexLocal(storedIndex);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const handlePlayMusic = (encodeId: string) => {
    setEncodeIdSong(encodeId);
    setActivePlay(!activePlay);
    setActivePlaylist(false);
  };

  const handleNextSong = () => {
    if (!dataPlaylist || dataPlaylist.length === 0) {
      // Xử lý trường hợp không có danh sách phát hoặc danh sách phát rỗng
      console.error("dataPlaylist rỗng");
      return;
    }

    let nextIndex = 0;
    if (audioRandomSong) {
      nextIndex =
        Math.floor(Math.random() * dataPlaylist.length) % dataPlaylist.length;
    } else {
      let currentIndex =
        indexSong !== null && indexSong !== undefined
          ? indexSong
          : indexLocal
          ? indexLocal
          : 0;
      nextIndex = (currentIndex + 1) % dataPlaylist.length;
    }
    if (nextIndex >= dataPlaylist.length) {
      nextIndex = 0;
    }
    if (indexSong) {
      setHistory((prev) => [...prev, dataPlaylist[indexSong]?.encodeId]);
    }
    setEncodeIdSong(dataPlaylist[nextIndex]?.encodeId);
    setIndexSong(nextIndex);
    setActivePlay(true);
    localStorage.setItem(
      "currentSong",
      JSON.stringify(dataPlaylist[nextIndex])
    );
    localStorage.setItem("currentPlaylist", JSON.stringify(dataPlaylist));
    localStorage.setItem(
      "encodeId",
      JSON.stringify(dataPlaylist[nextIndex]?.encodeId)
    );
    localStorage.setItem("indexSong", JSON.stringify(nextIndex));
  };
  const handlePrevSong = () => {
    if (!dataPlaylist) return;
    if (!indexSong) return;
    if (history.length > 0 && audioRandomSong) {
      const prevEncodeId = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      setEncodeIdSong(prevEncodeId);
      setActivePlay(true);
      let prevIndex = indexSong - 1;
      setIndexSong(prevIndex);
      localStorage.setItem(
        "currentSong",
        JSON.stringify(dataPlaylist[prevIndex])
      );
      localStorage.setItem("currentPlaylist", JSON.stringify(dataPlaylist));
      localStorage.setItem("encodeId", JSON.stringify(prevEncodeId));
    } else {
      let prevIndex = indexSong - 1;
      if (prevIndex < 0) {
        prevIndex = dataPlaylist.length - 1;
      }
      setEncodeIdSong(dataPlaylist[prevIndex]?.encodeId);
      setActivePlay(true);
      setIndexSong(prevIndex);
      localStorage.setItem(
        "currentSong",
        JSON.stringify(dataPlaylist[prevIndex])
      );
      localStorage.setItem("currentPlaylist", JSON.stringify(dataPlaylist));
      localStorage.setItem(
        "encodeId",
        JSON.stringify(dataPlaylist[prevIndex]?.encodeId)
      );
      localStorage.setItem("indexSong", JSON.stringify(prevIndex));
    }
  };
  const handleChangeSeek = (value: number) => {
    const audio = audioRef.current;
    if (audio) {
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
    if (data?.data) {
      if (data?.data?.streamingStatus === 2) {
        notify(data?.data?.title);
        setEncodeIdSong(data?.data?.encodeId);
        const next = setTimeout(() => {
          handleNextSong();
        }, 5000);

        return () => clearTimeout(next);
      }
    }
  }, [data?.data?.streamingStatus]);
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
          className={cx(
            "control-btn-item",
            (history.length === 0 && audioRandomSong) ||
              (indexSong === 0 && "disabled")
          )}
        >
          <PrevIcon></PrevIcon>
        </button>
        {/* Play & Pause */}
        <button
          id={dataSong?.encodeId}
          onClick={(e) => handlePlayMusic(e.currentTarget.id)}
          className={cx("control-btn-item")}
        >
          {activePlay || activePlaylist ? <PauseIcon /> : <PlayIcon></PlayIcon>}
        </button>
        {/* Next */}
        <button
          ref={autoClick}
          onClick={handleNextSong}
          className={cx("control-btn-item")}
        >
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
        <span className={cx("time-start")}>
          {audioCurrentTime ? formatTime(audioCurrentTime) : "0:00"}
        </span>
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
        <span className={cx("time-end")}>
          {dataSong?.duration ? duration : "0:00"}
        </span>
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
