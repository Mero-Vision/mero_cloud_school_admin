import { Box } from "@mui/material";
import React from "react";
import useTabs from "../../../../hooks/useTabs";
import CustomPaper from "../../../common/CustomPaper/CustomPaper";
import ProductDetail from "./ProductDetail";
import styles from "./styles";

const headerData = [
  {
    label: "Company Details",
    value: "details",
  },
];

const SingleProductDetails = ({ data }) => {
  const classes = styles();
  const { value, Tabs } = useTabs({
    data: headerData,
    hideSearch: true,
    // button: <SingleProductButtons data={data} />,
  });

  const switchTabs = () => {
    switch (value) {
      case "details":
        return <ProductDetail data={data} />;
    }
  };

  return (
    <>
      {" "}
      <Box>{Tabs}</Box>
      <CustomPaper>{switchTabs()}</CustomPaper>
    </>
  );
};

export default SingleProductDetails;
