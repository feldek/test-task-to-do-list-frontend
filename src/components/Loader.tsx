import { CircularProgress, Box } from "@mui/material";

export const Loader = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};
