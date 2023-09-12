import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

const QuestionsTable = ({ filteredQuestions }) => {
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

export default QuestionsTable;
