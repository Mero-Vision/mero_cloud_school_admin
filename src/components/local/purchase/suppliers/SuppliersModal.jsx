import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePostSupplierMutation } from "../../../../apis/suppliersApi";
import { SELECT_DATA } from "../../../../constants/constants";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import { CustomSearchSelect } from "../../../common/CustomSelects/CustomSearchSelect";
import styles from "./style";

const SuppliersModal = ({ type, handleClose }) => {
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
                title={"Name"}
                placeholder={"Lexi Alexandra"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSearchSelect
                control={control}
                errors={errors}
                name="parent_id"
                title={"Group"}
                data={SELECT_DATA}
                placeholder={"0001"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="phone"
                title={"Contact Number"}
                placeholder={"(406) 223-3232"}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                control={control}
                errors={errors}
                name="email"
                type="email"
                title={"Email Address"}
                placeholder={"john@gmail.com"}
              />
            </Grid>
          </Grid>
          <CustomButton loading={isPostLoading} />
        </form>
      </Box>
    </Box>
  );
};

export default SuppliersModal;
