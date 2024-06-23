import { Box, Button, Typography } from "@mui/material";

const ResetLink = () => {
  return (
    <>
      <Box>
        <Typography>Do you want to reset the link?</Typography>

        <Box
          display={"flex"}
          gap={"5px"}
          marginTop={"50px"}
          justifyContent={"flex-end"}
        >
          <Button variant="outlined" color="error">
            Cancel
          </Button>
          <Button variant="contained" color="error">
            Reset
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ResetLink;
