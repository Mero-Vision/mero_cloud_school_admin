import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  searchDiv: {
    display: "flex",
    marginBottom: "10px",
    "& .MuiInputBase-root": {
      background: "#fff !important",
      borderRadius: 0,
    },
    "& svg": {
      color: "#9D9CAF",
    },
  },
}));

export default styles;
