import { Build, Delete } from "@mui/icons-material";
import { Grid, Paper, IconButton } from "@mui/material";
import { ITask } from "../../interfaces";

import style from "./Task.module.css";

const styles = {
  Icon: {
    marginLeft: "auto",
  },
  Paper: {
    margin: "auto",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 3,
    width: 500,
  },
};

export const Task = (props: ITask) => {
  // const gridClass = this.state.fade ? "fade-out" : "";
  const gridClass = "fade-out";
  return (
    <Grid xs={12} className={`${gridClass}`} item key={props.id}>
      <div className={style.user__data}>
        <div className={style.userName}>{props.userName}</div>
        <div className={style.email}>{props.email}</div>
      </div>
      <Paper elevation={2} style={styles.Paper}>
        <span>{props.description}</span>
        <IconButton
          color="primary"
          aria-label="Edit"
          style={styles.Icon}
          // onClick={() => this.props.updateTodo(this.props.index)}
        >
          <Build fontSize="small" />
        </IconButton>
        <IconButton color="secondary" aria-label="Delete" onClick={() => {}}>
          <Delete fontSize="small" />
        </IconButton>
      </Paper>
    </Grid>
  );
};
