import classNames from "classnames/bind";
import styles from "./RecentlyPlayed.module.scss";
import { useEffect, useState } from "react";
import MHSectionPlaylist from "../MHSectionPlaylist/MHSectionPlaylist";
import { ISectionPlaylist } from "@/Interfaces/Interface";
const cx = classNames.bind(styles);
function RecentlyPlayed() {
  return (
    <div className={cx("wrapper")}>
      <h2 className={cx("title")}>Nghe gần đây</h2>
      <div className={cx("content")}>
        {/* {Array.isArray(playlist) && playlist.length > 0 ? (
          playlist.map((item: ISectionPlaylist, index: number) => (
            <div key={index}>
              <MHSectionPlaylist dataSectionPlaylist={item} />
            </div>
          ))
        ) : (
          <p>No recently played items</p>
        )} */}
      </div>
    </div>
  );
}

export default RecentlyPlayed;
