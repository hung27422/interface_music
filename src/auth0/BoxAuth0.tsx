"use client";
import classNames from "classnames/bind";
import styles from "./auth0.module.scss";
const cx = classNames.bind(styles);

import * as React from "react";
import Box from "@mui/material/Box";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import images from "@/assets/images/images";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import Login from "./Login";

export default function BoxAuth0() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLImageElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLImageElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
  return (
    <Box>
      <Popper
        sx={{
          zIndex: 1200,
          borderRadius: "12px",
        }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ borderRadius: "12px" }}>
              <Typography
                sx={{
                  p: 2,
                  marginTop: 2,
                  width: "300px",
                  textAlign: "center",
                  borderRadius: "12px",
                }}
              >
                {!isAuthenticated ? (
                  <Login primary="primary" />
                ) : (
                  <div>
                    <Profile />
                    <button
                      onClick={() =>
                        logout({
                          logoutParams: { returnTo: window.location.origin },
                        })
                      }
                      className={cx("btn-login")}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Grid container justifyContent="center">
        <Grid item>
          {isAuthenticated && user?.picture ? (
            <Image
              className={cx("avt-user")}
              src={user.picture}
              onClick={handleClick("bottom-end")}
              alt="user"
              width={40}
              height={40}
            />
          ) : (
            <Image
              className={cx("avt-user")}
              src={images.avatar}
              onClick={handleClick("bottom-end")}
              alt="user"
              width={40}
              height={40}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
