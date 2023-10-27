import { useNavigate } from "react-router-dom";
import Page from "../components/Page";
import HistoryTable from "../components/HistoryTable";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";



const History = () => {
  const [rows, setRows] = useState([]);
  const handleClick = async () => {
    const token = window.localStorage.getItem("token");
    const response = await axios.get(
        `${process.env.REACT_APP_HISTORY_SERVICE_HOST}/ownHistory`,
        { headers: { Authorization: token } }
    );
    setRows(response.data);
  }

  return (
    <Page title="Error 404">
      <HistoryTable rows={rows}/>
      <Button onClick={handleClick}>
        button
      </Button>
      <Typography>
        {JSON.stringify(rows)}
      </Typography>
    </Page>
  );
};

export default History;
