import { ArrowCircleLeftOutlined, ViewWeekOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomPopover from "../../../common/CustomPopover/CustomPopover";
import IconTooltip from "../../../common/CustomTooltips/IconTooltip";
import styles from "../style";
import ReportColumn from "./ReportColumn";

const customStyleProps = {
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "right",
  },
};

const ReportNav = () => {
  const classes = styles();
  const { type } = useParams();
  const navigate = useNavigate();

  return (
    <Box className={classes.reportNav}>
      <Box display={"flex"} columnGap={"5px"} alignItems={"center"}>
        <Box onClick={() => navigate(-1)}>
          {" "}
          <IconTooltip
            data={{ title: "Go Back", icon: <ArrowCircleLeftOutlined /> }}
          />
        </Box>
        <Box>
          <Typography
            fontSize={"small"}
            fontWeight={700}
            textTransform={"capitalize"}
          >
            {type?.replaceAll("-", " ")}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box></Box>
        <Box>
          <CustomPopover
            ButtonComponent={
              <Button
                className={classes.column}
                startIcon={<ViewWeekOutlined />}
              >
                Columns
              </Button>
            }
            styleProps={customStyleProps}
            component={<ReportColumn />}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ReportNav;
