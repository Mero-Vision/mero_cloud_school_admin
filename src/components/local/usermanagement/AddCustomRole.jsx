import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateCustomRoleMutation,
  useUpdateRoleMutation,
} from "../../../apis/rolesApi";
import CustomButton from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInputs/CustomInput";

const AddCustomRole = ({ handleClose = () => {}, row }) => {
  const [createCustomRole, { isLoading, isSuccess, isError, data, error }] =
    useCreateCustomRoleMutation();

  const [
    updateRole,
    {
      isLoading: updateLoading,
      isSuccess: updateIsSuccess,
      data: successData,
      error: updateError,
    },
  ] = useUpdateRoleMutation();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmitAction = (value) => {
    console.log({ value });
    row ? updateRole({ ...value }) : createCustomRole(value);
  };

  useEffect(() => {
    if (isSuccess || updateIsSuccess) {
      handleClose();
    }
  }, [isSuccess, updateIsSuccess]);

  useEffect(() => {
    if (row) {
      reset(row);
    }
  }, [row]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmitAction)}>
        <CustomInput
          control={control}
          errors={errors}
          name={"name"}
          title="Role name"
        />

        <CustomButton
          buttonName={"Submit"}
          type={"submit"}
          error={error || updateError}
          success={isSuccess || updateIsSuccess}
          successData={data || successData}
          loading={isLoading || updateLoading}
        />
      </form>
    </>
  );
};

export default AddCustomRole;
