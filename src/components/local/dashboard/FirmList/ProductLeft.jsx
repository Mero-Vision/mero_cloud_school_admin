import { Box } from "@mui/material";
import React from "react";
import CustomBackButton from "../../../common/CustomButton/CustomBackButton";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";
import styles from "./styles";

const ProductLeft = () => {
  const classes = styles();
  return (
    <>
      <CustomBackButton url="/accounting-firms" />
      <Box className={classes.customerLeft}>
        <ProductSearch />
        <ProductList />
      </Box>
    </>
  );
};

export default ProductLeft;
