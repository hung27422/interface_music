import classNames from "classnames/bind";
import styles from "./MVSong.module.scss";
const cx = classNames.bind(styles);
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MVIcon } from "../Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { InfoSong } from "@/Interfaces/Interface";
import useGetDataMV from "@/hooks/useGetDataMV";
import { MusicContext } from "../ContextMusic/ContextMusic";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid var(--text-color)",
  borderRadius: "12px",
  boxShadow: 24,
};
interface MVSongProp {
  data: InfoSong;
}
export default function MVSong({ data }: MVSongProp) {
  const { data: dataMV } = useGetDataMV();
  const srcMV = dataMV?.data?.streaming?.mp4["480p"];
  const { setActivePlay } = React.useContext(MusicContext);
  const refVideo = React.useRef<HTMLVideoElement>(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeActive = () => {
    setActivePlay(false);
    handleOpen();
  };
  return (
    <div>
      <button
        onClick={handleChangeActive}
        disabled={dataMV?.msg !== "Success"}
        className={cx("btn-mv", dataMV?.msg !== "Success" && "disable")}
      >
        <MVIcon />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={cx("wrapper")}>
            <div className={cx("header")}>
              <div className={cx("header-left")}></div>
              <div className={cx("header-middle")}>
                <span className={cx("header-middle-title")}>
                  MV: {data.title}
                </span>
              </div>
              <div className={cx("header-right")}>
                <FontAwesomeIcon
                  onClick={handleClose}
                  className={cx("header-right-icon")}
                  icon={faXmark}
                />
              </div>
            </div>
            <div className={cx("container")}>
              <video
                ref={refVideo}
                autoPlay
                src={srcMV}
                controls
                className={cx("container-video")}
              ></video>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
