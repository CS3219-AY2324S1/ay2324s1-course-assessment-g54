import axios from "axios";
import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import QuestionsTable from "../components/Questions/QuestionsTable";
import SearchBar from "../components/Questions/SearchBar";

import Typography from "@mui/material/Typography";

const Questions = () => { //test
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyQuery, setDifficultyQuery] = useState("");
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

  const handleSearchClick = () => {
    let filteredQuestions = questions;

    if (searchQuery) {
      filteredQuestions = questions.filter((question) =>
        question.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (difficultyQuery) {
      filteredQuestions = filteredQuestions.filter(
        (question) => question.complexity === difficultyQuery
      );
    }

    setFilteredQuestions(filteredQuestions);
  };

  return (
    <div>
      <NavBar />
      <Typography variant="h3" color="initial">
        Questions
      </Typography>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearchClick={handleSearchClick}
        setDifficultyQuery={setDifficultyQuery}
      />
      <QuestionsTable
        filteredQuestions={filteredQuestions}
      />
    </div>
  );
};
export default Questions;
