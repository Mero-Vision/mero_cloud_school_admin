import { ExpandCircleDown } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
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
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";

import { memo, useId } from "react";
import { useSelector } from "react-redux";
import { useGetAccountHeadChildQuery } from "../../../../apis/chartsOfAccountApi";
import {
  renderArrayTotal,
  returnNumberWithCommas,
} from "../../../../utils/helpers";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import CustomModal from "../../../common/CustomModal/CustomModal";
import CustomCreatableSelect from "../../../common/CustomSelects/CustomCreatableSelect";
import ChartsOfAccountModal from "../chartsOfAccount/ChartsOfAccountModal";
import styles from "./style";

const AddJournalTable = ({
  control,
  errors,
  fields,
  remove,
  setValue,
  watch,
}) => {
  const classes = styles();
  const [open, setOpen] = useState("");

  const { latestAccount } = useSelector((state) => state?.utils);
  const LATEST = useMemo(() => latestAccount, [latestAccount]);

  const {
    data: childData,
    isError: isChildError,
    isLoading: isChildLoading,
    isSuccess: isChildSuccess,
  } = useGetAccountHeadChildQuery();
  const UNDER_DATA = useMemo(
    () =>
      childData?.data?.map((item) => {
        return {
          title: `${item?.name} (${item?.account_type})`,
          value: item?.id,
        };
      }),
    [childData?.data]
  );

  const DR_TOTAL = useMemo(
    () => renderArrayTotal(watch()?.ledgers, "dr_amount"),
    [watch()]
  );
  const CR_TOTAL = useMemo(
    () => renderArrayTotal(watch()?.ledgers, "cr_amount"),
    [watch()]
  );

  const DIFFERENCE = useMemo(() => DR_TOTAL - CR_TOTAL, [DR_TOTAL, CR_TOTAL]);

  useEffect(() => {
    setValue("difference", DIFFERENCE);
  }, [DIFFERENCE]);

  return (
    <Box>
      <TableContainer className={classes.table}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ACCOUNT</TableCell>
              <TableCell width={"150px"} align="center">
                DR AMT.
              </TableCell>
              <TableCell width={"150px"} align="center">
                CR AMT.
              </TableCell>
              <TableCell width="50px"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields?.map((item, index) => (
              <SingleRow
                key={item?.id}
                item={item}
                index={index}
                UNDER_DATA={UNDER_DATA}
                control={control}
                errors={errors}
                remove={remove}
                setValue={setValue}
                open={open}
                setOpen={setOpen}
                LATEST={LATEST}
              />
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>TOTAL</TableCell>
              <TableCell align="center">
                {returnNumberWithCommas(DR_TOTAL)}{" "}
              </TableCell>
              <TableCell align="center">
                {returnNumberWithCommas(CR_TOTAL)}{" "}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Box display={"flex"} justifyContent={"end"} mt={2}>
        <Box>
          <Typography
            fontSize={"small"}
            fontWeight={600}
            sx={{ color: DIFFERENCE >= 0 ? "#2A7576" : "red" }}
          >
            Difference: Rs {returnNumberWithCommas(DIFFERENCE)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AddJournalTable;

const SingleRow = memo(
  ({
    item,
    index,
    control,
    errors,
    UNDER_DATA,
    remove,
    setValue,

    open,
    setOpen,
    LATEST,
  }) => {
    const uuid = useId();
    const [modal, setModal] = useState(false);
    const [inputValue, setInputValue] = useState("");

    console.log({ LATEST, uuid });

    const handleOpen = (item) => {
      setInputValue(item?.inputValue);
      setModal(true);
    };
    const handleClose = () => setModal(false);

    useEffect(() => {
      const findValue = UNDER_DATA?.find(
        (item) => item?.title === `${LATEST?.name} (${LATEST?.account_type})`
      );

      LATEST?.uuid === uuid &&
        setValue(`ledgers.${index}.account_head_id`, findValue);
    }, [LATEST, UNDER_DATA, uuid]);

    const watchLedgers = useWatch({ control, name: `ledgers.${index}` });
    useEffect(() => {
      if (watchLedgers.cr_amount) {
        setValue(`ledgers.${index}.dr_amount`, "");
      }
    }, [watchLedgers.cr_amount, setValue, index]);

    useEffect(() => {
      if (watchLedgers.dr_amount) {
        setValue(`ledgers.${index}.cr_amount`, "");
      }
    }, [watchLedgers.dr_amount, setValue, index]);

    return (
      <>
        <CustomModal
          open={modal}
          handleClose={handleClose}
          modalTitle={`New Account`}
          icon={<PeopleIcon />}
        >
          {
            <ChartsOfAccountModal
              handleClose={handleClose}
              inputValue={inputValue}
              uuid={uuid}
            />
          }
        </CustomModal>
        <TableRow
          style={{ borderBottom: "none" }}
          sx={{
            "& .MuiTableCell-root": {
              border: "0",
            },
          }}
        >
          <TableCell>
            <CustomCreatableSelect
              control={control}
              errors={errors}
              name={`ledgers.${index}.account_head_id`}
              data={UNDER_DATA}
              handleOpen={handleOpen}
            />
          </TableCell>
          <TableCell>
            {" "}
            <CustomInput
              control={control}
              errors={errors}
              name={`ledgers.${index}.dr_amount`}
              placeholder={"0.00"}
              type={"number"}
            />
          </TableCell>
          <TableCell>
            {" "}
            <CustomInput
              control={control}
              errors={errors}
              name={`ledgers.${index}.cr_amount`}
              placeholder={"0.00"}
              type={"number"}
            />
          </TableCell>
          <TableCell align="right">
            <Box display={"flex"} justifyContent={"end"} columnGap={".5rem"}>
              <ExpandCircleDown
                onClick={() =>
                  setOpen((prev) => (prev === item?.id ? "" : item?.id))
                }
                sx={{
                  color: "#9D9CAF",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  transform:
                    open === item?.id ? "rotate(-180deg)" : "rotate(0deg)",
                }}
              />
              <RemoveCircleIcon
                onClick={() => remove(index)}
                sx={{ color: "#D24848", cursor: "pointer" }}
              />
            </Box>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={4} style={{ paddingBlock: 0 }}>
            <Collapse in={open === item?.id} timeout="auto" unmountOnExit>
              {" "}
              <Table>
                <TableBody>
                  <TableRow
                    sx={{
                      "& .MuiTableCell-root": {
                        padding: "0 0 10px 0 !important",
                        border: "0",
                      },
                    }}
                  >
                    <TableCell>
                      <CustomInput
                        control={control}
                        errors={errors}
                        name={`ledgers.${index}.remarks`}
                        placeholder={"Remarks"}
                        rows={3}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }
);
