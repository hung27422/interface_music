import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import images from "@/assets/images/images";
import Link from "next/link";
import Image from "next/image";
import Menu from "@/components/Menu/Menu";
import MenuItems from "@/components/Menu/MenuItem";
import { HomeIcon, LibraryIcon, TrendingIcon } from "@/components/Icons";
const cx = classNames.bind(styles);
function Sidebar() {
  return (
    <div className={cx("wrapper")}>
      <Link href={"/"} className={cx("logo")}>
        <Image
          src={images.iconLogo}
          width={50}
          height={50}
          alt="iconLogo"
        ></Image>
        <Image src={images.logo} width={120} height={40} alt="iconLogo"></Image>
      </Link>
      <Menu>
        <MenuItems href="/" title="Trang chủ" icon={<HomeIcon />}></MenuItems>
        <MenuItems
          href="/Pages/Trending"
          title="Xu hướng"
          icon={<TrendingIcon />}
        ></MenuItems>
        <MenuItems
          href="/Pages/Library"
          title="Thư viện"
          icon={<LibraryIcon />}
        ></MenuItems>
        {/* <MenuItems href="/" title="Trang chủ" icon={<HomeIcon />}></MenuItems> */}
      </Menu>
    </div>
  );
}

export default Sidebar;
