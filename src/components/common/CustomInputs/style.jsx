import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  root: {
    "& .title": {
      fontSize: "12px",
      fontWeight: "500 !important",
      color: theme.palette.text.main,
      marginBottom: "8px",
    },
    "& svg": {
      marginRight: "9px",
      height: "19px",
      width: "19px",
    },
  },
}));
export default styles;
