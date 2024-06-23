import { Box, FormHelperText, Switch, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
    },
  },
}));

export const CustomSwitch = ({
  name,
  control,
  errors,
  label,
  data = [],

  defaultValue,
  rule = { required: false },
  title = "",
  disabled = false,
  nonNestedSelect = true,
}) => {
  return (
    <>
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Box
              alignItems={"start"}
              display="flex"
              justifyContent="space-between"
              flexDirection={"column"}
              rowGap={"10px"}
            >
              <Typography sx={{ fontSize: "12px" }}>{label}</Typography>
              <Switch checked={value} onChange={onChange} />
            </Box>
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
