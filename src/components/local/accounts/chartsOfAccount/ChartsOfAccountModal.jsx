import { Box, Grid } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  useGetAccountHeadQuery,
  usePostAccountHeadMutation,
} from "../../../../apis/chartsOfAccountApi";
import { ACCOUNT_TYPE_DATA } from "../../../../constants/constants";
import { setLatestAccount } from "../../../../rootRedux/utilsSlice";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import { CustomSearchSelect } from "../../../common/CustomSelects/CustomSearchSelect";
import styles from "./style";

const ChartsOfAccountModal = ({ type, handleClose, inputValue, uuid }) => {
  const classes = styles();
  const dispatch = useDispatch();
  const [
    postAccountHead,
    {
      isError: isPostError,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
    },
  ] = usePostAccountHeadMutation();
  const {
    data: accountHead,
    isError: isAccountError,
    isLoading: isAccountLoading,
    isSuccess: isAccountSuccess,
  } = useGetAccountHeadQuery();

  const {
    control,
    formState: { errors },
    watch,
    setValue,
    register,
    handleSubmit,
  } = useForm({});

  useEffect(() => {
    inputValue && setValue("name", inputValue);
  }, [inputValue]);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      status: type,
    };
    postAccountHead(finalData);
    dispatch(setLatestAccount({ ...finalData, uuid }));
  };

  useEffect(() => {
    if (isPostSuccess) {
      handleClose && handleClose();
    }
  }, [isPostSuccess, handleClose]);

  const InputSelect = () => {
    return (
      <Box className={classes.inputSelect}>
        <select name="type" {...register("type")}>
          <option value={"CR"}>CR</option>
          <option value={"DR"}>DR</option>
        </select>
      </Box>
    );
  };

  const UNDER_DATA = useMemo(
    () =>
      accountHead?.data?.map((item) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      }),
    [accountHead?.data]
  );

  const PARENT_ID = useMemo(
    () => Number(watch("parent_id")),
    [watch("parent_id")]
  );

  useEffect(() => {
    const data = accountHead?.data?.find(
      (item) => Number(item?.id) === PARENT_ID
    );

    setValue("account_type", data ? data?.account_type : "");
  }, [PARENT_ID, accountHead?.data]);

  return (
    <Box>
      <Box>
        <form
          onSubmit={(e) => {
            e.stopPropagation();
            return handleSubmit(onSubmit)(e);
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="name"
                title={"Account Name"}
                placeholder={"Lexi Alexandra"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSearchSelect
                control={control}
                errors={errors}
                name="parent_id"
                title={"Under"}
                data={UNDER_DATA}
                placeholder={"Parent Group"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="code"
                title={"Code"}
                placeholder={"Code"}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomSearchSelect
                control={control}
                errors={errors}
                name="account_type"
                title={"Account Type"}
                data={ACCOUNT_TYPE_DATA}
                placeholder={PARENT_ID ? "-" : "Assets"}
                disabled={PARENT_ID && true}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="opening_balance"
                title={"Opening Balance"}
                placeholder={"0.00"}
                type="number"
                endIcon={<InputSelect />}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                control={control}
                errors={errors}
                name="description"
                title={"Description"}
                placeholder={"Description"}
                rows={5}
              />
            </Grid>
          </Grid>
          {<CustomButton loading={isPostLoading} />}
        </form>
      </Box>
    </Box>
  );
};

export default ChartsOfAccountModal;
