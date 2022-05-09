import { useEffect } from "react";
import { Paper } from "@mui/material";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { AddTaskForm } from "./components/AddTaskForm";
import { ListTasks } from "./components/ListTasks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  directionTasksSelector,
  orderByTasksSelector,
  rootLoaderTasksSelector,
  tasksSelector,
} from "./redux/taskSlice/taskSelector";
import { getTasks } from "./redux/taskSlice";
import { Loader } from "./components/Loader";
import { DropDownList } from "./components/DropDownList";
import { DropDownListDirection } from "./components/DropDownListDirection";
import { Pagination } from "./components/Pagination";
import { LoginForm } from "./components/LogInForm/LogInForm";
import { authorization } from "./redux/userSlice";

import style from "./App.module.css";

const App = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(tasksSelector);
  const fetching = useAppSelector(rootLoaderTasksSelector);
  const orderBy = useAppSelector(orderByTasksSelector);
  const direction = useAppSelector(directionTasksSelector);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch, orderBy, direction]);

  //if token exist , then checked his validity
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authorization({ token }));
    }
  }, [dispatch]);

  return (
    <div className={style.container}>
      <div>
        <LoginForm />
      </div>

      <Paper className={style.add_task_form}>
        <AddTaskForm />
      </Paper>

      <Paper className={style.tasks__container}>
        <div>
          <div className={style.dropDown__container}>
            <DropDownList />
            <DropDownListDirection />
          </div>

          <div className={style.listTasks__container}>{fetching ? <Loader /> : <ListTasks tasks={tasks} />}</div>
        </div>
        <div className={style.pagination}>
          <Pagination />
        </div>
      </Paper>

      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
