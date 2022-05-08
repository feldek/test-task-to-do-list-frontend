import { Save } from "@mui/icons-material";
import { Grid, Paper, IconButton, Input } from "@mui/material";
import { useState } from "react";
import { ITask } from "../interfaces";
import { useAppDispatch } from "../redux/hooks";
import { updateDescription } from "../redux/taskSlice";

import style from "./Task/Task.module.css";

const styles = {
  Icon: {
    marginLeft: "auto",
    width: "10%",
  },
  Paper: {
    margin: "auto",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    width: 500,
  },
};

export const EditTask = (props: ITask) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(props.description);

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(updateDescription({ id: props.id, description: value }));
  };

  return (
    <Grid xs={12} item key={props.id}>
      <div className={style.user__data}>
        <div className={style.userName}>{props.userName}</div>
        <div className={style.email}>{props.email}</div>
      </div>
      <Paper elevation={2} style={styles.Paper}>
        <form onSubmit={handleSubmit} style={{ display: "flex" }}>
          <Input style={{ width: "90%" }} defaultValue={props.description} onChange={handleOnchange} />
          <IconButton type="submit" color="primary" aria-label="Add" style={styles.Icon}>
            <Save fontSize="small" />
          </IconButton>
        </form>
      </Paper>
    </Grid>
  );
};
