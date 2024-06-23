import { FormHelperText } from "@mui/material";
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import React from "react";
import { Controller } from "react-hook-form";

const CustomInputNepaliDate = ({ name, control, errors }) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <NepaliDatePicker
              inputClassName="form-control"
              value={value}
              onChange={onChange}
              options={{ calenderLocale: "ne", valueLocale: "en" }}
            />
          </>
        )}
      />
      {errors[name] && errors[name].type === "required" && (
        <FormHelperText
          style={{ color: "#f44336" }}
        >{`This field is required`}</FormHelperText>
      )}
    </>
  );
};

export default CustomInputNepaliDate;
