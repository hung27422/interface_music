import images from "@/assets/images/images";
import Link from "next/link";
import Image from "next/image";
import MenuSidebar from "./MenuSidebar";
import CreatePlaylist from "./CreatePlaylist";

import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
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
      <MenuSidebar></MenuSidebar>
      <CreatePlaylist></CreatePlaylist>
    </div>
  );
}

export default Sidebar;
