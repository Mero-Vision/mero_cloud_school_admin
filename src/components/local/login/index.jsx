import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
   authSuccess,
   useUserLoginMutation,
} from "../../../apis/authApi";
import CustomButton from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInputs/CustomInput";
import styles from "./styles";

const Login = () => {
   const classes = styles();
   return (
      <>
         <Box className={classes.container}>
            <Box className={classes.paper}>
               <LoginForm />
            </Box>
         </Box>
      </>
   );
};

export default Login;

const LoginForm = () => {
   const {
      control,
      formState: { errors },
      handleSubmit,
   } = useForm();

   const navigation = useNavigate();
   const [fullfilledData, setFullfiledData] = useState();
   // console.log({ navigation });
   const [userLogin, { isError, isLoading, isSuccess }] =
      useUserLoginMutation();
   const states = useSelector((state) => state.authApi);

   const dispatch = useDispatch();

   const onSubmit = async (values) => {
      const finalValues = {
         ...values,
      };

      userLogin(finalValues)
         ?.unwrap()
         .then((fulfilled) => {
            console.log({ fulfilled });
            const auth_token = fulfilled?.data?.token;
            const refresh_token = fulfilled?.data?.refresh_token;
            localStorage.setItem(
               "mero_cloud_super_admin_access_token",
               auth_token
            );
            localStorage.setItem(
               "mero_cloud_super_admin_refresh_token",
               refresh_token
            );
            dispatch(authSuccess(fulfilled?.data));
            setFullfiledData(fulfilled?.data);
            navigation("/");
         })
         .catch((rejected) => console.log({ rejected }));
   };

   useEffect(() => {
      localStorage?.getItem("mero_cloud_super_admin_access_token") &&
         navigation("/");
   }, [localStorage?.getItem("mero_cloud_super_admin_access_token")]);

   console.log({ isLoading, isError, isSuccess, states });
   return (
      <Box style={{ padding: "40px" }}>
         <h3 style={{ marginBottom: "40px" }}>Login</h3>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
               <Grid item sm={12}>
                  <CustomInput
                     control={control}
                     errors={errors}
                     name="email"
                     type={"email"}
                     title="Email"
                  />
               </Grid>

               <Grid item sm={12}>
                  <CustomInput
                     control={control}
                     errors={errors}
                     name="password"
                     type={"password"}
                     title="Password"
                  />
               </Grid>
            </Grid>
            <CustomButton loading={isLoading} />
         </form>
      </Box>
   );
};
