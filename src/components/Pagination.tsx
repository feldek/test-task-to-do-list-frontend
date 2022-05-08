import { Pagination as MuiPagination, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { LIMIT_TASKS } from "../constants";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getTasks, setOffset } from "../redux/taskSlice";
import { countTasksSelector } from "../redux/taskSlice/taskSelector";

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const [countPages, setCountPages] = useState(1);
  const countTasks = useAppSelector(countTasksSelector);
  useEffect(() => {
    if (countTasks) {
      setCountPages(Math.ceil(countTasks / LIMIT_TASKS));
    } else {
      setCountPages(1);
    }
  }, [countTasks]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setOffset((value - 1) * LIMIT_TASKS));
    dispatch(getTasks());
  };
  return (
    <Stack spacing={2}>
      <MuiPagination count={countPages} onChange={handleChange} />
    </Stack>
  );
};
