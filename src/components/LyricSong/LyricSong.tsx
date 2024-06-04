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
import useGetDataLyric from "../../hooks/useGetDataLyric";
import { MusicContext } from "../ContextMusic/ContextMusic";
import { words } from "lodash";
import ControlMiddle from "@/app/Layouts/ControlMusic/ControlMiddle";
const cx = classNames.bind(styles);

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
  //   p: 4,
};
interface LyricSongProp {
  data: InfoSong;
}
export default function LyricSong({ data }: LyricSongProp) {
  const { audioCurrentTime, encodeIdSong } = React.useContext(MusicContext);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { data: dataLyrics } = useGetDataLyric();
  const dataWords = dataLyrics?.data?.sentences;
  const dataLyric = dataLyrics?.data?.lyric;
  //Lấy thời gian xấp xỉ
  const delta = 0.41;
  console.log("isSong", encodeIdSong);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    const activeLyric = document.querySelector(`.${styles.show}`);

    if (activeLyric && containerRef.current) {
      // Lấy vị trí cuộn từ cạnh trên nội dung bên trong là thẻ <li></li> tới cạnh trên của containerRef
      const containerTop = containerRef.current.scrollTop;
      // Lấy chiều cao của containerRef
      const containerHeight = containerRef.current.clientHeight;
      //Lấy độ dài từ cạnh trên containerRef tới cạnh trên của thẻ <li></li> hiện tại
      const lyricTop = (activeLyric as HTMLElement).offsetTop;
      // Lấy chiều cao của thẻ <li></li>
      const lyricHeight = (activeLyric as HTMLElement).clientHeight;
      // Kiểm tra độ dài của thẻ <li></li> vượt ngoài containerRef không
      if (lyricTop + lyricHeight > containerTop + containerHeight) {
        containerRef.current.scrollTo({
          top: lyricTop - containerHeight / 2 + lyricHeight / 2,
          behavior: "smooth",
        });
      }
    }
  }, [audioCurrentTime]);
  return (
    <div>
      <button onClick={handleOpen}>
        <MicroIcon></MicroIcon>
      </button>
      <Modal
        open={open}
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
                  onClick={handleClose}
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
              <div ref={containerRef} className={cx("container-lyric")}>
                {!dataWords ? (
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "40%",
                      right: "50%",
                      width: "200px",
                    }}
                  >
                    Không có lời bài hát
                  </span>
                ) : (
                  // <span
                  //   dangerouslySetInnerHTML={{
                  //     __html: dataLyric.replace(/\n/g, "<br>"),
                  //   }}
                  // />
                  <>
                    {dataWords?.map((sentence: any, index: number) => (
                      <div key={index}>
                        {sentence.words.map(
                          (word: ILyric, wordIndex: number) => (
                            <span
                              key={wordIndex}
                              className={cx(
                                "container-lyric-item",
                                Math.abs(
                                  audioCurrentTime - word.startTime / 1000
                                ) < delta
                                  ? "show"
                                  : ""
                              )}
                            >
                              {word.data}
                            </span>
                          )
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
            <div className={cx("footer")}>
              <ControlMiddle />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
const formatTime = (time: number) => {
  let totalSeconds = time;
  // Chuyển đổi từ giây sang phút
  let totalMinutes = Math.floor(totalSeconds / 60);
  // Tính số giờ
  let hours = Math.floor(totalMinutes / 60);
  // Tính số phút
  let minutes = totalMinutes % 60;
  return `${hours} giờ ${minutes} phút`;
};
