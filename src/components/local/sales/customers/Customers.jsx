import { Add, Delete, Edit } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useGetCustomersQuery } from "../../../../apis/customersApi";
import useModal from "../../../../hooks/useModal";
import useTabs from "../../../../hooks/useTabs";
import AllModals from "../../../common/AllModals/AllModals";
import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import CustomModal from "../../../common/CustomModal/CustomModal";
import CustomMoreOptionButton from "../../../common/CustomMoreOptionButton/CustomMoreOptionButton";

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

function ActionComponent(props) {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const handleOpenModal = (modalType) => {
    setOpenModal(true);
    setModalType(modalType);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Box>
      <CustomMoreOptionButton items={items} handleOpenModal={handleOpenModal} />

      <CustomModal
        open={openModal && modalType === "edit"}
        handleClose={() => handleCloseModal()}
        modalTitle={`Edit`}
      >
        edit
        <pre>{JSON.stringify(props?.row, null, 2)}</pre>
      </CustomModal>
      <CustomModal
        open={openModal && modalType === "delete"}
        handleClose={() => handleCloseModal()}
        modalTitle={`DELETE`}
      >
        DELETE{" "}
      </CustomModal>
    </Box>
  );
}

const columns = [
  {
    flex: 1,
    field: "name",
    headerName: "Full Name",
  },
  {
    flex: 1,
    field: "group",
    headerName: "Group",
  },
  {
    flex: 1,
    field: "phone",
    headerName: "Contact Number",
    valueGetter: (params) => `${params.row?.customer_detail?.phone || "-"}`,
  },
  {
    flex: 1,
    field: "email",
    headerName: "Email Address",
    valueGetter: (params) => `${params.row?.customer_detail?.email || "-"}`,
  },

  {
    flex: 0.4,
    field: "action",
    headerName: "Action",
    sortable: false,
    editable: false,
    renderCell: ActionComponent,
    headerAlign: "center",
    align: "center",
    disableColumnMenu: true,
  },
];

const data = [
  {
    label: "Customers",
    value: "customers",
    icon: <PeopleIcon />,
  },
];

const Customers = () => {
  const {
    data: customers,
    isError: isCustomerError,
    isLoading: isCustomerLoading,
    isSuccess: isCustomerSuccess,
  } = useGetCustomersQuery();
  const { modals, handleOpen, handleClose } = useModal();
  const { value, Tabs } = useTabs({
    data,
    button: (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen("add")}
      >
        Add New
      </Button>
    ),
  });

  return (
    <div>
      {Tabs}
      {isCustomerLoading && <CustomLoader />}
      {isCustomerSuccess && (
        <CustomDataGrid
          rows={customers?.data || []}
          columns={columns}
          tabsData={data}
        />
      )}

      <AllModals
        modalType={"customers"}
        open={modals?.add}
        handleClose={() => handleClose("add")}
        value={value}
      />
    </div>
  );
};

export default Customers;
