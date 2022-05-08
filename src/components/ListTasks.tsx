import { Task } from "./Task";
import { EditTask } from "./EditTask";
import { ITask } from "../interfaces";

interface IListTasks {
  tasks: ITask[];
}
export const ListTasks = (props: IListTasks) => {
  const renderTasks = (task: ITask) => {
    if (task.editMode) {
      return <EditTask key={task.id} {...task} />;
    } else {
      return <Task key={task.id} {...task} />;
    }
  };

  return <div>{props.tasks.map((key) => renderTasks(key))}</div>;
};
