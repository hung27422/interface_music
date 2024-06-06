import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import classNames from "classnames/bind";
import styles from "./BoxPlaylist.module.scss";
import useGetDataPlaylist from "@/hooks/useGetDataPlaylist";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);
const style = {
  position: "absolute" as "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#efe9d9",
  border: "2px solid var(--text-color)",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "5px",
};

export default function BoxPlaylist() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { dataPlaylist, addPlaylist } = useGetDataPlaylist();
  const [playlistName, setPlaylistName] = React.useState("");
  const notify = () =>
    toast(
      "Xin lỗi chúng tôi giới hạn tạo 6 playlist. Chúng tôi sẽ sớm phát triển thêm ^.^"
    );

  const playlistLocal = localStorage.getItem("playlist1") || "";
  if (!playlistLocal) {
    return;
  }
  const dataPlaylistLocal = JSON.parse(playlistLocal);
  const dataPlaylistItem = dataPlaylist.data.map((item: any) => {
    return item;
  });
  const dataPlaylistItems = dataPlaylistLocal
    ? dataPlaylistLocal.data
    : dataPlaylistItem;
  const handleAddPlaylistData = () => {
    if (dataPlaylistItems.length > 5) {
      notify();
      return;
    }
    if (playlistName.trim() !== "") {
      addPlaylist(playlistName);
      setPlaylistName("");
      handleClose();
    }
  };
  return (
    <div>
      <button onClick={handleOpen} className={cx("btn-add-playlist")}>
        Thêm Playlist +
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className={cx("title")}>Tạo Playlist Mới</h2>
          <div>
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Nhập tên playlist muốn tạo..."
              className={cx("input-name")}
            />
          </div>
          <button onClick={handleAddPlaylistData} className={cx("btn-add")}>
            Thêm Playlist
          </button>
        </Box>
      </Modal>
    </div>
  );
}
