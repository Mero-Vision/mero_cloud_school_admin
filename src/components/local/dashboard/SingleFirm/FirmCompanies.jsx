import { Box } from "@mui/material";
import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";
import CompanyStatus from "../../company/CompanyStatus";
const data = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Inactive",
    value: "inactive",
  },
];

const RenderName = ({ props }) => {
  return (
    <>
      <Box className="title">{props?.row?.short_name || props?.row?.name}</Box>
    </>
  );
};
const FirmCompanies = ({ data: firmData }) => {
  const columns = [
    {
      flex: 1.5,
      field: "name",
      headerName: "Name",
      renderCell: (props) => <RenderName props={props} />,
    },

    {
      flex: 1,
      field: "start_date",
      headerName: "Start Date",
    },
    {
      flex: 1,
      field: "address",
      headerName: "Address",
    },
    {
      flex: 1.5,
      field: "primary_email",
      headerName: "Email/Phone",
      renderCell: (props) => (
        <Box>
          <Box>{props?.row?.primary_email}</Box>
          <Box>{props?.row?.primary_phone}</Box>
        </Box>
      ),
    },
    {
      flex: 1,
      field: "vat_number",
      headerName: "VAT/PAN No.",
    },
    {
      flex: 1,
      field: "status",
      headerName: "Status",
      renderCell: (props) => (
        <CompanyStatus props={props} data={data} disabled />
      ),
      sortable: false,
      editable: false,
      disableColumnMenu: true,
    },
  ];
  return (
    <>
      <CustomDataGrid
        rows={firmData?.companies || []}
        columns={columns}
        paginationMode={"client"}
      />
    </>
  );
};

export default FirmCompanies;
