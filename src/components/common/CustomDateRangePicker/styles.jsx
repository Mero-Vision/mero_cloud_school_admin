import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  root: {
    position: "relative",
    zIndex: "100",
    "& .dateRange": {
      position: "absolute",
      top: "40px",
      left: "-370px",
    },
  },

  dateContainer: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    columnGap: "7px",
    justifyContent: "center",
    border: "1px solid #D1D1DB ",
    borderRadius: "4px",
    padding: "3px 5px",
    color: "#6C6B80 !important",
    fontSize: "12px",
    background: "#fff",
  },
  calendarIcon: {
    background: "#E5E5EB",
    display: "flex",
    alignItems: "center",
    padding: "4px",
    borderRadius: "2px",
    "& svg": {
      fontSize: "18px",
      color: "#4C4B63",
    },
  },
}));

export default styles;
