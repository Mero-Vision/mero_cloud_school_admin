import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  customerLeft: {
    background: "#fff",
  },
  customerSearch: {
    padding: "10px 15px",
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
    "& input": { paddingLeft: "0 !important", padding: "7px 11px !important" },
    "& .title": { color: "#121127", fontSize: "16px", fontWeight: "600" },
  },
  customerList: {
    maxHeight: "500px",
    overflowY: "auto",
    "& .singleCustomerDiv": {
      padding: "10px 15px",
      cursor: "pointer",
      "& .info": {
        "& .name": { color: "#121127", fontSize: "13px", fontWeight: "500" },
        "& .amount": { color: "#4C4B63", fontSize: "12px", fontWeight: "400" },
      },
    },
  },
}));

export default styles;
