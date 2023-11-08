import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

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

const LanguageLogo = ({language}) => {
  return (
    <Tooltip title={language[0].toUpperCase() + language.slice(1)} placement="left" arrow>
      { language == "java"
        ? <img src="java.png" width={54} alt="Java" style={{ display: "inline-block", backgroundColor: "white", borderRadius: "50%" }}/>
        : language == "javascript"
        ? <img src="javascript.svg" width={50} alt="JavaScript" />
        : language == "python"
        ? <img src="python.png" width={50} alt="Python" />
        : null
      }
    </Tooltip>
  )
}

const PartnerInfo = ({partnerName, partnerProfileImageUrl}) => {
  if (!partnerName) return "";
  return (
    <Tooltip title={partnerName} placement="left" arrow>
      <Avatar alt={partnerName} src={partnerProfileImageUrl} sx={{width: "50px", height: "50px"}}/>
    </Tooltip>
  )
}

const columns = [
  { field: 'attempt_datetime', headerName: 'Date submitted', flex: 3, valueFormatter: formatDatetime },
  { field: 'question_title', headerName: 'Question Title', flex: 3 },
  { field: 'language', headerName: 'Language', flex: 1, renderCell: (params) => <LanguageLogo language={params.value}/>, headerAlign: "center", align: "center" },
  { field: 'partner', headerName: 'Partner', flex: 1, minWidth: 100, valueGetter: (params) => params.row.partner_name, renderCell: (params) => <PartnerInfo partnerName={params.row.partner_name} partnerProfileImageUrl={params.row.partner_profile_image_url}/>, headerAlign: "center", align: "center" },
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