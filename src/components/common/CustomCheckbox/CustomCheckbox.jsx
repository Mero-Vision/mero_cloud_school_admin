import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
    },
    "& label": {
      fontSize: "14px !important",
    },
  },
}));

export const CustomCheckbox = ({
  name,
  control,
  errors,
  label,
  rule = { required: false },
  title = "",
  nonNestedSelect = true,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        {title && (
          <InputLabel className="title">{title?.toUpperCase()}</InputLabel>
        )}

        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={value}
                  onChange={onChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={label}
            />
          )}
          rules={rule}
        />
        {nonNestedSelect &&
          errors[name] &&
          errors[name].type === "required" && (
            <FormHelperText style={{ color: "red" }}>
              This field is required
            </FormHelperText>
          )}
      </div>
    </>
  );
};
