import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  detailContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  firmDetailContainer: {
    marginTop: "10px",
    width: "100%",
    // height: "300px",
    backgroundColor: "#fff",
    display: "flex",
    padding: "20px",
    borderRadius: "5pxs",
    boxShadow: "5px 5px 10px #f3f3f3",
    alignItems: "flex-start",
    gap: "40px",

    "& .firmTitle": {
      fontSize: "20px !important",
      padding: "0px",
      margin: "0px",
      color: "#484848",
      display: "flex",
      alignItems: "center",
      gap: "20px",

      "& .iconButton": {
        backgroundColor: "#48484810",
        height: "30px",
        width: "30px",

        "& .icon": {
          fontSize: "15px",
        },
      },
    },

    "& .titleContainer": {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
    },
    "& .avatar": {
      width: "180px",
      height: "180px",

      "& img": {
        objectFit: "cover",
      },
    },

    "& .infoContainer": {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginTop: "10px",
      margin: "0px",
    },
    "& .infoTitle": {
      fontSize: "13px",
      fontWeight: "normal",
      color: "#484848",
      margin: 0,
      padding: 0,
    },
    "& .titleDetail": {
      fontSize: "13px",
      fontWeight: "600",
      margin: 0,
      padding: 0,
      color: "#484848",
    },

    "& .detailCardFlexBox": {
      display: "flex",
      // justifyContent: "space-between",
      gap: "250px",

      "& .statFlexBox": {
        display: "flex",
        width: "50%",
        alignItems: "flex-start",
        justifyContent: "space-evenly",

        // gap: "40px",

        "& .statContainer": {
          borderRight: "1px dotted #43434350",
          padding: "0px 50px",
        },

        "& .statNumber": {
          margin: 0,
          padding: 0,
          fontSize: "35px",
          textAlign: "center",
        },

        "& .statTitle": {
          margin: 0,
          padding: 0,
          fontSize: "14px",
          fontWeight: "600",
          color: "#48484895",
          textAlign: "center",
        },
      },
    },
  },

  paymentTableContainer: {
    marginTop: "30px",
  },
}));

export default styles;
