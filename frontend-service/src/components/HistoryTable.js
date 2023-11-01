import { DataGrid, GridToolbarQuickFilter } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const formatDate = (params) => {
  const isoDateSrting = params.value;
  const date = new Date(isoDateSrting);

  const singaporeTimestamp = date.getTime() + (8 * 60 * 60 * 1000);
  const singaporeDate = new Date(singaporeTimestamp);

  const year = date.getFullYear();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[singaporeDate.getMonth()];
  const day = singaporeDate.getDate().toString().padStart(2, '0');
  const hours = singaporeDate.getHours().toString().padStart(2, '0');
  const ampm = hours >= 12 ? "PM" : "AM";
  const shortHours = hours % 12 || 12;
  const minutes = singaporeDate.getMinutes().toString().padStart(2, '0');

  const formattedDate = `${day} ${month} ${year}, ${shortHours}:${minutes} ${ampm}`;
  return formattedDate;
}

const columns = [
  { field: 'attempt_datetime', headerName: 'Date submitted', width: 300, valueFormatter: formatDate },
  { field: 'attempt', headerName: 'attempt', width: 400 },
];

const QuickSearchToolbar = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      pb={0}
    >
      <Typography variant="h4">Past Submissions</Typography>
      <GridToolbarQuickFilter variant='outlined' />
    </Stack>
  );
}

const HistoryTable = ({ rows }) => {
  return (
    <Box
      sx={{ backgroundColor: "red", borderRadius: "10px" }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.user_id + row.attempt_datetime}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        onCellClick={()=>{}}
        pageSizeOptions={[5]}
        rowSelection={false}
        sx={{
          '& .MuiDataGrid-cell:focus, .MuiDataGrid-columnHeader:focus': {
            outline: 'none',
          },
        }}
        slots={{ toolbar: QuickSearchToolbar}}
        // disableColumnMenu
      />
    </Box>
  );
}

export default HistoryTable;