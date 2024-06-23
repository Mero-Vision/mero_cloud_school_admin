import { Search } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setSearch } from "../../../../rootRedux/utilsSlice";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import styles from "./styles";

const ProductSearch = () => {
  const classes = styles();
  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    watch,
  } = useForm({});

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearch(watch("search")));
    }, [1000]);
    return () => clearTimeout(timeout);
  }, [watch("search")]);
  return (
    <Box className={classes.customerSearch}>
      {/* <Box>
        <Typography className="title">Company List</Typography>
      </Box> */}
      <Box>
        <CustomInput
          control={control}
          errors={errors}
          name="search"
          placeholder={"Firm Search"}
          startIcon={<Search />}
        />
      </Box>
    </Box>
  );
};

export default ProductSearch;
