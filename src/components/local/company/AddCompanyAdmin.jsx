import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useAssignFirmAdminMutation } from "../../../apis/accountingFirmApi";
import { useAssignCompanyAdminMutation } from "../../../apis/companyApi";
import CustomButton from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInputs/CustomInput";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email Address is required"),
});

const AddCompanyAdmin = ({ row, handleClose, isFirm }) => {
  const {
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: row?.admin?.email || "" },
  });

  const [
    assignCompanyAdmin,
    { isLoading, error, isSuccess, data: successData },
  ] = useAssignCompanyAdminMutation();

  console.log({ assignUserSuccess: row });
  const [
    assignFirmAdmin,
    {
      error: firmError,
      isLoading: isFirmLoading,
      isSuccess: isFirmSuccess,
      data: firmSuccessData,
    },
  ] = useAssignFirmAdminMutation();

  const onSubmit = (data) => {
    const companyData = {
      ...data,
      company_id: row?.id,
    };
    const firmData = {
      ...data,
      accounting_firm_id: row?.id,
    };
    isFirm ? assignFirmAdmin(firmData) : assignCompanyAdmin(companyData);
  };

  useEffect(() => {
    if (row?.owner) {
      reset({
        email: row?.owner?.email,
      });
    }
  }, [row?.owner]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <CustomInput
            control={control}
            errors={errors}
            name="email"
            title="Email"
            type="email"
            required
          />
        </Grid>
      </Grid>

      <CustomButton
        loading={isLoading || isFirmLoading}
        success={isSuccess || isFirmSuccess}
        error={error || firmError}
        successData={successData || firmSuccessData}
        handleClose={handleClose}
      />
    </form>
  );
};

export default AddCompanyAdmin;
