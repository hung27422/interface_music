import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MicroIcon } from "../Icons";
import classNames from "classnames/bind";
import styles from "./LyricSong.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ILyric, InfoSong } from "@/Interfaces/Interface";
import Image from "next/image";
import useGetDataLyric from "../hooks/useGetDataLyric";
const cx = classNames.bind(styles);

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  //   p: 4,
};
interface LyricSongProp {
  data: InfoSong;
}
export default function LyricSong({ data }: LyricSongProp) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data: dataLyrics } = useGetDataLyric();
  //   console.log("lyric12333", dataLyrics);
  const dataWords = dataLyrics?.data?.sentences;
  console.log("words", dataWords);
  return (
    <div>
      <button onClick={handleOpen}>
        <MicroIcon></MicroIcon>
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
                <span className={cx("header-middle-title")}>Lời bài hát</span>
              </div>
              <div className={cx("header-right")}>
                <FontAwesomeIcon
                  className={cx("header-right-icon")}
                  icon={faXmark}
                />
              </div>
            </div>
            <div className={cx("container")}>
              <div className={cx("container-img")}>
                <Image
                  className={cx("img-song")}
                  src={data?.thumbnailM}
                  alt="img-song"
                  width={400}
                  height={200}
                />
              </div>
              <div className={cx("container-lyric")}>
                {dataWords?.map((sentence: any, index: number) => (
                  <div key={index}>
                    {sentence.words.map((word: ILyric, wordIndex: number) => (
                      <span
                        key={wordIndex}
                        className={cx("container-lyric-item")}
                      >
                        {word.data}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
