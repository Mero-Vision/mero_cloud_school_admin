import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  inputSelect: {
    "& select": {
      cursor: "pointer",
      background: "#f6f6f6",
      border: "none",
      outline: "none",
    },
  },
  table: {
    maxHeight: "400px !important",
  },
}));

export default styles;
