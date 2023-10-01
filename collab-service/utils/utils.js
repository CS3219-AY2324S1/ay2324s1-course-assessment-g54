import { createHash } from "crypto";
import schedule from "node-schedule";
import { ErrorMessages, Milliseconds, questionServiceBase } from "../constants/constant.js";
import axios from "axios";

export const createroomID = (currentUserID, matchedUserId) => {
    if (!currentUserID || !matchedUserId) {
        return null;
    }

    if (currentUserID >= matchedUserId) {
        return createHash('md5').update(currentUserID).update(matchedUserId).digest("hex");
    } else {
        return createHash('md5').update(matchedUserId).update(currentUserID).digest("hex");
    }
}

export async function getRandomQuestion(token, difficulty) {
    try {
        const questionServiceUrl = `${questionServiceBase}/random-questions/${difficulty.toLowerCase()}`;
        const response = await axios.get(
            questionServiceUrl,
            { headers: { Authorization: token } }
        );
        return response;
    } catch (error){
        console.log(error.message)
        throw new Error(ErrorMessages.QUESTION_SERVICE_ERROR);
    }
    
}

// schedule a cron job to delete the room after 3 hours
export function scheduleDeleteJob(redisClient, roomID) {
    console.log("scheduling delete job!")
    const startTime = new Date(Date.now() + Milliseconds.IN_THREE_HOURS);
    schedule.scheduleJob(roomID, startTime,
        async function () {
            await deleteRoomInfo(redisClient, roomID);
        }
    );
}
