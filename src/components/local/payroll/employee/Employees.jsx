import { Add, Delete, Edit } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useGetEmployeesQuery } from "../../../../apis/employeeApi";
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
    headerName: "Employee Name",
  },
  {
    flex: 1,
    field: "id",
    headerName: "Employee Id",
  },
  {
    flex: 1,
    field: "phone",
    headerName: "Contact Number",
    valueGetter: (params) => `${params.row?.employee_detail?.phone || "-"}`,
  },
  {
    flex: 1,
    field: "position",
    headerName: "Position",
  },
  {
    flex: 1,
    field: "team",
    headerName: "Team",
  },

  {
    flex: 1,
    field: "email",
    headerName: "Email Address",
    valueGetter: (params) => `${params.row?.employee_detail?.email || "-"}`,
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
    label: "Employees",
    value: "employees",
    icon: <PeopleIcon />,
  },
];

const Employees = () => {
  const {
    data: employees,
    isError: isEmployeeError,
    isLoading: isEmployeeLoading,
    isSuccess: isEmployeeSuccess,
  } = useGetEmployeesQuery();
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
      {isEmployeeLoading && <CustomLoader />}
      {isEmployeeSuccess && (
        <CustomDataGrid
          rows={employees?.data || []}
          columns={columns}
          tabsData={data}
        />
      )}

      <AllModals
        modalType={"employees"}
        open={modals?.add}
        handleClose={() => handleClose("add")}
        value={value}
      />
    </div>
  );
};

export default Employees;
