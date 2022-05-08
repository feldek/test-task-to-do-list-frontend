import { Task } from "./Task";
import { EditTask } from "./EditTask";
import { Grid } from "@mui/material";
import { ITask } from "../interfaces";

interface IListTasks {
  tasks: { [key: string]: ITask };
}
export const ListTasks = (props: IListTasks) => {
  const renderTasks = (task: ITask) => {
    if (task.editMode) {
      return <EditTask key={task.description} {...task} />;
    } else {
      return <Task key={task.description} {...task} />;
    }
  };

  return <Grid container>{Object.values(props.tasks).map((key) => renderTasks(key))}</Grid>;
};
