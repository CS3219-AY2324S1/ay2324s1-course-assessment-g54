import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputLabel from '@mui/material/InputLabel';
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from '@mui/material/FormControl';
import MenuItem from "@mui/material/MenuItem";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  handleSearchClick,
  difficultyQuery,
  setDifficultyQuery,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <TextField
        id="filled-search"
        label="Search Questions"
        type="search"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="difficulty-label">Difficulty</InputLabel>
        <Select
          label="Difficulty"
          value={difficultyQuery}
          onChange={(e) => setDifficultyQuery(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>
      <IconButton onClick={handleSearchClick} aria-label="search">
        <SearchIcon />
      </IconButton>
      
    </div>
  );
};

export default SearchBar;