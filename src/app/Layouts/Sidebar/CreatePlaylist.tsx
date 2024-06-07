"use client";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { useAuth0 } from "@auth0/auth0-react";
import BoxLogin from "@/components/BoxLogin/BoxLogin";
import BoxPlaylist from "@/components/BoxPlaylist/BoxPlaylist";
function CreatePlaylist() {
  const { isAuthenticated } = useAuth0();

  return (
    <>{isAuthenticated ? <BoxPlaylist sidebar /> : <BoxLogin crPlaylist />}</>
  );
}

export default CreatePlaylist;
