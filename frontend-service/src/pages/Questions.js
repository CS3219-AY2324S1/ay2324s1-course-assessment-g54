import axios from "axios";
import { useState, useEffect } from "react";

import NavBar from "../components/NavBar";
import QuestionsTable from "../components/Questions/QuestionsTable";
import SearchBar from "../components/Questions/SearchBar";

import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

const Questions = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyQuery, setDifficultyQuery] = useState("");
  const [categoriesQuery, setCategoriesQuery] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/`);

        if (response.status === 200) {
          setFilteredData(response.data)
        } else {
          console.error("Failed to fetch questions.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterData = async () => {
    try {
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/`;
      const params = {};
      if (searchQuery) {
        params.title = searchQuery;
      }

      if (difficultyQuery) {
        params.complexity = difficultyQuery;
      }

      if (categoriesQuery && categoriesQuery.length > 0) {
        categoriesQuery.forEach((category, index) => {
          params[`categories[${index}]`] = category;
        });
      }

      const response = await axios.get(url, { params: params });
      setFilteredData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <NavBar />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Stack
          spacing={2}
          style={{ width: "80%" }}
        >
          <Typography variant="h3" color="initial" style={{ marginTop: "10px" }}>
            Questions
          </Typography>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterData={filterData}
            difficultyQuery={difficultyQuery}
            setDifficultyQuery={setDifficultyQuery}
            categoriesQuery={categoriesQuery}
            setCategoriesQuery={setCategoriesQuery}
          />
          <div>
            <QuestionsTable
              filteredQuestions={filteredData}
              setFilteredQuestions={setFilteredData}
            />
          </div>
      </Stack>
      </div>
    </div>
  );
};
export default Questions;
