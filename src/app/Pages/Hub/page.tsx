"use client";
import classNames from "classnames/bind";
import styles from "./Hub.module.scss";
import { ISectionPlaylist } from "@/Interfaces/Interface";
import useDataHome from "@/hooks/useDataHome";
import MHSectionPlaylist from "@/components/MHSectionPlaylist/MHSectionPlaylist";
import HubHotItem from "@/components/HubHotItem/HubHotItem";
import SpinnerLoading from "@/components/SpinnerLoading/SpinnerLoading";
import TitlePage from "@/components/TitlePage/TitlePage";
const cx = classNames.bind(styles);
function Hub() {
  const { data, isLoading } = useDataHome();

  const playlist = data?.data.items.filter(
    (item: ISectionPlaylist) => item.sectionType === "playlist"
  );
  return (
    <div>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <div className={cx("wrapper")}>
          <TitlePage title="Chủ đề và Thể loại" data={playlist} />
          <div className={cx("hub-hot")}>
            <h2>Nổi bật</h2>
            <div className={cx("list-hot-hub")}>
              <HubHotItem
                image="https://photo-zmp3.zmdcdn.me/cover/d/b/e/4/dbe426a555b7d680be25232007739019.jpg"
                title="BXH Nhạc Mới"
                href="/Pages/BXHNewSong"
              />
              <HubHotItem
                image="https://photo-zmp3.zmdcdn.me/cover/2/d/2/d/2d2d88326a507319335ffc2e2887c0b7.jpg"
                title="Top 100"
                href="/Pages/Top100"
              />
            </div>
          </div>
          <div className={cx("playlist")}>
            {playlist?.map((item: ISectionPlaylist, index: number) => (
              <div key={index} className={cx("mh-section-playlist")}>
                <MHSectionPlaylist dataSectionPlaylist={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Hub;
