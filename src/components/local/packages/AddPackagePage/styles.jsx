import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "3px",
    padding: 0,
  },
  container: {
    padding: "10px 22px",
    display: "flex",
    flexDirection: "column",
    rowGap: "16px",
    "& .mainTitle": {
      color: "#496AD0",
      fontSize: "14px",
      fontWeight: "500",
    },
  },
  singleDiv: {
    display: "flex",
    flexDirection: "column",
  },
  spaceBetween: {
    display: "flex",
    justifyContent: "space-between",
  },
  title: {
    color: "#496AD0",
    fontSize: "13px",
    fontWeight: "500 !important",
    textTransform: "uppercase",
  },
  value: { color: "#383751", fontSize: "12px", fontWeight: "400 !important" },
  switch: {
    fontSize: "13px",
    "& .MuiTypography-root": {
      fontWeight: "500",
    },
  },
  switchActive: {
    color: "#496AD0",
  },
  tableRoot: {
    borderCollapse: "separate",
    borderSpacing: 0,
    "& th": {
      fontWeight: "600",
      textTransform: "uppercase",
    },
    "& .paddingClass": {
      "& tr": {
        "& :nth-child(1)": {
          paddingLeft: 35,
        },
      },
    },
  },
  tableHead: {
    position: "sticky",
    top: 0,
    background: "#fff !important",
    zIndex: "10",

    "& .MuiTableCell-root": {
      border: "none",
    },
    "& th": {
      border: "1px solid #E5E5EB !important",
      borderBlockColor: "#9D9CAF",
    },
  },
  tableBody: {
    "& td": {
      fontWeight: "500",
    },
  },
  summary: {
    display: "flex",
    justifyContent: "center",
  },
  assetSummary: {
    width: "900px",
    background: "#fff",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    rowGap: "1rem",
  },
  header: {
    textAlign: "center",
    "& .title": { color: "#4C7CE5", fontSize: "14px", fontWeight: 600 },
    "& .subtitle": {
      color: "#4C4B63",
      fontSize: "14px",
      fontWeight: 500,
      textDecoration: "underline",
    },
  },
  asset: {
    "& .title": { color: "#201F37", fontSize: "14px", fontWeight: 600 },
    "& .caption": {
      color: "#4C4B63",
      fontSize: "13px",
    },
  },
}));

export default styles;
