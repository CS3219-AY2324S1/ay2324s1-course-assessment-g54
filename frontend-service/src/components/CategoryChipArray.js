import { useState } from "react";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

const CATEGORIES = [
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
  "Quickselect",
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
  "Biconnected Component",
];

const CategoryChipArray = (props) => {
  const { chips, placeHolder, label, onAddChip, onDeleteChip } = props;
  const [inputValue, setInputValue] = useState("");
  const selectedChips = chips.map((chip) => chip.toLowerCase());
  const filteredChips = CATEGORIES.filter((category) =>
    category.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <Box width="100%" height="100%" display="flex" flexDirection="column">
      <TextField
        fullWidth
        variant="outlined"
        label={label}
        placeholder={placeHolder}
        onChange={(event) => setInputValue(event.target.value.trim())}
      />
      <Box
        height="100%"
        marginTop={1}
        display="flex"
        flexDirection="column"
        overflow="auto"
      >
        {inputValue && (
          <>
            <Box display="flex" flexWrap="wrap" gap={1}>
              {filteredChips.length === 0 && (
                <Typography variant="body2">
                  No categories match your entered search.
                </Typography>
              )}
              {filteredChips.length > 0 &&
                filteredChips.map((category) => {
                  const lowerCasedCategory = category.toLowerCase();
                  return (
                    <Chip
                      color={
                        selectedChips.includes(lowerCasedCategory)
                          ? "primary"
                          : "default"
                      }
                      key={`${category}-all`}
                      label={category}
                      onClick={() => {
                        selectedChips.includes(lowerCasedCategory)
                          ? onDeleteChip(category)
                          : onAddChip(category);
                      }}
                    />
                  );
                })}
            </Box>
            <Divider sx={{ marginY: 2 }} />
          </>
        )}
        <Box display="flex" flexWrap="wrap" gap={1}>
          {CATEGORIES.map((category) => {
            const lowerCasedCategory = category.toLowerCase();
            return (
              <Chip
                color={
                  selectedChips.includes(lowerCasedCategory)
                    ? "primary"
                    : "default"
                }
                key={`${category}-all`}
                label={category}
                onClick={() => {
                  selectedChips.includes(lowerCasedCategory)
                    ? onDeleteChip(category)
                    : onAddChip(category);
                }}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryChipArray;
