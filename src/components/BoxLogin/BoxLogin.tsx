import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import classNames from "classnames/bind";
import styles from "./BoxLogin.module.scss";
import MenuItems from "../Menu/MenuItem";
import { PlaylistIcon } from "../Icons/Icons";
import Image from "next/image";
import images from "@/assets/images/images";
import Login from "@/auth0/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(styles);
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid var(--text-color)",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};
interface BoxLoginProps {
  sideBar?: boolean;
  crPlaylist?: boolean;
}
export default function BoxLogin({ sideBar, crPlaylist }: BoxLoginProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {sideBar && (
        <MenuItems
          href=""
          id={"9"}
          title="Playlist"
          icon={<PlaylistIcon />}
          active=""
          onClick={handleOpen}
        ></MenuItems>
      )}
      {crPlaylist && (
        <div onClick={handleOpen} className={cx("playlist-wrapper")}>
          <div className={cx("box-icon")}>
            <i className={cx("icon-add")}>
              <FontAwesomeIcon icon={faPlus} />
            </i>
          </div>
          <span className={cx("title-playlist")}>Thêm mới Playlist</span>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={cx("wrapper")}>
            <div className={cx("header")}>
              <Image
                src={images.iconLogo}
                width={50}
                height={50}
                alt="iconLogo"
                className={cx("image")}
                priority
              ></Image>
              <Image
                src={images.logo}
                width={120}
                height={40}
                alt="iconLogo"
                className={cx("image")}
                priority
              ></Image>
            </div>
            <div className={cx("container")}>
              <Login primary="primary"></Login>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
