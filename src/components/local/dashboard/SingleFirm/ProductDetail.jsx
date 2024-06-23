import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import NoImage from "../../../../assets/NoImage.svg";
import CommonSingleDiv from "../../../common/CommonSingleDiv/CommonSingleDiv";
import DisplayStatus from "../../../common/CommonSingleDiv/DisplayStatus";
import styles from "./styles";

const ProductDetail = ({ data }) => {
  const classes = styles();
  return (
    <>
      {" "}
      <Box>
        <Box className={classes.details}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box className={classes.left}>
                <Box>
                  <Typography className="sku">{data?.name}</Typography>
                  <Box className={"flexDiv"}>
                    <Typography className="product_name">
                      {data?.short_name}
                    </Typography>
                    <DisplayStatus row={data} />{" "}
                  </Box>
                </Box>

                <Divider />
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <CommonSingleDiv
                        title={"EMAIL"}
                        value={data?.primary_email}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CommonSingleDiv
                        title={"PHONE"}
                        value={data?.primary_phone}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CommonSingleDiv
                        title={"VAT/PAN NO."}
                        value={data?.vat_number || data?.pan_number}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CommonSingleDiv
                        title={"Address"}
                        value={data?.address}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
              </Box>{" "}
            </Grid>{" "}
            <Grid item xs>
              <Box className={classes.right}>
                {data?.logo?.url ? (
                  <img
                    src={data?.logo?.url}
                    style={{
                      border: "1.5px solid #E5E5EB",
                      borderRadius: "5px",
                    }}
                  />
                ) : (
                  <Box>
                    <Box className={classes.imageDiv}>
                      <img
                        src={NoImage}
                        style={{
                          height: "80px",
                          width: "80px",
                        }}
                      />
                      <Typography>No Image</Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>{" "}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ProductDetail;
