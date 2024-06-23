import { Delete } from "@mui/icons-material";
import { Box, Button, Grid, IconButton } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetFiscalYearQuery } from "../../../../apis/settingApi";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import { CustomSearchSelect } from "../../../common/CustomSelects/CustomSearchSelect";

const AddFiscalYearTax = () => {
  const { data } = useGetFiscalYearQuery();
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fiscal_year_tax: [{}],
    },
  });

  const { append, fields, remove } = useFieldArray({
    name: "fiscal_year_tax",
    control,
  });

  const handleTaxAppend = () => {
    append({
      fiscal_year: "",
      tax_name: "",
      tax_amount: "",
    });
  };

  const fiscalYearsOption = data?.data?.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  console.log({ data, fiscalYearsOption });

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        style={{ marginBottom: "20px" }}
      >
        <Button variant="contained" onClick={handleTaxAppend}>
          Add Tax
        </Button>
      </Box>
      <form>
        {fields?.map((field, index) => (
          <Grid container spacing={3} key={field?.id} marginTop={"3px"}>
            <Grid item sm={3.5}>
              <CustomSearchSelect
                control={control}
                errors={errors}
                name={`fiscal_year_tax.${index}.fiscal_year`}
                data={fiscalYearsOption || []}
                title="Fiscal Year"
              />
            </Grid>
            <Grid item sm={3.5}>
              <CustomInput
                control={control}
                errors={errors}
                name={`fiscal_year_tax.${index}.tax_name`}
                data={[]}
                title="Tax Name"
              />
            </Grid>
            <Grid item sm={3.5}>
              <CustomInput
                control={control}
                errors={errors}
                name={`fiscal_year_tax.${index}.tax_amount`}
                data={[]}
                title="Tax Amount"
              />
            </Grid>

            <Grid item sm={1}>
              <IconButton
                style={{ marginTop: "25px" }}
                onClick={() => remove(index)}
              >
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </form>
    </>
  );
};

export default AddFiscalYearTax;
