import "./Menu.module.scss";
import classNames from "classnames/bind";

import styles from "./Menu.module.scss";
const cx = classNames.bind(styles);
interface Props {
  children: any;
}
function Menu({ children }: Props) {
  return <nav className={cx("menu")}>{children}</nav>;
}
export default Menu;
