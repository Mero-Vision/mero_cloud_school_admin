import { Box, Button } from "@mui/material";
import { useDeleteAccountingFirmMutation } from "../../../../../apis/accountingFirmApi";

const DeleteFirm = ({ handleClose, row }) => {
  console.log({ row });
  const [deleteAccountingFirm] = useDeleteAccountingFirmMutation();

  const handleDelete = () => {
    deleteAccountingFirm(row);
  };
  return (
    <>
      <Box>
        <p>Do you want to delete this record?</p>
        <Button onClick={() => handleDelete()}>Delete</Button>
      </Box>
    </>
  );
};

export default DeleteFirm;
