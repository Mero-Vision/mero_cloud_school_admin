import { Add } from "@mui/icons-material";
import { useTreeItem } from "@mui/lab/TreeItem";
import { Box, Button, Typography } from "@mui/material";
import React, { forwardRef, useState } from "react";
import useModal from "../../../../hooks/useModal";
import CustomModal from "../../../common/CustomModal/CustomModal";

const ChartsTreeViewContent = forwardRef(function ChartsTreeViewContent(
  props,
  ref
) {
  const {
    classes,
    className,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  console.log(props);

  const [hover, setHover] = useState(false);
  const { modals, handleOpen, handleClose } = useModal();

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event) => {
    preventSelection(event);
  };

  const handleExpansionClick = (event) => {
    handleExpansion(event);
  };

  const handleSelectionClick = (event) => {
    handleSelection(event);
  };

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        columnGap={"1rem"}
        onMouseDown={handleMouseDown}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        ref={ref}
        className={className}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          onClick={handleExpansionClick}
          height="50px"
        >
          {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
          <div className={classes.iconContainer}>{icon}</div>
          <Typography
            onClick={handleSelectionClick}
            component="div"
            className={classes.label}
          >
            {label}
          </Typography>
        </Box>

        {hover && (
          <Box>
            {expansionIcon && (
              <>
                <Button
                  color="primary"
                  startIcon={<Add />}
                  onClick={() => handleOpen("add_folder")}
                  sx={{ color: "#000" }}
                >
                  Add Folder
                </Button>
                <Button
                  color="primary"
                  startIcon={<Add />}
                  onClick={() => handleOpen("add_new")}
                  sx={{ color: "#000" }}
                >
                  Add New
                </Button>
              </>
            )}
            <Button
              color="primary"
              onClick={() => handleOpen("edit")}
              sx={{ color: "#000" }}
            >
              Edit
            </Button>
            {!expansionIcon && (
              <Button
                color="primary"
                onClick={() => handleOpen("edit")}
                sx={{ color: "#000" }}
              >
                View Details
              </Button>
            )}
          </Box>
        )}
      </Box>

      <CustomModal
        open={modals?.add_folder}
        handleClose={() => handleClose("add_folder")}
        modalTitle={`Add Folder`}
      >
        <Typography>Folder: {label}</Typography>
      </CustomModal>
      <CustomModal
        open={modals?.add_new}
        handleClose={() => handleClose("add_new")}
        modalTitle={`Add New`}
      >
        <Typography>New</Typography>
      </CustomModal>
    </>
  );
});

export default ChartsTreeViewContent;
