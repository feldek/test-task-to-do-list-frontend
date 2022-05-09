import React, { useState } from "react";
import { TextField, Paper, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logIn, logOut, resetError } from "../../redux/userSlice";
import { authSelector, errorSelector } from "../../redux/userSlice/userSelector";

import style from "./LogInForm.module.css";

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
    <div className={style.container}>
      {userAuth ? (
        <Paper>
          <Button fullWidth onClick={handleLogOut} variant="contained" color="primary">
            LogOut
          </Button>
        </Paper>
      ) : (
        <form onSubmit={handleSubmit}>
          <Paper style={{ padding: "10px" }}>
            <div>
              <TextField
                label="Username"
                name={inputName.login}
                required
                onChange={handleOnchange}
                style={{ margin: "10px 0" }}
                error={!!userError}
              />
            </div>
            <div>
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
            </div>
            <div>
              <Button fullWidth type="submit" variant="contained" color="primary">
                Login
              </Button>
            </div>
          </Paper>
        </form>
      )}
    </div>
  );
};
