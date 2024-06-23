import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setColumns } from "../../../../rootRedux/utilsSlice";
import ReportNav from "./ReportNav";
import ReportTableAmount from "./ReportTableAmount";
import ReportTableBalance from "./ReportTableBalance";

const ReportTables = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const switchTable = () => {
    switch (type) {
      case "trial-balance":
        const defaultValues = {
          opening_balance: true,
          closing_balance: true,
          hide_zero_balance: false,
          expand_all: false,
        };
        useEffect(() => {
          dispatch(setColumns({ ...defaultValues, type }));
        }, []);
        return (
          <Box>
            <ReportNav />
            <ReportTableBalance />
          </Box>
        );

      case "income-statement":
      case "balance-sheet":
        return (
          <Box>
            <ReportNav />
            <ReportTableAmount />
          </Box>
        );
    }
  };
  return <div>{switchTable()}</div>;
};

export default ReportTables;
