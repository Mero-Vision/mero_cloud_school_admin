import { Cancel, CheckCircle } from "@mui/icons-material";
import { Box } from "@mui/material";
import CustomDataGrid from "../../../../common/CustomDataGrid/CustomDataGrid";

const RenderName = ({ props }) => {
  return <Box>{props?.row?.short_name || props?.row?.name}</Box>;
};
const FirmUsers = ({ data }) => {
  const columns = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
      renderCell: (props) => <RenderName props={props} />,
    },

    {
      flex: 1,
      field: "primary_email",
      headerName: "Email",
      renderCell: (props) => (
        <Box>
          <Box>{props?.row?.email}</Box>
        </Box>
      ),
    },
    {
      flex: 0.3,
      field: "verified",
      headerName: "Verified",
      renderCell: (props) => (
        <Box>
          {props?.row?.email_verified_at ? (
            <CheckCircle className="checkCircle" />
          ) : (
            <Cancel sx={{ color: "red" }} />
          )}
        </Box>
      ),
    },
  ];
  return (
    <>
      <CustomDataGrid
        rows={data?.users || []}
        columns={columns}
        paginationMode={"client"}
      />
    </>
  );
};

export default FirmUsers;
