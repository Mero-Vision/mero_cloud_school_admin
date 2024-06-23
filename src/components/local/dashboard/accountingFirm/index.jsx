// import { Add, Delete, Domain, Edit } from "@mui/icons-material";
// import { Button } from "@mui/material";
// import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   useDeleteAccountingFirmMutation,
//   useGetAccountingFirmQuery,
// } from "../../../../apis/accountingFirmApi";
// import useModal from "../../../../hooks/useModal";
// import useTabs from "../../../../hooks/useTabs";
// import { replaceFunction } from "../../../../utils/helpers";
// import AllModals from "../../../common/AllModals/AllModals";
// import CustomChip from "../../../common/CustomChip/CustomChip";
// import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";
// import CustomLoader from "../../../common/CustomLoader/CustomLoader";
// import CustomMoreOptionButton from "../../../common/CustomMoreOptionButton/CustomMoreOptionButton";

// const data = [
//   {
//     label: "Accounting Firms",
//     value: "FIRM",
//     icon: <Domain />,
//   },
// ];

// const items = [
//   {
//     icon: <Edit fontSize="small" />,
//     text: "Edit",
//     modalType: "edit_firm",
//   },
//   {
//     icon: <Delete fontSize="small" />,
//     text: "Delete",
//     modalType: "delete_firm",
//   },
// ];

// const UsersButton = ({ params }) => {
//   const navigate = useNavigate();
//   const url = `${replaceFunction(params?.row?.name)}/users?id=${
//     params?.row?.id
//   }`;
//   return (
//     <Button variant="outlined" color="info" onClick={() => navigate(url)}>
//       Users ({params?.row?.users_count || 0})
//     </Button>
//   );
// };
// const AccountingFirm = () => {
//   const { modals, handleOpen, handleClose, row } = useModal();
//   const {
//     data: accountingFirmData,
//     isLoading,
//     isSuccess,
//     isFetching,
//   } = useGetAccountingFirmQuery();

//   const [
//     deleteAccountingFirm,
//     { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess },
//   ] = useDeleteAccountingFirmMutation();

//   const handleDelete = () => {
//     deleteAccountingFirm(row);
//   };

//   useEffect(() => {
//     handleClose("delete_firm");
//   }, [isDeleteSuccess]);

//   const { Tabs } = useTabs({
//     data,
//     button: (
//       <Button
//         variant="contained"
//         startIcon={<Add />}
//         onClick={() => handleOpen("add_firm")}
//       >
//         Add Firm
//       </Button>
//     ),
//   });

//   const columns = [
//     {
//       flex: 2,
//       field: "name",
//       headerName: "Firm Name",
//       renderCell: (params) => (
//         <>
//           <Link
//             style={{
//               width: "100%",
//               cursor: "pointer",
//               textDecoration: "none",
//               color: "#000",
//             }}
//             to={`/accounting-firms/firm-details/${params?.row?.id}`}
//           >
//             <p
//               style={{
//                 padding: 0,
//                 margin: 0,
//                 fontWeight: "600",
//                 fontSize: "13px",
//               }}
//             >
//               {`${params?.row?.name} (${params?.row?.short_name})`}
//             </p>
//           </Link>
//           {/* <p
//             style={{
//               // padding: "5px 0px",
//               margin: 0,
//               color: "#484848",
//               fontSize: "11px",
//             }}
//           >
//             10 Clients
//           </p> */}
//         </>
//       ),
//     },
//     {
//       flex: 1.3,
//       // width: "350px",
//       field: "primary_email",
//       headerName: "Email Address",
//     },
//     {
//       flex: 1,
//       field: "vat_number",
//       headerName: "Vat Number",
//     },
//     {
//       flex: 1,
//       field: "primary_phone",
//       headerName: "Contact Number",
//     },
//     {
//       flex: 1,
//       field: "address",
//       headerName: "Address",
//     },

//     {
//       flex: 1.3,
//       field: "company",
//       headerName: "Company",
//       sortable: false,

//       renderCell: (params) => (
//         <Link
//           style={{
//             width: "100%",
//             cursor: "pointer",
//             textDecoration: "none",
//             color: "#000",
//           }}
//           to={`/accounting-firms/${params?.row?.id}/clients`}
//         >
//           <Button variant="outlined" color="info">
//             Companies ({params?.row?.companies_count || 0})
//           </Button>
//         </Link>
//       ),
//     },
//     {
//       flex: 1.3,
//       field: "users",
//       headerName: "Users",
//       sortable: false,
//       renderCell: (params) => <UsersButton params={params} />,
//     },

//     {
//       flex: 1,
//       field: "status",
//       headerName: "Status",
//       renderCell: (params) => (
//         <Button onClick={() => handleOpen("change_client_status")}>
//           <CustomChip params={params} />
//         </Button>
//       ),
//     },

//     {
//       flex: 1,
//       field: "action",
//       headerName: "Actions",
//       renderCell: (params) => (
//         <>
//           <CustomMoreOptionButton
//             items={items}
//             handleOpenModal={handleOpen}
//             row={params?.row}
//           />
//         </>
//       ),
//     },
//   ];

//   return (
//     <div>
//       {Tabs}
//       {isFetching && <CustomLoader />}
//       {!isFetching && isSuccess && (
//         <CustomDataGrid
//           rows={accountingFirmData?.data || []}
//           columns={columns}
//           isLoading={isFetching}
//           isSuccess={isSuccess}
//         />
//       )}

