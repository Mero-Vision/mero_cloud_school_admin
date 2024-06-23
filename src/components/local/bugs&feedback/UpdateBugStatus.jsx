import { Done } from "@mui/icons-material";
import { Box, Chip, Popper } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useChangeBugStatusMutation } from "../../../apis/bugfeedbackApi";
import customToaster from "../../../utils/customToaster";
import { getError } from "../../../utils/helpers";

const STATUS = ["in_progress", "open", "closed"];
const UpdateBugStatus = ({ row, status }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [label, setLabel] = useState("");
  const [changeBugStatus, { error, isSuccess, isError }] =
    useChangeBugStatusMutation();
  const dispatch = useDispatch();

  console.log({ label });

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (label !== "") {
      changeBugStatus({
        status: label,
        id: row?.id,
      });
    }
  }, [label]);

  console.log({ isSuccess });
  useEffect(() => {
    if (isSuccess) {
      customToaster({
        type: "success",
        message: "Status Updated Successfully",
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      getError(error);
    }
  }, [isError]);

  return (
    <>
      <Box onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        <Chip
          variant="outlined"
          size="small"
          sx={{
            cursor: "pointer",
            color: switchStyles(
              status === "in progress" ? "in_progress" : status
            ),
            textTransform: "capitalize",
            // borderColor: switchStyles(),
            fontSize: "12px",
          }}
          label={status === "in_progress" ? "in progress" : status ?? ""}
        />

        <Popper
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{ zIndex: "100000" }}
        >
          <Box
            sx={{
              background: "#fff",
              boxShadow:
                "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)",
              display: "flex",
              padding: "25px 15px",
              width: "fit-content",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {STATUS?.map((item, index) => (
              <Chip
                key={index}
                variant="outlined"
                onClick={() => setLabel(item)}
                size="small"
                sx={{
                  cursor: "pointer",
                  fontSize: "12px",
                  color: item === status ? "#fff" : "",
                  backgroundColor:
                    item === status &&
                    switchStyles(item === "in progress" ? "in_progress" : item),
                  transition: "200ms all ease-in-out",
                  borderColor: item === status && switchStyles(item),
                  textTransform: "capitalize",
                  "&:hover": {
                    // background: "#f6f6f6 !important",
                    borderColor: "#454545",
                  },
                }}
                label={item === "in_progress" ? "in progress" : item}
                icon={
                  item === status && (
                    <Done
                      sx={{
                        color: "#fff !important",
                      }}
                    />
                  )
                }
              />
            ))}
          </Box>
        </Popper>
      </Box>
    </>
  );
};

export default UpdateBugStatus;

export const switchStyles = (type) => {
  switch (type) {
    case "open":
      return "#06C270";

    case "in_progress":
      return "#FC7125";

    case "closed":
      return "#e41749";
  }
};
