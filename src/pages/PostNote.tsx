import { ExpandMore } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";

function PostNote() {
  const [value, setValue] = useState([]);

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log("newValue", newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, mb: 8, mt: 12 }}>
      <form action="" method="post">
        <Stack spacing={{ xs: 1, sm: 2, md: 2.5 }} direction="column">
          <input type="file" name="a" id="a" multiple />
        </Stack>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
      </form>
    </Box>
  );
}

export default PostNote;
