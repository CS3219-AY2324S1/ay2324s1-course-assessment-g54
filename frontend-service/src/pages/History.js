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
      const historyData = response.data
      
      const questions = await Promise.all(
        historyData.map((row) => {
          return axios.get(
            `${process.env.REACT_APP_QUESTIONS_SERVICE_HOST}/questions/${row.question_id}`,
            { headers: { Authorization: token } }
          );
        })
      );

      const partners = await Promise.all(
        historyData.map((row) => {

          if (!row.partner_id) {
            return { data: { name: "", profileImageUrl: "" }};
          }

          return axios.get(
            `${process.env.REACT_APP_USERS_SERVICE_HOST}/profile/${row.partner_id}`,
            { headers: { Authorization: token } }
          )
          .catch (error => ({ data: { name: "Deleted User", profileImageUrl: "" }}) )
        })
      );

      const combinedData = historyData.map((row, index) =>{
        return {
          ...row,
          question_title: questions[index].data.title,
          partner_name: partners[index].data.name,
          partner_profile_image_url: partners[index].data.profileImageUrl,
        }
      });

      setRows(combinedData);
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
