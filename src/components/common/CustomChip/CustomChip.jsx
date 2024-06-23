import { Chip } from "@mui/material";

const CustomChip = ({ params }) => {
  return (
    <>
      <Chip
        variant="filled"
        size="small"
        label={String(params?.row?.status)?.toUpperCase()}
        // color={
        //   String(params?.row?.status)?.toLowerCase() === "pending"
        //     ? "warning"
        //     : "success"
        // }
        color="success"
        style={{
          height: "25px",
          borderRadius: "100px",
          width: "75px",
          fontSize: "11px",
          border: "none",
          textAlign: "left",
          color: "#fff",
        }}
      />
    </>
  );
};

export default CustomChip;
