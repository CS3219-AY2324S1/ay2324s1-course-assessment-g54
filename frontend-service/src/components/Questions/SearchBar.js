import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import AcknowledgementToast from "../AcknowledgementToast";
import CategoryChipArray from "../CategoryChipArray";

const SearchInput = ({
  searchQuery,
  setSearchQuery,
  handleSearchOnEnter,
  filterData,
}) => {
  return (
    <TextField
      id="Search"
      label="Search Questions"
      type="search"
      variant="outlined"
      size="small"
      style={{ width: "50%" }}
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
      onKeyUp={handleSearchOnEnter}
      onBlur={filterData}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={filterData} aria-label="search">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

const DifficultySelect = ({ difficultyQuery, handleDifficultyChange }) => {
  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="difficulty-label">Difficulty</InputLabel>
      <Select
        label="Difficulty"
        value={difficultyQuery}
        onChange={handleDifficultyChange}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="easy">Easy</MenuItem>
        <MenuItem value="medium">Medium</MenuItem>
        <MenuItem value="hard">Hard</MenuItem>
      </Select>
    </FormControl>
  );
};

const CategoryInput = ({ categoriesQuery, setCategoriesQuery }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <TextField
        variant="outlined"
        size="small"
        style={{ width: "20%" }}
        label="Categories"
        InputProps={{ readOnly: true }}
        onClick={(event) => {
          setIsModalOpen(true);
        }}
      />
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "70vh",
            padding: 1,
            backgroundColor: (theme) => theme.palette.background.light,
          }}
        >
          <CategoryChipArray
            chips={categoriesQuery}
            label="Categories"
            placeHolder="Filter categories"
            onAddChip={(newCategory) =>
              setCategoriesQuery((prevCategories) => [
                ...prevCategories,
                newCategory,
              ])
            }
            onDeleteChip={(deletedCategory) =>
              setCategoriesQuery((prevCategories) =>
                prevCategories.filter(
                  (category) => category !== deletedCategory
                )
              )
            }
          />
        </Card>
      </Modal>
    </>
  );
};

const CategoryChips = ({ categoriesQuery, handleDeleteChip }) => {
  return (
    <div
      style={{
        overflowY: "auto",
        wordWrap: "break-word",
      }}
    >
      {categoriesQuery.map((chip) => (
        <Chip
          key={chip}
          label={chip}
          onDelete={() => handleDeleteChip(chip)}
          sx={{ marginRight: 1, marginTop: 1 }}
          color="secondary"
        />
      ))}
    </div>
  );
};

const AddLeetcodeQuestionsButton = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");

  return (
    <>
      <Button
        variant="contained"
        startIcon={<CloudDownloadIcon />}
        onClick={async () => {
          setIsModalOpen(true);
          const token = window.localStorage.getItem("token");
          const getLeetcodeIdUrl = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/leetcode-id`;
          const leetcodeIdResponse = await axios.get(getLeetcodeIdUrl);
          if (leetcodeIdResponse.status !== 200) {
            console.error(leetcodeIdResponse);
            setToastMessage(
              "Error retrieving leetcode question id from questions service."
            );
            setToastSeverity("error");
            setIsToastOpen(true);
            return setIsModalOpen(false);
          }
          const leetcode_id_start = leetcodeIdResponse.data.seq || 0;
          const serverlessUrl = `https://uvzu1c1dy5.execute-api.ap-southeast-1.amazonaws.com/prod/get-questions`;
          const serverlessResponse = await axios.post(serverlessUrl, {
            leetcode_id_start,
            num_questions: 5,
          });
          if (serverlessResponse.status !== 200) {
            console.error(serverlessResponse);
            setToastMessage("Error retrieving leetcode questions.");
            setToastSeverity("error");
            setIsToastOpen(true);
            return setIsModalOpen(false);
          }
          const questions = serverlessResponse.data.questions;
          const createQuestionUrl = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions`;
          try {
            await Promise.all(
              questions.map((question) =>
                axios.post(
                  createQuestionUrl,
                  {
                    title: question.title,
                    complexity: question.complexity,
                    categories: question.categories,
                    description: question.description,
                  },
                  { headers: { Authorization: token } }
                )
              )
            );
          } catch (error) {
            console.error(error);
            setToastMessage("Error creating leetcode questions.");
            setToastSeverity("error");
            setIsToastOpen(true);
            return setIsModalOpen(false);
          }
          const newLeetcodeQuestionId =
            questions[questions.length - 1].frontend_question_id;
          await axios.post(getLeetcodeIdUrl, {
            id: newLeetcodeQuestionId,
          });
          setToastMessage("Retrieved leetcode questions.");
          setToastSeverity("success");
          setIsToastOpen(true);
          navigate(0);
        }}
      >
        Fetch Qns
      </Button>
      <Modal open={isModalOpen}>
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "500px",
            padding: 3,
          }}
        >
          <Typography>
            Please wait while our serverless function scrapes some questions
            from LeetCode.
          </Typography>
          <LinearProgress variant="indeterminate" sx={{ marginTop: 2 }} />
        </Card>
      </Modal>
      <AcknowledgementToast
        open={isToastOpen}
        message={toastMessage}
        severity={toastSeverity}
        onClose={() => setIsToastOpen(false)}
      />
    </>
  );
};

const AddButton = () => {
  const navigate = useNavigate();
  const handleAddClick = () => navigate(`/questions/new`);

  return (
    <Button
      variant="contained"
      startIcon={<AddIcon />}
      onClick={handleAddClick}
    >
      Add
    </Button>
  );
};

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  filterData,
  difficultyQuery,
  setDifficultyQuery,
  categoriesQuery,
  setCategoriesQuery,
}) => {
  const [difficultyChanged, setDifficultyChanged] = useState(false);
  const [categoriesChanged, setCategoriesChanged] = useState(false);

  const handleSearchOnEnter = (event) => {
    if (event.key === "Enter") filterData();
  };

  const handleDifficultyChange = (event) => {
    setDifficultyQuery(event.target.value);
    setDifficultyChanged(true);
  };

  const handleDeleteChip = (deletedCategory) => {
    setCategoriesQuery((prevCategories) =>
      prevCategories.filter((category) => category !== deletedCategory)
    );
    setCategoriesChanged(true);
  };

  useEffect(() => {
    if (difficultyChanged) {
      filterData();
      setDifficultyChanged(false);
    }
  }, [difficultyQuery, difficultyChanged, filterData]);

  useEffect(() => {
    if (categoriesChanged) {
      filterData();
      setCategoriesChanged(false);
    }
  }, [categoriesQuery, categoriesChanged, filterData]);

  return (
    <div>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack direction="row" spacing={1} width={"70%"}>
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearchOnEnter={handleSearchOnEnter}
            filterData={filterData}
          />
          <DifficultySelect
            difficultyQuery={difficultyQuery}
            handleDifficultyChange={handleDifficultyChange}
          />
          <CategoryInput
            categoriesQuery={categoriesQuery}
            setCategoriesQuery={(query) => {
              setCategoriesQuery(query);
              setCategoriesChanged(true);
            }}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          <AddLeetcodeQuestionsButton />
          <AddButton />
        </Stack>
      </Stack>
      <CategoryChips
        categoriesQuery={categoriesQuery}
        handleDeleteChip={handleDeleteChip}
      />
    </div>
  );
};

export default SearchBar;
