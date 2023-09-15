import { useState } from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

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
      <div
        style={{
          maxHeight: "100px",
          overflowY: "auto",
          wordWrap: "break-word",
        }}
      >
      
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            onDelete={() => onDeleteChip(chip)}
            sx={{ marginRight: 1, marginTop: 1 }}
          />
        ))}
      </div>
    </Box>
  );
};

export default ChipArray;
