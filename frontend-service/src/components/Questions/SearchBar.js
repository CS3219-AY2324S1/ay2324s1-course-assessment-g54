import React from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ searchQuery, setSearchQuery, handleSearchClick }) => {
  return (
    <div>
      <TextField
        id="filled-search"
        label="Search Questions"
        type="search"
        variant="filled"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <IconButton onClick={handleSearchClick} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
