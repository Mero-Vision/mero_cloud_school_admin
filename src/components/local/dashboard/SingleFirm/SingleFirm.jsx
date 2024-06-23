import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { useGetSingleAccountingFirmQuery } from "../../../../apis/accountingFirmApi";
import useQuery from "../../../../hooks/useQuery";
import CustomGrid from "../../../common/CustomGrid/CustomGrid";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import ProductLeft from "../FirmList/ProductLeft";
import SingleProductDetails from "./SingleProductDetails";

const SingleFirm = () => {
  const { query } = useQuery("value");
  const { query: id } = useQuery();
  const params = { id };

  const { data: singleData, isFetching } = useGetSingleAccountingFirmQuery(
    params,
    {
      skip: !id,
    }
  );

  const data = useMemo(() => {
    return singleData?.data;
  }, [singleData?.data]);
  console.log({ datadatadata: data });
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

export default SingleFirm;
