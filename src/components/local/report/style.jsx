import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  singleCard: {
    background: "#fff",
    padding: "24px",
    border: `2px solid transparent`,
    transition: "250ms all ease-in-out",
    boxShadow: "0px 4px 5px 0px rgba(88, 144, 255, 0.07)",
    height: "100%",
    "&:hover": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
  },
  titleDiv: {
    display: "flex",
    justifyContent: "space-between",
    color: `${theme.palette.text.active}`,
  },
  items: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "20px",
  },
  singleItem: {
    transition: "250ms all ease-in-out",
    cursor: "pointer",
    "&:hover": {
      color: `${theme.palette.text.active}`,
    },
  },
  image: {
    "& img": {
      height: "25px",
      width: "25px",
    },
  },
  tableRoot: {
    borderCollapse: "separate",
    borderSpacing: 0,
    "& th": {
      // border: "1px solid #E5E5EB",
      // borderBlockColor: "#9D9CAF",
      fontWeight: "600",
      textTransform: "uppercase",
    },
  },
  tableHead: {
    position: "sticky",
    top: 0,
    background: "#fff !important",
    zIndex: "10",
    "& th": {
      border: "1px solid #E5E5EB",
      borderBlockColor: "#9D9CAF",
    },
  },
  tableBody: {
    "& td": {
      fontWeight: "500",
    },
  },

  reportNav: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
  },
  header: {
    textTransform: "uppercase",
    color: `${theme.palette.text.active} !important`,
    fontWeight: "600 !important",
  },
  gray: {
    color: "gray !important",
    fontWeight: "initial !important",
  },

  column: {
    color: `${theme.palette.text.light} !important`,
    border: " 2px solid #d1d1db !important",
    transition: "250ms all ease-in-out !important",
    "&:hover": {
      border: " 2px solid #4e8af4 !important",
    },
  },
  columnContainer: {
    width: "350px",
    "& .MuiTypography-root": {
      fontSize: "12px",
      color: theme.palette.text.main,
      fontWeight: 600,
    },
  },
  columnItems: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icons: {
    display: "flex",
    alignItems: "center",
  },
  grossRow: {
    "& td": {
      fontWeight: "600 ",
    },
    "& :nth-child(1)": {
      paddingLeft: 40,
    },
  },
  Profit: {
    background: "#E4FAFC",
    "& td": {
      color: "#2A7576 ",
    },
  },
  Loss: {
    background: "#FFEEF1",
    "& td": {
      color: "#F50057 ",
    },
  },
}));

export default styles;
