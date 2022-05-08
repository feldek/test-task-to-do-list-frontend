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

export const createTask = createAsyncThunk("task/createTask", async (params: ICreateTaskApi) => {
  await api.createTask(params);
});

export const removeTask = createAsyncThunk("task/removeTask", async ({ id }: { id: string }) => {
  await api.removeTask({ id });
});

export const updateDescription = createAsyncThunk(
  "task/updateDescription",
  async ({ id, description }: { id: string; description: string }) => {
    await api.updateTask({ id, description, edited: true });
  }
);
export const updateStatus = createAsyncThunk(
  "task/updateStatus",
  async ({ id, status }: { id: string; status: string }) => {
    await api.updateTask({ id, status });
  }
);

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
    runEditMode: (state, action: PayloadAction<{ id: string }>) => {
      state.orderTasks = state.orderTasks.map((task) =>
        task.id === action.payload.id ? { ...task, editMode: true } : task
      );
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

    //createTask use positive rendering
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

    builder.addCase(removeTask.pending, (state, action) => {
      const id = action.meta.arg.id;
      state.orderTasks = state.orderTasks.map((task) => (task.id === id ? { ...task, fetching: true } : task));
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      const id = action.meta.arg.id;
      state.orderTasks = state.orderTasks.filter((task) => task.id !== id);
      toast.info("Task successfully removed");
    });
    builder.addCase(removeTask.rejected, (state, action) => {
      const id = action.meta.arg.id;
      state.orderTasks = state.orderTasks.map((task) => (task.id === id ? { ...task, fetching: false } : task));
      toast.info("Error removed task");
    });

    builder.addCase(updateStatus.pending, (state, action) => {
      const id = action.meta.arg.id;
      state.orderTasks = state.orderTasks.map((task) => (task.id === id ? { ...task, fetching: true } : task));
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {
      const id = action.meta.arg.id;
      const status = action.meta.arg.status;
      state.orderTasks = state.orderTasks.map((task) =>
        task.id === id ? { ...task, status, fetching: false, editMode: false } : task
      );
    });
    builder.addCase(updateStatus.rejected, (state, action) => {
      const id = action.meta.arg.id;
      state.orderTasks = state.orderTasks.map((task) =>
        task.id === id ? { ...task, fetching: false, editMode: false } : task
      );
    });

    builder.addCase(updateDescription.pending, (state, action) => {
      const id = action.meta.arg.id;
      state.orderTasks = state.orderTasks.map((task) => (task.id === id ? { ...task, fetching: true } : task));
    });
    builder.addCase(updateDescription.fulfilled, (state, action) => {
      const id = action.meta.arg.id;
      const description = action.meta.arg.description;
      state.orderTasks = state.orderTasks.map((task) =>
        task.id === id ? { ...task, description, fetching: false, editMode: false, edited: true } : task
      );
    });
    builder.addCase(updateDescription.rejected, (state, action) => {
      const id = action.meta.arg.id;
      state.orderTasks = state.orderTasks.map((task) =>
        task.id === id ? { ...task, fetching: false, editMode: false } : task
      );
    });
  },
});
export const { setSortBy, setDirection, setOffset, runEditMode } = taskSlice.actions;
export default taskSlice.reducer;
