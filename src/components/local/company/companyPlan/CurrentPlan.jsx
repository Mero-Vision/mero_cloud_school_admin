import { Box, Popper, Typography } from "@mui/material";
import { useState } from "react";
import { getDateDifference, isAfterDate } from "../../../../utils/helpers";
import PlanCard from "../../../common/PlanCard/PlanCard";

const CurrentPlan = ({ props, hide }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const row = props?.row;

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      sx={{ textTransform: "capitalize" }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <>
        {row?.package?.name && (
          <Box sx={{ cursor: "pointer" }}>
            <Typography className="title">
              {row?.package?.name || "-"}
            </Typography>
            {!hide && (
              <Typography
                sx={{ color: true ? "red" : "green", fontSize: "10px" }}
              >
                {isAfterDate(row?.package?.pivot?.expiry_date)
                  ? "Expired "
                  : "Expires "}
                {getDateDifference(row?.package?.pivot?.expiry_date)}
                {/* Expires in {moment("2024-1-").to(moment(new Date()), true)} */}
              </Typography>
            )}
          </Box>
        )}
      </>
      <Popper
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ zIndex: "100000" }}
      >
        <Box
          sx={{
            background: "#fff",
            boxShadow:
              "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
            display: "flex",
            padding: "15px",
            width: "250px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <PlanCard row={row?.package} />
        </Box>
      </Popper>
    </Box>
  );
};

export default CurrentPlan;
