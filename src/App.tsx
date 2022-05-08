import { Fragment, useEffect } from "react";
import { Paper, Grid } from "@mui/material";
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

const App = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(tasksSelector);
  const fetching = useAppSelector(rootLoaderTasksSelector);
  const orderBy = useAppSelector(orderByTasksSelector);
  const direction = useAppSelector(directionTasksSelector);

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch, orderBy, direction]);

  return (
    <Fragment>
      <Grid container spacing={0}>
        <div>
          <LoginForm />
        </div>

        <Grid item xs={12}>
          <Paper
            style={{
              padding: 20,
              margin: "auto",
              textAlign: "center",
              width: 500,
            }}
          >
            <AddTaskForm />
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            padding: "20px 0",
            margin: "auto",
            textAlign: "center",
            maxWidth: 500,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <DropDownList />
          <DropDownListDirection />
        </Grid>

        <Grid
          item
          xs={12}
          style={{
            padding: 20,
            margin: "auto",
            textAlign: "center",
            width: 500,
          }}
        >
          {fetching ? <Loader /> : <ListTasks tasks={tasks} />}
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            padding: 20,
            margin: "auto",
            textAlign: "center",
            width: 500,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination />
        </Grid>
      </Grid>

      <div>
        <ToastContainer />
      </div>
    </Fragment>
  );
};

export default App;
