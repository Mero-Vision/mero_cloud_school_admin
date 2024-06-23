import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: "0",
    display: "flex",
  },

  content: {
    minHeight: "100vh",
    paddingBlock: "1rem",
    paddingInline: "46px",
    width: "calc(100vw - 245px)",
  },
}));

export default useStyles;
