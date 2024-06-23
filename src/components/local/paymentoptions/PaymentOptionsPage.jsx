import { Add, Delete, Edit } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useEffect } from "react";
import {
  useDeletePaymentOptionsMutation,
  useGetPaymentOptionsQuery,
} from "../../../apis/paymentOptionsApi";
import useModal from "../../../hooks/useModal";
import useTabs from "../../../hooks/useTabs";
import AllModals from "../../common/AllModals/AllModals";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../common/CustomLoader/CustomLoader";
import CustomDeleteModal from "../../common/CustomModal/CustomDeleteModal";
import CustomMoreOptionButton from "../../common/CustomMoreOptionButton/CustomMoreOptionButton";
import CompanyStatus from "../company/CompanyStatus";

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

const PaymentOptionsPage = () => {
  const { modals, row, handleOpen, handleClose } = useModal();
  const { data: paymentOptionsData, isLoading } = useGetPaymentOptionsQuery();
  const [deletePaymentOptions, { isLoading: isDeletePayment, isSuccess }] =
    useDeletePaymentOptionsMutation();

  const statusData = paymentOptionsData?.data?.data?.map(
    (item) => item?.status
  );

  console.log({ statusData });

  const { Tabs } = useTabs({
    data: [
      {
        label: "Payment Options",
        value: "payment_options",
      },
    ],
    button: (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen("add-payment-options")}
      >
        Add payment option
      </Button>
    ),

    hideSearch: true,
  });

  const columns = [
    { flex: 2, field: "payment_name", headerName: "Payment Option Name" },
    {
      flex: 0.5,
      field: "status",
      headerName: "Status",
      renderCell: (props) => (
        <CompanyStatus
          props={props}
          isPayment={true}
          data={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
        />
      ),
    },

    {
      flex: 0.2,
      field: "action",
      headerName: "",
      renderCell: (props) =>
        !props?.row?.is_cash && (
          <CustomMoreOptionButton
            items={items}
            handleOpenModal={handleOpen}
            row={props?.row}
          />
        ),
    },
  ];

  const handleDelete = () => {
    deletePaymentOptions({ id: row?.id });
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose("delete");
    }
  }, [isSuccess]);
  return (
    <div>
      {Tabs}
      {isLoading ? (
        <CustomLoader />
      ) : (
        <CustomDataGrid
          rows={paymentOptionsData?.data?.data || []}
          columns={columns}
          Tabs={Tabs}
        />
      )}

      <AllModals
        modalTitle={"add-payment-options"}
        open={modals?.["add-payment-options"] || modals?.edit}
        modalType={"add-payment-options"}
        handleClose={() =>
          handleClose(modals?.edit ? "edit" : "add-payment-options")
        }
        row={row}
      />

      <CustomDeleteModal
        open={modals?.delete}
        handleClose={() => handleClose("delete")}
        handleConfirm={handleDelete}
        isLoading={isDeletePayment}
      />
    </div>
  );
};

export default PaymentOptionsPage;
