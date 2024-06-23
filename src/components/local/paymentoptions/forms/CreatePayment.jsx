import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  useCreatePaymentOptionMutation,
  useUpdatePaymentOptionsMutation,
} from "../../../../apis/paymentOptionsApi";
import CustomButton from "../../../common/CustomButton/CustomButton";
import CustomFileUpload from "../../../common/CustomFileUpload/CustomFileUpload";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import { CustomSwitch } from "../../../common/CustomSwitch/CustomSwitch";

const CreatePayment = ({ handleClose = () => {}, row }) => {
  const validationSchema = yup.object().shape({
    payment_name: yup.string().required("Name is required"),
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  console.log({ paymentrow: row });

  const [createPaymentOption, { isLoading, isSuccess, data, error }] =
    useCreatePaymentOptionMutation();

  const [
    updatePaymentOptions,
    {
      isSuccess: isUpdateSuccess,
      error: ErrorData,
      data: updateSuccessData,
      isLoading: isUpdateLoading,
    },
  ] = useUpdatePaymentOptionsMutation();

  const handleSubmitAction = (value) => {
    const formData = new FormData();
    const finalData = {
      ...value,
      payment_image: value?.payment_image?.[0],
      status: "active",
      is_cash: value?.is_cash ?? false,
      _method: "PATCH",
    };

    (String(value?.payment_image)?.startsWith("http") || value?.is_cash) &&
      delete finalData?.payment_image;

    !row && delete finalData["_method"];

    // delete finalData?.is_cash;

    Object?.keys(finalData)?.map((key) =>
      formData.append(key, finalData?.[key])
    );
    row
      ? updatePaymentOptions({ body: formData, id: row?.id })
      : createPaymentOption(formData);
  };

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      handleClose();
    }
  }, [isSuccess, isUpdateSuccess]);

  useEffect(() => {
    if (row) {
      reset(row);
    }
  }, [row]);
  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitAction)}>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <CustomInput
              control={control}
              errors={errors}
              title="Name"
              name={"payment_name"}
            />
          </Grid>

          <Grid item sm={4}>
            <CustomSwitch
              control={control}
              errors={errors}
              name={"is_cash"}
              label={"Is Cash"}
              title="Is Cash"
            />
          </Grid>

          <Grid item sm={12}>
            <CustomFileUpload control={control} name={"payment_image"} />
          </Grid>
        </Grid>
        {watch("payment_image") && (
          <img
            src={
              String(watch("payment_image"))?.startsWith("http")
                ? watch("payment_image")
                : URL.createObjectURL(watch("payment_image")?.[0])
            }
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              marginTop: "20px",
            }}
          />
        )}

        <CustomButton
          buttonName={"Save"}
          type={"submit"}
          loading={isLoading || isUpdateLoading}
          success={isSuccess || isUpdateSuccess}
          successData={data || updateSuccessData}
          error={error || ErrorData}
        />
      </form>
    </>
  );
};

export default CreatePayment;
