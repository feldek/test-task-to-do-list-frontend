import { createSelector } from "reselect";
import { RootState } from "../store";

const getTasksReducer = (state: RootState) => state.tasks;

export const tasksSelector = createSelector(getTasksReducer, (rootTasks) => rootTasks.orderTasks.slice(0, 3));
export const rootLoaderTasksSelector = createSelector(getTasksReducer, (rootTasks) => rootTasks.fetching);
export const orderByTasksSelector = createSelector(getTasksReducer, (rootTasks) => rootTasks.orderBy);
export const directionTasksSelector = createSelector(getTasksReducer, (rootTasks) => rootTasks.direction);
export const countTasksSelector = createSelector(getTasksReducer, (rootTasks) => rootTasks.countTasks);
export const offsetTasksSelector = createSelector(getTasksReducer, (rootTasks) => rootTasks.offset);
