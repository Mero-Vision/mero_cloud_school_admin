import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import AllModals from "../../components/common/AllModals/AllModals";
import { ADD_ALL_DATA } from "../../constants/AddAllConstants";
import useStyles from "./styles";

const AddAll = () => {
  const classes = useStyles();
  return (
    <Box className={classes.addAllContainer}>
      {ADD_ALL_DATA?.map((item, index) => (
        <Box key={index}>
          <Box className={classes.title}>
            <Typography fontSize={"small"}>{item?.title}</Typography>
          </Box>
          {item?.buttons?.map((item, index) => (
            <SingleAddAll
              key={index}
              item={{ ...item, index }}
              classes={classes}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default AddAll;

const SingleAddAll = ({ item, classes }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Box>
        <Button startIcon={<Add />} onClick={handleOpen}>
          {item?.title}
        </Button>
      </Box>

      <AllModals
        modalType={item?.modalType}
        open={open}
        handleClose={() => handleClose()}
      />
    </Box>
  );
};
