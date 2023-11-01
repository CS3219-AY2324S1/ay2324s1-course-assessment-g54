import Page from "../components/Page";
import HistoryTable from "../components/HistoryTable";
import Box from "@mui/material/Box";
import axios from "axios";
import { useState, useEffect } from "react";



const History = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const getHistoryData = async () => {
      const token = window.localStorage.getItem("token");
      const response = await axios.get(
          `${process.env.REACT_APP_HISTORY_SERVICE_HOST}/ownHistory`,
          { headers: { Authorization: token } }
      );
      setRows(response.data);
    }
    getHistoryData();
  }, []);

  return (
    <Page title="History" >
      <Box display="flex" justifyContent="center">
        <HistoryTable rows={rows}/>
      </Box>
    </Page>
  );
};

export default History;
