import axios from "axios";
import { useState, useEffect } from "react";

import NavBar from "./components/NavBar";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

const Questions = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Define a function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/question/getQuestions"
        );

        if (response.status === 200) {
          setQuestions(response.data);
        } else {
          console.error("Failed to fetch questions.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array means this effect will run once when the component mounts

  return (
    <div>
      <NavBar />
      <Typography variant="h3" color="initial">
        Questions
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Complexity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((question) => (
              <TableRow
                key={question.question_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {question.question_title}
                </TableCell>
                <TableCell>
                  {question.question_categories.map((cat) => (
                    <div>{cat}</div>
                  ))}
                </TableCell>
                <TableCell>{question.question_complexity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Questions;
