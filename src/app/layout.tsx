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
import ContextMusic from "@/components/ContextMusic/ContextMusic";
import { ToastContainer } from "react-toastify";
import Audio from "./Music/Audio";
import AuthOProvider from "@/auth0/Auth0Provider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ContextMusic>
        <body className={inter.className}>
          <Audio />
          <ToastContainer />
          <AuthOProvider>
            <div className={cx("layout")}>
              <Navbar />
              <div className={cx("content")}>
                <Sidebar></Sidebar>
                <div className={cx("homepage")}>{children}</div>
              </div>
              <ControlMusic></ControlMusic>
            </div>
          </AuthOProvider>
        </body>
      </ContextMusic>
    </html>
  );
}
