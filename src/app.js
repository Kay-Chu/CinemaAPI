import express from "express";
import bodyParser from "body-parser";
// import cors from 'cors';
import login from "./endpoints/login.js";
import register from "./endpoints/register.js";
import getFeatured from "./endpoints/featured.js";
import { PasswordNotMatchError, UserNotFoundError } from './Errors.js';

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
    });
});

app.get('/api/featured/:num?', jsonParser, (req, res) => {
    getFeatured(req.params.num).then((result) => {
        res.json(result);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));