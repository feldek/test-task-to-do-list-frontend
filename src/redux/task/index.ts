import { ICreateTaskApi, IGetTaskParams, ITask } from "../../interfaces/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";
import { toast } from "react-toastify";

const initialState: {
  fetching: boolean;
  tasks: { [key: string]: ITask };
} = { fetching: false, tasks: {} };

export const getTasks = createAsyncThunk("task/getTasks", async (params: IGetTaskParams) => {
  const result = await api.getTask(params);
  const toObjById: { [key: number]: ITask } = result.reduce(
    (obj, task) => ({ ...obj, [task.id]: { ...task, editMode: false, fetching: false } }),
    {}
  );
  return toObjById;
});

export const createTask = createAsyncThunk("task/createTasks", async (params: ICreateTaskApi) => {
  await api.createTask(params);
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = { ...state.tasks, ...action.payload };
      state.fetching = false;
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.fetching = false;
    });

    builder.addCase(createTask.pending, (state, action) => {
      const id = action.meta.arg.id;
      state.tasks[id] = { ...action.meta.arg, editMode: false, fetching: true };
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      const id = action.meta.arg.id;
      state.tasks[id].fetching = false;
      toast.info("Task successfully created");
    });
    builder.addCase(createTask.rejected, (state, action) => {
      const id = action.meta.arg.id;
      delete state.tasks[id];
      toast.error("Error created task");
    });
  },
});

export default taskSlice.reducer;
