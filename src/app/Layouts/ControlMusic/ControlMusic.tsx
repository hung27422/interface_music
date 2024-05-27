"use client";
import classNames from "classnames/bind";
import styles from "./ControlMusic.module.scss";
import MediaSong from "@/components/MediaSong/MediaSong";
import {
  MVIcon,
  MicroIcon,
  NextIcon,
  PlayIcon,
  PrevIcon,
  RandomIcon,
  RepeatIcon,
  SoundIcon,
} from "@/components/Icons";
import Tippy from "@tippyjs/react";
import ControlMiddle from "./ControlMiddle";
import useGetDataInfoSong from "@/components/hooks/useGetDataInfoSong";

const cx = classNames.bind(styles);
function ControlMusic() {
  const { data } = useGetDataInfoSong();
  return (
    <div className={cx("wrapper")}>
      <div className={cx("control-left")}>
        <MediaSong data={data?.data} control={"control"} />
      </div>
      <div>
        <ControlMiddle />
      </div>
      <div className={cx("control-right")}>
        <Tippy content="MV">
          <button className={cx("control-btn-item")}>
            <MVIcon></MVIcon>
          </button>
        </Tippy>
        <Tippy content="Xem lời bài hát">
          <button className={cx("control-btn-item")}>
            <MicroIcon></MicroIcon>
          </button>
        </Tippy>
        <button className={cx("btn-sound", "control-btn-item")}>
          <SoundIcon></SoundIcon>
          <input
            className={cx("control-sound")}
            type="range"
            name="sound"
            id="sound"
          />
        </button>
      </div>
    </div>
  );
}

export default ControlMusic;
