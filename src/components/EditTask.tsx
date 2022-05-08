import { Save } from "@mui/icons-material";
import { Grid, Paper, IconButton, Input } from "@mui/material";
import { ITask } from "../interfaces";

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
  return (
    <Grid xs={12} item key={props.id}>
      <div className={style.user__data}>
        <div className={style.userName}>{props.userName}</div>
        <div className={style.email}>{props.email}</div>
      </div>
      <Paper elevation={2} style={styles.Paper}>
        <form onSubmit={() => {}} style={{ display: "flex" }}>
          <Input style={{ width: "90%" }} defaultValue={props.description} />
          <IconButton type="submit" color="primary" aria-label="Add" style={styles.Icon}>
            <Save fontSize="small" />
          </IconButton>
        </form>
      </Paper>
    </Grid>
  );
};
