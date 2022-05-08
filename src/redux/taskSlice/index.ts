import { RootState } from "../store";
import { ICreateTaskApi, ITask, orderDirection, tasksOrderBy } from "../../interfaces/index";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api";
import { toast } from "react-toastify";

const initialState: {
  fetching: boolean;
  orderTasks: ITask[];
  orderBy: tasksOrderBy;
  direction: orderDirection;
  countTasks: number | null;
  offset: number;
  loadMore: boolean;
} = {
  fetching: false,
  orderTasks: [],
  orderBy: tasksOrderBy.userName,
  direction: orderDirection.asc,
  countTasks: null,
  offset: 0,
  loadMore: true,
};

export const getTasks = createAsyncThunk("task/getTasks", async (_, { getState }) => {
  const orderBy = (getState() as RootState).tasks.orderBy;
  const direction = (getState() as RootState).tasks.direction;
  const offset = (getState() as RootState).tasks.offset;

  const orderTasks = await api.getTask({ orderBy, direction, offset });
  return orderTasks;
});

export const createTask = createAsyncThunk("task/createTasks", async (params: ICreateTaskApi) => {
  await api.createTask(params);
});

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setSortBy: (state, action: PayloadAction<tasksOrderBy>) => {
      state.orderBy = action.payload;
    },
    setDirection: (state, action: PayloadAction<orderDirection>) => {
      state.direction = action.payload;
    },
    setOffset: (state, action: PayloadAction<number>) => {
      state.offset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTasks.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.orderTasks = action.payload.tasks.map((task) => ({ ...task, editMode: false, fetching: false }));
      state.countTasks = action.payload.countTasks;
      state.fetching = false;
    });
    builder.addCase(getTasks.rejected, (state) => {
      state.fetching = false;
    });

    builder.addCase(createTask.pending, (state, action) => {
      state.orderTasks = [{ ...action.meta.arg, editMode: false, fetching: true }, ...state.orderTasks];
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      const id = action.meta.arg.id;
      const orderTasks = state.orderTasks.map((task) => (task.id === id ? { ...task, fetching: false } : task));
      state.orderTasks = orderTasks;
      state.countTasks = state.countTasks !== null ? state.countTasks + 1 : 1;
      toast.info("Task successfully created");
    });
    builder.addCase(createTask.rejected, (state, action) => {
      const id = action.meta.arg.id;
      state.orderTasks = state.orderTasks.filter((task) => task.id !== id);
      toast.error("Error created task");
    });
  },
});
export const { setSortBy, setDirection, setOffset } = taskSlice.actions;
export default taskSlice.reducer;