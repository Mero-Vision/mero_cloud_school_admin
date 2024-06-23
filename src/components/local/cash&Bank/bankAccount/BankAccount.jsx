import { Add } from "@mui/icons-material";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { useGetBanksQuery } from "../../../../apis/bankApi";
import useModal from "../../../../hooks/useModal";
import useTabs from "../../../../hooks/useTabs";
import AllModals from "../../../common/AllModals/AllModals";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import SingleBankAccount from "./SingleBankAccount";

const data = [
  {
    label: "All Banks",
    value: "all_banks",
    icon: <AccountBalanceOutlinedIcon />,
  },
];

const BankAccount = () => {
  const {
    data: banks,
    isError: isBankError,
    isLoading: isBankLoading,
    isSuccess: isBankSuccess,
  } = useGetBanksQuery();
  const { modals, handleOpen, handleClose } = useModal();

  const { value, Tabs } = useTabs({
    data,
    button: (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen("add")}
      >
        Add New
      </Button>
    ),
  });

  return (
    <div>
      {Tabs}
      {isBankLoading && <CustomLoader />}
      {isBankSuccess && (
        <Box>
          <Grid container spacing={4}>
            {banks?.data?.map((item, index) => (
              <SingleBankAccount item={{ ...item, index }} key={index} />
            ))}
          </Grid>
        </Box>
      )}

      <AllModals
        modalType={"bank-accounts"}
        open={modals?.add}
        handleClose={() => handleClose("add")}
      />
    </div>
  );
};

export default BankAccount;
