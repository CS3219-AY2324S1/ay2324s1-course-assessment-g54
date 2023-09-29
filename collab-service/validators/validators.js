import axios from "axios";
import { ErrorMessages, difficulties, usersServiceBase } from "../constants/constant.js";

export async function validateLogin(token) {
    try {
        const usersServiceUrl = `${usersServiceBase}/profile`;
        const response = await axios.get(
            usersServiceUrl,
            { headers: { Authorization: token } }
        );
        return response;
    } catch (error) {
        console.log(error.message);
        throw new Error(ErrorMessages.USER_SERVICE_ERROR);
    }
};

export async function validateUser(userID, token) {
    try {
        const usersServiceUrl = `${usersServiceBase}/match/${userID}`;
        console.log(usersServiceUrl);
        const response = await axios.get(
            usersServiceUrl,
            { headers: { Authorization: token } }
        );
        return response;
    } catch (error) {
        console.log(error.message);
        throw new Error(ErrorMessages.USER_SERVICE_ERROR);
    }
};

export function validateDifficulty(difficulty) {
    return difficulty && difficulties.includes(difficulty.toLowerCase());
};
