import { Clear } from "@mui/icons-material";
import { Box, Fade, IconButton, Modal, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import styles from "./style";

function CustomModal({
  children,
  open,
  handleClose,
  width,
  height,
  modalTitle,
  modalSubtitle,
  icon,
}) {
  const classes = styles();
  function getModalStyle(height, width) {
    return {
      top: `50%`,
      left: `50%`,
      width: width || "800px",

      height: height || "auto",
      maxHeight: height || "80vh",
      transform: "translate(-50%, -50%)",
      overflowY: "auto",
    };
  }
  const [modalStyle, setModalStyle] = useState();

  useEffect(() => {
    setModalStyle(getModalStyle(height, width));
  }, [height, width]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
      disableScrollLock
    >
      <Fade in={open}>
        <div style={{ ...modalStyle }} className={classes.paper}>
          {modalTitle && (
            <Box className={classes.modalHeader}>
              <Box className={classes.modalTitle}>
                {icon && <Box className={classes.icon}>{icon}</Box>}
                <Box>
                  <Typography fontSize="medium">
                    {modalTitle?.toUpperCase()}
                  </Typography>
                </Box>
              </Box>
              <IconButton
                variant="subtitle1"
                className={classes.rotate}
                onClick={handleClose}
              >
                <Clear />
              </IconButton>
            </Box>
          )}
          <Box p="11px 20px 20px 20px">
            <Box>{children}</Box>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
}

export default memo(CustomModal);
