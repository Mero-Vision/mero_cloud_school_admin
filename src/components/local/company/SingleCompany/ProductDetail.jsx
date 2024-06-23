import { Autorenew } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useAssignCompanyAdminMutation } from "../../../../apis/companyApi";
import { useGetOwnerQuery } from "../../../../apis/ownerApi";
import NoImage from "../../../../assets/NoImage.svg";
import useTabs from "../../../../hooks/useTabs";
import { changeDateFormat } from "../../../../utils/helpers";
import CommonSingleDiv from "../../../common/CommonSingleDiv/CommonSingleDiv";
import DisplayStatus from "../../../common/CommonSingleDiv/DisplayStatus";
import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import CurrentPlan from "../companyPlan/CurrentPlan";
import styles from "./styles";

const ProductDetail = ({ data }) => {
  const classes = styles();

  const { data: invitationData, isFetching } = useGetOwnerQuery({
    company_id: data?.id,
  });
  // const params = ();

  // console.log({ params });

  const [assignCompanyAdmin, { isLoading }] = useAssignCompanyAdminMutation();

  console.log({ productData: data });

  const resendInvitation = () => {
    assignCompanyAdmin({
      email: invitationData?.data?.data?.[0]?.user?.email,
      company_id: data?.id,
      is_resend: true,
    });
  };

  const { Tabs, value } = useTabs({
    data: [
      {
        label: "Invitations",
        value: "invitations",
      },
    ],

    hideSearch: true,

    button: (
      <>
        <Button
          sx={{
            backgroundColor: "#2b7476",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#389394",
            },
          }}
          startIcon={<Autorenew />}
          onClick={resendInvitation}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Resend Invitation"}
        </Button>
      </>
    ),
  });

  const columns = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
      renderCell: (props) => (
        <>
          <Typography>{props?.row?.user?.name ?? "-"}</Typography>
        </>
      ),
    },
    {
      flex: 1,
      field: "email",
      headerName: "Email",
      renderCell: (props) => (
        <>
          <Typography>{props?.row?.user?.email ?? "-"}</Typography>
        </>
      ),
    },

    {
      flex: 1,
      field: "created_at",
      headerName: "Created At",
    },

    {
      flex: 1,
      field: "expires_at",
      headerName: "Expires At",
    },
  ];

  return (
    <>
      {" "}
      <Box>
        <Box className={classes.details}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box className={classes.left}>
                <Box>
                  <Typography className="sku">{data?.business_name}</Typography>
                  <Box className={"flexDiv"}>
                    <Typography className="product_name">
                      {data?.display_name}
                    </Typography>
                    <DisplayStatus row={data} />{" "}
                  </Box>
                </Box>

                <Divider />
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <CommonSingleDiv
                        title={"Owner Name"}
                        value={data?.owner?.name ?? ""}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CommonSingleDiv
                        title={"Owner Email Address"}
                        value={data?.owner?.email ?? ""}
                      />
                    </Grid>
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
                    <Grid item xs={4}>
                      <CommonSingleDiv
                        title={"Start Date"}
                        value={
                          data?.start_date
                            ? changeDateFormat(data?.start_date)
                            : "-"
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <CommonSingleDiv
                        title={"Registration No."}
                        value={data?.registration_number}
                      />
                    </Grid>{" "}
                  </Grid>
                </Box>
                <Divider />
                <Box>
                  <Grid container spacing={3}>
                    <Grid item xs={4}>
                      <CurrentPlan props={{ row: data }} />
                    </Grid>

                    <Grid item xs={4}>
                      <CommonSingleDiv
                        title={"No of user"}
                        value={data?.package?.pivot?.user ?? ""}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <CommonSingleDiv
                        title={"No of table"}
                        value={data?.package?.pivot?.table ?? ""}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <CommonSingleDiv
                        title={"No of menu item"}
                        value={data?.package?.pivot?.menu_item ?? ""}
                      />
                    </Grid>

                    <Grid item xs={4}>
                      <CommonSingleDiv
                        title={"No of period"}
                        value={`${data?.package?.pivot?.period} days` ?? ""}
                      />
                    </Grid>
                  </Grid>

                  {/* <Divider sx={{ marginTop: "30px" }} /> */}
                </Box>
              </Box>{" "}
            </Grid>{" "}
            <Grid item xs>
              <Box className={classes.right}>
                {data?.company_image ? (
                  <img
                    src={data?.company_image}
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
      <Box sx={{ marginTop: "40px" }}>
        {Tabs}

        {isFetching ? (
          <CustomLoader />
        ) : (
          value === "invitations" && (
            <CustomDataGrid
              rows={invitationData?.data?.data || []}
              columns={columns}
              tabsData={data}
            />
          )
        )}
      </Box>
    </>
  );
};

export default ProductDetail;
