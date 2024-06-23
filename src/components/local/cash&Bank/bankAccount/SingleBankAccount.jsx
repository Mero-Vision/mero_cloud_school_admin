import { Delete, Edit } from "@mui/icons-material";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomMoreOptionButton from "../../../common/CustomMoreOptionButton/CustomMoreOptionButton";
import styles from "./style";

const items = [
  {
    icon: <Edit fontSize="small" />,
    text: "Edit",
    modalType: "edit",
  },
  {
    icon: <Delete fontSize="small" />,
    text: "Delete",
    modalType: "delete",
  },
];
const SingleBankAccount = ({ item }) => {
  const classes = styles();
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const handleOpenModal = (modalType) => {
    setOpenModal(true);
    setModalType(modalType);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <Box className={classes.cardDiv}>
        <Box className={classes.infoDiv}>
          <Box>
            <Avatar src={item?.bank_detail?.image} variant="rounded">
              {item?.bank_detail?.name?.slice()?.[0]?.toUpperCase()}
            </Avatar>
          </Box>
          <Box>
            <CustomMoreOptionButton
              items={items}
              handleOpenModal={handleOpenModal}
            />
          </Box>
        </Box>
        <Box>
          <Box>
            <Box mt={1}>
              <Typography fontWeight={600} fontSize={"medium"}>
                {item?.bank_detail?.name}
              </Typography>
              <Box
                display="flex"
                justifyContent={"space-between"}
                alignItems={"end"}
              >
                <Box sx={{ color: "#454545" }}>
                  <Typography fontSize={"11px"}>
                    {item?.bank_detail?.address}
                  </Typography>

                  <Typography fontSize={"11px"}>
                    {item?.bank_detail?.account_number}
                  </Typography>
                </Box>
                <Box>
                  {" "}
                  <Typography fontWeight={700}>Rs. 2,00,000</Typography>
                </Box>
              </Box>

              {/* <Typography>Name : {item?.name}</Typography>
              <Typography>Address : {item?.address}</Typography>
              <Typography>SC : {item?.swift_code}</Typography> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default SingleBankAccount;
