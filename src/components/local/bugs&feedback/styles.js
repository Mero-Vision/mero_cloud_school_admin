import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  templates: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: "10px",
    paddingBlock: "1rem",
    "& .imageDiv": {
      cursor: "pointer",
      "& img": {
        border: "2px solid #E5E5EB",
        height: "225px",
        width: "180px",
        objectFit: "contain",
        transition: "200ms all ease-in-out",
        "&:hover": {
          border: "2px solid #aaa",
        },
      },
    },
  },
  selectedImage: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    height: "100%",
    width: "100%",
    padding: "50px",
    background: "#fff",
    "& img": {
      height: "550px",
      width: "750px",
      objectFit: "contain",
      [theme.breakpoints.up("xl")]: {
        width: "950px",
      },
    },
  },
  mainContainer: {
    display: "flex",
    padding: "20px 32px",
    width: "100%",
    flexDirection: "column",
    rowGap: "20px",
    background: "#f9f9fb",
    "& .MuiInputBase-root ": { background: "#fff !important" },
  },
  formContainer: {
    padding: "18px 12px",
    border: "1px solid #E5E5EB  ",
    background: "#F3F3F6",
    borderRadius: "4px",
  },
  commentContainer: {
    maxHeight: "300px",
    overflowY: "auto",
  },
  comment: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 20px",
    rowGap: "5px",
    borderBottom: "1px solid #aaa",
    "& .picture": { display: "flex", columnGap: "8px", alignItems: "center" },
    "& .name": {
      color: "#201F37",
      fontSize: "13px",
      fontWeight: 500,
    },
    "& .time": {
      color: "#6C6B80",
      fontSize: "11px",
      fontWeight: 300,
    },
    "& .comment": {
      color: "#121127",
      fontSize: "12px",
      fontWeight: 400,
    },
  },
  commentTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addDiv: {
    display: "flex",
    columnGap: "10px",
    alignItems: "center",
    "& .MuiOutlinedInput-input": {
      marginRight: "1rem",
    },
    "& .MuiInputBase-root": {
      // color: "#496AD0",
      padding: "2px !important",
      border: "2px solid #D1D1DB !important",
      fontSize: "12px",
      fontWeight: "400",
      height: "25px !important",
    },
  },
}));

export default styles;
