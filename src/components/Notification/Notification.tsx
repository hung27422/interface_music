import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

export default function Notification() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span style={{ fontSize: "20px", color: "red", textAlign: "center" }}>
            Vì lý do bản quyền nên các bài nhạc hiện đang không nghe được!!!
          </span>
          <br />
          <span style={{ fontSize: "20px", color: "red", textAlign: "center" }}>
            Mong các bạn thông cảm
          </span>
          <br />
          <span style={{ fontSize: "20px", color: "red", textAlign: "center" }}>
            (Due to copyright reasons, the songs are currently unavailable!!!. I
            hope you understand)
          </span>
        </Box>
      </Modal>
    </div>
  );
}
