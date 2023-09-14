import { useState } from "react";

import { styled } from "@mui/material/styles";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ChipArray = (props) => {
  const { chips, helperText, label, onAddChip, onDeleteChip } = props;
  const [value, setValue] = useState("");

  const handleAddChip = () => {
    const valueToBeAdded = value.trim();
    if (valueToBeAdded === "") return;
    const isValueAlreadyAdded = chips
      .map((chip) => chip.toLowerCase())
      .includes(value.toLowerCase());
    if (isValueAlreadyAdded) return;
    onAddChip(valueToBeAdded);
    setValue("");
  };

  return (
    <Box width="100%">
      <TextField
        fullWidth
        variant="outlined"
        label={label}
        value={value}
        helperText={helperText}
        onChange={(event) => setValue(event.target.value)}
        onKeyUp={(event) => {
          if (event.key !== "Enter") return;
          handleAddChip();
        }}
      />
      <Box display="flex">
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            onDelete={() => onDeleteChip(chip)}
            sx={{ marginRight: 1, marginTop: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ChipArray;
