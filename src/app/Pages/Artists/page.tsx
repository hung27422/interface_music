"use client";
import classNames from "classnames/bind";
import styles from "./Artists.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import MHSectionPlaylist from "@/components/MHSectionPlaylist/MHSectionPlaylist";
import { useContext, useEffect } from "react";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import useGetDataArtist from "@/components/hooks/useGetDataArtist";
import { IArtist, ISectionPlaylist, InfoSong } from "@/Interfaces/Interface";
import MediaSong from "@/components/MediaSong/MediaSong";
const cx = classNames.bind(styles);
function Artists() {
  const { aliasArtist } = useContext(MusicContext);
  const { data } = useGetDataArtist();
  const result = data?.data;
  const sectionArtist = data?.data?.sections;
  const songFeature = sectionArtist?.filter((item: IArtist) => {
    return item?.title === "Bài hát nổi bật";
  });
  const playlistArtist = sectionArtist?.filter((item: IArtist) => {
    return item?.sectionType === "playlist";
  });

  useEffect(() => {
    console.log("artists", data);
    console.log("alias", aliasArtist);
    console.log("result", result);
  }, [aliasArtist, data, result]);
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("artist-list-info")}>
          <Image
            src={result?.thumbnailM}
            className={cx("avt-artist")}
            width={150}
            height={150}
            alt="avt-artist"
          ></Image>
          <div className={cx("artist-item-info")}>
            <div className={cx("artist-name")}>
              <span>{result?.name}</span>
              <div className={cx("title-btn-icon-play-l", "btn-icon-play")}>
                <FontAwesomeIcon className={cx("btn-play")} icon={faPlay} />
              </div>
            </div>
            <div className={cx("artist-follow")}>
              <span>{result?.totalFollow} người quan tâm</span>
              <div className={cx("btn-follow")}>
                <FontAwesomeIcon icon={faUserPlus} />
                <span>QUAN TÂM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cx("container")}>
        <div className={cx("song-feature")}>
          <div className={cx("song-feature-tile")}>
            <h2>Bài hát nổi bật</h2>
            <button className={cx("btn-all")}>Tất cả {`>`}</button>
          </div>
          <div className={cx("song-feature-list")}>
            {songFeature?.map((data: any) => {
              return data?.items
                ?.slice(0, 9)
                .map((item: InfoSong, index: number) => {
                  return (
                    <div key={index}>
                      <MediaSong data={item} />
                    </div>
                  );
                });
            })}
          </div>
        </div>
        <div className={cx("artist-playlist")}>
          {playlistArtist?.map((data: ISectionPlaylist, index: number) => {
            return (
              <div key={index}>
                <MHSectionPlaylist dataSectionPlaylist={data} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={cx("footer-info")}>
        <h2>Về {result?.realname}</h2>
        <div className={cx("footer-info-artist")}>
          <div
            className={cx("avatar")}
            style={{
              backgroundImage: `url(${result?.thumbnailM})`,
            }}
          ></div>
          <div className={cx("des-artist")}>
            <span>{result?.biography}</span>
            <span>{result?.totalFollow}</span>
            <span>người quan tâm</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artists;
