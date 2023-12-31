import axios from "axios";
import { useState, useEffect } from "react";

import Page from "../components/Page";
import QuestionsTable from "../components/Questions/QuestionsTable";
import SearchBar from "../components/Questions/SearchBar";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

const Questions = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyQuery, setDifficultyQuery] = useState("");
  const [categoriesQuery, setCategoriesQuery] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/`;
        const token = window.localStorage.getItem("token");
        const response = await axios.get(url, {
          headers: { Authorization: token },
        });
        if (response.status !== 200)
          return console.error("Failed to fetch questions.");
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterData = async () => {
    try {
      const params = {};
      if (searchQuery) params.title = searchQuery;
      if (difficultyQuery) params.complexity = difficultyQuery;
      if (categoriesQuery && categoriesQuery.length > 0)
        categoriesQuery.forEach((category, index) => {
          params[`categories[${index}]`] = category;
        });

      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions`;
      const token = window.localStorage.getItem("token");
      const response = await axios.get(url, {
        params,
        headers: { Authorization: token },
      });
      if (response.status !== 200)
        return console.error("Failed to fetch questions.");
      setFilteredData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Page title="Questions">
      <Box height="calc(100vh - 64px)" width="100%">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Stack
            marginTop={8}
            spacing={2}
            style={{ width: "80%", minHeight: "70vh" }}
          >
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterData={filterData}
              difficultyQuery={difficultyQuery}
              setDifficultyQuery={setDifficultyQuery}
              categoriesQuery={categoriesQuery}
              setCategoriesQuery={setCategoriesQuery}
            />
            <QuestionsTable
              filteredQuestions={filteredData}
              setFilteredQuestions={setFilteredData}
            />
          </Stack>
        </Box>
      </Box>
    </Page>
  );
};
export default Questions;
