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
import { AlbumIcon, PlaylistIcon } from "@/components/Icons/Icons";
import AdvertisementVIP from "./AdvertisementVIP";
const cx = classNames.bind(styles);

function MenuSidebar() {
  const [active, setActive] = useState("1");
  const handleActive = (id: string) => {
    setActive(id);
    console.log(id);
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
            href="/Pages/Trending"
            id={"2"}
            title="Xu hướng"
            icon={<TrendingIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <MenuItems
            href="/Pages/Library"
            id={"3"}
            title="Thư viện"
            icon={<LibraryIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
        </Menu>
      </div>
      <div className={cx("sidebar-divide")}></div>
      <div className={cx("sidebar-scroll")}>
        <Menu>
          <MenuItems
            href="/Pages/Library"
            id={"4"}
            title="Top100"
            icon={<Top100Icon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <MenuItems
            href="/Pages/Library"
            id={"5"}
            title="Chủ đề và thể loại"
            icon={<TopicOptionsIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <MenuItems
            href="/Pages/Library"
            id={"6"}
            title="Nghe gần đây"
            icon={<ListenNearIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <AdvertisementVIP />
          <MenuItems
            href="/Pages/Library"
            id={"7"}
            title="Nghe gần đây"
            icon={<ListenNearIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <MenuItems
            href="/Pages/Library"
            id={"8"}
            title="Yêu thích"
            icon={<SongFavoriteIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <MenuItems
            href="/Pages/Library"
            id={"9"}
            title="Playlist"
            icon={<PlaylistIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
          <MenuItems
            href="/Pages/Library"
            id={"10"}
            title="Album"
            icon={<AlbumIcon />}
            active={active}
            onClick={(e: any) => handleActive(e.currentTarget.id)}
          ></MenuItems>
        </Menu>
      </div>
    </div>
  );
}

export default MenuSidebar;
