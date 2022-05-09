import axios, { AxiosError } from "axios";
import { LIMIT_TASKS } from "../constants";
import { ICreateTaskApi, IGetTaskParams, IUpdateTaskApi, orderDirection, tasksOrderBy } from "../interfaces";

axios.defaults.baseURL = "https://test-work-to-do-list-backend.herokuapp.com";

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

  async logIn({ login, password }: { login: string; password: string }) {
    try {
      const response = await axios.post<{ token: string }>("/admin", { login, password });

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw Error(error.response?.data.message);
      }
    }
  },

  async authorization(token: string) {
    const response = await axios.post("/admin/authorization", {}, { headers: { authorization: token } });

    return response.data;
  },
};
