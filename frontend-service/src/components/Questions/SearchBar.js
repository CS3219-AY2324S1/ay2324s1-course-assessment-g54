import React, { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from '@mui/material/InputLabel';
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from '@mui/material/FormControl';
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  filterData,
  difficultyQuery,
  setDifficultyQuery
}) => {
  const [difficultyChanged, setDifficultyChanged] = useState(false);

  const handleSearchOnEnter = (event) => {
    if (event.key === 'Enter') {
      filterData()
    }
  };

  const handleDifficultyChange = (event) => {
    setDifficultyQuery(event.target.value);
    setDifficultyChanged(true);
  };

  useEffect(() => {
    if (difficultyChanged) {
      filterData();
      setDifficultyChanged(false);
    }
  }, [difficultyQuery, difficultyChanged, filterData]);
  
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
    >
      <TextField
        id="filled-search"
        label="Search Questions"
        type="search"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={handleSearchOnEnter}
        onBlur={filterData}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={filterData} aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="difficulty-label">Difficulty</InputLabel>
        <Select
          label="Difficulty"
          value={difficultyQuery}
          onChange={handleDifficultyChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>      
    </Stack>
  );
};

export default SearchBar;
