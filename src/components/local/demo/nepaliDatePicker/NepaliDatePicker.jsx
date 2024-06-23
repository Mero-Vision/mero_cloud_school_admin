import { Typography } from "@mui/material";
import NepaliDate from "nepali-date-converter";
import React from "react";
import { useForm } from "react-hook-form";
import { getDateFormat } from "../../../../utils/helpers";
import CustomInputNepaliDate from "../../../common/CustomInputs/CustomInputNepaliDate";

const NepaliDatePicker = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { date: getDateFormat(new NepaliDate().getBS()) },
  });

  return (
    <div>
      <CustomInputNepaliDate control={control} errors={errors} name="date" />
      <Typography>Date : {watch("date")}</Typography>
    </div>
  );
};

export default NepaliDatePicker;
