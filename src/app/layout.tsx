import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";
import "./layout.module.scss";
import Navbar from "./Layouts/Navbar/Navbar";
import Sidebar from "./Layouts/Sidebar/Sidebar";
import classNames from "classnames/bind";
import styles from "./layout.module.scss";
import ControlMusic from "./Layouts/ControlMusic/ControlMusic";
const cx = classNames.bind(styles);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={cx("layout")}>
          <div className={cx("content")}>
            <Sidebar></Sidebar>
            <div className={cx("homepage")}>{children}</div>
          </div>
          <ControlMusic></ControlMusic>
        </div>
      </body>
    </html>
  );
}
