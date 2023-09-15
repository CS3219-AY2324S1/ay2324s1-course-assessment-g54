import axios from "axios";

export async function validateLogin(req, res, next) {
    try{
        const token = req.headers.authorization;
        console.log("TOKEN", token);
        const userService = "http://localhost:3002/profile/"
        const response = await axios.post(
            userService,
            { headers: { Authorization: token } }
        );
        console.log("RESPONSE", response.data);
        next();
    } catch (error) {
        console.log("ERROR", error.message);
        next()
    }
};
