import axios from "axios";
import { usersServiceBase } from "./constant.js";

export async function validateLogin(token) {
    const usersServiceUrl = `${usersServiceBase}/profile`;
    const response = await axios.get(
        usersServiceUrl,
        { headers: { Authorization: token } }
    );
    return response;
};

export function validateDifficulty(token) {

}