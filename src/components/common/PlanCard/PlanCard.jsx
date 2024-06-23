import { Box, Typography } from "@mui/material";
import React from "react";
import { changeDateFormat } from "../../../utils/helpers";
import styles from "./styles";

const PlanCard = ({ row }) => {
  const classes = styles();
  return (
    <Box>
      <Typography className="title">{row?.name}</Typography>
      <Box>
        <Typography>{row?.pivot?.user} Users</Typography>
        <Typography>{row?.pivot?.transaction} Transactions</Typography>
        <Typography>{row?.pivot?.product} Products</Typography>
        <Typography>{row?.pivot?.storage}GB Storage</Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h2" className={"title"} component={"span"}>
          Rs. {row?.pivot?.price}
        </Typography>
        <Typography component={"span"}> ({row?.pivot?.period} Days)</Typography>
      </Box>
      <Box mt={2}>
        <Typography color="red">
          Expires on {changeDateFormat(row?.pivot?.expiry_date)}
        </Typography>
      </Box>
    </Box>
  );
};

export default PlanCard;
