import { Add } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useGetFiscalYearQuery } from "../../../apis/settingApi";
import useModal from "../../../hooks/useModal";
import AllModals from "../../common/AllModals/AllModals";
import FiscalYearsTable from "./FiscalYearsTable";
import styles from "./style";

const FiscalYear = () => {
  const classes = styles();
  const { modals, row, handleOpen, handleClose } = useModal();
  const { data } = useGetFiscalYearQuery();

  console.log({ data });
  const {
    control,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Box className={classes.fiscalYearContainer}>
        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
          >
            {/* <IconButton
              style={{ backgroundColor: "#48484810" }}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? (
                <KeyboardArrowUp
                  style={{ fontWeight: "bold", color: "black" }}
                />
              ) : (
                <KeyboardArrowDown
                  style={{ fontWeight: "bold", color: "black" }}
                />
              )}
            </IconButton> */}
            <div>
              <h4 className="fiscalYearTitle">Fiscal Year</h4>
              {/* <p className="fiscalYearSubTitle">
                Current Fiscal Year :{"  "}
                <span className="year"> 2083-2084 / 2019-2020</span>{" "}
              </p> */}
            </div>
          </div>

          <Box style={{ display: "flex", gap: "15px" }}>
            <Button
              onClick={() => handleOpen("add_fiscal_year_tax")}
              variant="outlined"
              startIcon={<Add />}
            >
              Add Tax
            </Button>
            <Button
              onClick={() => handleOpen("add_fiscal_year")}
              variant="contained"
              startIcon={<Add />}
            >
              Add Fiscal Year
            </Button>
          </Box>
        </Box>

        <Box marginTop={"30px"}>
          <FiscalYearsTable />
        </Box>

        <AllModals
          modalTitle={"Add fiscal year"}
          modalType={"add_fiscal_year"}
          open={modals?.add_fiscal_year}
          handleClose={() => handleClose("add_fiscal_year")}
        />
        <AllModals
          modalTitle={"Add fiscal year"}
          modalType={"add_fiscal_year_tax"}
          open={modals?.add_fiscal_year_tax}
          handleClose={() => handleClose("add_fiscal_year_tax")}
        />
      </Box>
    </>
  );
};

export default FiscalYear;
