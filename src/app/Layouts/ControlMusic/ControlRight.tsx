import { MVIcon, MicroIcon, MuteIcon, SoundIcon } from "@/components/Icons";
import Tippy from "@tippyjs/react";
import classNames from "classnames/bind";
import styles from "./ControlMusic.module.scss";
import { useContext, useState } from "react";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
const cx = classNames.bind(styles);

function ControlRight() {
  const { audioVolume, setAudioVolume, audioMute, setAudioMute } =
    useContext(MusicContext);
  const [prevVolume, setPrevVolume] = useState(100);
  const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value) / 100;
    setAudioVolume(newVolume);
  };
  const handleMuteVolume = () => {
    if (!audioMute) {
      setPrevVolume(audioVolume); // Lưu trữ giá trị âm lượng trước khi mute
      setAudioVolume(0); // Mute âm lượng
    } else {
      setAudioVolume(prevVolume); // Khôi phục giá trị âm lượng từ prevVolume
    }
    setAudioMute(!audioMute);
  };
  return (
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
      <div className={cx("control-volume")}>
        {!audioMute ? (
          <button
            onClick={handleMuteVolume}
            className={cx("btn-sound", "control-btn-item")}
          >
            <SoundIcon></SoundIcon>
          </button>
        ) : (
          <button
            onClick={handleMuteVolume}
            className={cx("btn-sound", "control-btn-item")}
          >
            <MuteIcon></MuteIcon>
          </button>
        )}
        <div className={cx("sound-music")}>
          <div className={cx("sound-bar")}>
            <input
              className={cx("control-sound")}
              type="range"
              name="sound"
              id="sound"
              min="0"
              max="100"
              step="1"
              value={audioVolume * 100}
              onChange={(e) => handleChangeVolume(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlRight;
