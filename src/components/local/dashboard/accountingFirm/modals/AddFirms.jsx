import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateAccountingFirmMutation,
  useUpdateAccountingFirmMutation,
} from "../../../../../apis/accountingFirmApi";
import CustomButton from "../../../../common/CustomButton/CustomButton";
import CustomFileUpload from "../../../../common/CustomFileUpload/CustomFileUpload";
import { CustomInput } from "../../../../common/CustomInputs/CustomInput";

const AddFirms = ({ handleClose, row }) => {
  const [
    createAccountingFirm,
    {
      error,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
      data: responseData,
    },
  ] = useCreateAccountingFirmMutation();

  const [
    updateAccountingFirm,
    {
      error: editError,
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      data: successData,
    },
    ,
  ] = useUpdateAccountingFirmMutation();

  const {
    control,
    formState: { errors },
    watch,
    reset,
    handleSubmit,
  } = useForm({});

  console.log({ watch: watch() });

  useEffect(() => {
    if (row) {
      reset(row);
    }
  }, [row]);

  const onSubmit = (values) => {
    const formData = new FormData();
    const finalValues = {
      ...values,
      accounting_firm_id: Number(values?.accounting_firm_id) || "",
      logo: values?.image?.[0] ?? "",
    };

    delete finalValues.image;
    finalValues &&
      Object?.keys(finalValues)?.map((key) =>
        formData.append(key, finalValues?.[key] ?? "")
      );

    row && formData?.append("_method", "PATCH");

    row
      ? updateAccountingFirm({ id: row?.id, formData })
      : createAccountingFirm(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomInput
              control={control}
              errors={errors}
              name="name"
              title={"Firm Name"}
              placeholder={"Tesla"}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              control={control}
              errors={errors}
              name="short_name"
              title={"Short Name"}
              placeholder={"TS"}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              control={control}
              errors={errors}
              name="primary_email"
              type={"email"}
              title={"Email Address"}
              placeholder={"elon@tesla.com"}
            />
          </Grid>

          <Grid item xs={6}>
            <CustomInput
              control={control}
              errors={errors}
              name="primary_phone"
              title={"Contact Number"}
              placeholder={"+141-9841442148"}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              control={control}
              errors={errors}
              name="vat_number"
              title={"Vat Number"}
              placeholder={"154105265"}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomInput
              control={control}
              errors={errors}
              name="address"
              title={"Address"}
              placeholder={"Durbarmarg"}
            />
          </Grid>

          <Grid item xs={12}>
            <CustomFileUpload
              control={control}
              errors={errors}
              name="image"
              buttonName={"Upload Logo"}
            />
            <Box display={"flex"} flexWrap={"wrap"} mt={2}>
              {watch("image") ? (
                Object.values(watch("image"))?.map((item) => (
                  <Box key={item?.name}>
                    <img
                      style={{ height: "50px" }}
                      src={URL?.createObjectURL(item)}
                    />
                  </Box>
                ))
              ) : (
                <Box>
                  <img style={{ height: "50px" }} src={row?.logo?.thumbnail} />
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        <CustomButton
          success={isPostSuccess || isEditSuccess}
          loading={isPostLoading || isEditLoading}
          error={error || editError}
          successData={responseData || successData}
          handleClose={() => handleClose()}
        />
      </form>
    </div>
  );
};

export default AddFirms;
