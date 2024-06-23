import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleTodos, fetchTodos } from "./exampleSlice";

const Example = () => {
  const dispatch = useDispatch();
  const { todos, loading } = useSelector((state) => state?.example);

  useEffect(() => {
    dispatch(fetchTodos());

    //Duplicate requests are fired with rtk
    [5, 3, 4, 2, 5, 2, 4, 1, 3, 5]?.map((item) =>
      dispatch(fetchSingleTodos({ id: item }))
    );
  }, []);

  loading && <h1>Loading........</h1>;
  return (
    <div>
      <h1>Duplicate requests are fired with rtk (CHECK NETWORK)</h1>
      {todos?.map((item) => {
        return <Box key={item?.id}>{item?.title}</Box>;
      })}
    </div>
  );
};

export default Example;
