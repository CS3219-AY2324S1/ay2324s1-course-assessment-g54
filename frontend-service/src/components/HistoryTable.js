import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


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

const formatPartnerId = (params) => {
  if (!params.value) {
    return "None";
  }
}

// const capitalizeFirstLetter = (params) => {
//   return params.value.charAt(0).toUpperCase() + params.value.slice(1);
// }
const renderLanguageLogo = (params) => {
  switch (params.value) {
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

const renderStatus = (params) => {
  return (
    <Typography
      fontWeight="bold"
      color={params.value == "accepted" ? "lightgreen" : "error"}
      textTransform="capitalize"
    >
      {params.value}
    </Typography>
  )
}

const renderPartnerInfo = (params) => {
  // if (!params.value) {
  //   return "None";
  // }
  
  return (
    <Stack alignItems="center">
      <img src="javascript.svg" width={36} style={{borderRadius:"50%"}}/>
      <Typography display="block" noWrap width="100px" >fasaaaaaaaaaaa</Typography>
    </Stack>
  )

}

const columns = [
  { field: 'attempt_datetime', headerName: 'Date submitted', flex: 3, valueFormatter: formatDatetime },
  { field: 'title', headerName: 'Question Title', flex: 3 },
  { field: 'status', headerName: 'Status', flex: 1, renderCell: renderStatus, headerAlign: "center", align: "center"},
  { field: 'language', headerName: 'Language', flex: 1, renderCell: renderLanguageLogo, headerAlign: "center", align: "center"},
  { field: 'partner_id', headerName: 'Partner', flex: 1, minWidth: 100, renderCell: renderPartnerInfo, headerAlign: "center", align: "center"},
  // { field: 'attempt', headerName: 'Attempt'},
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

const HistoryTable = ({ rows }) => {
  return (
      <DataGrid
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
          border: "none",
          mt:8,
          maxWidth:"80%",
        }}
        slots={{ toolbar: QuickSearchToolbar}}
        density='comfortable'
        disableColumnMenu
        rowSelection={false}
      />
  );
}

export default HistoryTable;