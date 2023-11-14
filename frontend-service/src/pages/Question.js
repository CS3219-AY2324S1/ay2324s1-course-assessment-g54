import axios from "axios";
import * as DOMPurify from "dompurify";
import * as marked from "marked";
import Editor from "@monaco-editor/react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import prettier from 'prettier/standalone';
import prettierJavaPlugin from 'prettier-plugin-java';

import { useUser } from "../contexts/UserContext";

import Page from "../components/Page";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import AcknowledgementToast from "../components/AcknowledgementToast";
import Divider from '@mui/material/Divider';

marked.use({ breaks: true, gfm: true, silent: true });

const getDifficultyChipColor = (difficulty) => {
  switch (difficulty) {
    case "easy":
      return "success";
    case "medium":
      return "warning";
    case "hard":
      return "error";
    default:
      return "primary";
  }
};

const Question = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const historyCode = location.state ? location.state.code : null;
  const historyLanguage = location.state ? location.state.language : null;

  const { id } = useParams();
  const user = useUser();
  const editorRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [editorLanguage, setEditorLanguage] = useState(historyLanguage? historyLanguage : "javascript");
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState("success");
 
  useEffect(() => {
    const getQuestion = async () => {
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${id}`;
      const token = window.localStorage.getItem("token");
      const header = {
        headers: { Authorization: token },
      };
      const response = await axios.get(url, header);
      const question = response.data;
      if (!question.question_id) return navigate("/questions");
      setQuestion(question);
      setIsLoading(false);
    };

    getQuestion();
  }, [id, navigate]);

  useEffect(() => {
    editorRef.current?.focus();

  }, [editorLanguage]);
  const handleEditorLanguageChange = (event) => setEditorLanguage(event.target.value);

  const handleFormatCode = async () => { 
    const editor = editorRef.current;
    if (editorLanguage=="javascript") {
      editor?.trigger("anyString", 'editor.action.formatDocument');
    } 
    
    const currentCode = editor.getValue();
    if (editorLanguage=="python") {
      try {
        const response = await axios.post(`${process.env.REACT_APP_PYTHON_FORMATTER_SERVICE_HOST}/format`, { code: currentCode })
        const formattedCode = response.data.formatted_code;
        editor.setValue(formattedCode)
      } catch (error) {
        setToastSeverity("error");
        setToastMessage("Unable to format invalid Python code. Please check your indentation.");
        setIsToastOpen(true);
        console.error(error);
      }
    }

    if (editorLanguage=="java") {
      try {
        const formattedCode = await prettier.format(currentCode, {parser: "java", plugins: [prettierJavaPlugin]})
        editor.setValue(formattedCode);
      } catch (error) {
        setToastSeverity("error");
        setToastMessage("Unable to format invalid Java code.");
        setIsToastOpen(true);
        console.error(error);
      }
    }
  }

  const handleSaveClick = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const config = {headers: { Authorization: token }};
      const {question_id} = question;
      const attempt = editorRef.current.getValue();

      const partner_id = null;

      const language = editorLanguage;

      const history_url = `${process.env.REACT_APP_HISTORY_SERVICE_HOST}/addHistory`; 
      await axios.post(history_url, { question_id, attempt, language, partner_id }, config);
      setToastMessage("Saved succesfully!");
      setToastSeverity("success");
      setIsToastOpen(true);
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) return <LinearProgress variant="indeterminate" />;

  return (
    <Page title="Question">
      <AcknowledgementToast
        message={toastMessage}
        open={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        severity={toastSeverity}
      />
      <Box height="calc(100vh - 64px)" width="100vw" >
        <Box height="100%" display="flex">
          <Box width="50%" height="100%" padding={1}>
            <Stack height="100%" spacing={1}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Tooltip title="Back to questions" placement="top" arrow>
                  <IconButton onClick={() => navigate("/questions")}>
                    <ArrowBackIcon />
                  </IconButton>
                </Tooltip>
                <Typography
                  variant="h5"
                  flexGrow={1}
                  noWrap
                  textOverflow="ellipsis"
                >
                  {question.title}
                </Typography>
                <Chip
                  label={question.complexity.charAt(0).toUpperCase() + question.complexity.substring(1)}
                  color={getDifficultyChipColor(question.complexity)}
                  size="small"
                  sx={{ color: "white" }}
                />
                {user.isMaintainer && (
                  <Tooltip title="Edit question" placement="top" arrow>
                    <IconButton
                      onClick={() => navigate(`/questions/${id}/edit`)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
              <Box>
                {question.categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    size="small"
                    sx={{ marginRight: 1 }}
                  />
                ))}
              </Box>
              <Card variant="outlined" sx={{ flexGrow: 1, padding: 1, backgroundColor: "white" }}>
                <iframe
                  height="100%"
                  width="100%"
                  style={{ border: "none" }}
                  sandbox=""
                  title="Question Description"
                  srcDoc={DOMPurify.sanitize(
                    marked.parse(question.description)
                  )}
                />
              </Card>
            </Stack>
          </Box>
          <Box width="50%" height="100%" padding={1}>
            <Paper
              sx={{ height: "100%", width: "100%", overflow: "hidden" }}
              elevation={2}
            >
              <Stack direction="row" alignItems="center" justifyContent="space-between" px={0.5}>
                <Stack direction="row" alignItems="center">
                  <Select
                    value={editorLanguage}
                    onChange={handleEditorLanguageChange}
                    transitionDuration={0}
                    sx={{
                      height: 20,
                      boxShadow: 'none', 
                      color: "grey",
                      transition: "none",
                      '&:hover':{ color: "white !important"},
                      '.MuiOutlinedInput-notchedOutline': { border: 0 },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
                      '.MuiSvgIcon-root':{ fill: "grey", transition: "none !important"},
                      '&:hover .MuiSvgIcon-root':{ fill: "white !important"},
                    }}
                  >
                    <MenuItem value="javascript">Javascript</MenuItem>
                    <MenuItem value="python">Python</MenuItem>
                    <MenuItem value="java">Java</MenuItem>
                  </Select>
                </Stack>
                <Stack direction="row" spacing={1} my={0.5}>
                  <Button variant="contained" color="primary" sx={{ textTransform: "None", height: "24px", width: "20px", my: "4px", color:"white" }} onClick={handleFormatCode}>Format</Button>
                  <Button variant="contained" color="success" sx={{ textTransform: "None", height: "24px", my: "4px", color:"white" }} onClick={handleSaveClick}>Save</Button>
                </Stack>
              </Stack>
              <Divider />
              <Editor
                language={editorLanguage}
                value={    
                  historyCode && editorLanguage == historyLanguage
                  ? historyCode
                  : editorLanguage == "python"
                  ? "# Insert your code here\n"
                  : "// Insert your code here\n"
                }
                theme={editorLanguage === "python" ? "python-theme" : "java-theme"}
                beforeMount={(monaco) => {
                  monaco.languages.setMonarchTokensProvider('python', pythonMonarchTokensProvider);
                  monaco.languages.setLanguageConfiguration('python', pythonLanguageConfiguration);
                  monaco.editor.defineTheme('python-theme', pythonTheme);
                  monaco.languages.setMonarchTokensProvider('java', javaMonarchTokensProvider);
                  monaco.languages.setLanguageConfiguration('java', javaLanguageConfiguration);
                  monaco.editor.defineTheme('java-theme', javaTheme);
                }}
                onMount={(editor) => {
                  editorRef.current = editor;
                  editorRef.current.focus();
                }}

              />
            </Paper>
          </Box>
        </Box>
      </Box>
    </Page>
  );
};

export default Question;

const pythonLanguageConfiguration = {
  comments: {
    lineComment: '#',
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')']],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: "'", close: "'" },
    { open: '"', close: '"' },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: "'", close: "'" },
    { open: '"', close: '"' },
  ],
};

const pythonMonarchTokensProvider = {
  tokenizer: {
    root: [
      [/(def|class|if|else|elif|while|for|try|in|except|finally|with|as|return|break|continue|pass|raise|import|from|as|global|nonlocal|assert|yield|lambda)\b/, 'keyword'],
      [/\b(True|False|None)\b/, 'constant.language'],
      [/\b(and|or|not)\b/, 'keyword.operator'],
      [/\b(print|input|len|range|str|int|float|list|tuple|set|dict)\b/, 'support.function'],
      [/\b([a-zA-Z_]\w*)\b/, 'identifier'],
      [/\d+\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/\b\d+\b/, 'number'],
      [/'([^'\\]|\\.)*'/, 'string'],
      [/"([^"\\]|\\.)*"/, 'string'],
    ],
  },
};
const pythonTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: '#569CD6', fontStyle: 'bold' },
    { token: 'constant.language', foreground: '#B5CEA8' },
    { token: 'keyword.operator', foreground: '#D4D4D4' },
    { token: 'support.function', foreground: '#C586C0' },
    { token: 'identifier', foreground: '#9CDCFE' },
    { token: 'number.float', foreground: '#CE9178' },
    { token: 'number', foreground: '#D7BA7D' },
    { token: 'string', foreground: '#6A9955' },
  ],
  colors: {
    'editor.background': '#1E1E1E',
    'editor.foreground': '#D4D4D4',
  },
};


const javaLanguageConfiguration = {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/'],
  },
  brackets: [['{', '}'], ['[', ']'], ['(', ')']],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: "'", close: "'", notIn: ['string', 'comment'] },
    { open: '"', close: '"', notIn: ['string', 'comment'] },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: "'", close: "'" },
    { open: '"', close: '"' },
  ],
};

const javaMonarchTokensProvider = {
  tokenizer: {
    root: [
      [/\b(abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|if|goto|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/, 'keyword'],
      [/\b(true|false|null)\b/, 'constant.language'],
      [/\b(instanceof|new)\b/, 'keyword.operator'],
      [/\b(System.out.print|System.out.println|String.valueOf|Math.abs|Math.max|Math.min|Arrays.sort)\b/, 'support.function'],
      [/[a-zA-Z_]\w*/, 'identifier'],
      [/\b\d+\b/, 'number'],
      [/'([^'\\]|\\.)*'/, 'string'],
      [/"([^"\\]|\\.)*"/, 'string'],
    ],
  },
};

const javaTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'keyword', foreground: '#569CD6', fontStyle: 'bold' },
    { token: 'constant.language', foreground: '#B5CEA8' },
    { token: 'keyword.operator', foreground: '#D4D4D4' },
    { token: 'support.function', foreground: '#C586C0' },
    { token: 'identifier', foreground: '#9CDCFE' },
    { token: 'number', foreground: '#D7BA7D' },
    { token: 'string', foreground: '#6A9955' },
  ],
  colors: {
    'editor.background': '#1E1E1E',
    'editor.foreground': '#D4D4D4',
  },
};
