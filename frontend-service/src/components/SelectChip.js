import { useState, useEffect } from "react";
import { useTheme } from '@mui/material/styles';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const complexities = [
  'easy',
  'medium',
  'hard',
];

const getDifficultyChipColor = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "success";
    case "medium":
      return "warning";
    case "hard":
      return "error";
    default:
      return "primary";
  }
};
function getStyles(complex, complexity, theme) {
  return {
    fontWeight:
      complexity.indexOf(complex) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SelectChip = (props) => {
  const theme = useTheme();
  const [complexity, setComplexity] = useState("");

  const handleChange = (event) => {
    setComplexity(event.target.value);
  };

  useEffect(() => {
    const getComplexity = () => {
      const comp = props.currentComplexity;
      //console.log(comp);
      setComplexity(comp);
    };

    getComplexity();
  }, []);

return (
  <div>
    <FormControl fullWidth sx={{ m: 1}}>
      <InputLabel id="complexity-chip-label">lvl</InputLabel>
      <Select
        labelId="complexity-chip-label"
        id="complexity-chip"
        value={complexity}
        onChange={handleChange}
        input={<OutlinedInput id="select-chip" label="Chip" />}
        renderValue={(selected) => (
          <Chip key={selected} label={selected} color={getDifficultyChipColor(selected)}/>
        )}
        MenuProps={MenuProps}
      >
        {complexities.map((complex) => (
          <MenuItem
            key={complex}
            value={complex}
            style={getStyles(complex, complexity, theme)}
          >
            {complex}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </div>
);
}

export default SelectChip;