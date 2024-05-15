import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
const cx = classNames.bind(styles);

import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MediaSong from "@/components/MediaSong/MediaSong";

export default function Search() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <button aria-describedby={id} type="button" onClick={handleClick}>
        <div className={cx("search")}>
          <FontAwesomeIcon
            className={cx("icon-search")}
            icon={faMagnifyingGlass}
          />
          <input
            type="search"
            placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát,..."
            spellCheck="false"
            className={cx("search-input")}
          />
        </div>
      </button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        className={cx("box-search")}
      >
        <div className={cx("result-search")}>
          <h3 className={cx("title-result")}>Gợi ý kết quả</h3>
          <div className={cx("item-result")}>
            <MediaSong />
          </div>
        </div>
      </Popper>
    </div>
  );
}
