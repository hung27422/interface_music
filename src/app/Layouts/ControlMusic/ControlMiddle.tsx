import classNames from "classnames/bind";
import styles from "./ControlMusic.module.scss";
const cx = classNames.bind(styles);
import {
  NextIcon,
  PlayIcon,
  PrevIcon,
  RandomIcon,
  RepeatIcon,
} from "@/components/Icons";
import Tippy from "@tippyjs/react";
function ControlMiddle() {
  return (
    <div className={cx("control-middle")}>
      <div className={cx("control-btn")}>
        <Tippy content="Phát ngẫu nhiên">
          <button className={cx("control-btn-item")}>
            <RandomIcon></RandomIcon>
          </button>
        </Tippy>
        <button className={cx("control-btn-item")}>
          <PrevIcon></PrevIcon>
        </button>
        <button className={cx("control-btn-item")}>
          <PlayIcon></PlayIcon>
        </button>
        <button className={cx("control-btn-item")}>
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
