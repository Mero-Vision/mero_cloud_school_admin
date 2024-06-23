import { Box, Typography, capitalize } from "@mui/material";
import React from "react";

const DisplayStatus = ({ row }) => {
  const TYPE = row?.status?.toLowerCase();
  const switchStyles = () => {
    switch (TYPE) {
      case "active":
        return "#24C046";
      case "inactive":
        return "red";
      default:
        return "#FD8515";
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          color: switchStyles(),
          fontSize: "12px",
        }}
      >
        • {capitalize(TYPE ?? "")}
      </Typography>
    </Box>
  );
};

export default DisplayStatus;
