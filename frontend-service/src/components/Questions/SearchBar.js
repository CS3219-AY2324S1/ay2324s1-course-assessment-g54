import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from '@mui/material/InputLabel';
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from '@mui/material/FormControl';
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

import { useUser } from "../../contexts/UserContext";

const SearchInput = ({ searchQuery, setSearchQuery, handleSearchOnEnter, filterData }) => {
  return (
    <TextField
      id="Search"
      label="Search Questions"
      helperText={"Press enter to search by title"}
      type="search"
      variant="outlined"
      size="small"
      style={{ width: "50%" }}
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
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
  );
};

const DifficultySelect = ({ difficultyQuery, handleDifficultyChange }) => {
  return (
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
  );
};

const CategoryInput = ({ categoryChipValue, setCategoryChipValue, handleAddChip }) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      size="small"
      style={{ width: "40%" }}
      label={"Categories"}
      value={categoryChipValue}
      helperText={"Press enter to add a new category"}
      onChange={(event) => setCategoryChipValue(event.target.value)}
      onKeyUp={(event) => {
        if (event.key !== "Enter") return;
        handleAddChip();
      }}
    />
  );
};

const CategoryChips = ({ categoriesQuery, handleDeleteChip }) => {
  return (
    <div
      style={{
        maxHeight: "50px",
        overflowY: "auto",
        wordWrap: "break-word",
      }}
    >
      {categoriesQuery.map((chip) => (
        <Chip
          key={chip}
          label={chip}
          onDelete={() => handleDeleteChip(chip)}
          sx={{ marginRight: 1, marginTop: 1 }}
          color="secondary"
        />
      ))}
    </div>
  );
};

const AddButton = () => {
  const navigate = useNavigate();
  const user = useUser();
  const handleAddClick = () => navigate(`/questions/new`);

  if (!user.isMaintainer) return null;
  
  return (
    <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddClick}>
      Add
    </Button>
  );
};

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  filterData,
  difficultyQuery,
  setDifficultyQuery,
  categoriesQuery,
  setCategoriesQuery
}) => {
  const [difficultyChanged, setDifficultyChanged] = useState(false);
  const [categoriesChanged, setCategoriesChanged] = useState(false);
  const [categoryChipValue, setCategoryChipValue] = useState("");

  const handleSearchOnEnter = (event) => {
    if (event.key === 'Enter') filterData()
  };

  const handleDifficultyChange = (event) => {
    setDifficultyQuery(event.target.value);
    setDifficultyChanged(true);
  };

  const handleDeleteChip = (deletedCategory) => {
    setCategoriesQuery((prevCategories) =>
      prevCategories.filter((category) => category !== deletedCategory)
    );
    setCategoriesChanged(true)
  };

  const handleAddChip = () => {
    const valueToBeAdded = categoryChipValue.trim();
    if (valueToBeAdded === "") return;
    const isValueAlreadyAdded = categoriesQuery
      .map((chip) => chip.toLowerCase())
      .includes(categoryChipValue.toLowerCase());
    if (isValueAlreadyAdded) return;
    handleCategoriesAdded(valueToBeAdded);
    setCategoryChipValue("");
  };

  const handleCategoriesAdded = (newCategory) => {
    setCategoriesQuery((prevCategories) => [
      ...prevCategories,
      newCategory,
    ]);
    setCategoriesChanged(true);
  };

  useEffect(() => {
    if (difficultyChanged) {
      filterData();
      setDifficultyChanged(false);
    }
  }, [difficultyQuery, difficultyChanged, filterData]);

  useEffect(() => {
    if (categoriesChanged) {
      filterData();
      setCategoriesChanged(false);
    }
  }, [categoriesQuery, categoriesChanged, filterData]);

  return (
    <div style={{ height: "100px" }}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} alignItems="flex-start" width={"70%"}>
        <SearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearchOnEnter={handleSearchOnEnter}
          filterData={filterData}
        />
        <DifficultySelect
          difficultyQuery={difficultyQuery}
          handleDifficultyChange={handleDifficultyChange}
        />
        <CategoryInput
          categoryChipValue={categoryChipValue}
          setCategoryChipValue={setCategoryChipValue}
          handleAddChip={handleAddChip}
        />
        </Stack>
        <AddButton />
      </Stack>
      <CategoryChips
        categoriesQuery={categoriesQuery}
        handleDeleteChip={handleDeleteChip}
      />
    </div>
  );
};

export default SearchBar;
