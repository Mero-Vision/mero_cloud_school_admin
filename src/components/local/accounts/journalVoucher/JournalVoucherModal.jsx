import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { usePostJournalVoucherMutation } from "../../../../apis/journalVoucherApi";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import AddJournalTable from "./AddJournalTable";
import styles from "./style";

const JournalVoucherModal = ({ type, handleClose }) => {
  const classes = styles();
  const [
    postJournal,
    {
      isError: isPostError,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
    },
  ] = usePostJournalVoucherMutation();

  const fieldData = {
    account_head_id: "",
    dr_amount: "",
    cr_amount: "",
    remarks: "",
  };

  const {
    control,
    formState: { errors },
    watch,
    setValue,
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      ledgers: [fieldData],
    },
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "ledgers",
  });

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      ledgers: data?.ledgers?.map((item) => {
        return { ...item, account_head_id: item?.account_head_id?.value };
      }),
    };
    postJournal(finalData);
  };

  useEffect(() => {
    if (isPostSuccess) {
      handleClose();
    }
  }, [isPostSuccess, handleClose]);

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
                name="date"
                type="date"
                title={"Date"}
              />
            </Grid>

            <Grid item xs={6}>
              <CustomInput
                control={control}
                errors={errors}
                name="reference"
                title={"Reference"}
                placeholder={"Reference"}
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"end"}
                mb={2}
              >
                <Box>
                  <Typography fontSize={"small"} fontWeight={600}>
                    {fields?.length ?? 0} ENTRY
                  </Typography>
                </Box>
                <Box>
                  <Button
                    variant={"blue"}
                    type={"button"}
                    startIcon={<Add />}
                    onClick={() => append(fieldData)}
                  >
                    {"Add New"}
                  </Button>
                </Box>
              </Box>
              <AddJournalTable
                control={control}
                errors={errors}
                fields={fields}
                remove={remove}
                append={append}
                setValue={setValue}
                watch={watch}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomInput
                control={control}
                errors={errors}
                name="note"
                title={"Note"}
                placeholder={"Leave a note"}
                rows={5}
              />
            </Grid>
          </Grid>
          <CustomButton loading={watch()?.difference !== 0 || isPostLoading} />
        </form>
      </Box>
    </Box>
  );
};

export default JournalVoucherModal;
