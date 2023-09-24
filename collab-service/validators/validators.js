import axios from "axios";
import { difficulties, usersServiceBase } from "../constants/constant.js";

export async function validateLogin(token) {
    const usersServiceUrl = `${usersServiceBase}/profile`;
    const response = await axios.get(
        usersServiceUrl,
        { headers: { Authorization: token } }
    );
    return response;
};

export function validateDifficulty(difficulty) {
    return difficulty && difficulties.includes(difficulty.toLowerCase());
}