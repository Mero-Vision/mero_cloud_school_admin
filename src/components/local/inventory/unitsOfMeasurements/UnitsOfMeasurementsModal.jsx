import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePostCustomerMutation } from "../../../../apis/customersApi";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";

const UnitsOfMeasurementsModal = ({ type, handleClose }) => {
  const [
    postCustomer,
    {
      isError: isPostError,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
    },
  ] = usePostCustomerMutation();
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
    postCustomer(finalData);
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
                placeholder={"Inch"}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="code"
                type="number"
                title={"Code/Symbol"}
                placeholder={"2135"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="factor"
                title={"Factor"}
                placeholder={"Factor"}
              />
            </Grid>
          </Grid>
          <CustomButton loading={isPostLoading} />
        </form>
      </Box>
    </Box>
  );
};

export default UnitsOfMeasurementsModal;
