import React from "react";
import {
  useGetSingleTodosQuery,
  useGetTodosQuery,
  usePostTodosMutation,
} from "../../../../apis/rtkQueryApi";

const RtkQuery = () => {
  //Duplicate requests never run with rtk query
  [5, 3, 4, 2, 5, 2, 4, 1, 3, 5]?.map((item) =>
    useGetSingleTodosQuery({ id: item })
  );
  const { data, isLoading, isFetching, isError } = useGetTodosQuery();
  const [addTodo, { isLoading: postLoading }] = usePostTodosMutation();

  (isLoading || isFetching) && <h1>Loading........</h1>;
  isError && <h1>ERROR........</h1>;

  return (
    <div>
      <h1>
        Duplicate requests never run with rtk query and the data is cached
        (CHECK NETWORK)
      </h1>

      <button
        disabled={postLoading}
        onClick={() => addTodo({ new: "OKAY", yes: "253167357165" })}
      >
        Add todo
      </button>

      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default RtkQuery;
