import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style";

const SingleReport = ({ item }) => {
  const classes = styles();
  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <Box className={classes.singleCard}>
        <Box className={classes.titleDiv}>
          <Box>
            <Typography fontSize={"medium"} fontWeight={600}>
              {item?.header}
            </Typography>
          </Box>
          <Box className={classes.image}>
            <img src={item?.icon} />{" "}
          </Box>
        </Box>
        <Box className={classes.items}>
          {item?.items?.map((item, index) => {
            return (
              <Box
                key={index}
                className={classes.singleItem}
                onClick={() => navigate(item?.url)}
              >
                <Typography fontSize={"small"} textTransform={"capitalize"}>
                  {item?.url?.replaceAll("-", " ")}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Grid>
  );
};

export default SingleReport;
