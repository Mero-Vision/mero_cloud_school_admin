import { Done } from "@mui/icons-material";
import { Box, Chip, Popper } from "@mui/material";
import { useEffect, useState } from "react";
import { useChangeFirmStatusMutation } from "../../../apis/accountingFirmApi";
import { useChangeCompanyStatusMutation } from "../../../apis/companyApi";
import { useUpdatePaymentOptionStatusMutation } from "../../../apis/paymentOptionsApi";
import customToaster from "../../../utils/customToaster";
import { getError } from "../../../utils/helpers";

const CompanyStatus = ({ props, data, isFirm, disabled, isPayment }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [label, setLabel] = useState("");
  console.log({ props });

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const TYPE = props?.row?.status?.toLowerCase() || "Add Label";
  const switchStyles = (type) => {
    switch (type || TYPE) {
      case "active":
        return "#24C046";
      case "inactive":
        return "red";
      case "pending":
      default:
        return "#FD8515";
    }
  };
  const [
    changeCompanyStatus,
    {
      error,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
      data: successData,
    },
  ] = useChangeCompanyStatusMutation();
  const [
    changeFirmStatus,
    {
      error: firmError,
      isLoading: isFirmLoading,
      isSuccess: isFirmSuccess,
      data: firmSuccessData,
    },
  ] = useChangeFirmStatusMutation();

  const [
    updatePaymentOptionStatus,
    {
      isLoading: isPaymentOptionLoading,
      isSuccess: isPaymentOptionSuccess,
      data: updatePaymentSuccessData,
      isError: isUpdatePaymentOptionError,
      error: paymentOptionErrorData,
    },
  ] = useUpdatePaymentOptionStatusMutation();

  useEffect(() => {
    if (label) {
      const data = {
        status: label,
        id: props?.row?.id,
      };
      isFirm
        ? changeFirmStatus(data)
        : isPayment
        ? updatePaymentOptionStatus(data)
        : changeCompanyStatus(data);
    }
  }, [label]);

  useEffect(() => {
    if (isPostSuccess || isFirmSuccess || isPaymentOptionSuccess) {
      customToaster({
        type: "success",
        message:
          successData?.message ||
          firmSuccessData?.message ||
          updatePaymentSuccessData?.message ||
          "Success",
      });
    }
  }, [isPostSuccess || isFirmSuccess || isPaymentOptionSuccess]);
  useEffect(() => {
    const err = error || firmError || paymentOptionErrorData;
    if (err) {
      getError(err);
    }
  }, [error, firmError, paymentOptionErrorData]);

  return (
    <Box
      sx={{ textTransform: "capitalize" }}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <Box>
        <Chip
          variant="outlined"
          size="small"
          sx={{
            cursor: "pointer",
            color: switchStyles(),
            borderColor: switchStyles(),
            fontSize: "12px",
          }}
          label={TYPE}
        />
      </Box>
      <Popper
        open={!disabled && open}
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
            padding: "25px 15px",
            width: "max-content",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {data?.map((item) => (
            <Box key={item?.value} onClick={() => setLabel(item?.value)}>
              <Chip
                variant="outlined"
                size="small"
                sx={{
                  cursor: "pointer",
                  fontSize: "12px",
                  color: item?.value === TYPE ? "#fff" : "",
                  background: item?.value === TYPE && switchStyles(item?.value),
                  borderColor:
                    item?.value === TYPE && switchStyles(item?.value),
                  transition: "200ms all ease-in-out",
                  "&:hover": {
                    // background: "#f6f6f6 !important",
                    borderColor: "#454545",
                  },
                }}
                label={item?.label}
                icon={
                  item?.value === TYPE && (
                    <Done
                      sx={{
                        color: "#fff !important",
                      }}
                    />
                  )
                }
                disabled={
                  isPostLoading || isFirmLoading || isPaymentOptionLoading
                }
              />{" "}
            </Box>
          ))}
        </Box>
      </Popper>
    </Box>
  );
};

export default CompanyStatus;
