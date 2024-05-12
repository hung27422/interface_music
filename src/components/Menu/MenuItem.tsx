import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import Link from "next/link";
const cx = classNames.bind(styles);
interface Props {
  title: string;
  href: string;
  icon: any;
}
function MenuItems({ title, href, icon }: Props) {
  return (
    <Link href={href} className={cx("menu-item")}>
      <span className={cx("menu-icon")}>{icon}</span>
      <span className={cx("title")}>{title}</span>
    </Link>
  );
}

export default MenuItems;
