import express from "express";
import bodyParser from "body-parser";
// import cors from 'cors';
import { testConnection } from "./database/connection.js";
import login from "./login.js";
import { PasswordNotMatchError, UserNotFoundError } from './Errors.js';
import register from "./register.js";

const app = express();
const jsonParser = bodyParser.json();
const port = 80;

// app.use(cors({
//     origin: '*'
// }));

app.post('/api/login', jsonParser, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    login(username,password).then((userData) => {
        res.json({
            userExists: true,
            passwordMatch: true,
            id: userData.id,
            username: userData.username,
            token: userData.token
        });
    }).catch((error) => {
        if (error instanceof UserNotFoundError) { 
            res.json({
                userExists: false
            });
        } else if (error instanceof PasswordNotMatchError) {
            res.json({
                userExists: true,
                passwordMatch: false
            });
        }
        console.log(error);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));