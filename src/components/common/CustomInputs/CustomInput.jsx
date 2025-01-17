import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import styles from "./style";

export const CustomInput = ({
  name,
  control,
  type,
  errors,
  placeholder = null,
  label = "",
  rule = { required: false },
  title = "",
  disabled = false,
  hidden = false,
  required,
  min,
  max,
  rows,
  startIcon,
  endIcon,
  defaultValue,
}) => {
  const [show, setShow] = useState(false);
  const classes = styles();
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
    <div className="inputs">
      <div className={classes.root}>
        {title && (
          <Box display="flex" gridColumnGap={".1rem"}>
            <InputLabel className="inputTitle">
              {title?.toUpperCase()}{" "}
              <span style={{ color: "red" }}>{required && "*"} </span>
            </InputLabel>
          </Box>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <TextField
                type={show ? "text" : type}
                onChange={(event) => {
                  const newValue =
                    type === "number" && event.target.value > max
                      ? max
                      : event.target.value;
                  onChange(newValue);
                }}
                value={value ?? ""}
                fullWidth
                placeholder={placeholder}
                label={label}
                variant="outlined"
                defaultValue={defaultValue}
                title={title}
                disabled={disabled}
                onWheel={(e) => e.target.blur()}
                InputProps={{
                  inputProps: { min: min || 0, max: max, step: "0.01" },
                  startAdornment: startIcon,
                  endAdornment:
                    type === "password" ? (
                      <IconButton
                        onClick={() => setShow((prev) => !prev)}
                        sx={{
                          "& svg": {
                            margin: "0 !important",
                            height: "14px",
                            width: "14px",
                          },
                        }}
                      >
                        {show ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ) : (
                      endIcon
                    ),
                }}
                hidden={hidden}
                multiline={rows}
                rows={rows}
                // required={required}
              />
              {error && (
                <Box style={{ color: "red", fontSize: "10px" }}>
                  {!value && error}
                </Box>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};
