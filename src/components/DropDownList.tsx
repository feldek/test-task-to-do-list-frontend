import { Box, InputLabel, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { tasksOrderBy } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { orderByTasksSelector } from "../redux/taskSlice/taskSelector";
import { setSortBy } from "../redux/taskSlice";

export const DropDownList = () => {
  const dispatch = useAppDispatch();
  const orderBy = useAppSelector(orderByTasksSelector);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setSortBy(event.target.value as tasksOrderBy));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sort-by-tasks__input">Sort by</InputLabel>
        <Select
          labelId="sort-by-tasks__input"
          id="sort-by-tasks__select"
          value={orderBy}
          label="Sort by"
          onChange={handleChange}
        >
          <MenuItem value={tasksOrderBy.userName}>User name</MenuItem>
          <MenuItem value={tasksOrderBy.email}>Email</MenuItem>
          <MenuItem value={tasksOrderBy.status}>Status</MenuItem>
          <MenuItem value={tasksOrderBy.description}>Task</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
