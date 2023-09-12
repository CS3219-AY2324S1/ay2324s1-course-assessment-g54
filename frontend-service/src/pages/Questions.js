import axios from "axios";
import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import QuestionsTable from "../components/Questions/QuestionsTable";
import SearchBar from "../components/Questions/SearchBar";

import Typography from "@mui/material/Typography";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyQuery, setDifficultyQuery] = useState("");
  const [filteredQuestionsBySearch, setFilteredQuestionsBySearch] = useState([]);
  const [filteredQuestionsByDifficulty, setFilteredQuestionsByDifficulty] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/questions/"
        );

        if (response.status === 200) {
          setQuestions(response.data);
          setFilteredQuestionsBySearch(response.data);
          setFilteredQuestionsByDifficulty(response.data);
        } else {
          console.error("Failed to fetch questions.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchFilter = () => {
    const filtered = questions.filter((question) => {
      if (!searchQuery) return true;
      return question.title.toLowerCase().includes(searchQuery.toLowerCase())
    });
    setFilteredQuestionsBySearch(filtered);
  };

  const handleDifficultyFilter = () => {
    const filtered = filteredQuestionsBySearch.filter((question) => {
      if (!difficultyQuery) return true;
      return question.complexity === difficultyQuery;
    });
    setFilteredQuestionsByDifficulty(filtered);
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
        handleSearchFilter={handleSearchFilter}
        difficultyQuery={difficultyQuery}
        setDifficultyQuery={setDifficultyQuery}
        handleDifficultyFilter={handleDifficultyFilter}
      />
      <QuestionsTable
        filteredQuestions={filteredQuestionsByDifficulty}
      />
    </div>
  );
};
export default Questions;
