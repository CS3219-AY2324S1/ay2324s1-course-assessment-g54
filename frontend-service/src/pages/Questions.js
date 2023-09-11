import axios from "axios";
import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/questions/"
        );

        if (response.status === 200) {
          setQuestions(response.data);
          setFilteredQuestions(response.data);
        } else {
          console.error("Failed to fetch questions.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getComplexityStyle = (complexity) => {
    const colorMap = {
      easy: "#008000",
      medium: "#FFA500",
      hard: "#FF0000",
    };

    return {
      color: colorMap[complexity] || "",
      textTransform: "capitalize",
    };
  };

  const handleSearchClick = () => {
    const filtered = questions.filter((question) =>
      question.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredQuestions(filtered);
  };

  const renderTable = () => {
    if (filteredQuestions.length === 0) {
      return <Typography>No matching results</Typography>;
    }

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Difficulty</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions.map((question) => (
              <TableRow
                key={question.question_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <span style={getComplexityStyle(question.complexity)}>
                    {question.complexity}
                  </span>
                </TableCell>
                <TableCell component="th" scope="row">
                  {question.title}
                </TableCell>
                <TableCell>
                  {question.categories.map((cat) => (
                    <div key={cat}>{cat}</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div>
      <NavBar />
      <Typography variant="h3" color="initial">
        Questions
      </Typography>
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
      {renderTable()}
    </div>
  );
};
export default Questions;
