import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  info: {
    "& .summary": {
      fontSize: "14px",
      fontWeight: 500,
      color: "#000",
    },
    "& .name": {
      fontSize: "14px",
      fontWeight: 500,
      color: "#496AD0",
    },
  },
  left: {
    display: "flex",
    flexDirection: "column",
    rowGap: "20px",
    "& .flexDiv": {
      display: "flex",
      columnGap: "1rem",
      alignItems: "center",
    },
    "& .sku": {
      color: "#383751",
      fontSize: "12px",
    },
    "& .product_name": {
      color: "#4559BD",
      fontSize: "18px",
      fontWeight: "600",
    },
    "& .description": {
      color: "#383751",
      fontSize: "13px",
    },
  },
  singleDiv: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "#201F37",
    fontSize: "12px",
    fontWeight: "500 !important",
    textTransform: "uppercase",
  },
  value: { color: "#383751", fontSize: "13px", fontWeight: "400 !important" },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    rowGap: "16px",
  },
  mainTitle: {
    color: "#496AD0",
    fontSize: "12px",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  right: {
    "& img": {
      height: "100%",
      width: "100%",
    },
    marginLeft: "2rem",
  },
  imageDiv: {
    border: "1.5px solid #E5E5EB",
    padding: "2rem 1rem",
    textAlign: "center",
    borderRadius: "5px",
    fontSize: "14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    border: "1px solid #D1D1DB",
    borderRadius: "4px",
    height: "34px",
    width: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      background: "#eeee",
    },
  },
}));

export default styles;
