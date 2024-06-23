import { Add, Mail } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetOwnerQuery,
  useUnassignOwnerMutation,
} from "../../../apis/ownerApi";
import useModal from "../../../hooks/useModal";
import useTabs from "../../../hooks/useTabs";
import CustomBackButton from "../../common/CustomButton/CustomBackButton";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../common/CustomLoader/CustomLoader";
import CustomDeleteModal from "../../common/CustomModal/CustomDeleteModal";
import CustomModal from "../../common/CustomModal/CustomModal";
import AddCompanyAdmin from "../company/AddCompanyAdmin";

const data = [
  {
    label: "Owner Invitation",
    value: "owner_invitation",
    icon: <Mail />,
  },
];
const Owners = () => {
  const { modals, handleOpen, handleClose, row } = useModal();
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
        onClick={() => handleOpen("add_owner")}
      >
        Add New
      </Button>
    ),
  });

  const { id } = useParams();

  console.log({ "paramsss===>": id });

  const columns = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
      renderCell: (props) => (
        <>
          <Typography>{props?.row?.user?.name ?? "-"}</Typography>
        </>
      ),
    },
    {
      flex: 1,
      field: "email",
      headerName: "Email",
      renderCell: (props) => (
        <>
          <Typography>{props?.row?.user?.email ?? "-"}</Typography>
        </>
      ),
    },

    {
      flex: 1,
      field: "created_at",
      headerName: "Created At",
    },

    {
      flex: 1,
      field: "expires_at",
      headerName: "Expires At",
    },

    {
      flex: 1,
      field: "unassign_owner",
      headerName: "",
      renderCell: (props) => (
        <>
          <Button
            color="error"
            variant="outlined"
            onClick={() => handleOpen("unassign_owner", props?.row)}
          >
            unassign owner
          </Button>
        </>
      ),
    },
  ];

  const params = {
    page: paginationModel?.page + 1,
    limit: paginationModel?.pageSize,
    paginate: 1,
  };
  const { data: ownersData, isFetching } = useGetOwnerQuery({
    company_id: id,
    ...params,
  });

  const [unassignOwner] = useUnassignOwnerMutation();

  return (
    <>
      <CustomBackButton />

      {Tabs}
      {isFetching ? (
        <CustomLoader />
      ) : (
        <>
          <CustomDataGrid
            rows={ownersData?.data?.data || []}
            columns={columns}
            tabsData={data}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            pageInfo={ownersData?.data?.meta}
          />

          {console.log({ modals })}

          <CustomModal
            open={modals?.add_owner}
            handleClose={() => handleClose("add_owner")}
            modalTitle={`Add Owner`}
            width={"400px"}
          >
            <AddCompanyAdmin
              row={{
                id,
              }}
              handleClose={() => handleClose("add_owner")}
            />{" "}
          </CustomModal>

          <CustomDeleteModal
            open={modals?.unassign_owner}
            message={"Do you want to unassign this owner?"}
            handleClose={() => handleClose("unassign_owner")}
            handleConfirm={() =>
              unassignOwner({
                company_id: Number(id),
                user_id: row?.id,
              })
            }
            buttonName={"Unassign"}
          />
        </>
      )}
    </>
  );
};

export default Owners;
