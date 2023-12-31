import SimpleMde from "react-simplemde-editor";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import Selector from "./Selector";
import CategoryChipArray from "./CategoryChipArray";

import "easymde/dist/easymde.min.css";

const QuestionForm = ({
  title,
  complexity,
  categories,
  description,
  onTitleChange,
  onComplexityChange,
  onCategoriesChange,
  onDescriptionChange,
}) => {
  return (
    <Stack height="100%" width="100%" direction="row" spacing={1}>
      <Box width="50%" height="100%">
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          gap={1}
        >
          <Card
            variant="outlined"
            sx={{
              minHeight: title.trim().length < 3 ? "94px" : "74px",
              padding: 1,
              backgroundColor: (theme) => theme.palette.background.light,
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Question Title"
              value={title}
              error={title.trim().length < 3}
              helperText={
                title.length < 3
                  ? "Title must be at least 3 characters long"
                  : ""
              }
              onChange={(e) => onTitleChange(e.target.value)}
              onBlur={(e) => {
                const trimmedValue = e.target.value.trim();
                onTitleChange(trimmedValue);
              }}
            />
          </Card>
          <Card
            variant="outlined"
            sx={{
              minHeight: "74px",
              padding: 1,
              backgroundColor: (theme) => theme.palette.background.light,
            }}
          >
            <Selector
              id="question-complexity"
              label="Question Complexity"
              options={["easy", "medium", "hard"]}
              value={complexity}
              onChange={(event) => onComplexityChange(event.target.value)}
            />
          </Card>
          <Card
            variant="outlined"
            sx={{
              flexGrow: 1,
              padding: 1,
              backgroundColor: (theme) => theme.palette.background.light,
            }}
          >
            <CategoryChipArray
              chips={categories}
              label="Categories"
              placeHolder="Filter categories"
              onAddChip={(newCategory) =>
                onCategoriesChange((prevCategories) => [
                  ...prevCategories,
                  newCategory,
                ])
              }
              onDeleteChip={(deletedCategory) =>
                onCategoriesChange((prevCategories) =>
                  prevCategories.filter(
                    (category) => category !== deletedCategory
                  )
                )
              }
            />
          </Card>
        </Box>
      </Box>
      <Box width="50%" height="100%">
        <Card
          sx={{
            height: "100%",
            width: "100%",
            overflow: "auto",
            backgroundColor: "white",
          }}
        >
          <SimpleMde
            value={description}
            onChange={(value) => onDescriptionChange(value)}
          />
        </Card>
      </Box>
    </Stack>
  );
};

export default QuestionForm;
