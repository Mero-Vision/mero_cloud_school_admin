import React from "react";
import { useGetPermissionsQuery } from "../../../apis/permissionsApi";
import { changeDateFormat } from "../../../utils/helpers";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../common/CustomLoader/CustomLoader";

const PermissionTable = () => {
  const { data: permissions, isFetching: isPermissionFetching } =
    useGetPermissionsQuery({});

  console.log({ permissionsTable: permissions });

  const columns = [
    {
      flex: 1.5,
      field: "name",
      headerName: "Name",
    },

    {
      flex: 1,
      field: "created_at",
      headerName: "Created At",
      renderCell: (props) => <>{changeDateFormat(props?.row?.created_at)}</>,
    },

    {
      flex: 1,
      field: "updated_at",
      headerName: "Updated At",
      renderCell: (props) => <>{changeDateFormat(props?.row?.updated_at)}</>,
    },
  ];

  return (
    <>
      {isPermissionFetching ? (
        <CustomLoader />
      ) : (
        <CustomDataGrid
          rows={permissions?.data?.data || []}
          columns={columns}
        />
      )}
    </>
  );
};

export default PermissionTable;
