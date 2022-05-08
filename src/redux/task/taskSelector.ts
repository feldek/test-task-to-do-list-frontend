import { createSelector } from "reselect";
import { RootState } from "../store";

const getTasksReducer = (state: RootState) => state.tasks;

export const tasksSelector = createSelector(getTasksReducer, (rootTasks) => rootTasks.tasks);
export const rootLoaderTasksSelector = createSelector(getTasksReducer, (rootTasks) => rootTasks.fetching);
