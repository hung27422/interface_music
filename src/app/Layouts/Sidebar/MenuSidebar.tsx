"use client";
import {
  HomeIcon,
  LibraryIcon,
  ListenNearIcon,
  PlayIcon,
  SongFavoriteIcon,
  Top100Icon,
  TopicOptionsIcon,
  TrendingIcon,
} from "@/components/Icons";
import Menu from "@/components/Menu/Menu";
import MenuItems from "@/components/Menu/MenuItem";
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { Flavors } from "next/font/google";
import {
  AlbumIcon,
  BXHIcon,
  PlaylistIcon,
  ZingchartIcon,
} from "@/components/Icons/Icons";
import AdvertisementVIP from "./AdvertisementVIP";
import { toast } from "react-toastify";
const cx = classNames.bind(styles);

function MenuSidebar() {
  const [active, setActive] = useState("1");
  const notify = () =>
    toast("Trang này chưa được phát triển, bạn quay lại sau nhé ^.^");
  const handleActive = (id: string) => {
    setActive(id);
  };
  return (
    <div className={cx("sidebar-wrapper")}>
      <div className={cx("sidebar-main")}>
        <Menu>
          <MenuItems
            href="/"
            id={"1"}
            title="Trang chủ"
            icon={<HomeIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <MenuItems
            href="/Pages/ZingChart"
            id={"11"}
            title="ZingChart"
            icon={<ZingchartIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <MenuItems
            href="/Pages/Trending"
            id={"2"}
            title="Xu hướng"
            icon={<TrendingIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <MenuItems
            href=""
            id={"3"}
            title="Thư viện"
            icon={<LibraryIcon />}
            active={active}
            onClick={notify}
          ></MenuItems>
        </Menu>
      </div>
      <div className={cx("sidebar-divide")}></div>
      <div className={cx("sidebar-scroll")}>
        <Menu>
          <MenuItems
            href="/Pages/BXHNewSong"
            id={"4"}
            title="BXH Nhạc Mới"
            icon={<BXHIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <MenuItems
            href="/Pages/Hub"
            id={"5"}
            title="Chủ đề và thể loại"
            icon={<TopicOptionsIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <MenuItems
            href="/Pages/Top100"
            id={"6"}
            title="Top 100"
            icon={<Top100Icon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <AdvertisementVIP />
          <MenuItems
            href=""
            id={"8"}
            title="Yêu thích"
            icon={<SongFavoriteIcon />}
            active={active}
            onClick={notify}
          ></MenuItems>
          <MenuItems
            href=""
            id={"9"}
            title="Playlist"
            icon={<PlaylistIcon />}
            active={active}
            onClick={notify}
          ></MenuItems>
          <MenuItems
            href=""
            id={"10"}
            title="Album"
            icon={<AlbumIcon />}
            active={active}
            onClick={notify}
          ></MenuItems>
        </Menu>
      </div>
    </div>
  );
}

export default MenuSidebar;
