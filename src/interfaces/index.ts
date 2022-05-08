interface MainTaskData {
  id: string;
  description: string;
  userName: string;
  email: string;
  status?: string;
  edited?: boolean | null;
}

export interface ITask extends MainTaskData {
  editMode: boolean;
  fetching: boolean;
}

export interface ICreateTaskApi extends MainTaskData {}

export enum tasksOrderBy {
  userName = "userName",
  email = "email",
  status = "status",
  description = "description",
}

export enum orderDirection {
  asc = "ASC",
  desc = "DESC",
}

export interface IGetTaskParams {
  orderBy?: tasksOrderBy;
  direction?: orderDirection;
  limit?: number;
  offset?: number;
}

export interface IUpdateTaskApi {
  id: string;
  edited?: boolean;
  description?: string;
  userName?: string;
  email?: string;
  status?: string;
}

export interface ILogIn {
  login: string;
  password: string;
}
