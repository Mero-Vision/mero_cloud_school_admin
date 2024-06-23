import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";

const AddClients = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({});
  const onSubmit = (values) => {
    console.log({ values });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CustomInput
              control={control}
              errors={errors}
              name="firm_name"
              title={"Client Name"}
              placeholder={"Tesla"}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              control={control}
              errors={errors}
              name="email"
              title={"Email Address"}
              placeholder={"elon@tesla.com"}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              control={control}
              errors={errors}
              name="contact_number"
              title={"Contact Number"}
              placeholder={"+141-9841442148"}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              control={control}
              errors={errors}
              name="address"
              title={"address"}
              placeholder={"CA USA"}
            />
          </Grid>

          {/* <Grid item xs={6}>
            <CustomInput
              control={control}
              errors={errors}
              name="swift_code"
              title={"Swift Code"}
              placeholder={"021371282"}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              control={control}
              errors={errors}
              name="address"
              title={"Address"}
              placeholder={"Durbarmarg"}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              control={control}
              errors={errors}
              name="price"
              title={"Price"}
              type="number"
              placeholder={"60,00,000"}
            />
          </Grid> */}
          {/* <Grid item xs={6}>
              <CustomFileUpload
                control={control}
                errors={errors}
                name="image"
                buttonName={"Upload Logo"}
              />
              <Box display={"flex"} flexWrap={"wrap"} mt={2}>
                {watch("image") &&
                  Object.values(watch("image"))?.map((item) => (
                    <Box key={item?.name}>
                      <img
                        style={{ height: "50px" }}
                        src={URL.createObjectURL(item)}
                      />
                    </Box>
                  ))}
              </Box>
            </Grid> */}
        </Grid>
        <CustomButton />
      </form>
    </div>
  );
};

export default AddClients;
