import { Box, Grid } from "@mui/material";
import React from "react";
import { ReportConstants } from "../../../constants/ReportConstants";
import SingleReport from "./SingleReport";

const Report = () => {
  return (
    <Box>
      {" "}
      <Grid container spacing={4}>
        {ReportConstants?.map((item, index) => {
          return <SingleReport key={index} item={item} />;
        })}
      </Grid>
    </Box>
  );
};

export default Report;
