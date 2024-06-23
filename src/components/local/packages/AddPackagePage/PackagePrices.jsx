import { Add, RemoveCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
const fieldData = {
  period: "",
  price: "",
};
import { useLocation } from "react-router-dom";

const PackagePrices = () => {
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useFormContext({});
  const { fields, prepend, remove } = useFieldArray({
    control,
    name: "period_prices",
  });
  return (
    <Box>
      <Button
        variant="blue"
        startIcon={<Add />}
        onClick={() => prepend(fieldData)}
      >
        Add Pricing
      </Button>
      <Box mt={2}>
        <TableContainer>
          <Table>
            {" "}
            <TableHead>
              <TableRow>
                <TableCell>No. of days</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Branch Pricing</TableCell>
                <TableCell width="100px" />
              </TableRow>
            </TableHead>
            <TableBody>
              {fields?.map((item, index) => (
                <SingleField
                  item={item}
                  index={index}
                  key={item?.id}
                  remove={remove}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default PackagePrices;

const SingleField = ({ item, index, remove }) => {
  const { pathname } = useLocation();
  const isViewOnly = pathname === "/packages/view";

  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useFormContext({});
  return (
    <TableRow>
      <TableCell>
        {" "}
        <CustomInput
          control={control}
          errors={errors}
          name={`period_prices.${index}.period`}
          placeholder={"No. of Days"}
          type="number"
        />
      </TableCell>
      <TableCell>
        {" "}
        <CustomInput
          control={control}
          errors={errors}
          name={`period_prices.${index}.price`}
          placeholder={"Price"}
          type="number"
        />
      </TableCell>

      <TableCell>
        {" "}
        <CustomInput
          control={control}
          errors={errors}
          name={`period_prices.${index}.branch_price`}
          placeholder={"Branch Price"}
          type="number"
        />
      </TableCell>
      <TableCell>
        {!isViewOnly && (
          <RemoveCircle
            onClick={() => remove(index)}
            sx={{ color: "#D24848", cursor: "pointer" }}
          />
        )}
      </TableCell>
    </TableRow>
  );
};
