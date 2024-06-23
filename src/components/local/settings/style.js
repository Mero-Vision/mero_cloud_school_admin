import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  settingContainer: {
    "& .settingTitle": {
      fontSize: "20px !important",
    },

    "& .settingSideBar": {
      display: "flex",
      alignItems: "flex-start",
      gap: "150px",
    },

    "& .sidebarLinkContainer": {
      width: "200px",

      "& :hover": {
        backgroundColor: "#48484815",
        borderRadius: "5px",
        cursor: "pointer",
      },
      "& .sidebarLink": {
        fontSize: "14px",
        fontWeight: "500",
        padding: "5px 10px",
        color: "#48484880",
        margin: 0,
      },

      "& .active": {
        // backgroundColor: "#48484815",
        borderRadius: "5px",
        cursor: "pointer",
        color: "#000",
      },
    },
  },

  fiscalYearContainer: {
    border: "1px solid #43434320",
    padding: "15px",
    borderRadius: "4px",
    width: "100% !important",

    "& .fiscalYearTitle": {
      margin: 0,
      padding: 0,
      fontSize: "18px",
    },

    "& .fiscalYearSubTitle": {
      margin: 0,
      padding: 0,
      fontSize: "13px",
      color: "#00000080",
      marginTop: "2px",

      "& .year": {
        color: "#000",
      },
    },

    "& .fiscalYearAddButton": {
      backgroundColor: "#000000",
      color: "#fff",
    },

    "& .fiscalYearAddButton:hover": {
      backgroundColor: "#00000099",
    },
  },

  drawer: {
    paddingInline: "12px",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    columnGap: "7px",
    width: "100%",
    "& img": { height: "35px", width: "35px", objectFit: "contain" },
  },
  drawerContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    paddingBlock: "1rem",
  },
  nav: {
    "& > a": {
      color: theme.palette.text.main,
      textDecoration: "none",
    },
  },
  activeClass: {
    color: "#4559BD !important",
    "& > *": {
      background: "#E1F5FF !important",
    },
    "& .MuiTypography-root": {
      fontWeight: "600",
    },
    "& svg": {
      color: "#4559BD !important",
    },
  },
  activeChildClass: {
    color: "#000 !important",
    background: "#F9F9FB !important",
    borderRadius: "5px !important",
    fontWeight: "bolder !important",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "-8px",
      width: "9px",
      height: "1px",
      background: "#E5E5EB",
      zIndex: -1,
    },

    "& .MuiTypography-root": {
      fontWeight: "600",
    },
  },

  listItemButton: {
    justifyContent: "initial",
    paddingInline: "12px !important",
    paddingBlock: "8px !important",
    fontSize: "13px",
  },
  listItemButtonChild: {
    justifyContent: "initial",
    paddingInline: "6px !important",
    paddingBlock: "2px !important",
    display: "flex",
    columnGap: "1rem",
    borderRadius: "5px !important",
    fontSize: theme.typography.fontSize.small,
    "& svg": {
      fontSize: "small",
    },
  },

  childContainer: {
    width: "max-content",
    paddingTop: "12px",
    borderLeft: "1px solid #E5E5EB",
    marginInline: "20px",
    paddingInline: "8px",
  },
  iconButton: {
    borderRadius: "0 !important",
    "&:hover": {
      color: `${theme.palette.primary.main} !important`,
      background: `${theme.palette.primary.light} !important`,
    },
  },

  addAllContainer: {
    display: "flex",
    columnGap: "3rem",
    padding: "1rem",
    justifyContent: "center",

    "& button": {
      color: theme.palette.text.light,
      "&:hover": {
        "& svg": {
          transition: "200ms all ease-in-out",
          color: theme.palette.primary.main,
        },
      },
    },
  },
  title: {
    textTransform: "uppercase",
    marginBottom: "1rem",
    marginLeft: ".5rem",
  },
}));

export default styles;
