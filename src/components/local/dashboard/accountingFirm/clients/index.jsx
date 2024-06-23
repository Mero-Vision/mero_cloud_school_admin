import { AdminPanelSettings, Delete, Edit, Key } from "@mui/icons-material";
import useModal from "../../../../../hooks/useModal";
import AllModals from "../../../../common/AllModals/AllModals";
import CustomDataGrid from "../../../../common/CustomDataGrid/CustomDataGrid";

const FirmClients = () => {
  const { modals, handleOpen, handleClose } = useModal();

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

    // {
    //   flex: 1,
    //   field: "manage",
    //   headerName: "Reset Link",
    //   renderCell: () => (
    //     <Button
    //       variant="outlined"
    //       color="error"
    //       onClick={() => handleOpen("reset_link")}
    //     >
    //       Reset Link
    //     </Button>
    //   ),
    // },

    // {
    //   flex: 1,
    //   field: "manage_permission",
    //   headerName: "Manage Permission",
    //   renderCell: () => (
    //     <Button
    //       variant="outlined"
    //       color="success"
    //       onClick={() => handleOpen("manage_permission")}
    //     >
    //       Manage Permissions
    //     </Button>
    //   ),
    // },

    // {
    //   flex: 1,
    //   field: "action",
    //   headerName: "Actions",
    //   renderCell: () => (
    //     <>
    //       {/* <CustomMoreOptionButton
    //         items={manageItems}
    //         optionalIcon={<Settings />}
    //         info={"Manage Client"}
    //         handleOpenModal={handleOpen}
    //       /> */}
    //       <CustomMoreOptionButton items={items} />
    //     </>
    //   ),
    // },
  ];

  return (
    <>
      <CustomDataGrid
        rows={clientData || []}
        columns={columns}
        // Tabs={clientData}
      />

      <AllModals
        modalType={"reset_link"}
        handleClose={() => handleClose("reset_link")}
        open={modals?.reset_link}
      />
      <AllModals
        modalType={"manage_permission"}
        handleClose={() => handleClose("manage_permission")}
        open={modals?.manage_permission}
      />
    </>
  );
};

export default FirmClients;

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

const manageItems = [
  {
    icon: <Key fontSize="small" />,
    text: "Change Password",
    modalType: "change_password",
  },
  {
    icon: <AdminPanelSettings fontSize="small" />,
    text: "Manage Permissions",
    modalType: "manage_permission",
  },
];

const clientData = [
  {
    id: "1",
    client_name: "Alphabet Software Solutions",
    email_address: "elon@tesla.com",
    contact_number: "+71-9874759647",
    address: "CA,USA",
    status: "ACTIVE",
  },

  {
    id: "2",
    client_name: "Infosoft IT Company",
    email_address: "garyvee@vee.com",
    contact_number: "+71-9874759647",
    address: "CA,USA",
    status: "Pending",
  },
];
