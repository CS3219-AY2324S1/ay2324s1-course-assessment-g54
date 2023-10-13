import axios from "axios";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

import ConfirmationModal from "../ConfirmationModal";
import AcknowledgementToast from "../AcknowledgementToast";
import { useUser } from "../../contexts/UserContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.questionTableHead,
    color: "white",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.questionRowEven,
  },

  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.questionRowOdd,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },

  cursor: "pointer",

  "&:hover": {
    backgroundColor: theme.palette.questionRowHover,
  },
}));

const QuestionsTable = ({ filteredQuestions, setFilteredQuestions }) => {
  const navigate = useNavigate();
  const user = useUser();
  const token = window.localStorage.getItem("token");
  const header = {
    headers: {
      Authorization: `${token}`,
    },
  };

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [questionIdToDelete, setQuestionIdToDelete] = useState(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");
  const [tableHeight, setTableHeight] = useState("");
  const [tableWidth, setTableWidth] = useState("");

  useEffect(() => {
    setFilteredQuestions(filteredQuestions);
  }, [filteredQuestions, setFilteredQuestions]);

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const newHeight = windowHeight * 0.65;
      setTableHeight(`${newHeight}px`);

      const windowWidth = window.innerWidth;
      const newWidth = windowWidth * 0.8;
      setTableWidth(`${newWidth}px`);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigateToQuestion = (e, question) => {
    const isEditIcon = e.target.closest(".edit-icon");
    const isDeleteIcon = e.target.closest(".delete-icon");

    if (!isEditIcon && !isDeleteIcon) {
      navigate(`/questions/${question.question_id}/`);
    }
  };

  const getComplexityStyle = (complexity) => {
    const colorMap = {
      easy: "success",
      medium: "warning",
      hard: "error",
    };

    return colorMap[complexity] || "primary";
  };

  if (filteredQuestions.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "64px" }}>
        <img
          src={"NoResults.svg"}
          alt="No Results Illustration"
          style={{ maxWidth: "100%" }}
        />
        <Typography
          variant="h6"
          color="textSecondary"
          style={{ fontSize: "24px" }}
        >
          Oops! No matching questions found.
        </Typography>
      </div>
    );
  }

  const handleDeleteClick = (questionId) => {
    setQuestionIdToDelete(questionId);
    setDeleteModalOpen(true);
  };

  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${questionIdToDelete}`;
      const response = await axios.delete(url, header);

      const filtered = filteredQuestions.filter(
        (q) => q.question_id !== questionIdToDelete
      );
      setFilteredQuestions(filtered);
      handleCancelDelete();

      showToast("Question deleted successfully!", "success");
    } catch (err) {
      showToast("Question deletion unsuccessful. Please try again!", "error");
      console.log(err);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setQuestionIdToDelete(null);
  };

  const renderActionsColumnIfMaintainer = (question) => {
    if (!user.isMaintainer) return null;
    return (
      <StyledTableCell>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton
              className="edit-icon"
              color="primary"
              aria-label="edit"
              size="large"
              onClick={() =>
                navigate(`/questions/${question.question_id}/edit`)
              }
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              className="delete-icon"
              color="error"
              aria-label="delete"
              size="large"
              onClick={() => handleDeleteClick(question.question_id)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      </StyledTableCell>
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", height: "auto" }}>
      <TableContainer
        component={Paper}
        style={{
          marginTop: "5px",
          maxHeight: tableHeight,
          maxWidth: tableWidth,
          overflowY: "auto",
        }}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: { xs: "5%" } }}>
                Difficulty
              </StyledTableCell>
              <StyledTableCell
                style={{ width: { xs: "5%", md: "20%", lg: "40%" } }}
              >
                Title
              </StyledTableCell>
              <StyledTableCell
                style={{ width: { xs: "5%", md: "20%", lg: "50%" } }}
              >
                Category
              </StyledTableCell>
              {user.isMaintainer ? (
                <StyledTableCell width="10%">Actions</StyledTableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredQuestions.map((question) => (
              <StyledTableRow
                key={question.question_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={(e) => navigateToQuestion(e, question)}
              >
                <StyledTableCell>
                  <Chip
                    color={getComplexityStyle(question.complexity)}
                    sx={{ textTransform: "capitalize", color: "white" }}
                    label={question.complexity}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {question.title}
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    {question.categories.map((cat) => (
                      <Chip
                        key={cat}
                        label={cat}
                        variant="outlined"
                        style={{ margin: "2px" }}
                      />
                    ))}
                  </Stack>
                </StyledTableCell>
                {renderActionsColumnIfMaintainer(question)}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmationModal
        open={deleteModalOpen}
        onClose={handleCancelDelete}
        onConfirmDelete={handleConfirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this question?"
      />
      <AcknowledgementToast
        open={toastOpen}
        message={toastMessage}
        onClose={() => setToastOpen(false)}
        severity={toastType}
      />
    </div>
  );
};

export default QuestionsTable;
