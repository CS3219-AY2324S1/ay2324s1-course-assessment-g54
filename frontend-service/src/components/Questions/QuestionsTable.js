import axios from "axios";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import DeleteConfirmationModal from "./DeleteConfirmationModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const QuestionsTable = ({ filteredQuestions }) => {
  const navigate = useNavigate();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const getComplexityStyle = (complexity) => {
    const colorMap = {
      easy: "success",
      medium: "warning",
      hard: "error",
    };
  
    return colorMap[complexity] || "primary"
  };


  if (filteredQuestions.length === 0) {
    return <Typography>No matching results</Typography>;
  }

  const handleDeleteClick = (question) => {
    setQuestionToDelete(question);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${questionToDelete.question_id}`;
      const response = await axios.delete(url);
      
      setDeleteModalOpen(false);
      setQuestionToDelete(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setQuestionToDelete(null);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "auto" }}>
      <TableContainer component={Paper} style={{ marginTop: "5px", maxHeight: 500 }}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table" >
          <TableHead>
            <TableRow>
            <StyledTableCell>Difficulty</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions.map((question) => (
              <StyledTableRow
                key={question.question_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell>
                  <Chip
                    color={getComplexityStyle(question.complexity)}
                    style={{ textTransform: "capitalize" }}
                    label={question.complexity}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {question.title}
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" spacing={1}>
                    {question.categories.map((cat) => (
                      <Chip
                        key={cat}
                        label={cat}
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </StyledTableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        size="large"
                        onClick={() => navigate(`/questions/${question.question_id}/edit`)}
                      >
                        <EditIcon fontSize="inherit"/>
                    </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        aria-label="delete"
                        size="large" 
                        onClick={() => handleDeleteClick(question)}
                      >
                        <DeleteIcon fontSize="inherit"/>
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteConfirmationModal
        open={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default QuestionsTable;
