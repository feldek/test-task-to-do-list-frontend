import axios from "axios";
import { LIMIT_TASKS } from "../constants";
import { ICreateTaskApi, IGetTaskParams, IUpdateTaskApi, orderDirection, tasksOrderBy } from "../interfaces";

axios.defaults.baseURL = "http://localhost:8000";

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export const api = {
  async getTask({
    orderBy = tasksOrderBy.userName,
    direction = orderDirection.asc,
    limit = LIMIT_TASKS,
    offset = 0,
  }: IGetTaskParams) {
    const result = await axios.get<{ tasks: ICreateTaskApi[]; countTasks: number }>("/tasks", {
      params: { orderBy, direction, limit, offset },
    });

    return result.data;
  },

  async createTask(params: ICreateTaskApi) {
    await axios.post("/tasks", params);
  },

  async updateTask(params: IUpdateTaskApi) {
    await axios.patch("/tasks", params, {
      headers: {
        authorization: localStorage.getItem("token") as string,
      },
    });
  },

  async removeTask({ id }: { id: string }) {
    await axios.delete("/tasks", {
      data: { id },
      headers: {
        authorization: localStorage.getItem("token") as string,
      },
    });
  },
};
