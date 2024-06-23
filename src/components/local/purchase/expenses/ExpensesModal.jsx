import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePostSupplierMutation } from "../../../../apis/suppliersApi";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import styles from "./style";

const ExpensesModal = ({ type, handleClose }) => {
  const classes = styles();
  const [
    postSupplier,
    {
      isError: isPostError,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
    },
  ] = usePostSupplierMutation();
  const {
    control,
    formState: { errors },
    watch,
    setValue,
    register,
    handleSubmit,
  } = useForm({});

  const onSubmit = (data) => {
    const finalData = {
      ...data,
    };
    postSupplier(finalData);
  };

  useEffect(() => {
    if (isPostSuccess) {
      handleClose();
    }
  }, [isPostSuccess, handleClose]);

  return (
    <Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomInput
                control={control}
                errors={errors}
                name="name"
                title={"Supplier Name"}
                placeholder={"Lexi Alexandra"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="bill_no"
                title={"Bill No."}
                placeholder={"0021"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="reference"
                title={"Reference"}
                placeholder={"78932"}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="date"
                type="date"
                title={"Date"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="total"
                type="number"
                title={"Total"}
                placeholder={"3999"}
              />
            </Grid>
          </Grid>
          <CustomButton loading={isPostLoading} />
        </form>
      </Box>
    </Box>
  );
};

export default ExpensesModal;
