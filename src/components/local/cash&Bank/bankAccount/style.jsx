import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  cardDiv: {
    background: "#fff",
    padding: "13px 16px",
    boxShadow: "0px 4px 5px 0px rgba(88, 144, 255, 0.07)",
    height: "100%",
    "& .MuiAvatar-root": {
      height: "80px",
      width: "80px",
      "& img": {
        height: "100%",
        width: "100%",
        objectFit: "contain",
      },
    },
  },
  infoDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  editButton: {
    "& button": {
      color: theme.palette.text.light,
    },
  },
}));

export default styles;
