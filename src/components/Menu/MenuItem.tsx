import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
const cx = classNames.bind(styles);
interface Props {
  title: string;
  href: string;
  icon: any;
  onClick: any;
  active: string;
  id: string;
}
function MenuItems({ title, href, icon, onClick, active, id }: Props) {
  return (
    <Link
      id={id}
      href={href}
      className={cx("menu-item", id === active ? "active" : "")}
      onClick={onClick}
    >
      <span className={cx("menu-icon")}>{icon}</span>
      <span className={cx("title")}>{title}</span>
    </Link>
  );
}

export default MenuItems;
