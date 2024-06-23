import { Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../../common/CustomInputs/CustomInput";

const ChangeClientPassword = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (values) => {
    console.log({ values });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <CustomInput
            control={control}
            errors={errors}
            name="new_password"
            title="New Password"
            placeholder={"********"}
            type={"password"}
          />
        </Grid>
        <Grid item sm={12}>
          <CustomButton />
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangeClientPassword;
