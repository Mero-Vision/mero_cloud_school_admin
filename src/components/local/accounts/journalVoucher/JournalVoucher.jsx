import { Add, Delete, Edit } from "@mui/icons-material";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useGetJournalVoucherQuery } from "../../../../apis/journalVoucherApi";
import useModal from "../../../../hooks/useModal";
import useTabs from "../../../../hooks/useTabs";
import { changeDateFormat } from "../../../../utils/helpers";
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
  { flex: 1, field: "code", headerName: "Account Code" },
  {
    flex: 1,
    field: "name",
    headerName: "Name",
  },
  {
    flex: 1,
    field: "account_type",
    headerName: "Account Type",
  },
  {
    flex: 1,
    field: "parent_group",
    headerName: "Parent Group",
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

const rows = [...Array(14)]?.map((item, index) => {
  return {
    id: index + 1,
    account_code: `00000${index + 1}`,
    name: "Jon",
    account_type: "Expenses",
    parent_group: "Salary Expenses",
  };
});

const data = [
  {
    label: "Approved",
    value: "approved",
    icon: <CheckBoxOutlinedIcon />,
  },
  {
    label: "Draft",
    value: "draft",
    icon: <EditNoteOutlinedIcon />,
  },
];

const RenderDate = ({ props }) => {
  return <Box>{changeDateFormat(props?.row?.date)}</Box>;
};

const JournalVoucher = () => {
  const {
    data: journals,
    isError: isJournalError,
    isLoading: isJournalLoading,
    isSuccess: isJournalSuccess,
  } = useGetJournalVoucherQuery();

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

  const columns = [
    {
      flex: 1,
      field: "date",
      headerName: "Date",
      renderCell: (props) => <RenderDate props={props} />,
    },
    {
      flex: 1,
      field: "id",
      headerName: "Entry No",
    },
    {
      flex: 1,
      field: "amount",
      headerName: "Amount",
    },
    {
      flex: 1,
      field: "reference",
      headerName: "Reference",
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

  return (
    <div>
      {Tabs}
      {isJournalLoading && <CustomLoader />}
      {isJournalSuccess && (
        <CustomDataGrid
          rows={journals?.data || []}
          columns={columns}
          tabsData={data}
        />
      )}

      <AllModals
        modalType={"journal-voucher"}
        open={modals?.add}
        handleClose={() => handleClose("add")}
        value={value}
      />
    </div>
  );
};

export default JournalVoucher;
