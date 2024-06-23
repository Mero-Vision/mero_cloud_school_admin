import {
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
} from "../../../apis/companyApi";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useGetAccountingFirmQuery } from "../../../apis/accountingFirmApi";
import CustomButton from "../../common/CustomButton/CustomButton";
import CustomFileUpload from "../../common/CustomFileUpload/CustomFileUpload";
import { CustomInput } from "../../common/CustomInputs/CustomInput";
import CustomLoader from "../../common/CustomLoader/CustomLoader";

const AddAdminUsers = ({ handleClose, row, disabled }) => {
  const {
    data: accountingFirmData,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetAccountingFirmQuery();

  console.log({ accountingFirmData: accountingFirmData?.data });
  const [
    createCompany,
    {
      error,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
      data: successData,
    },
  ] = useCreateCompanyMutation();
  const [
    updateCompany,
    {
      error: editError,
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      data: editSuccessData,
    },
  ] = useUpdateCompanyMutation();
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema) });

  console.log({ watch: watch() });

  useEffect(() => {
    if (row) {
      reset(row);
    }
  }, [row]);

  const onSubmit = (values) => {
    console.log({ values });
    const formData = new FormData();
    const finalValues = {
      ...values,
      accounting_firm_id: Number(values?.accounting_firm_id) || "",
      status: values?.status || "pending",
      image: values?.logo?.[0] ?? "",
    };

    delete finalValues.logo;
    finalValues &&
      Object?.keys(finalValues)?.map((key) =>
        formData.append(key, finalValues?.[key] ?? "")
      );

    row && formData?.append("_method", "PATCH");
    console.log({ finalValues });
    row
      ? updateCompany({ id: row?.id, data: formData })
      : createCompany(formData);
  };

  useEffect(() => {
    if (isPostSuccess || isEditSuccess) {
      handleClose();
    }
  }, [isPostSuccess, isEditSuccess]);

  const accounting_firm_options =
    accountingFirmData?.data?.length > 0
      ? accountingFirmData?.data?.map(({ id, name }) => ({
          label: name,
          value: id,
        }))
      : [];

  console.log({ accounting_firm_options });

  return (
    <>
      {isFetching ? (
        <CustomLoader />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={disabled && { pointerEvents: "none", opacity: 0.8 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <CustomInput
                  name="name"
                  control={control}
                  errors={errors}
                  title={"Name"}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <CustomInput
                  name="email"
                  control={control}
                  errors={errors}
                  title={"Email"}
                  type="email"
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <CustomFileUpload
                  control={control}
                  errors={errors}
                  name="logo"
                  buttonName={"Upload Logo"}
                />
                <Box display={"flex"} flexWrap={"wrap"} mt={2}>
                  {watch("logo") ? (
                    Object.values(watch("logo"))?.map((item) => (
                      <Box key={item?.name}>
                        <img
                          style={{ height: "50px" }}
                          src={URL?.createObjectURL(item)}
                        />
                      </Box>
                    ))
                  ) : (
                    <Box>
                      <img
                        style={{ height: "50px" }}
                        src={row?.logo?.thumbnail}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>

            <CustomButton
              loading={isPostLoading || isEditLoading}
              error={error || editError}
              success={isPostSuccess || isEditSuccess}
              successData={successData || editSuccessData}
            />
          </Box>
        </form>
      )}
    </>
  );
};

export default AddAdminUsers;
