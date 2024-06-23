import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePostEmployeeMutation } from "../../../../apis/employeeApi";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";

const EmployeesModal = ({ type, handleClose }) => {
  const [
    postEmployee,
    {
      isError: isPostError,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
    },
  ] = usePostEmployeeMutation();
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
    postEmployee(finalData);
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
                title={"Employee Name"}
                placeholder={"Lexi Alexandra"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="phone"
                title={"Employee Id"}
                placeholder={"21312"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="phone"
                type="number"
                title={"Contact Number"}
                placeholder={"(406) 223-3232"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="position"
                title={"Position"}
                placeholder={"Developer"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="team"
                title={"Team"}
                placeholder={"IT"}
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

export default EmployeesModal;
