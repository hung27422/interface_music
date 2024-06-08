"use client";
import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
const cx = classNames.bind(styles);
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TippyHeadless from "@tippyjs/react/headless";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { MusicContext } from "@/components/ContextMusic/ContextMusic";
import React, { useContext, useState } from "react";
import useGetDataSearch from "@/hooks/api/useGetDataSearch";
import MediaSong from "@/components/MediaSong/MediaSong";
import { InfoSong } from "@/Interfaces/Interface";
import Link from "next/link";
import Image from "next/image";

function Search() {
  const { data } = useGetDataSearch();
  const { resultSearch, setResultSearch, setEncodeIdPlaylist } =
    useContext(MusicContext);
  const [showResult, setShowResult] = useState(true);
  const handleValueSearch = (value: string) => {
    setResultSearch(value);
    setShowResult(true);
  };
  const handleSearchChangPage = (encodeId: string) => {
    setEncodeIdPlaylist(encodeId);
  };
  const handleHideResult = () => {
    setShowResult(false);
  };
  const searchResultTopSuggestion = (attrs: any) => {
    return (
      <div className={cx("result-search")} {...attrs}>
        <h3 className={cx("title-result")}>Đề xuất hàng đầu</h3>
        {data?.data?.topSuggest
          ?.slice(0, 5)
          .map((item: InfoSong, index: number) => {
            return (
              <div key={index}>
                <Link
                  id={item?.encodeId}
                  href={"/Pages/Album"}
                  onClick={(e) => handleSearchChangPage(e.currentTarget.id)}
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
                    <span className={cx("suggest-title")}>{item?.title}</span>
                    <span className={cx("artist-name")}>
                      {item?.artistsNames}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    );
  };
  const searchResultTippy = (attrs: any) => (
    <div className={cx("result-wrapper")} {...attrs}>
      {data?.data?.songs && (
        <div className={cx("result-search")}>
          <h3 className={cx("title-result")}>Gợi ý kết quả</h3>
          <div className={cx("item-result")}>
            {data.data.songs
              .slice(0, 4)
              .map((item: InfoSong, index: number) => {
                return (
                  <div className={cx("item-song")} key={index}>
                    <MediaSong
                      search
                      index={index}
                      data={item}
                      playlist={data.data.songs}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
  return (
    <TippyHeadless
      // visible={showResult}
      trigger="click"
      render={
        resultSearch.length === 0
          ? searchResultTopSuggestion
          : searchResultTippy
      }
      offset={[0, 0]}
      onClickOutside={handleHideResult}
      interactive
    >
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
    </TippyHeadless>
  );
}

export default Search;
