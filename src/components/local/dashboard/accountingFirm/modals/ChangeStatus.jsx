import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomButton from "../../../../common/CustomButton/CustomButton";
import { CustomSearchSelect } from "../../../../common/CustomSelects/CustomSearchSelect";

const ChangeStatus = () => {
  const {
    control,
    formState: { errors },
  } = useForm();
  return (
    <Box>
      <Typography mt={"10px"}>Do you want to change status?</Typography>
      <Box marginTop={"15px"}>
        <form>
          <CustomSearchSelect
            control={control}
            errors={errors}
            name="client_status"
            data={STATUS_OPTION}
          />

          <CustomButton />
        </form>
      </Box>
    </Box>
  );
};

export default ChangeStatus;

const STATUS_OPTION = [
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
];
