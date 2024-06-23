import { ArrowCircleLeftOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  useCreateFeedbackMutation,
  useGetFeedbacksQuery,
  useGetSingleBugQuery,
} from "../../../apis/bugfeedbackApi";
import Navbar from "../../../layouts/navbar";
import CustomButton from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInputs/CustomInput";
import CustomLoader from "../../common/CustomLoader/CustomLoader";
import UpdateBugStatus from "./UpdateBugStatus.jsx";
import styles from "./styles.js";

const SingleBugFeedback = ({ handleClose, singleBug }) => {
  const { data } = useGetSingleBugQuery(singleBug);

  return (
    <>
      <Box px={4.5}>
        <Navbar />
      </Box>
      <Divider />

      <Box
        sx={{
          // display: "flex",
          background: "#fff",
          minHeight: "calc(100vh - 70px)",
          width: "100%",
          padding: "15px 40px",
        }}
      >
        <Box
          sx={{
            background: "#fff",
          }}
        >
          <Button
            startIcon={<ArrowCircleLeftOutlined />}
            onClick={(event) => handleClose(singleBug, event)}
            sx={{
              color: "#4C4B63",
              "&:hover": {
                background: "none",
              },
              marginTop: "20px",
            }}
          >
            Back
          </Button>

          <Box style={{ display: "flex", width: "100%", gap: "50px" }}>
            <Box
              style={{
                marginTop: "10px",
              }}
            >
              <img
                src={singleBug?.screenshot}
                style={{
                  width: "800px",
                  maxHeight: "500px",
                  objectFit: "contain",
                }}
              />
            </Box>

            <Box style={{ width: "100%" }}>
              <Box>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {console.log({ "dATA-->": data?.data })}
                  <h4 style={{ margin: 0, padding: 0 }}>Description</h4>
                  <UpdateBugStatus
                    status={data?.data?.status}
                    row={data?.data}
                  />
                </Box>
                <em
                  style={{
                    fontSize: "12px",
                    margin: 0,
                    marginTop: "2px",
                    marginBottom: "15px",
                    fontWeight: "600",
                    color: "#484848",
                    display: "block",
                  }}
                >
                  Created By: {singleBug?.user?.name}
                </em>

                <p
                  style={{
                    fontSize: "12px",
                    margin: 0,

                    marginBottom: "35px",
                  }}
                >
                  {singleBug?.description}
                </p>
              </Box>
              <AddCommentForm data={data?.data} />
              <CommentsLists bugData={data?.data} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SingleBugFeedback;

const AddCommentForm = ({ data }) => {
  const [createFeedback, { isLoading, isError, data: isPostData, isSuccess }] =
    useCreateFeedbackMutation();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess]);

  const onSubmit = (value) => {
    dispatch(
      createFeedback({
        comment: value?.comment,
        bug_id: data?.id,
      })
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <CustomInput
            control={control}
            errors={errors}
            name="comment"
            placeholder={"Enter Comment"}
            title={"Comment"}
            rows={3}
          />
          <CustomButton
            buttonName={"Add Comment"}
            justifyContent={"start"}
            // fullWidth
            loading={isLoading}
            error={isError}
            success={isSuccess}
            successData={isPostData}
          />
        </Box>
      </form>
    </>
  );
};

const CommentsLists = ({ bugData }) => {
  const { data, isFetching } = useGetFeedbacksQuery({ bug_id: bugData?.id });

  return (
    <Box
      style={{
        marginTop: "20px",
        maxHeight: "500px",
        overflowY: "scroll",
      }}
    >
      {isFetching ? (
        <CustomLoader />
      ) : (
        data?.data?.map((feedback) => (
          <SingleComment key={feedback?.id} feedback={feedback} />
        ))
      )}
    </Box>
  );
};

const SingleComment = ({ feedback }) => {
  const classes = styles();
  return (
    <Box className={classes.comment}>
      <Box className={classes.commentTitle}>
        <Box className="picture">
          <Avatar sx={{ height: "25px", width: "25px" }} />
          <Typography className="name">{feedback?.user?.name}</Typography>
        </Box>
        <Box>
          {" "}
          <Typography className="time">
            {/* • {getDateDifference(moment.utc(feedback?.created_at))} */}
          </Typography>
        </Box>
      </Box>
      <Box style={{ marginTop: "3px" }}>
        <Typography className="comment">{feedback?.comment}</Typography>
      </Box>
    </Box>
  );
};
