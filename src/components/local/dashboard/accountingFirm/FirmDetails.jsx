import { Edit } from "@mui/icons-material";
import { Avatar, Box, IconButton } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetSingleAccountingFirmQuery } from "../../../../apis/accountingFirmApi";
import useModal from "../../../../hooks/useModal";
import AllModals from "../../../common/AllModals/AllModals";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import styles from "../style";
import FirmPaymentTable from "./FirmPaymentTable";

const FirmDetails = () => {
  const classes = styles();
  const { modals, row, handleOpen, handleClose } = useModal();
  const { firm_id } = useParams();
  const { data, isFetching } = useGetSingleAccountingFirmQuery({ id: firm_id });

  console.log({ data, firm_id });

  if (isFetching) {
    return (
      <>
        <CustomLoader />
      </>
    );
  }

  return (
    <>
      <Box className={classes.detailContainer}>
        <Box className={classes.firmDetailContainer}>
          <Avatar
            src={"https://www.spacex.com/static/images/share.jpg"}
            variant="rounded"
            className="avatar"
          />
          <Box style={{ width: "100%" }}>
            <Box className="titleContainer">
              <h1 className={"firmTitle"}>
                {data?.data?.name} ({data?.data?.short_name})
                <IconButton
                  className="iconButton"
                  onClick={() => handleOpen("edit_firm")}
                >
                  <Edit className="icon" />
                </IconButton>
              </h1>
            </Box>

            <Box className="detailCardFlexBox">
              <Box container marginTop={"10px"}>
                <FirmInfos
                  infoTitle={"Email Address"}
                  titleDetail={data?.data?.primary_email}
                />
                <FirmInfos
                  infoTitle={"Phone Number"}
                  titleDetail={data?.data?.primary_phone}
                />
                <FirmInfos
                  infoTitle={"Vat Number"}
                  titleDetail={data?.data?.vat_number}
                />
                <FirmInfos
                  infoTitle={"Address"}
                  titleDetail={data?.data?.address}
                />
                <FirmInfos
                  infoTitle={"Website"}
                  titleDetail={"https://www.spacex.com"}
                />
              </Box>
              <Box marginTop={"15px"} className="statFlexBox">
                <StatsDetailCard
                  statNumber={"250"}
                  statTitle={"Total Client"}
                />
                <StatsDetailCard
                  statNumber={"1500"}
                  statTitle={"Account Balance"}
                />

                <StatsDetailCard
                  statNumber={"10000"}
                  statTitle={"Total Payment"}
                  style={{ borderRight: "none" }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box className={classes.paymentTableContainer}>
          <h3>Recent Payments</h3>
          <FirmPaymentTable />
        </Box>
      </Box>

      <AllModals
        handleClose={() => handleClose("edit_firm")}
        modalType={"edit_firm"}
        open={modals?.edit_firm}
        modalTitle={"Edit Firm"}
        row={row}
      />
    </>
  );
};

export default FirmDetails;

const FirmInfos = ({ infoTitle, titleDetail }) => {
  return (
    <Box item sm={3}>
      <Box className="infoContainer">
        <h3 className={"infoTitle"}>{infoTitle}:</h3>
        <p className="titleDetail">{titleDetail}</p>
      </Box>
    </Box>
  );
};

const StatsDetailCard = ({ statNumber, statTitle, style }) => {
  return (
    <>
      <Box className="statContainer" style={style}>
        <h3 className="statNumber">{statNumber}</h3>
        <p className="statTitle">{statTitle}</p>
      </Box>
    </>
  );
};
