import { Fragment, useEffect } from "react";
import { Paper, Grid } from "@mui/material";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { AddTaskForm } from "./components/AddTaskForm";
import { ListTasks } from "./components/ListTasks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { rootLoaderTasksSelector, tasksSelector } from "./redux/task/taskSelector";
import { getTasks } from "./redux/task";
import { Loader } from "./components/Loader";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTasks({}));
  }, [dispatch]);

  const tasks = useAppSelector(tasksSelector);
  const fetching = useAppSelector(rootLoaderTasksSelector);

  return (
    <Fragment>
      <Grid container spacing={0}>
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
            padding: 20,
            margin: "auto",
            textAlign: "center",
            width: 500,
          }}
        >
          {fetching ? <Loader /> : <ListTasks tasks={tasks} />}
        </Grid>
      </Grid>

      <div>
        <ToastContainer />
      </div>
    </Fragment>
  );
};

export default App;
