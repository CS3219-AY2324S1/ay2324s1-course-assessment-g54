import axios from "axios";

const usersServiceBase = "http://users-service:3002";

export async function validateLogin(req, res, next) {
    try{
        const token = req.headers.authorization;
        const usersServiceUrl = `${usersServiceBase}/profile`;

        const response = await axios.get(
            usersServiceUrl,
            { headers: { Authorization: token } }
        );
        if (response.data == null) {
            return res.status(401).send("not logged in!");
        }
        next();
    } catch (error) {
        return res.status(400).send(error.message);
    }
};

export async function validateIsMaintainer(req, res, next)  {
    try{
        const token = req.headers.authorization;
        const usersServiceUrl = `${usersServiceBase}/profile`;

        const response = await axios.get(
            usersServiceUrl,
            { headers: { Authorization: token } }
        );
        if (response.data == null) {
            return res.status(401).send("not logged in!");
        }
        if (response.data.isMaintainer == false) {
            return res.status(401).send("not a maintainer!");
        }
        next();
    } catch (error) {
        return res.status(400).send(error.message);
    }
};