//       <AllModals
//         modalType={"add_firm"}
//         open={modals?.add_firm}
//         handleClose={() => handleClose("add_firm")}
//       />

//       <AllModals
//         modalType={"edit_firm"}
//         open={modals?.edit_firm}
//         handleClose={() => handleClose("edit_firm")}
//         row={row}
//       />

//       <AllModals
//         modalType={"change_client_status"}
//         open={modals?.change_client_status}
//         handleClose={() => handleClose("change_client_status")}
//       />
//       <AllModals
//         modalType={"delete_firm"}
//         open={modals?.delete_firm}
//         handleClose={() => handleClose("delete_firm")}
//         row={row}
//         handleDelete={handleDelete}
//         isLoading={isDeleteLoading}
//       />
//     </div>
//   );
// };

// export default AccountingFirm;

import {
  Add,
  ApartmentOutlined,
  CancelOutlined,
  CheckBoxOutlined,
  Delete,
  Edit,
} from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useDeleteAccountingFirmMutation,
  useGetAccountingFirmQuery,
} from "../../../../apis/accountingFirmApi";
import useModal from "../../../../hooks/useModal";
import useTabs from "../../../../hooks/useTabs";
import { replaceFunction } from "../../../../utils/helpers";
import AllModals from "../../../common/AllModals/AllModals";
import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import CustomDeleteModal from "../../../common/CustomModal/CustomDeleteModal";
import CustomModal from "../../../common/CustomModal/CustomModal";
import CustomMoreOptionButton from "../../../common/CustomMoreOptionButton/CustomMoreOptionButton";
import AddCompanyAdmin from "../../company/AddCompanyAdmin";
import CompanyStatus from "../../company/CompanyStatus";

const data = [
  {
    label: "All",
    value: "all",
    icon: <ApartmentOutlined />,
  },

  {
    label: "Active",
    value: "active",
    icon: <CheckBoxOutlined />,
  },
  {
    label: "Inactive",
    value: "inactive",
    icon: <CancelOutlined />,
  },
];

const items = (props) => [
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
  {
    icon: <Add fontSize="small" />,
    text: props?.row?.admin ? "Update Owner" : "Add Owner",
    modalType: "add_admin",
  },
];

function ActionComponent(props) {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [deleteItem, { isLoading, isSuccess, error, data: successData }] =
    useDeleteAccountingFirmMutation();
  const handleConfirm = () => {
    deleteItem(props?.row?.id);
  };
  const handleOpenModal = (modalType) => {
    setOpenModal(true);
    setModalType(modalType);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Box>
      <CustomMoreOptionButton
        items={items(props)}
        handleOpenModal={handleOpenModal}
      />

      <CustomModal
        open={openModal && modalType === "add_admin"}
        handleClose={() => handleCloseModal()}
        modalTitle={`Add Admin`}
        width={"400px"}
      >
        <AddCompanyAdmin
          row={props?.row}
          handleClose={() => handleCloseModal()}
          isFirm
        />{" "}
      </CustomModal>
      <AllModals
        modalType={"edit_firm"}
        handleClose={() => handleCloseModal()}
        open={openModal && modalType === "edit"}
        row={props?.row}
      />
      <CustomDeleteModal
        open={openModal && modalType === "delete"}
        handleClose={() => handleCloseModal()}
        isLoading={isLoading}
        handleConfirm={handleConfirm}
        success={isSuccess}
        error={error}
        successData={successData}
      />
    </Box>
  );
}

const RenderName = ({ props }) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        className="title"
        style={{ fontWeight: "600", cursor: "pointer" }}
        onClick={() => navigate(`firms?id=${props?.row?.id}`)}
      >
        {props?.row?.short_name || props?.row?.name}
      </Box>
    </>
  );
};
const AccountingFirm = () => {
  const { search_keyword = "" } = useSelector((state) => state?.utils);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();
  const { value, Tabs } = useTabs({
    data,
    button: (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen("add_firm")}
      >
        Add New
      </Button>
    ),
  });
  const params = {
    page: paginationModel?.page + 1,
    limit: paginationModel?.pageSize,
    paginate: 1,
    search_keyword_short_name: search_keyword,
    status: value === "all" ? "" : value,
  };
  const {
    data: companyData,
    isFetching,
    isSuccess,
  } = useGetAccountingFirmQuery(params, { skip: !value });

  const { handleClose, handleOpen, modals, row } = useModal();

  const columns = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
      renderCell: (props) => <RenderName props={props} />,
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
      field: "type",
      headerName: "Status",
      renderCell: (props) => (
        <CompanyStatus props={props} data={data?.slice(1)} isFirm />
      ),
      sortable: false,
      editable: false,
      disableColumnMenu: true,
    },

    {
      flex: 0.1,
      field: "action",
      headerName: "Actions",
      renderCell: ActionComponent,
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
          pageInfo={companyData?.data?.meta}
        />
      )}

      <AllModals
        modalType={"add_firm"}
        open={modals?.add_firm}
        handleClose={() => handleClose("add_firm")}
      />
    </>
  );
};

export default AccountingFirm;

const UsersButton = ({ params }) => {
  const navigate = useNavigate();
  const url = `${replaceFunction(params?.row?.name)}/users?id=${
    params?.row?.id
  }`;
  return (
    <Button variant="outlined" color="info" onClick={() => navigate(url)}>
      Users ({params?.row?.users_count || 0})
    </Button>
  );
};
