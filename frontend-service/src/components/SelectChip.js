import { useState, useEffect } from "react";

import { useTheme } from '@mui/material/styles';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Typography from "@mui/material/Typography";


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
  const [complexity, setComplexity] = useState(props.currentComplexity);

  const handleChange = (event) => {
    setComplexity(event.target.value);
  };

  useEffect(() => {
    setComplexity(props.currentComplexity);
  }, [props.currentComplexity]);

  return (
    <div>
      <FormControl fullWidth >
        <InputLabel id="complexity-chip-label">level</InputLabel>
        <Select
          labelId="complexity-chip-label"
          id="complexity-chip"
          value={complexity}
          onChange={handleChange}
          input={<OutlinedInput id="select-chip" label="Level" />}
          renderValue={(selected) => (
            <Typography
              variant="body1"
              flexGrow={1}
              noWrap
              textOverflow="ellipsis"
            >
              {selected}
            </Typography>
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