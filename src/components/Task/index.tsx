import { Build, Delete } from "@mui/icons-material";
import { Grid, Paper, IconButton, Checkbox } from "@mui/material";
import { ITask } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/userSlice/userSelector";
import { removeTask, runEditMode, updateStatus } from "../../redux/taskSlice";
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
    justifyContent: "space-between",
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changeStatus = props.status === "done" ? "created" : "done";
    dispatch(updateStatus({ id: props.id, status: changeStatus }));
  };

  return (
    <Grid xs={12} item key={props.id}>
      <div className={style.container}>
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
            <Paper
              elevation={2}
              style={{ ...styles.Paper, backgroundColor: props.status === "done" ? "#1976d233" : "initial" }}
            >
              <span>{props.description}</span>
              {userAuth && (
                <div>
                  <Checkbox defaultChecked onChange={handleChange} checked={props.status === "done" ? true : false} />
                  <IconButton color="primary" aria-label="Edit" style={styles.Icon} onClick={handleUpdateTask}>
                    <Build fontSize="small" />
                  </IconButton>
                  <IconButton color="secondary" aria-label="Delete" onClick={handleRemoveTask}>
                    <Delete fontSize="small" />
                  </IconButton>
                </div>
              )}
            </Paper>
            {props.edited && <div className={style.edit}>Description task edited by admin</div>}
            {props.status === "done" && <div className={style.status}>Task Done</div>}
          </>
        )}
      </div>
    </Grid>
  );
};
