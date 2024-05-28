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
import ControlRight from "./ControlRight";

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
        <ControlRight />
      </div>
    </div>
  );
}

export default ControlMusic;
