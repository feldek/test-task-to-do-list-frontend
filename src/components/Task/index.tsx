import { Build, Delete } from "@mui/icons-material";
import { Grid, Paper, IconButton } from "@mui/material";
import { ITask } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/userSlice/userSelector";
import { removeTask, runEditMode } from "../../redux/taskSlice";
import { Loader } from "../Loader";

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
    height: 40,
  },
};

export const Task = (props: ITask) => {
  const dispatch = useAppDispatch();
  const userAuth = useAppSelector(authSelector);

  const handleUpdateTask = () => {
    dispatch(runEditMode({ id: props.id }));
  };
  const handleRemoveTask = () => {
    dispatch(removeTask({ id: props.id }));
  };
  // const gridClass = this.state.fade ? "fade-out" : "";
  const gridClass = "fade-out";
  return (
    <Grid xs={12} className={`${gridClass}`} item key={props.id}>
      {props.fetching ? (
        <div style={{ margin: "60px 0 40px" }}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={style.user__data}>
            <div className={style.userName}>{props.userName}</div>
            <div className={style.email}>{props.email}</div>
          </div>
          <Paper elevation={2} style={styles.Paper}>
            <span>{props.description}</span>
            {userAuth && (
              <>
                <IconButton color="primary" aria-label="Edit" style={styles.Icon} onClick={handleUpdateTask}>
                  <Build fontSize="small" />
                </IconButton>
                <IconButton color="secondary" aria-label="Delete" onClick={handleRemoveTask}>
                  <Delete fontSize="small" />
                </IconButton>
              </>
            )}
          </Paper>
        </>
      )}
    </Grid>
  );
};
