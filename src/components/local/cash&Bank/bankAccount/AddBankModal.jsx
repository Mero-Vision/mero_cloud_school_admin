import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePostBankMutation } from "../../../../apis/bankApi";
import CustomButton from "../../../common/CustomButton/CustomButton";
import CustomFileUpload from "../../../common/CustomFileUpload/CustomFileUpload";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import styles from "./style";

const AddBankModal = ({ handleClose }) => {
  const classes = styles();
  const [
    postBank,
    {
      isError: isPostError,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
    },
  ] = usePostBankMutation();

  const {
    control,
    formState: { errors },
    watch,
    setValue,
    register,
    handleSubmit,
  } = useForm({});

  const onSubmit = (data) => {
    const formData = new FormData();
    const finalData = {
      ...data,
      image: data?.image?.[0],
    };
    finalData &&
      Object?.keys(finalData)?.map((key) =>
        formData.append(key, finalData?.[key])
      );
    for (const value of formData.entries()) {
      console.log({ value });
    }
    postBank(formData);
  };

  useEffect(() => {
    if (isPostSuccess) {
      handleClose();
    }
  }, [isPostSuccess, handleClose]);

  console.log({ watch: watch("image")?.[0] });

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
                title={"Bank Name"}
                placeholder={"Nepal Rastra Bank"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="account_name"
                title={"Account Name"}
                placeholder={"Alexander Vlosvski"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="account_number"
                title={"Account Number"}
                placeholder={"SB37247832648634"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="account_type"
                title={"Account Type"}
                placeholder={"Savings"}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="swift_code"
                title={"Swift Code"}
                placeholder={"021371282"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="address"
                title={"Address"}
                placeholder={"Durbarmarg"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="price"
                title={"Price"}
                type="number"
                placeholder={"60,00,000"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomFileUpload
                control={control}
                errors={errors}
                name="image"
                buttonName={"Upload Logo"}
              />
              <Box display={"flex"} flexWrap={"wrap"} mt={2}>
                {watch("image") &&
                  Object.values(watch("image"))?.map((item) => (
                    <Box key={item?.name}>
                      <img
                        style={{ height: "50px" }}
                        src={URL.createObjectURL(item)}
                      />
                    </Box>
                  ))}
              </Box>
            </Grid>
          </Grid>
          <CustomButton loading={isPostLoading} />
        </form>
      </Box>
    </Box>
  );
};

export default AddBankModal;
