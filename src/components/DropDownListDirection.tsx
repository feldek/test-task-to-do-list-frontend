import { Box, InputLabel, MenuItem, FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { orderDirection } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { directionTasksSelector } from "../redux/taskSlice/taskSelector";
import { setDirection } from "../redux/taskSlice";

export const DropDownListDirection = () => {
  const dispatch = useAppDispatch();
  const direction = useAppSelector(directionTasksSelector);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setDirection(event.target.value as orderDirection));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sort-by-tasks-direction__input">Direction</InputLabel>
        <Select
          labelId="sort-by-tasks-direction__input"
          id="sort-by-tasks-direction__select"
          value={direction}
          label="Direction"
          onChange={handleChange}
        >
          <MenuItem value={orderDirection.asc}>Ascending</MenuItem>
          <MenuItem value={orderDirection.desc}>Descending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
