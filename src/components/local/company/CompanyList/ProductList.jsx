import { Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllCompanyQuery } from "../../../../apis/companyApi";
import useQuery from "../../../../hooks/useQuery";
import DisplayStatus from "../../../common/CommonSingleDiv/DisplayStatus";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import styles from "./styles";

const ProductList = () => {
  const classes = styles();
  const { search_keyword = "" } = useSelector((state) => state?.utils);
  const params = {
    search_keyword: search_keyword,
  };

  const {
    data: products,
    isFetching: isProductFetching,
    isSuccess: isProductSuccess,
  } = useGetAllCompanyQuery(params);

  const PRODUCTS = useMemo(() => products?.data?.data, [products?.data?.data]);
  // const PRODUCTS = [];

  return (
    <Box className={classes.customerList}>
      {isProductFetching && <CustomLoader />}
      {!isProductFetching && isProductSuccess && (
        <Box>
          {PRODUCTS?.map((item, index) => (
            <React.Fragment key={item?.id}>
              <SingleProduct item={item} index={index} />
              <Divider />
            </React.Fragment>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductList;

const SingleProduct = ({ item, index }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname?.split("/")?.slice(1, -1)?.join("/");
  console.log({ location: pathname?.split("/")?.slice(1, -1)?.join("/") });
  const { query: id } = useQuery();
  useEffect(() => {
    index === 0 && navigate(`/${path}/companies?id=${id ? id : item?.id}`);
  }, [index]);
  return (
    <Box
      className="singleCustomerDiv"
      onClick={() => navigate(`/${path}/companies?id=${item?.id}`)}
      sx={{
        background: Number(id) === Number(item?.id) && "#E1F5FF",
        transition: "200ms all ease-in-out",
      }}
    >
      <Box className="info">
        <Box>
          <Typography className="name">{item?.display_name ?? "-"}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography className="amount">({item?.business_name})</Typography>
            <DisplayStatus row={item} />{" "}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
