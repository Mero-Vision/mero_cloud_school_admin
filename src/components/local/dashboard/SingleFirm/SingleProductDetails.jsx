import { Box } from "@mui/material";
import React from "react";
import useTabs from "../../../../hooks/useTabs";
import CustomPaper from "../../../common/CustomPaper/CustomPaper";
import FirmUsers from "../accountingFirm/singleFirm/FirmUsers";
import FirmCompanies from "./FirmCompanies";
import ProductDetail from "./ProductDetail";
import styles from "./styles";

const headerData = (row) => [
  {
    label: "Firm Details",
    value: "details",
  },
  {
    label: `Companies (${row?.companies_count || 0})`,
    value: "companies",
  },
  {
    label: `Users (${row?.users_count || 0})`,
    value: "users",
  },
];

const SingleProductDetails = ({ data: row }) => {
  const classes = styles();
  const { value, Tabs } = useTabs({
    data: headerData(row),
    hideSearch: true,
    // button: <SingleProductButtons data={data} />,
  });

  const switchTabs = () => {
    switch (value) {
      case "details":
        return <ProductDetail data={row} />;
      case "companies":
        return <FirmCompanies data={row} />;
      case "users":
        return <FirmUsers data={row} />;
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
