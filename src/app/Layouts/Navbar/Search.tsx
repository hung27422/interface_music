"use client";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
const cx = classNames.bind(styles);

import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MediaSong from "@/components/MediaSong/MediaSong";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import useGetDataSearch from "@/components/hooks/useGetDataSearch";
import { InfoSong } from "@/Interfaces/Interface";
import Image from "next/image";
import Link from "next/link";

export default function Search() {
  const { data } = useGetDataSearch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { resultSearch, setResultSearch } = React.useContext(MusicContext);
  const { setEncodeIdPlaylist } = React.useContext(MusicContext);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const popperRef = React.useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      popperRef.current &&
      !popperRef.current.contains(event.target as Node)
    ) {
      setAnchorEl(null);
    }
  };
  React.useEffect(() => {
    if (anchorEl) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [anchorEl]);

  const handleValueSearch = (value: string) => {
    setResultSearch(value);
  };
  const handleSearchChangPage = (encodeId: string) => {
    setEncodeIdPlaylist(encodeId);
  };
  return (
    <div className={cx("box-search")}>
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
            value={resultSearch}
            onChange={(e) => handleValueSearch(e.target.value)}
          />
        </div>
      </button>
      <Popper
        ref={popperRef}
        id={id}
        open={open}
        anchorEl={anchorEl}
        className={cx("box-search")}
      >
        <div className={cx("result-search")}>
          {data?.data?.songs ? (
            <>
              <h3 className={cx("title-result")}>Gợi ý kết quả</h3>
              <div className={cx("item-result")}>
                {data?.data.songs
                  ?.slice(0, 4)
                  .map((item: InfoSong, index: number) => {
                    return (
                      <div className={cx("item-song")} key={index}>
                        <MediaSong data={item} playlist={data?.data} />
                      </div>
                    );
                  })}
              </div>
            </>
          ) : (
            <>
              <h3 className={cx("title-result")}>Đề xuất hàng đầu</h3>
              {data?.data?.topSuggest
                ?.slice(0, 5)
                .map((item: InfoSong, index: number) => {
                  return (
                    <div key={index}>
                      <Link
                        id={item?.encodeId}
                        href={"/Pages/Album"}
                        onClick={(e) =>
                          handleSearchChangPage(e.currentTarget.id)
                        }
                        className={cx("top-suggest")}
                      >
                        <Image
                          src={item?.thumbnailM}
                          alt="img-top-suggest"
                          className={cx("img-suggest")}
                          width={50}
                          height={50}
                        ></Image>
                        <div className={cx("info-top-suggest")}>
                          <span className={cx("suggest-title")}>
                            {item?.title}
                          </span>
                          <span className={cx("artist-name")}>
                            {item?.artistsNames}
                          </span>
                        </div>
                      </Link>
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </Popper>
    </div>
  );
}
