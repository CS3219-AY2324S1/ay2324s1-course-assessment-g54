import { useState } from "react";

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
"  Enumeration",
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
  const { chips, helperText, label, onAddChip } = props;
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
      
        {CAT_ARRAY.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            sx={{ marginRight: 1, marginTop: 1 }}
          />
        ))}
      </div>
    </Box>
  );
};

export default ChipArray;
