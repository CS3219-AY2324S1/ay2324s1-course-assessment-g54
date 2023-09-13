import { useState, useEffect } from "react";

import { styled } from '@mui/material/styles';

import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const CategoryChips = (props) => {
  const [chipData, setChipData] = useState([]);

  useEffect(() => {
    const getCategories = () => {
      const catArray = props.categories;
      const newArray = catArray.map((cat) => ({key: cat, label: cat}));
      
      setChipData(newArray);
    };

    getCategories();
  }, []);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
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
    </Paper>
  );
}

export default CategoryChips;