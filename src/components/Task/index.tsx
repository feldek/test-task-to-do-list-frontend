import { Build, Delete } from "@mui/icons-material";
import { Paper, IconButton, Checkbox } from "@mui/material";
import { ITask } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { authSelector } from "../../redux/userSlice/userSelector";
import { removeTask, runEditMode, updateStatus } from "../../redux/taskSlice";
import { Loader } from "../Loader";

import style from "./Task.module.css";

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
    <div key={props.id}>
      <div className={style.container}>
        {props.fetching ? (
          <div className={style.loader}>
            <Loader />
          </div>
        ) : (
          <>
            <div className={style.user__data}>
              <div className={style.userName}>{props.userName}</div>
              <div className={style.email}>{props.email}</div>
            </div>
            <Paper
              className={style.wrapper}
              elevation={2}
              style={{ backgroundColor: props.status === "done" ? "#1976d233" : "initial" }}
            >
              <span>{props.description}</span>
              {userAuth && (
                <div>
                  <Checkbox defaultChecked onChange={handleChange} checked={props.status === "done" ? true : false} />
                  <IconButton color="primary" aria-label="Edit" className={style.icon} onClick={handleUpdateTask}>
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
    </div>
  );
};
