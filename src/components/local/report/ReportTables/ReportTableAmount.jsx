import { ExpandCircleDownOutlined } from "@mui/icons-material";
import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useGetAccountHeadTreeQuery } from "../../../../apis/chartsOfAccountApi";
import styles from "../style";

import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { useMemo } from "react";
import { useGetReportsQuery } from "../../../../apis/reportsApi";
import useDate from "../../../../hooks/useDate";
import {
  renderArrayTotal,
  returnNumberWithCommas,
} from "../../../../utils/helpers";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
const ReportTableAmount = () => {
  const classes = styles();
  const { dates } = useDate();

  const {
    data: treeData,
    isError: isAccountError,
    isLoading: isAccountLoading,
    isSuccess: isAccountSuccess,
    isFetching: isAccountFetching,
  } = useGetAccountHeadTreeQuery();

  const {
    data: reportsData,
    isError: isReportError,
    isLoading: isReportLoading,
    isSuccess: isReportSuccess,
    isFetching: isReportFetching,
  } = useGetReportsQuery({ ...dates });

  const INCOME_EXPENSES = useMemo(() => {
    const incomeExpense = reportsData?.data
      ?.filter(
        (item) =>
          item?.name?.toLowerCase() === "income" ||
          item?.name?.toLowerCase() === "expense"
      )
      ?.map((item) => {
        return item?.sub_account_heads;
      })
      ?.flat();

    const income = reportsData?.data?.find(
      (item) => item?.name?.toLowerCase() === "income"
    );
    const expense = reportsData?.data?.find(
      (item) => item?.name?.toLowerCase() === "expense"
    );

    const directIncomes = income?.sub_account_heads?.filter(
      (item) => item?.name?.toLowerCase() !== "indirect income"
    );
    const directExpenses = expense?.sub_account_heads?.filter(
      (item) => item?.name?.toLowerCase() !== "indirect expense"
    );

    const directIncomesTotal = renderArrayTotal(
      directIncomes?.map((item) => item?.closing_balance?.amount)
    );
    const directExpensesTotal = renderArrayTotal(
      directExpenses?.map((item) => item?.closing_balance?.amount)
    );

    const grossTotal =
      directIncomesTotal > directExpensesTotal
        ? directIncomesTotal - directExpensesTotal
        : directExpensesTotal - directIncomesTotal;
    const profit_loss =
      directIncomesTotal > directExpensesTotal ? "Profit" : "Loss";

    const directIncomeExpenses = incomeExpense?.filter(
      (item) =>
        item?.name?.toLowerCase() !== "indirect income" &&
        item?.name?.toLowerCase() !== "indirect expense"
    );

    const indirectIncomeExpenses = incomeExpense?.filter(
      (item) =>
        item?.name?.toLowerCase() === "indirect income" ||
        item?.name?.toLowerCase() === "indirect expense"
    );

    const directIncomeExpensesTotal = renderArrayTotal(
      directIncomeExpenses?.map((item) => item?.closing_balance?.amount)
    );
    const indirectIncomeExpensesTotal = renderArrayTotal(
      indirectIncomeExpenses?.map((item) => item?.closing_balance?.amount)
    );

    const difference =
      Number(directIncomeExpensesTotal) -
      Math.abs(Number(indirectIncomeExpensesTotal));
    return {
      incomeExpense,
      directIncomeExpenses,
      indirectIncomeExpenses,
      directIncomeExpensesTotal,
      indirectIncomeExpensesTotal,
      difference,
      income,
      expense,
      directIncomes,
      directExpenses,
      directIncomesTotal,
      directExpensesTotal,
      grossTotal,
      profit_loss,
    };
  }, [reportsData?.data]);

  console.log({ INCOME_EXPENSES });
  return (
    <Box>
      {(isReportLoading || isReportFetching) && <CustomLoader />}

      <TableContainer>
        <Table className={classes.tableRoot} stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell width="300px" style={{ borderLeft: "none" }}>
                Particulars
              </TableCell>
              <TableCell align="center" width={"100px"}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(INCOME_EXPENSES?.directIncomeExpenses || [])?.map(
              (item, index) => (
                <SingleItem key={index} item={item} index={index} />
              )
            )}
            <TableRow
              className={[
                classes.grossRow,
                classes?.[INCOME_EXPENSES?.profit_loss],
              ]}
            >
              <TableCell>Gross {INCOME_EXPENSES?.profit_loss}</TableCell>
              <TableCell align="center">
                {returnNumberWithCommas(INCOME_EXPENSES?.grossTotal)}
              </TableCell>
            </TableRow>
            <TableRow className={[classes.grossRow, classes?.Loss]}>
              <TableCell>Gross {INCOME_EXPENSES?.profit_loss}</TableCell>
              <TableCell align="center">
                {returnNumberWithCommas(INCOME_EXPENSES?.grossTotal)}
              </TableCell>
            </TableRow>
            {(INCOME_EXPENSES?.indirectIncomeExpenses || [])?.map(
              (item, index) => (
                <SingleItem item={item} index={index} />
              )
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Net Income</TableCell>{" "}
              <TableCell align="center">
                {returnNumberWithCommas(INCOME_EXPENSES?.difference)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportTableAmount;

const SingleItem = ({ item, index, classes, INDEX, nestingLevel = 0 }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        hover
        style={{
          background: nestingLevel === 0 && open && "#E1F5FF",
        }}
      >
        {" "}
        <TableCell width="300px">
          {" "}
          <Box
            display="flex"
            alignItems={"center"}
            columnGap={"10px"}
            style={{
              paddingLeft: nestingLevel * 30,
            }}
          >
            <Box display="flex" alignItems={"center"}>
              {item?.sub_account_heads?.length ? (
                <ExpandCircleDownOutlined
                  onClick={() => setOpen(!open)}
                  sx={{
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    color: open ? "#121127" : "#9D9CAF",
                    transform: !open ? "rotate(-90deg)" : "rotate(0deg)",
                    visibility: item?.sub_account_heads?.length
                      ? "visible"
                      : "hidden",
                  }}
                />
              ) : (
                <IndeterminateCheckBoxOutlinedIcon
                  sx={{
                    color: "#ccc",
                  }}
                />
              )}
            </Box>
            <Box>{item?.name}</Box>
          </Box>
        </TableCell>
        <TableCell align="center" width={"100px"}>
          {returnNumberWithCommas(item?.closing_balance?.amount)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={2}
          style={{
            padding: 0,
          }}
          sx={{ border: "none !important" }}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            {item?.sub_account_heads?.map((child, INDEX) => (
              <Table key={INDEX}>
                <TableBody>
                  <SingleItem
                    item={child}
                    classes={classes}
                    INDEX={index}
                    nestingLevel={nestingLevel + 1} // Increment nesting level for children
                  />
                </TableBody>
              </Table>
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
