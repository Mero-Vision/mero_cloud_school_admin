import { Box } from "@mui/material";
import Popover from "@mui/material/Popover";
import * as React from "react";

export default function CustomPopover({
  ButtonComponent,
  component,
  styleProps,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box width={"100%"}>
      <Box aria-describedby={id} onClick={handleClick}>
        {ButtonComponent}{" "}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={
          styleProps?.anchorOrigin || {
            vertical: "top",
            horizontal: "right",
          }
        }
        transformOrigin={
          styleProps?.transformOrigin || {
            vertical: "top",
            horizontal: "left",
          }
        }
        {...styleProps}
      >
        <Box>{component}</Box>{" "}
      </Popover>
    </Box>
  );
}
