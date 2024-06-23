import { Clear } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetSinglePackageQuery } from "../../../apis/packageApi";
import CustomChip from "../../common/CustomChip/CustomChip";
import CustomLoader from "../../common/CustomLoader/CustomLoader";
import DataNotFound from "../../common/DataNotFound/DataNotFound";

const ViewPackage = ({ data, handleClose = () => {} }) => {
  console.log({ viewPackages: data });

  const { data: singlePackageData, isFetching } = useGetSinglePackageQuery({
    id: data?.id,
  });

  console.log({ singlePackageData, isFetching });
  return (
    <Box sx={{ width: "450px", px: "20px", py: "20px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            padding: "0px",
            margin: "0px",
            fontWeight: 500,
            fontSize: "14px",
          }}
          title="View packages"
        >
          View Package
        </Typography>

        <IconButton onClick={handleClose}>
          <Clear />
        </IconButton>
      </Box>

      <Box sx={{ marginTop: "30px" }}>
        <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
          {data?.name}{" "}
          <CustomChip
            params={{
              row: {
                status: data?.is_trial
                  ? "Trial"
                  : data?.is_recommended
                  ? "Recommended"
                  : "Normal",
              },
            }}
          />
        </Typography>

        <Grid container columnSpacing={0.3}>
          <Grid item sm={4}>
            <DetailList label="No of user" data={data?.user} />
          </Grid>

          <Grid item sm={4}>
            <DetailList data={data?.table} label="No of table" />
          </Grid>

          <Grid item sm={4}>
            <DetailList data={data?.menu_item} label="No of menu" />
          </Grid>
        </Grid>

        <Box sx={{ marginTop: "30px" }}>
          <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
            Pricing Table
          </Typography>

          <Table sx={{ marginTop: "10px" }}>
            <TableHead>
              <TableRow>
                <TableCell>No of Day(s)</TableCell>
                <TableCell>Pricing</TableCell>
                <TableCell>Branch Pricing</TableCell>
              </TableRow>
            </TableHead>

            {isFetching ? (
              <CustomLoader />
            ) : (
              <TableBody>
                {singlePackageData?.data?.period_prices?.length > 0 ? (
                  singlePackageData?.data?.period_prices?.map((item) => (
                    <TableRow key={item?.id}>
                      <TableCell>{item?.period}</TableCell>
                      <TableCell>Rs {item?.price}</TableCell>
                      <TableCell>Rs {item?.branch_price}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell colSpan={3}>
                    <DataNotFound />
                  </TableCell>
                )}
              </TableBody>
            )}
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewPackage;

const DetailList = ({ data, label }) => {
  return (
    <>
      <Typography
        sx={{
          fontSize: "14px",
          fontWeight: 500,
          color: "#48484890",
          pt: "10px",
        }}
      >
        {label}:{" "}
        <Typography component={"span"} sx={{ color: "#484848" }}>
          {data ?? "-"}
        </Typography>
      </Typography>
    </>
  );
};
