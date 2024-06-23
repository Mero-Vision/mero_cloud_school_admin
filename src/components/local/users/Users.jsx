import { Add, Delete, Edit, Person } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../../apis/usersApi";
import useModal from "../../../hooks/useModal";
import useTabs from "../../../hooks/useTabs";
import { replaceFunction } from "../../../utils/helpers";
import AllModals from "../../common/AllModals/AllModals";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../common/CustomLoader/CustomLoader";
import CustomMoreOptionButton from "../../common/CustomMoreOptionButton/CustomMoreOptionButton";

const data = [
  {
    label: "Users",
    value: "Users",
    icon: <Person />,
  },
];

const items = [
  {
    icon: <Edit fontSize="small" />,
    text: "Edit",
    modalType: "edit_company",
  },
  {
    icon: <Delete fontSize="small" />,
    text: "Delete",
    modalType: "delete_company",
  },
];

const RenderName = ({ props }) => {
  const navigate = useNavigate();
  const url = `users?id=${props?.row?.id}&name=${props?.row?.short_name}`;
  return (
    <Box
      style={{ fontWeight: "600", cursor: "pointer" }}
      onClick={() => navigate(url)}
    >
      {props?.row?.short_name || props?.row?.name}
    </Box>
  );
};

const ManagePermissions = ({ props }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="lightBlue"
      onClick={() =>
        navigate(
          `permissions/${replaceFunction(props?.row?.name)}?id=${
            props?.row?.id
          }`
        )
      }
    >
      Manage Permissions
    </Button>
  );
};
const Users = () => {
  const { company, search_keyword = "" } = useSelector((state) => state?.utils);
  const COMPANY = useMemo(() => company, [company]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { value, Tabs } = useTabs({
    data,
    button: (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen("add_admin_users")}
      >
        Add New
      </Button>
    ),
  });
  const params = {
    page: paginationModel?.page + 1,
    limit: paginationModel?.pageSize,
    paginate: 1,
    search_keyword,
    admin_panel_users: 1,
  };
  const {
    data: companyData,
    isFetching,
    isSuccess,
  } = useGetAllUsersQuery(params);

  const { handleClose, handleOpen, modals, row } = useModal();

  const columns = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
      renderCell: (props) => <RenderName props={props} />,
    },

    {
      flex: 1.5,
      field: "email",
      headerName: "Email",
      renderCell: (props) => (
        <Box style={{ fontWeight: "600" }}>
          <Box>{props?.row?.email}</Box>
        </Box>
      ),
    },
    {
      flex: 1,
      field: "permission",
      headerName: "",
      renderCell: (props) => <ManagePermissions props={props} />,
    },

    {
      flex: 0.5,
      field: "action",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <CustomMoreOptionButton
            items={items}
            handleOpenModal={handleOpen}
            row={params?.row}
          />
        </>
      ),
    },
  ];
  return (
    <>
      {Tabs}
      {isFetching && <CustomLoader />}

      {!isFetching && isSuccess && (
        <CustomDataGrid
          rows={companyData?.data?.data || []}
          columns={columns}
          tabsData={data}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          pageInfo={companyData?.meta}
        />
      )}

      <AllModals
        modalType={"add_admin_users"}
        handleClose={() => handleClose("add_admin_users")}
        open={modals?.add_admin_users}
      />
    </>
  );
};

export default Users;
