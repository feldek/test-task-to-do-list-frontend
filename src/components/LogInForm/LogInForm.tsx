import React, { useState } from "react";
import { Grid, TextField, Paper, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logIn, logOut, resetError } from "../../redux/userSlice";
import { authSelector, errorSelector } from "../../redux/userSlice/userSelector";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector(authSelector);
  const userError = useAppSelector(errorSelector);
  enum inputName {
    login = "login",
    password = "password",
  }
  const emptyInput = { [inputName.login]: "", [inputName.password]: "" };

  const [value, setValue] = useState<{ [inputName.login]: string; [inputName.password]: string }>(emptyInput);

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    setValue((prev) => ({ ...prev, [name]: event.target.value }));
    if (!!userError) {
      dispatch(resetError());
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(logIn(value));
  };

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 10,
      }}
    >
      {userAuth ? (
        <Paper>
          <Grid item xs={12}>
            <Button fullWidth onClick={handleLogOut} variant="contained" color="primary">
              LogOut
            </Button>
          </Grid>
        </Paper>
      ) : (
        <form onSubmit={handleSubmit}>
          <Paper style={{ padding: "10px" }}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name={inputName.login}
                required
                onChange={handleOnchange}
                style={{ margin: "10px 0" }}
                error={!!userError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name={inputName.password}
                type="password"
                required
                onChange={handleOnchange}
                style={{ margin: "10px 0" }}
                error={!!userError}
                helperText={userError}
              />
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Grid>
          </Paper>
        </form>
      )}
    </div>
  );
};
