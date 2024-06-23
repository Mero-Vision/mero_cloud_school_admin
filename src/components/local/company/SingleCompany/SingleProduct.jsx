import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { useGetSingleCompanyQuery } from "../../../../apis/companyApi";
import useQuery from "../../../../hooks/useQuery";
import CustomGrid from "../../../common/CustomGrid/CustomGrid";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import ProductLeft from "../CompanyList/ProductLeft";
import SingleProductDetails from "./SingleProductDetails";

const SingleProduct = () => {
  const { query } = useQuery("value");
  const { query: id } = useQuery();
  const params = { id };

  const { data: singleData, isFetching } = useGetSingleCompanyQuery(params, {
    skip: !id,
  });

  const data = useMemo(() => {
    return singleData?.data;
  }, [singleData?.data]);
  console.log({ "NEW SINGLE ": data });
  return (
    <Box>
      <CustomGrid
        info={<ProductLeft />}
        details={
          isFetching ? <CustomLoader /> : <SingleProductDetails data={data} />
        }
      />
    </Box>
  );
};

export default SingleProduct;
