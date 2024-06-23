import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchSingleTodosApi,
  fetchTodosApi,
  postTodosApi,
} from "../../../../apis/exampleApi";
import {
  isFulfilledAction,
  isPendingAction,
  isRejectedAction,
} from "../../../../utils/buildMatchers";

const initialState = {
  todos: [],
  loading: false,
  error: "",
};

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const { data } = await fetchTodosApi();
  return data;
});
export const fetchSingleTodos = createAsyncThunk(
  "todos/fetchSingleTodos",
  async (DATA) => {
    const { data } = await fetchSingleTodosApi(DATA);
    return data;
  }
);
export const postTodos = createAsyncThunk("todos/postTodos", async () => {
  await postTodosApi(data);
  return data;
});

const exampleSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      //fetch
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(fetchSingleTodos.fulfilled, (state, action) => {
        state.single = action.payload;
      })

      //post
      .addCase(postTodos.fulfilled, (state) => {
        state.loading = false;
      })

      //matchers
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
      })
      .addMatcher(isFulfilledAction, (state) => {
        state.loading = false;
        state.error = "";
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });
  },
});

export default exampleSlice.reducer;
