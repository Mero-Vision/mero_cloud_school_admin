import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { useGetFiscalYearQuery } from "../../../apis/settingApi";
import useModal from "../../../hooks/useModal";
import { changeDateFormat } from "../../../utils/helpers";
import AllModals from "../../common/AllModals/AllModals";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";

const FiscalYearsTable = () => {
  const { data, isFetching, isSuccess } = useGetFiscalYearQuery();
  const { handleClose, handleOpen, modals, row } = useModal();

  const columns = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
    },
    {
      flex: 1,
      field: "from",
      headerName: "From(AD)",
      renderCell: (params) => (
        <>{changeDateFormat(params?.row?.from, "YYYY-MM-DD")}</>
      ),
    },
    {
      flex: 1,
      field: "to",
      headerName: "To (AD)",
      renderCell: (params) => (
        <>{changeDateFormat(params?.row?.to, "YYYY-MM-DD")}</>
      ),
    },

    {
      flex: 1,
      field: "from_bs",
      headerName: "From (BS)",
      sortable: false,
    },
    {
      flex: 1,
      field: "to_bs",
      headerName: "To (BS)",
      sortable: false,
    },

    {
      flex: 1,
      field: "status",
      headerName: "Status",
    },

    {
      flex: 1,
      field: "action",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => handleOpen("edit_fiscal_year", params?.row)}
          >
            <Edit />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <CustomDataGrid
        rows={data?.data || []}
        columns={columns}
        // Tabs={clientData}
        isLoading={isFetching}
        isSuccess={isSuccess}
      />

      <AllModals
        handleClose={() => handleClose("edit_fiscal_year")}
        modalType={"edit_fiscal_year"}
        modalTitle={"Edit Fiscal Year"}
        open={modals?.edit_fiscal_year}
        row={row}
      />
    </>
  );
};

export default FiscalYearsTable;
