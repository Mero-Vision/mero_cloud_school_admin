import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeleteCompanyMutation } from "../../../../apis/companyApi";
import useModal from "../../../../hooks/useModal";
import CustomDeleteModal from "../../../common/CustomModal/CustomDeleteModal";
import styles from "./styles";

const SingleProductButtons = ({ data }) => {
  const classes = styles();
  const navigate = useNavigate();
  const { search } = useLocation();
  const { modals, handleOpen, handleClose } = useModal();
  const [deleteItem, { isLoading, isSuccess, error, data: successData }] =
    useDeleteCompanyMutation();
  const handleConfirm = () => {
    deleteItem({ id: data?.id });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(`/company`);
    }
  }, [isSuccess]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          columnGap: "1rem",
        }}
      >
        <Box>
          <Box
            className={classes.buttons}
            onClick={() =>
              navigate(`/inventory/products/edit?product_id=${data?.id}`)
            }
            sx={{ color: "#4C7CE5" }}
          >
            <EditOutlined fontSize="10px" />
          </Box>
        </Box>
        <Box>
          <Box
            className={classes.buttons}
            onClick={() => handleOpen("delete")}
            sx={{ color: "#FF034F" }}
          >
            <DeleteOutline fontSize="10px" />
          </Box>
        </Box>
      </Box>
      <CustomDeleteModal
        open={modals?.delete}
        handleClose={() => handleClose("delete")}
        isLoading={isLoading}
        handleConfirm={handleConfirm}
        success={isSuccess}
        error={error}
        successData={successData}
      />
    </>
  );
};

export default SingleProductButtons;
