import { Box, Grid } from "@mui/material";
import conveter from "nepali-date-converter";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateFiscalYearMutation,
  useUpdateFiscalYearMutation,
} from "../../../../apis/settingApi";
import { changeDateFormat } from "../../../../utils/helpers";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import CustomNepaliDatePicker from "../../../common/CustomNepaliDatePicker/CustomNepaliDatePicker";

const AddFiscalYear = ({ handleClose, row }) => {
  const [createFiscalYear, { isSuccess }] = useCreateFiscalYearMutation();
  const [updateFiscalYear, { isSuccess: isUpdateSuccess }] =
    useUpdateFiscalYearMutation();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    if (row) {
      const finalRow = {
        ...row,
        from: changeDateFormat(row?.from, "YYYY-MM-DD"),
        to: changeDateFormat(row?.to, "YYYY-MM-DD"),
      };

      console.log({ finalRow });
      Object.keys(finalRow)?.map((key) => setValue(key, finalRow?.[key]));
    }
  }, [row]);

  const onSubmit = (values) => {
    const from = new conveter(values?.from_bs);
    const to = new conveter(values?.to_bs);

    console.log({ converter: from, to });

    const finalValues = {
      ...values,
      from: changeDateFormat(from?.toJsDate(), "YYYY-MM-DD"),
      to: changeDateFormat(to?.toJsDate(), "YYYY-MM-DD"),
      status: "PENDING",
    };
    row
      ? updateFiscalYear({ ...finalValues, _method: "PATCH" })
      : createFiscalYear(finalValues);
  };

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      handleClose();
    }
  }, [isSuccess, isUpdateSuccess]);

  return (
    <div>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <CustomInput
                name={"name"}
                title="Fiscal Name"
                control={control}
                errors={errors}
              />
            </Grid>

            <Grid item sm={6}>
              <CustomNepaliDatePicker
                control={control}
                errors={errors}
                name="from_bs"
                label={"From(BS)"}
              />
            </Grid>
            <Grid item sm={6}>
              <CustomNepaliDatePicker
                control={control}
                errors={errors}
                name="to_bs"
                label={"to(BS)"}
              />
            </Grid>
            {/* <Grid item sm={6}>
              <CustomInput
                name={"from"}
                title="From(AD)"
                control={control}
                type="date"
                errors={errors}
              />
            </Grid>
            <Grid item sm={6}>
              <CustomInput
                name={"to"}
                title="To(AD)"
                control={control}
                errors={errors}
                type="date"
              />
            </Grid> */}
          </Grid>

          <CustomButton />
        </form>
      </Box>
    </div>
  );
};

export default AddFiscalYear;
