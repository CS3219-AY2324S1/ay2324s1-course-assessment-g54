import { createHash } from "crypto";
import schedule from "node-schedule";
import { Milliseconds } from "./constant.js";

export const createRoomHash = (currentUserID, matchedUserId) => {
    if (!currentUserID || !matchedUserId) {
        return null;
    }

    if (currentUserID >= matchedUserId) {
        return createHash('md5').update(currentUserID).update(matchedUserId).digest("hex");
    } else {
        return createHash('md5').update(matchedUserId).update(currentUserID).digest("hex");
    }
}

export async function getRandomQuestion() {
    // call getRandomQuestion from question service
    return {"question_id" : 3}
}

// schedule a cron job to delete the room after 3 hours
function scheduleDeleteJob(roomID) {
    const startTime = new Date(Date.now() + Milliseconds.IN_THREE_HOURS);
    scedu.scheduleJob(roomID, startTime,
        async function () {
            await deleteRoomInfo(redisClient, roomID);
        }
    );
}