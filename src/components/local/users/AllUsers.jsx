import { Cancel, CheckCircle, Group } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../../apis/usersApi";
import useTabs from "../../../hooks/useTabs";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../common/CustomLoader/CustomLoader";

const data = [
  {
    label: "Users",
    value: "Users",
    icon: <Group />,
  },
];

const AllUsers = () => {
  const navigate = useNavigate();
  const { search_keyword = "" } = useSelector((state) => state?.utils);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { value, Tabs } = useTabs({
    data,
  });

  const params = {
    page: paginationModel?.page + 1,
    limit: paginationModel?.pageSize,
    paginate: 1,
    search_keyword,
  };
  const {
    data: accountHead,
    isSuccess: isAccountSuccess,
    isFetching: isAccountFetching,
  } = useGetAllUsersQuery(params);

  const columns = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
    },

    {
      flex: 1,
      field: "primary_email",
      headerName: "Email",
      renderCell: (props) => (
        <Box>
          <Box>{props?.row?.email}</Box>
        </Box>
      ),
    },
    {
      flex: 1,
      field: "status",
      headerName: "Status",
    },
    {
      flex: 0.3,
      field: "verified",
      headerName: "Verified",
      renderCell: (props) => (
        <Box>
          {props?.row?.email_verified_at ? (
            <CheckCircle className="checkCircle" />
          ) : (
            <Cancel sx={{ color: "red" }} />
          )}
        </Box>
      ),
    },
  ];

  return (
    <div>
      {Tabs}
      {isAccountFetching && <CustomLoader />}

      {!isAccountFetching && isAccountSuccess && (
        <CustomDataGrid
          rows={accountHead?.data?.data || []}
          columns={columns}
          Tabs={Tabs}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          pageInfo={accountHead?.data?.meta}
        />
      )}
    </div>
  );
};

export default AllUsers;
