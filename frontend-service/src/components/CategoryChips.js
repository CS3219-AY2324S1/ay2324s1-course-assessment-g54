import { useState, useEffect } from "react";

import { styled } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import Chip from '@mui/material/Chip';
import IconButton from "@mui/material/IconButton";
import Paper from '@mui/material/Paper';
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const CategoryChips = (props) => {
  const [chipData, setChipData] = useState(props.categories);
  const [addCategory, setAddCategory] = useState("");

  useEffect(() => {
    const newArray = props.categories.map((cat) => ({ key: cat, label: cat }));
    setChipData(newArray);
  }, [props.categories]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    props.onDelete(chipToDelete.key);
  };

  const handleAddClick = () => {
    props.onSave(addCategory);
    setAddCategory("");
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      <Stack height="100%" width="100%" spacing={1}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <TextField fullWidth id="outlined-basic" label="categories" value={addCategory} placeholder="other categories..." variant="outlined" onChange={(e) => setAddCategory(e.target.value)} />
          <Tooltip title="Add category" placement="top" arrow>
            <IconButton onClick={handleAddClick}>
              <AddCircleIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Stack>
        {chipData.map((data) => {
          let icon;

          return (
            <ListItem key={data.key}>
              <Chip
                color={props.complexityColor}
                icon={icon}
                label={data.label}
                onDelete={handleDelete(data)}

              />
            </ListItem>
          );
        })}
      </Stack>

    </Paper>
  );
}

export default CategoryChips;