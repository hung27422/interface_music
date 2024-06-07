"use client";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import BoxLogin from "@/components/BoxLogin/BoxLogin";
import BoxPlaylist from "@/components/BoxPlaylist/BoxPlaylist";
const cx = classNames.bind(styles);
function CreatePlaylist() {
  const { isAuthenticated } = useAuth0();
  return (
    <>{isAuthenticated ? <BoxPlaylist sidebar /> : <BoxLogin crPlaylist />}</>
  );
}

export default CreatePlaylist;
