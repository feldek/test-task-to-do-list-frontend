import { createSelector } from "reselect";
import { RootState } from "../store";

const getUserReducer = (state: RootState) => state.user;

export const authSelector = createSelector(getUserReducer, (rootUser) => rootUser.authenticated);
export const errorSelector = createSelector(getUserReducer, (rootUser) => rootUser.error);
