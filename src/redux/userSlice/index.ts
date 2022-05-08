import { ILogIn } from "../../interfaces/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api";

const initialState: {
  authenticated: boolean;
  error?: string;
  fetching: boolean;
} = {
  authenticated: false,
  fetching: false,
};

export const logIn = createAsyncThunk("user/logIn", async ({ login, password }: ILogIn) => {
  const result = await api.logIn({ login, password });
  if (result) {
    localStorage.setItem("token", result.token);
  }
  return result;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.authenticated = false;
      localStorage.removeItem("token");
    },
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(logIn.fulfilled, (state) => {
      state.authenticated = true;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.error = action.error?.message;
    });
  },
});

export const { logOut, resetError } = userSlice.actions;
export default userSlice.reducer;
