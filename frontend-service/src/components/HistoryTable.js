import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, } from 'react';

const formatDatetime = (params) => {
  const isoDateString = params.value;
  const date = new Date(isoDateString);

  const year = date.getFullYear();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const ampm = hours >= 12 ? "PM" : "AM";
  const shortHours = hours % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${day} ${month} ${year}, ${shortHours}:${minutes} ${ampm}`;
  return formattedDate;
}

const QuestionTitleCell = ({ questionId }) => {
  const [questionTitle, setQuestionTitle] = useState("...");

  useEffect(() => {
    const getQuestionTitle = async () => {
      const url = `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${questionId}`;

      const token = window.localStorage.getItem("token");
      const config = {headers: { Authorization: token }};
      const response = await axios.get(url, config);
      const { title } = response.data;
      setQuestionTitle(title);
    };
    getQuestionTitle();
  },[questionId]);

  return questionTitle;
};

const LanguageLogo = ({language}) => {
  switch (language) {
    case "java":
      return <img src="java.svg" width={60} alt="Java" />;
    case "javascript":
      return <img src="javascript.svg" width={40} alt="JavaScript" />;
    case "python":
      return <img src="python.svg" width={40} alt="Python" />;
    default:
      return null;
  }
}

const PartnerInfo = ({partnerId}) => {
  const [partnerName, setPartnerName] = useState("...");
  const [partnerProfileImageUrl, setPartnerProfileImageUrl] = useState("...");
  
  useEffect(() => {
    if (!partnerId) return;

    const getPartnerNameAndProfileImageUrl = async () => {
      try {
        const url = `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile/${partnerId}`;
        const token = window.localStorage.getItem("token");
        const config = {headers: { Authorization: token }};
        const response = await axios.get(url, config);
        const { name, profileImageUrl } = response.data;
        setPartnerName(name);
        setPartnerProfileImageUrl(profileImageUrl);
      } catch (error) {
        setPartnerName("Deleted User");
      }
    };

    getPartnerNameAndProfileImageUrl();
  },[partnerId]);

  if (!partnerId) return "None";
  
  return (
    <Stack alignItems="center">
      <Avatar alt={partnerName} src={partnerProfileImageUrl}/>
      <Typography fontSize={12} textAlign="center" noWrap width="100px">{partnerName}</Typography>
    </Stack>
  )
  
}

const columns = [
  { field: 'attempt_datetime', headerName: 'Date submitted', flex: 3, valueFormatter: formatDatetime },
  { field: 'question_id', headerName: 'Question Title', renderCell: (params) => <QuestionTitleCell questionId={params.value}/>, flex: 3, },
  { field: 'language', headerName: 'Language', flex: 1, renderCell: (params) => <LanguageLogo language={params.value}/>, headerAlign: "center", align: "center" },
  { field: 'partner_id', headerName: 'Partner', flex: 1, minWidth: 100, renderCell: (params) => <PartnerInfo partnerId={params.value}/>, headerAlign: "center", align: "center" },
];

const QuickSearchToolbar = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
      mx={2}
    >
      <Typography fontSize={30}>Past Submissions</Typography>
      <GridToolbarQuickFilter variant='outlined'/>
    </Stack>
  );
}

const CustomNoRowsOverlay = () => {
  return (
    <Stack alignItems="center" justifyContent="center" height="100%" >
      <img src="NoSubmissions.svg" height="60%" width="60%"/>
      <Typography variant="h3">No submissions</Typography>
    </Stack>
  )
}

const HistoryTable = ({ rows }) => {
  const navigate = useNavigate();
  const handleRowClick = (params) => {
    navigate(`/questions/${params.row.question_id}`, {state: {code: params.row.attempt, language: params.row.language}}); 
  }

  return (
      <DataGrid
        autoHeight
        onRowClick={handleRowClick}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.user_id + row.attempt_datetime}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
          sorting: {
            sortModel: [
              { field: 'attempt_datetime', sort: 'desc' },
            ],
          },
        }}
        sx={{
          '& .MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-row:nth-child(even)': {
            backgroundColor: (theme) => theme.palette.questionRowEven,
          },
          '& .MuiDataGrid-row:nth-child(odd)': {
            backgroundColor: (theme) => theme.palette.questionRowOdd,
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: (theme) => theme.palette.questionRowHover,
            cursor: "pointer"
          },
          '& .MuiDataGrid-columnHeader, & .MuiDataGrid-footerContainer, & .MuiTablePagination-displayedRows ': {
            backgroundColor: (theme) => theme.palette.questionRowEven,
          },
          '& .MuiInputBase-root': {
            height: "45px",
          },
          '--DataGrid-overlayHeight': '670px',
          border: "none",
          mt:8,
          maxWidth:"80%",
        }}
        slots={{ 
          toolbar: QuickSearchToolbar,
          noRowsOverlay: CustomNoRowsOverlay,
          
        }}
        density='comfortable'
        disableColumnMenu
        rowSelection={false}
      />
  );
}

export default HistoryTable;