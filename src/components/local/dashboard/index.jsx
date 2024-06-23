import { Add, Delete, Edit, Person } from "@mui/icons-material";
import { Button } from "@mui/material";
import useModal from "../../../hooks/useModal";
import useTabs from "../../../hooks/useTabs";
import AllModals from "../../common/AllModals/AllModals";
import CustomChip from "../../common/CustomChip/CustomChip";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";
import CustomMoreOptionButton from "../../common/CustomMoreOptionButton/CustomMoreOptionButton";

const data = [
  {
    label: "Clients",
    value: "CLIENTS",
    icon: <Person />,
  },
];

const items = [
  {
    icon: <Edit fontSize="small" />,
    text: "Edit",
    modalType: "edit",
  },
  {
    icon: <Delete fontSize="small" />,
    text: "Delete",
    modalType: "delete",
  },
];

const clientData = [
  {
    id: "1",
    client_name: "Elon Musk",
    email_address: "elon@tesla.com",
    contact_number: "+71-9874759647",
    address: "CA,USA",
    status: "ACTIVE",
  },

  {
    id: "2",
    client_name: "Gary Vee",
    email_address: "garyvee@vee.com",
    contact_number: "+71-9874759647",
    address: "CA,USA",
    status: "Pending",
  },
];

const columns = [
  {
    flex: 1,
    field: "client_name",
    headerName: "Client Name",
  },
  {
    flex: 1,
    field: "email_address",
    headerName: "Email Address",
  },
  {
    flex: 1,
    field: "contact_number",
    headerName: "Contact Number",
  },
  {
    flex: 1,
    field: "address",
    headerName: "Address",
  },
  {
    flex: 1,
    field: "status",
    headerName: "Status",
    renderCell: (params) => <CustomChip params={params} />,
  },

  {
    flex: 1,
    field: "action",
    headerName: "Actions",
    renderCell: () => (
      <>
        <CustomMoreOptionButton items={items} />
      </>
    ),
  },
];

const Dashboard = () => {
  const { modals, handleOpen, handleClose } = useModal();

  const { Tabs } = useTabs({
    data,
    button: (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen("add_client")}
      >
        Add Client
      </Button>
    ),
  });

  return (
    <div>
      {Tabs}
      <CustomDataGrid
        rows={clientData || []}
        columns={columns}
        // Tabs={clientData}
      />

      <AllModals
        modalType={"add_client"}
        open={modals?.add_client}
        handleClose={() => handleClose("add_client")}
      />
    </div>
  );
};

export default Dashboard;
