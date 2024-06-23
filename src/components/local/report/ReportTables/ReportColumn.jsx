import { Box, Button, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setColumns } from "../../../../rootRedux/utilsSlice";
import { CustomSwitch } from "../../../common/CustomSwitch/CustomSwitch";
import styles from "../style";

const ReportColumn = () => {
  const classes = styles();
  const { type } = useParams();
  const [show, setShow] = useState();
  const { columns } = useSelector((state) => state?.utils);
  const dispatch = useDispatch();
  const {
    control,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({ defaultValues: columns?.[type] });
  useEffect(() => {
    show !== undefined &&
      watch() &&
      Object?.keys(watch())?.map((key) => {
        setValue(key, show);
      });
  }, [show]);

  useEffect(() => {
    if (watch()) {
      Object?.keys(watch())?.every((key) => {
        return watch(key);
      }) && setShow(true);
    }
    if (watch()) {
      Object?.keys(watch())?.every((key) => {
        return !watch(key);
      }) && setShow(false);
    }
  }, [watch()]);

  const handleGenerate = () => {
    dispatch(setColumns({ ...watch(), type }));
  };
  return (
    <Box className={classes.columnContainer}>
      <Box p=".5rem 1rem">
        <Typography className={classes.header}>Column View</Typography>
      </Box>
      <Divider />

      <Box p=".5rem 1rem">
        <Box>
          <Box className={[classes.flex]}>
            <Typography className={[classes.gray]}>Shown</Typography>
            <Typography
              onClick={() => setShow(!show)}
              sx={{ cursor: "pointer" }}
            >
              {show ? "Hide" : "Show"} all
            </Typography>
          </Box>

          {/* <Box className={[classes.flex]}>
            <Box className={[classes.flex]}>
              <Box className={[classes.icons, classes.gray]}>
                <DragIndicator />
              </Box>
              <Typography>Opening Balance</Typography>
            </Box>
            <Box>
              <IconTooltip
                data={{ title: "View", icon: <VisibilityOutlined /> }}
              />
            </Box>
          </Box>
          <Box className={[classes.flex]}>
            <Box className={[classes.flex]}>
              <Box className={[classes.icons, classes.gray]}>
                <DragIndicator />
              </Box>
              <Typography>Closing Balance</Typography>
            </Box>
            <Box>
              <IconTooltip
                data={{ title: "View", icon: <VisibilityOutlined /> }}
              />
            </Box>
          </Box> */}
        </Box>
        <Box py=".5rem" className={classes.columnItems}>
          <CustomSwitch
            control={control}
            errors={errors}
            name="opening_balance"
            label="Opening balance"
          />
          <CustomSwitch
            control={control}
            errors={errors}
            name="closing_balance"
            label="Closing Balance"
          />
        </Box>
        <Divider />
        <Box py=".5rem" className={classes.columnItems}>
          <Box className={[classes.flex]}>
            <Typography className={[classes.gray]}>View Options</Typography>
          </Box>

          <CustomSwitch
            control={control}
            errors={errors}
            name="hide_zero_balance"
            label="Hide accounts with zero closing balance"
          />
          <CustomSwitch
            control={control}
            errors={errors}
            name="expand_all"
            label="Expand All"
          />
        </Box>
        <Box pb=".5rem">
          <Button variant="contained" fullWidth onClick={handleGenerate}>
            Generate
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportColumn;
