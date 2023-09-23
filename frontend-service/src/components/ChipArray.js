import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

const CAT_ARRAY = [
  "Array",
  "String",
  "Hash Table",
  "Math",
  "Dynamic Programming",
  "Sorting",
  "Greedy",
  "Depth-First Search",
  "Binary Search",
  "Database",
  "Breadth-First Search",
  "Tree",
  "Matrix",
  "Two Pointers",
  "Binary Tree",
  "Bit Manipulation",
  "Heap (Priority Queue)",
  "Stack",
  "Prefix Sum",
  "Graph",
  "Simulation",
  "Design",
  "Counting",
  "Backtracking",
  "Sliding Window",
  "Union Find",
  "Linked List",
  "Ordered Set",
  "Enumeration",
  "Monotonic Stack",
  "Trie",
  "Recursion",
  "Divide and Conquer",
  "Number Theory",
  "Bitmask",
  "Queue",
  "Binary Search Tree",
  "Segment Tree",
  "Memoization",
  "Geometry",
  "Topological Sort",
  "Binary Indexed Tree",
  "Hash Function",
  "Game Theory",
  "Shortest Path",
  "Combinatorics",
  "Interactive",
  "String Matching",
  "Data Stream",
  "Rolling Hash",
  "Brainteaser",
  "Randomized",
  "Monotonic Queue",
  "Merge Sort",
  "Iterator",
  "Concurrency",
  "Doubly-Linked List",
  "Probability and Statistics",
  'Quickselect',
  "Bucket Sort",
  "Suffix Array",
  "Minimum Spanning Tree",
  "Counting Sort",
  "Shell",
  "Line Sweep",
  "Reservoir Sampling",
  "Strongly Connected Component",
  "Eulerian Circuit",
  "Radix Sort",
  "Rejection Sampling",
  "Biconnected Component"];

const ChipArray = (props) => {
  const { chips, helperText, label, onAddChip, onDeleteChip } = props;
  const [inputValue, setInputValue] = useState("");
  const [selectedChips, setSelectedChips] = useState(chips);
  const [filteredArray, setFilteredArray] = useState([]);

  const handleAddChip = () => {
    const valueToBeAdded = inputValue.trim();
    if (valueToBeAdded === "") return;
    const isValueAlreadyAdded = chips
      .map((chip) => chip.toLowerCase())
      .includes(inputValue.toLowerCase());
    if (isValueAlreadyAdded) return;
    setInputValue("");
  };


  const handleToggleClick = (chip) => {
    const currSelectedChips = new Set(selectedChips);
    if (currSelectedChips.has(chip)) {
      const newChipArray = selectedChips.filter((element) => element !== chip);
      setSelectedChips(newChipArray);
      onDeleteChip(chip);
    } else {
      const newChipArray = [...selectedChips, chip];
      setSelectedChips(newChipArray);
      onAddChip(chip);
    }
  };

  const isSelected = (chip) => {
    const currSelectedChips = new Set(selectedChips);
    if (currSelectedChips.has(chip)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    const filteredValues = () => {
      const filteredValues = CAT_ARRAY.filter((value) =>
        value.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredArray(filteredValues);
    }
    filteredValues();

  }, [inputValue]);

  return (
    <Box width="100%">
      <TextField
        fullWidth
        variant="outlined"
        label={label}
        value={inputValue}
        helperText={helperText}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyUp={(event) => {
          if (event.key !== "Enter") return;
          handleAddChip();
        }}
      />
      <Box>
        {filteredArray.map((chip) => (
          <Chip
            color={isSelected(chip) ? "primary" : "default"}
            key={chip}
            label={chip}
            onClick={() => handleToggleClick(chip)}
            sx={{ marginRight: 1, marginTop: 1 }}
          />
        ))}
      </Box>
      <Box sx={{ height: "315px", width: "100%", overflow: "auto" }}>
        {CAT_ARRAY.map((chip) => {
          if (filteredArray.includes(chip)) {
            return "";
          }
          return <Chip
            color={isSelected(chip) ? "primary" : "default"}
            key={chip}
            label={chip}
            onClick={() => handleToggleClick(chip)}
            sx={{ marginRight: 1, marginTop: 1 }}
          />;
        })
        }
      </Box>
    </Box>
  );
};

export default ChipArray;
