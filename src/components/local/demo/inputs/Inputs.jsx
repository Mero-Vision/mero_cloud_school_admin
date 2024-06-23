import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  GROUP_DATA,
  MOVIES,
  SELECT_DATA,
} from "../../../../constants/constants";
import useModal from "../../../../hooks/useModal";
import CustomFileUpload from "../../../common/CustomFileUpload/CustomFileUpload";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import CustomModal from "../../../common/CustomModal/CustomModal";
import CustomCreatableSelect from "../../../common/CustomSelects/CustomCreatableSelect";
import { CustomGroupSelect } from "../../../common/CustomSelects/CustomGroupSelect";
import { CustomMultipleSelect } from "../../../common/CustomSelects/CustomMultipleSelect";
import { CustomSearchSelect } from "../../../common/CustomSelects/CustomSearchSelect";
import { CustomSelect } from "../../../common/CustomSelects/CustomSelect";

const Inputs = () => {
  const { modals, handleOpen, handleClose } = useModal();

  const [moviesData, setMoviesData] = useState(MOVIES);

  const defaultValues = {
    select: SELECT_DATA?.[2]?.value,
    searchSelect: SELECT_DATA?.[5]?.value,
    multipleSelect: SELECT_DATA?.slice(0, 3)?.map((item) => item?.value),
    creatableSelect: moviesData?.[3],
    groupSelect: GROUP_DATA?.[0]?.options?.[1]?.value,
  };

  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues,
  });

  console.log({
    watch: watch(),
    type: watch("file") && Object.values(watch("file")),
  });

  const handleAdd = () => {
    // setMoviesData((prev) => [...prev, watch()?.creatable]);
    setValue("creatableSelect", watch()?.creatable);
    setValue("creatable", { title: "", year: "" });
  };

  return (
    <>
      {" "}
      <Box
        display={"flex"}
        flexDirection={"column"}
        rowGap={"2rem"}
        px="10rem"
        py="2rem"
      >
        <Box>
          <Typography>MODAL</Typography>
          <Button
            sx={{ width: "max-content" }}
            variant="purple"
            onClick={() => handleOpen("modal")}
          >
            Open Modal
          </Button>
        </Box>
        {
          //TextField
        }
        <CustomInput
          control={control}
          errors={errors}
          name="textfield"
          title={"textfield"}
        />
        {
          //TextArea
        }
        <CustomInput
          control={control}
          errors={errors}
          name="textarea"
          title={"textarea"}
          rows={5}
        />
        {
          // Select
        }
        <CustomSelect
          control={control}
          errors={errors}
          name="select"
          title={"Select"}
          data={SELECT_DATA}
        />

        {
          //Group Select
        }
        <CustomGroupSelect
          control={control}
          errors={errors}
          name="group_select"
          title={"Group Select"}
          data={GROUP_DATA}
        />
        {
          //Search Select
        }
        <CustomSearchSelect
          control={control}
          errors={errors}
          name="searchSelect"
          title={"Search Select"}
          data={SELECT_DATA}
        />
        {
          //Multiple Select
        }
        <CustomMultipleSelect
          control={control}
          errors={errors}
          name="multipleSelect"
          title={"Multiple Select"}
          data={SELECT_DATA}
        />
        {
          //Creatable Select
        }
        <CustomCreatableSelect
          control={control}
          errors={errors}
          name="creatableSelect"
          title={"Creatable Select"}
          data={moviesData}
          handleAdd={handleAdd}
          modal={
            <CreatableModal
              control={control}
              errors={errors}
              handleAdd={handleAdd}
            />
          }
        />

        {
          //Single Upload
        }
        <CustomFileUpload
          control={control}
          errors={errors}
          name="single_file"
          buttonName={"Single Upload"}
        />
        <Box display={"flex"} flexWrap={"wrap"}>
          {watch("single_file") &&
            Object.values(watch("single_file"))?.map((item) => (
              <Box key={item?.name}>
                <img
                  style={{ height: "50px" }}
                  src={URL.createObjectURL(item)}
                />
              </Box>
            ))}
        </Box>
        <CustomFileUpload
          control={control}
          errors={errors}
          name="multiple_files"
          buttonName={"Multiple Upload"}
          isMultiple
        />

        <Box display={"flex"} flexWrap={"wrap"}>
          {watch("multiple_files") &&
            Object.values(watch("multiple_files"))?.map((item) => (
              <Box key={item?.name}>
                <img
                  style={{ height: "50px" }}
                  src={URL.createObjectURL(item)}
                />
              </Box>
            ))}
        </Box>
      </Box>
      <CustomModal
        open={modals?.modal}
        handleClose={() => handleClose("modal")}
        modalTitle={`Open Modal`}
      >
        <Typography>The values of the form:</Typography>
        <pre>{JSON.stringify(watch(), null, 4)}</pre>
      </CustomModal>
    </>
  );
};

const CreatableModal = ({ control, errors, handleAdd }) => {
  return (
    <>
      <CustomInput
        control={control}
        errors={errors}
        name="creatable.title"
        title={"Title"}
      />

      <CustomInput
        control={control}
        errors={errors}
        name="creatable.year"
        title={"year"}
        type={"number"}
      />
    </>
  );
};

export default Inputs;
