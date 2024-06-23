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
import React, { useEffect, useMemo, useState } from "react";
import styles from "../style";

import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetReportsQuery } from "../../../../apis/reportsApi";
import useDate from "../../../../hooks/useDate";
import {
  renderArrayTotal,
  returnNumberWithCommas,
} from "../../../../utils/helpers";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
const ReportTableBalance = () => {
  const classes = styles();
  const { dates } = useDate();
  const { type } = useParams();
  const { columns } = useSelector((state) => state?.utils);

  const getValue = (field) => {
    return columns?.[type]?.[field];
  };

  const {
    data: reportsData,
    isError: isReportError,
    isLoading: isReportLoading,
    isSuccess: isReportSuccess,
    isFetching: isReportFetching,
  } = useGetReportsQuery({ ...dates });

  const TOTALS = useMemo(() => {
    const closing = reportsData?.data?.map((item) => item?.closing_balance);
    const opening = reportsData?.data?.map((item) => item?.opening_balance);
    return {
      closing_dr: renderArrayTotal(closing, "total_dr_amount"),
      closing_cr: renderArrayTotal(closing, "total_cr_amount"),
      opening_dr: renderArrayTotal(opening, "total_dr_amount"),
      opening_cr: renderArrayTotal(opening, "total_cr_amount"),
    };
  }, [reportsData?.data]);

  return (
    <Box>
      {(isReportLoading || isReportFetching) && <CustomLoader />}

      <TableContainer style={{ border: "none" }}>
        <Table className={classes.tableRoot}>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell
                rowSpan={2}
                sssss
                width="300px"
                style={{ borderLeft: "none" }}
              >
                Particulars
              </TableCell>
              {getValue("opening_balance") && (
                <TableCell
                  colSpan={2}
                  align="center"
                  style={{ borderColor: "green !important" }}
                >
                  Opening Balance
                </TableCell>
              )}
              {getValue("closing_balance") && (
                <TableCell
                  colSpan={2}
                  align="center"
                  style={{ borderRight: "none", zIndex: "100" }}
                >
                  Closing Balance
                </TableCell>
              )}
            </TableRow>
            <TableRow>
              {getValue("opening_balance") && (
                <>
                  <TableCell align="center" width={"150px"}>
                    Debit (Dr)
                  </TableCell>
                  <TableCell align="center" width={"150px"}>
                    Credit (Cr)
                  </TableCell>
                </>
              )}
              {getValue("closing_balance") && (
                <>
                  <TableCell align="center" width={"150px"}>
                    Debit (Dr)
                  </TableCell>
                  <TableCell
                    align="center"
                    width={"150px"}
                    style={{ borderRight: "none" }}
                  >
                    Credit (Cr)
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {(reportsData?.data || [])?.map((item, index) => (
              <SingleItem
                item={item}
                key={index}
                index={index}
                getValue={getValue}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Total Balance</TableCell>{" "}
              {getValue("opening_balance") && (
                <>
                  <TableCell align="center">
                    {returnNumberWithCommas(TOTALS?.opening_dr)}
                  </TableCell>
                  <TableCell align="center">
                    {returnNumberWithCommas(TOTALS?.opening_cr)}
                  </TableCell>
                </>
              )}
              {getValue("closing_balance") && (
                <>
                  <TableCell align="center">
                    {returnNumberWithCommas(TOTALS?.closing_dr)}
                  </TableCell>
                  <TableCell align="center">
                    {returnNumberWithCommas(TOTALS?.closing_cr)}
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReportTableBalance;

const SingleItem = ({
  item,
  index,
  classes,
  INDEX,
  nestingLevel = 0,
  getValue,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(getValue("expand_all"));
  }, [getValue("expand_all")]);

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
          <Box display="flex" alignItems={"center"} columnGap={"5px"}>
            <Box
              display="flex"
              alignItems={"center"}
              style={{ paddingLeft: nestingLevel * 25 }}
            >
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
                    color: "#bbb",
                  }}
                />
              )}
            </Box>
            <Box>{item?.name}</Box>
          </Box>
        </TableCell>
        {getValue("opening_balance") && (
          <>
            <TableCell align="center" width={"150px"}>
              {returnNumberWithCommas(item?.opening_balance?.total_dr_amount)}
            </TableCell>
            <TableCell align="center" width={"150px"}>
              {returnNumberWithCommas(item?.opening_balance?.total_cr_amount)}
            </TableCell>
          </>
        )}
        {getValue("closing_balance") && (
          <>
            <TableCell align="center" width={"150px"}>
              {returnNumberWithCommas(item?.closing_balance?.total_dr_amount)}
            </TableCell>
            <TableCell align="center" width={"150px"}>
              {returnNumberWithCommas(item?.closing_balance?.total_cr_amount)}
            </TableCell>
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={5}
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
                    nestingLevel={nestingLevel + 1}
                    getValue={getValue}
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
