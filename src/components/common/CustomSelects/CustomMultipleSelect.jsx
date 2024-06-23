import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
    },

    "& .title": {
      fontSize: "12px",
      fontWeight: "500 !important",
      color: "#222136 !important",
      marginBottom: "8px",
    },
    "& svg": {
      marginRight: "9px",
      height: "19px",
      width: "19px",
    },

    "& .MuiOutlinedInput-root": {
      padding: "0px !important",
    },
  },
}));
export const CustomMultipleSelect = ({
  name,
  control,
  errors,
  label,
  data = [],
  title = "",
  disabled,
  defaultValue,
  placeholder,
}) => {
  const classes = useStyles();

  let error;
  const splitName = name.split(".");
  if (errors) {
    if (splitName?.length > 1) {
      let loopError = errors;
      splitName?.map((item, index) => {
        loopError = loopError?.[item];
      });
      error = loopError?.message;
    } else {
      error = errors?.[name]?.message;
    }
  }

  return (
    <>
      <div className={classes.root}>
        {title && (
          <InputLabel className="title">{title?.toUpperCase()}</InputLabel>
        )}
        <FormControl variant="outlined">
          {/* <InputLabel>{label}</InputLabel> */}
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={data}
                  defaultValue={defaultValue || []}
                  onChange={(e, data) =>
                    onChange(data?.map((item) => item?.value))
                  }
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label={label} />
                  )}
                />

                {error && (
                  <Box style={{ color: "red", fontSize: "10px" }}>
                    {!value && error}
                  </Box>
                )}
              </>
            )}
          />
        </FormControl>
        {/* {errors[name] && errors[name].type === "required" && (
          <FormHelperText style={{ color: "red" }}>
            This field is required
          </FormHelperText>
        )} */}
      </div>
    </>
  );
};
