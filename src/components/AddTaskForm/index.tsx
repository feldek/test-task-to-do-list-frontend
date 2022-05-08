import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { createTask } from "../../redux/taskSlice";
import { v4 as uuidv4 } from "uuid";

import style from "./AddTaskForm.module.css";

export const AddTaskForm = () => {
  const dispatch = useAppDispatch();

  enum inputName {
    userName = "userName",
    email = "email",
    description = "description",
  }
  const emptyInput = { [inputName.userName]: "", [inputName.email]: "", [inputName.description]: "" };

  const [value, setValue] = useState<{
    [inputName.userName]: string;
    [inputName.email]: string;
    [inputName.description]: string;
  }>(emptyInput);
  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    setValue((prev) => ({ ...prev, [name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(createTask({ ...value, id: uuidv4() }));
    setValue(emptyInput);
  };

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <TextField
        style={{ margin: "10px 0" }}
        onChange={handleOnchange}
        required
        name={inputName.userName}
        value={value.userName}
        label="User name"
        variant="outlined"
      />
      <TextField
        style={{ margin: "10px 0" }}
        onChange={handleOnchange}
        required
        name={inputName.email}
        value={value.email}
        label="Email"
        variant="outlined"
        type="email"
      />
      <TextField
        style={{ margin: "10px 0" }}
        onChange={handleOnchange}
        required
        name={inputName.description}
        value={value.description}
        label="Task description"
        variant="outlined"
      />

      <Button type="submit" variant="contained" color="primary" style={{ width: "10%" }}>
        Add
      </Button>
    </form>
  );
};
