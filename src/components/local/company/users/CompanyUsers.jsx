import { Add, Delete, Edit, Person } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCompanyMutation,
  useGetCompanyUserQuery,
} from "../../../../../apis/companyApi";
import useModal from "../../../../../hooks/useModal";
import useQuery from "../../../../../hooks/useQuery";
import useTabs from "../../../../../hooks/useTabs";
import AllModals from "../../../../common/AllModals/AllModals";
import CustomDataGrid from "../../../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../../../common/CustomLoader/CustomLoader";
import CustomMoreOptionButton from "../../../../common/CustomMoreOptionButton/CustomMoreOptionButton";

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
const CompanyUsers = () => {
  const { query: id } = useQuery();
  const params = {
    id,
  };
  const {
    data: companyData,
    isFetching,
    isSuccess,
  } = useGetCompanyUserQuery(params, { skip: !id });
  const [deleteCompany, { isSuccess: isDeleteSuccess, isLoading }] =
    useDeleteCompanyMutation();

  const { handleClose, handleOpen, modals, row } = useModal();

  const handleDelete = (row) => {
    deleteCompany(row?.id);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      handleClose("delete_company");
    }
  }, [isDeleteSuccess]);

  const { value, Tabs } = useTabs({
    data,
    button: (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen("add_users")}
      >
        Add New
      </Button>
    ),
  });

  const columns = [
    {
      flex: 1,
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

    // {
    //   flex: 1,
    //   field: "firm_client",
    //   headerName: "Clients",
    //   renderCell: (params) => (
    //     <>
    //       <Button
    //         variant="outlined"
    //         onClick={() => handleOpen("view_firm_client", params?.row)}
    //       >
    //         View Clients
    //       </Button>
    //     </>
    //   ),
    // },

    // {
    //   flex: 1,
    //   field: "action",
    //   headerName: "",
    //   renderCell: (params) => (
    //     <>
    //       <IconButton onClick={() => handleOpen("edit_company", params?.row)}>
    //         <Edit />
    //       </IconButton>

    //       <IconButton onClick={() => handleDelete(params?.row)}>
    //         <Delete />
    //       </IconButton>
    //     </>
    //   ),
    // },

    {
      flex: 0.1,
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
          rows={companyData?.data || []}
          columns={columns}
          tabsData={data}
        />
      )}

      <AllModals
        modalType={"add_users"}
        handleClose={() => handleClose("add_users")}
        open={modals?.add_users}
      />
      <AllModals
        modalType={"edit_company"}
        handleClose={() => handleClose("edit_company")}
        open={modals?.edit_company}
        row={row}
      />
      <AllModals
        modalType={"delete_company"}
        handleClose={() => handleClose("delete_company")}
        open={modals?.delete_company}
        row={row}
        handleConfirm={() => handleDelete(row)}
        isLoading={isLoading}
      />
      <AllModals
        modalType={"view_firm_client"}
        handleClose={() => handleClose("view_firm_client")}
        open={modals?.view_firm_client}
        row={row}
      />
    </>
  );
};

export default CompanyUsers;
