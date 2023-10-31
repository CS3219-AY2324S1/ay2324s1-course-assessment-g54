import {  useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Page from "../components/Page";
import VideoChat from "../components/VideoChat";

const Room = () => {
    return <Page title="Room">
        <Typography>hi</Typography>
        <VideoChat />
    </Page>;
};

export default Room;
